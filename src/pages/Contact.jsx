import { useForm } from "react-hook-form";
import { useState } from "react";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  fadeUp,
  hoverGlow,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/animations/motionPresets";

const EMAILJS_RUNTIME_CONFIG_URL = "/emailjs-config.json";

const EMAILJS_ENV_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() ?? "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() ?? "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? "",
};

const EMAILJS_CONFIG_REQUIREMENTS = [
  { envKey: "VITE_EMAILJS_SERVICE_ID", configKey: "serviceId" },
  { envKey: "VITE_EMAILJS_TEMPLATE_ID", configKey: "templateId" },
  { envKey: "VITE_EMAILJS_PUBLIC_KEY", configKey: "publicKey" },
];

const FORM_MIN_FILL_TIME_MS = 3000;
const SUBMISSION_COOLDOWN_MS = 15000;

const FIELD_LIMITS = {
  name: 80,
  email: 254,
  subject: 120,
  message: 1000,
};

const HTML_INJECTION_PATTERN =
  /<\s*\/?\s*[a-z][^>]*>|javascript\s*:|on[a-z]+\s*=|&lt;\s*\/?\s*[a-z]|&#x?0*3c/i;

const trimValue = (value) => (typeof value === "string" ? value.trim() : "");

const trimEmailValue = (value) => trimValue(value).toLowerCase();

const hasUnsafeContent = (value) => HTML_INJECTION_PATTERN.test(value);

const getTimestamp = () => performance.now();

let runtimeEmailConfigPromise;

const isPlaceholderValue = (value) =>
  value.toLowerCase().startsWith("your_emailjs_");

const normalizeEmailConfig = (config) => ({
  serviceId: trimValue(config?.serviceId ?? config?.VITE_EMAILJS_SERVICE_ID),
  templateId: trimValue(
    config?.templateId ?? config?.VITE_EMAILJS_TEMPLATE_ID
  ),
  publicKey: trimValue(config?.publicKey ?? config?.VITE_EMAILJS_PUBLIC_KEY),
});

const getInvalidEmailConfigKeys = (config, source = "env") =>
  EMAILJS_CONFIG_REQUIREMENTS.filter(({ configKey }) => {
    const value = config?.[configKey] ?? "";

    return !value || isPlaceholderValue(value);
  }).map(({ envKey, configKey }) =>
    source === "runtime" ? `${EMAILJS_RUNTIME_CONFIG_URL}:${configKey}` : envKey
  );

const warnInvalidEmailConfig = (invalidKeys) => {
  if (!import.meta.env.DEV || invalidKeys.length === 0) return;

  console.warn(
    [
      `EmailJS is not configured. Missing or placeholder config key(s): ${invalidKeys.join(", ")}.`,
      "Both Vite env config and the public runtime fallback are invalid or unavailable.",
    ].join(" ")
  );
};

const invalidEnvConfigKeys = getInvalidEmailConfigKeys(EMAILJS_ENV_CONFIG);

const validatePlainText = (label) => (value) => {
  const trimmedValue = trimValue(value);

  if (!trimmedValue) {
    return `${label} is required`;
  }

  if (hasUnsafeContent(trimmedValue)) {
    return `${label} cannot include HTML or script content`;
  }

  return true;
};

const fetchRuntimeEmailConfig = async () => {
  if (!runtimeEmailConfigPromise) {
    runtimeEmailConfigPromise = fetch(EMAILJS_RUNTIME_CONFIG_URL, {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) return null;

        return response.json();
      })
      .then((config) => normalizeEmailConfig(config))
      .catch((error) => {
        if (import.meta.env.DEV) {
          console.warn(
            `Unable to load EmailJS runtime config from ${EMAILJS_RUNTIME_CONFIG_URL}.`,
            error
          );
        }

        return null;
      });
  }

  return runtimeEmailConfigPromise;
};

const getEmailConfig = async () => {
  if (invalidEnvConfigKeys.length === 0) {
    return EMAILJS_ENV_CONFIG;
  }

  const runtimeConfig = await fetchRuntimeEmailConfig();
  const invalidRuntimeConfigKeys = getInvalidEmailConfigKeys(
    runtimeConfig,
    "runtime"
  );

  if (invalidRuntimeConfigKeys.length > 0) {
    warnInvalidEmailConfig([...invalidEnvConfigKeys, ...invalidRuntimeConfigKeys]);

    return null;
  }

  return runtimeConfig;
};

const getEmailErrorMessage = (error) => {
  if (
    error instanceof EmailJSResponseStatus ||
    typeof error?.status === "number"
  ) {
    switch (error.status) {
      case 400:
      case 401:
      case 404:
        return "Email service is not configured correctly. Please check the EmailJS service, template, and public key.";
      case 403:
        return "Email service rejected this request. Please check your EmailJS domain/security settings.";
      case 429:
        return "Too many messages were sent recently. Please try again later.";
      default:
        return error.text || "Email service rejected the message. Please try again later.";
    }
  }

  return "Network error while sending message. Please try again later.";
};

const Contact = () => {
  const [emailStatus, setEmailStatus] = useState({ type: "", message: "" });
  const [formStartedAt, setFormStartedAt] = useState(getTimestamp);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = staggerContainer(shouldReduceMotion, 0.05, 0.08);
  const itemVariants = staggerItem(shouldReduceMotion);
  const initialState = shouldReduceMotion ? "show" : "hidden";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const handleFieldChange = () => {
    if (emailStatus.type) setEmailStatus({ type: "", message: "" });
  };

  const onSubmit = async (data) => {
    if (data.company?.trim()) {
      return;
    }

    const submittedAt = getTimestamp();

    if (submittedAt - formStartedAt < FORM_MIN_FILL_TIME_MS) {
      setEmailStatus({
        type: "error",
        message: "Please take a moment to complete the form before sending.",
      });
      return;
    }

    if (submittedAt < cooldownUntil) {
      setEmailStatus({
        type: "error",
        message: "Please wait a moment before sending another message.",
      });
      return;
    }

    const emailConfig = await getEmailConfig();

    if (!emailConfig) {
      setEmailStatus({
        type: "error",
        message:
          "The contact form is temporarily unavailable. Please email me directly instead.",
      });
      return;
    }

    const payload = {
      name: trimValue(data.name),
      email: trimEmailValue(data.email),
      phone: trimValue(data.phone),
      subject: trimValue(data.subject),
      message: trimValue(data.message),
    };

    try {
      setCooldownUntil(submittedAt + SUBMISSION_COOLDOWN_MS);

      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          ...payload,
          from_name: payload.name,
          from_email: payload.email,
          reply_to: payload.email,
        },
        { publicKey: emailConfig.publicKey }
      );
      setEmailStatus({
        type: "success",
        message: "Your message was sent successfully.",
      });
      setFormStartedAt(getTimestamp());
      reset();
    } catch (error) {
      console.error("EmailJS send failed:", error);
      setEmailStatus({ type: "error", message: getEmailErrorMessage(error) });
    }
  };

  const nameField = register("name", {
    required: "Name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters",
    },
    maxLength: {
      value: FIELD_LIMITS.name,
      message: `Name must be ${FIELD_LIMITS.name} characters or fewer`,
    },
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "Name can only contain letters",
    },
    validate: validatePlainText("Name"),
    setValueAs: trimValue,
  });

  const emailField = register("email", {
    required: "Email is required",
    maxLength: {
      value: FIELD_LIMITS.email,
      message: `Email must be ${FIELD_LIMITS.email} characters or fewer`,
    },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email format",
    },
    validate: (value) => (trimValue(value) ? true : "Email is required"),
    setValueAs: trimEmailValue,
  });

  const phoneField = register("phone", {
    required: "Phone number is required",
    pattern: {
      value: /^[+()\s\d-]+$/,
      message: "Phone can include numbers, spaces, +, and -",
    },
    validate: (value) =>
      value.replace(/\D/g, "").length >= 7
        ? true
        : "Phone must be at least 7 digits",
    setValueAs: trimValue,
  });

  const subjectField = register("subject", {
    required: "Purpose is required",
    minLength: {
      value: 3,
      message: "Purpose must be at least 3 characters",
    },
    maxLength: {
      value: FIELD_LIMITS.subject,
      message: `Purpose must be ${FIELD_LIMITS.subject} characters or fewer`,
    },
    pattern: {
      value: /^[^<>]*$/,
      message: "Purpose cannot include < or > characters",
    },
    validate: validatePlainText("Purpose"),
    setValueAs: trimValue,
  });

  const messageField = register("message", {
    required: "Message is required",
    minLength: {
      value: 20,
      message: "Message must be at least 20 characters",
    },
    maxLength: {
      value: FIELD_LIMITS.message,
      message: `Message must be ${FIELD_LIMITS.message} characters or fewer`,
    },
    pattern: {
      value: /^[^<>]*$/,
      message: "Message cannot include < or > characters",
    },
    validate: validatePlainText("Message"),
    setValueAs: trimValue,
  });

  return (
    <motion.section
      variants={containerVariants}
      initial={initialState}
      whileInView="show"
      viewport={viewportOnce}
      className="flex w-full flex-col gap-8 sm:gap-10"
    >
      <motion.div
        variants={itemVariants}
        className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-5 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] xxs:p-6 sm:p-7 lg:p-8"
      >
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
              Contact
            </p>
            <motion.h1
              variants={fadeUp(shouldReduceMotion)}
              className="merienda type-h1 mt-2 text-white"
            >
              Let's build together
            </motion.h1>
            <motion.span
              variants={fadeUp(shouldReduceMotion)}
              className="mt-3 block h-[2px] w-16 origin-left rounded-full bg-[#00ff5e55]"
            />
          </div>
          <div className="poppins type-body-sm w-fit max-w-full rounded-2xl border border-[#00ff5e2a] bg-[#06180f] px-4 py-3 text-[#9fffbf]">
            Open to internships and freelance work.
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.1fr] xl:gap-8 md:mt-8">
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <p className="poppins type-body leading-relaxed text-[#c7ffd8]">
              This portfolio is my first React.js project and the start of my
              transition from static HTML and WordPress to modern UI
              engineering. I am excited to collaborate on projects where I can
              learn, contribute, and ship high quality experiences.
            </p>

            <motion.div variants={containerVariants} className="grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Response time",
                  text: "Usually within 24 hours.",
                },
                {
                  title: "Preferred work",
                  text: "Front-end UI, landing pages, and dashboards.",
                },
                {
                  title: "Quick links",
                  links: [
                    {
                      label: "Email",
                      href: "mailto:Taha82426980@gmail.com",
                    },
                    { label: "GitHub", href: "https://github.com/delepover56" },
                    {
                      label: "LinkedIn",
                      href: "https://www.linkedin.com/in/taha-khan03/",
                    },
                  ],
                },
                {
                  title: "Availability",
                  text: "Open to internships and freelance work.",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={hoverGlow(shouldReduceMotion)}
                  className="rounded-2xl border border-[#00ff5e1f] bg-[#0b140d] p-4 transition-colors duration-200 hover:border-[#00ff5e88] hover:bg-[#00ff5e14] xs:p-5"
                >
                  <p className="poppins type-caption uppercase tracking-[0.3em] text-[#7feaa0]">
                    {item.title}
                  </p>
                  {item.links ? (
                    <div className="mt-3 flex flex-wrap gap-3">
                      {item.links.map((link) => (
                        <motion.a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={hoverGlow(shouldReduceMotion)}
                          className="rounded-full border border-[#00ff5e26] bg-[#06180f] px-4 py-2 text-[9px] uppercase tracking-[0.28em] text-[#9fffbf] transition-colors duration-200 hover:border-[#00ff5e88] hover:bg-[#00ff5e14] hover:text-white xxs:text-[10px]"
                        >
                          {link.label}
                        </motion.a>
                      ))}
                    </div>
                  ) : (
                    <p className="poppins type-body-sm mt-2 text-white">
                      {item.text}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center gap-4 rounded-2xl border border-[#00ff5e1f] bg-[#0b140d] p-5 xs:p-6"
          >
            <h4 className="poppins type-h4 mb-4 text-white">
              Let's get connected
            </h4>

            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
              {...register("company")}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <motion.input
                  type="text"
                  maxLength={FIELD_LIMITS.name}
                  whileFocus={hoverGlow(shouldReduceMotion)}
                  {...nameField}
                  onChange={(event) => {
                    event.target.value = event.target.value.replace(
                      /[^A-Za-z\s]/g,
                      ""
                    );
                    nameField.onChange(event);
                    handleFieldChange();
                  }}
                  aria-invalid={errors.name ? "true" : "false"}
                  placeholder="Full name"
                  className="w-full rounded-xl border border-[#00ff5e2a] bg-transparent px-4 py-3 text-[13px] text-white outline-none transition-all duration-300 focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44] xs:text-sm"
                />
                {errors.name && (
                  <p role="alert" className="poppins mt-2 text-xs text-red-300">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <motion.input
                  type="email"
                  maxLength={FIELD_LIMITS.email}
                  whileFocus={hoverGlow(shouldReduceMotion)}
                  {...emailField}
                  onChange={(event) => {
                    emailField.onChange(event);
                    handleFieldChange();
                  }}
                  aria-invalid={errors.email ? "true" : "false"}
                  placeholder="Email address"
                  className="w-full rounded-xl border border-[#00ff5e2a] bg-transparent px-4 py-3 text-[13px] text-white outline-none transition-all duration-300 focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44] xs:text-sm"
                />
                {errors.email && (
                  <p role="alert" className="poppins mt-2 text-xs text-red-300">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <motion.input
                  type="text"
                  whileFocus={hoverGlow(shouldReduceMotion)}
                  {...phoneField}
                  onChange={(event) => {
                    phoneField.onChange(event);
                    handleFieldChange();
                  }}
                  aria-invalid={errors.phone ? "true" : "false"}
                  placeholder="Phone number"
                  className="w-full rounded-xl border border-[#00ff5e2a] bg-transparent px-4 py-3 text-[13px] text-white outline-none transition-all duration-300 focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44] xs:text-sm"
                />
                {errors.phone && (
                  <p role="alert" className="poppins mt-2 text-xs text-red-300">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <motion.input
                  type="text"
                  maxLength={FIELD_LIMITS.subject}
                  whileFocus={hoverGlow(shouldReduceMotion)}
                  {...subjectField}
                  onChange={(event) => {
                    subjectField.onChange(event);
                    handleFieldChange();
                  }}
                  aria-invalid={errors.subject ? "true" : "false"}
                  placeholder="Project purpose"
                  className="w-full rounded-xl border border-[#00ff5e2a] bg-transparent px-4 py-3 text-[13px] text-white outline-none transition-all duration-300 focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44] xs:text-sm"
                />
                {errors.subject && (
                  <p role="alert" className="poppins mt-2 text-xs text-red-300">
                    {errors.subject.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <motion.textarea
                rows="6"
                maxLength={FIELD_LIMITS.message}
                placeholder="Tell me about the project"
                whileFocus={hoverGlow(shouldReduceMotion)}
                {...messageField}
                onChange={(event) => {
                  messageField.onChange(event);
                  handleFieldChange();
                }}
                aria-invalid={errors.message ? "true" : "false"}
                className="w-full resize-none rounded-xl border border-[#00ff5e2a] bg-transparent px-4 py-3 text-[13px] text-white outline-none transition-all duration-300 focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44] xs:text-sm"
              />
              {errors.message && (
                <p role="alert" className="poppins mt-2 text-xs text-red-300">
                  {errors.message.message}
                </p>
              )}
            </div>

            <AnimatePresence mode="wait">
              {emailStatus.type === "success" && (
                <motion.p
                  key="success"
                  variants={fadeUp(shouldReduceMotion)}
                  initial={initialState}
                  animate="show"
                  exit="exit"
                  className="poppins text-sm text-[#00ff5e]"
                >
                  {emailStatus.message}
                </motion.p>
              )}
              {emailStatus.type === "error" && (
                <motion.p
                  key="error"
                  variants={fadeUp(shouldReduceMotion)}
                  initial={initialState}
                  animate="show"
                  exit="exit"
                  className="poppins text-sm text-red-300"
                >
                  {emailStatus.message}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={hoverGlow(shouldReduceMotion)}
              className="rounded-2xl border border-[#00ff5e66] bg-[#06180f] px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-[#00ff5e] cursor-pointer transition-colors duration-200 hover:border-[#00ff5e88] hover:bg-[#00ff5e14] hover:font-bold hover:text-white xs:text-xs xs:tracking-[0.28em] sm:text-sm"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
