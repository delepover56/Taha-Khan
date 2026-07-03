import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  fadeUp,
  hoverGlow,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/animations/motionPresets";
import ContactInfoCard from "@/components/contact/ContactInfoCard";
import { GradientText, SpotlightCard, StarBorder } from "@/components/reactbits";
import contactData from "@/data/contactData.json";
import { useAppLoader } from "@/context/loaderContext";

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

const renderSegments = (segments) =>
  segments.map((segment, index) =>
    segment.highlight ? (
      <GradientText key={`${segment.text}-${index}`}>{segment.text}</GradientText>
    ) : (
      <span key={`${segment.text}-${index}`}>{segment.text}</span>
    )
  );

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
  const { markRouteReady } = useAppLoader();
  const [emailStatus, setEmailStatus] = useState({ type: "", message: "" });
  const [formStartedAt, setFormStartedAt] = useState(getTimestamp);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = staggerContainer(shouldReduceMotion, 0.05, 0.08);
  const itemVariants = staggerItem(shouldReduceMotion);
  const initialState = shouldReduceMotion ? "show" : "hidden";

  useEffect(() => {
    markRouteReady();
  }, [markRouteReady]);

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
      className="flex w-full min-w-0 flex-col gap-6 sm:gap-8"
    >
      <motion.div
        variants={itemVariants}
        className="relative min-w-0 overflow-hidden rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-5 shadow-[0_18px_42px_rgba(0,0,0,0.44)] backdrop-blur-xl xxs:p-6 sm:p-7 lg:p-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-[#00ff5e88] to-transparent"
        />
        <div className="relative z-10 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-4xl">
            <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
              {contactData.intro.eyebrow}
            </p>
            <motion.h1
              variants={fadeUp(shouldReduceMotion)}
              className="merienda type-h1 mt-2 text-white"
            >
              {renderSegments(contactData.intro.titleSegments)}
            </motion.h1>
            <motion.span
              variants={fadeUp(shouldReduceMotion)}
              className="mt-3 block h-[2px] w-16 origin-left rounded-full bg-[#00ff5e55]"
            />
            <p className="poppins type-body mt-5 max-w-3xl leading-relaxed text-[#c7ffd8]">
              {contactData.intro.summary}
            </p>
          </div>
          <div className="poppins type-body-sm w-fit max-w-full rounded-2xl border border-[#00ff5e3a] bg-[#06180f] px-4 py-3 text-[#9fffbf] shadow-[0_0_22px_rgba(0,255,94,0.08)]">
            {contactData.intro.availability}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="flex min-w-0 flex-wrap gap-4"
        aria-label="Quick contact links"
      >
        {contactData.quickContactCards.map((item) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            className="min-w-0 basis-full shrink-0 sm:basis-[calc(50%_-_0.5rem)] xl:basis-[calc(25%_-_0.75rem)]"
          >
            <ContactInfoCard {...item} />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex min-w-0 flex-col gap-6 xl:flex-row xl:gap-8">
        <motion.div
          variants={itemVariants}
          className="min-w-0 xl:flex-[1.28_1_0]"
        >
          <SpotlightCard className="p-0 shadow-[0_18px_42px_rgba(0,0,0,0.4)]">
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="flex min-w-0 flex-col gap-4 p-5 xs:p-6 lg:p-7"
            >
              <div className="mb-2">
                <p className="poppins type-caption uppercase tracking-[0.3em] text-[#7feaa0]">
                  {contactData.formIntro.eyebrow}
                </p>
                <h2 className="roboto-slab type-h3 mt-2 text-white">
                  {contactData.formIntro.title}
                </h2>
                <p className="poppins type-body-sm mt-2 max-w-2xl text-[#9fffbf]">
                  {contactData.formIntro.summary}
                </p>
              </div>

              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                {...register("company")}
              />

              <div className="flex flex-wrap gap-4">
                <div className="min-w-0 basis-full shrink-0 md:basis-[calc(50%_-_0.5rem)]">
                  <label className="sr-only" htmlFor="contact-name">
                    Full name
                  </label>
                  <motion.input
                    id="contact-name"
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
                    className="w-full rounded-xl border border-[#00ff5e2a] bg-[#06180f] px-4 py-3 text-[13px] text-white outline-none transition-all duration-300 placeholder:text-[#7feaa088] focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44] xs:text-sm"
                  />
                  {errors.name && (
                    <p role="alert" className="poppins mt-2 text-xs text-red-300">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="min-w-0 basis-full shrink-0 md:basis-[calc(50%_-_0.5rem)]">
                  <label className="sr-only" htmlFor="contact-email">
                    Email address
                  </label>
                  <motion.input
                    id="contact-email"
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
                    className="w-full rounded-xl border border-[#00ff5e2a] bg-[#06180f] px-4 py-3 text-[13px] text-white outline-none transition-all duration-300 placeholder:text-[#7feaa088] focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44] xs:text-sm"
                  />
                  {errors.email && (
                    <p role="alert" className="poppins mt-2 text-xs text-red-300">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="min-w-0 basis-full shrink-0 md:basis-[calc(50%_-_0.5rem)]">
                  <label className="sr-only" htmlFor="contact-phone">
                    Phone number
                  </label>
                  <motion.input
                    id="contact-phone"
                    type="text"
                    whileFocus={hoverGlow(shouldReduceMotion)}
                    {...phoneField}
                    onChange={(event) => {
                      phoneField.onChange(event);
                      handleFieldChange();
                    }}
                    aria-invalid={errors.phone ? "true" : "false"}
                    placeholder="Phone number"
                    className="w-full rounded-xl border border-[#00ff5e2a] bg-[#06180f] px-4 py-3 text-[13px] text-white outline-none transition-all duration-300 placeholder:text-[#7feaa088] focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44] xs:text-sm"
                  />
                  {errors.phone && (
                    <p role="alert" className="poppins mt-2 text-xs text-red-300">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="min-w-0 basis-full shrink-0 md:basis-[calc(50%_-_0.5rem)]">
                  <label className="sr-only" htmlFor="contact-subject">
                    Project purpose
                  </label>
                  <motion.input
                    id="contact-subject"
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
                    className="w-full rounded-xl border border-[#00ff5e2a] bg-[#06180f] px-4 py-3 text-[13px] text-white outline-none transition-all duration-300 placeholder:text-[#7feaa088] focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44] xs:text-sm"
                  />
                  {errors.subject && (
                    <p role="alert" className="poppins mt-2 text-xs text-red-300">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="contact-message">
                  Tell me about the project
                </label>
                <motion.textarea
                  id="contact-message"
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
                  className="w-full resize-none rounded-xl border border-[#00ff5e2a] bg-[#06180f] px-4 py-3 text-[13px] text-white outline-none transition-all duration-300 placeholder:text-[#7feaa088] focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44] xs:text-sm"
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
                    className="poppins rounded-xl border border-[#00ff5e33] bg-[#00ff5e10] px-4 py-3 text-sm text-[#00ff5e]"
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
                    className="poppins rounded-xl border border-red-300/25 bg-red-300/10 px-4 py-3 text-sm text-red-300"
                  >
                    {emailStatus.message}
                  </motion.p>
                )}
              </AnimatePresence>

              <StarBorder
                type="submit"
                disabled={isSubmitting}
                className="poppins-semibold w-full cursor-pointer justify-center text-[11px] uppercase tracking-[0.24em] hover:text-white disabled:cursor-not-allowed disabled:opacity-60 xs:text-xs xs:tracking-[0.28em] sm:w-fit sm:text-sm"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </StarBorder>
            </motion.form>
          </SpotlightCard>
        </motion.div>

        <motion.aside
          variants={containerVariants}
          className="flex min-w-0 flex-wrap gap-4 xl:min-w-[280px] xl:flex-[0.72_1_0]"
          aria-label="Contact expectations"
        >
          {contactData.detailCards.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="min-w-0 basis-full shrink-0 sm:basis-[calc(50%_-_0.5rem)] xl:basis-full"
            >
              <ContactInfoCard {...item} />
            </motion.div>
          ))}
        </motion.aside>
      </div>

      <motion.div
        variants={itemVariants}
        className="flex min-w-0 flex-col gap-4 rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-5 shadow-[0_16px_34px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-6"
      >
        <div>
          <p className="poppins type-caption uppercase tracking-[0.3em] text-[#7feaa0]">
            {contactData.ctaStrip.eyebrow}
          </p>
          <p className="poppins type-body-sm mt-2 max-w-2xl text-[#c7ffd8]">
            {contactData.ctaStrip.text}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <StarBorder
            href={contactData.ctaStrip.email.href}
            aria-label={contactData.ctaStrip.email.ariaLabel}
            className="text-[10px] uppercase tracking-[0.24em] sm:text-xs"
          >
            {contactData.ctaStrip.email.label}
          </StarBorder>
          {contactData.ctaStrip.socialLinks.map((link) => (
            <StarBorder
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="poppins text-[10px] uppercase tracking-[0.24em] text-[#9fffbf] hover:text-white"
              contentClassName="px-4 py-3"
            >
              {link.label}
            </StarBorder>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
