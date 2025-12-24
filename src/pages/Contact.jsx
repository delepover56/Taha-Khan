import { useForm } from "react-hook-form";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [emailStatus, setEmailStatus] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const handleFieldChange = () => {
    if (emailStatus) setEmailStatus("");
  };

  const onSubmit = async (data) => {
    if (data.company?.trim()) {
      setEmailStatus("error");
      return;
    }

    try {
      const payload = { ...data };
      delete payload.company;

      await emailjs.send(
        "service_6vy2z4m",
        "template_qtaiccb",
        payload,
        "HFW-a6QjiVhvMlD8Q"
      );
      setEmailStatus("success");
      reset();
    } catch (error) {
      setEmailStatus("error");
    }
  };

  return (
    <section className="flex w-full flex-col gap-8 sm:gap-10">
      <div className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-5 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] xxs:p-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="poppins type-caption uppercase tracking-[0.35em] text-[#7feaa0]">
              Contact
            </p>
            <h1 className="merienda type-h1 mt-2 text-white">
              Let's build together
            </h1>
          </div>
          <div className="poppins type-body-sm rounded-2xl border border-[#00ff5e2a] bg-[#06180f] px-4 py-3 text-[#9fffbf]">
            Open to internships and freelance work.
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.1fr] xl:gap-8 md:mt-8">
          <div className="flex flex-col gap-6">
            <p className="poppins type-body leading-relaxed text-[#c7ffd8]">
              This portfolio is my first React.js project and the start of my
              transition from static HTML and WordPress to modern UI
              engineering. I am excited to collaborate on projects where I can
              learn, contribute, and ship high quality experiences.
            </p>

            <div className="grid gap-4">
              {[
                {
                  title: "Response time",
                  text: "Usually within 24 hours.",
                },
                {
                  title: "Preferred work",
                  text: "Front-end UI, landing pages, and dashboards.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#00ff5e1f] bg-[#0b140d] p-4 xs:p-5"
                >
                  <p className="poppins type-caption uppercase tracking-[0.3em] text-[#7feaa0]">
                    {item.title}
                  </p>
                  <p className="poppins type-body-sm mt-2 text-white">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[#00ff5e1f] bg-[#0b140d] p-5">
              <p className="poppins type-caption uppercase tracking-[0.3em] text-[#7feaa0]">
                Quick links
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {[
                  {
                    label: "Email",
                    href: "mailto:Taha82426980@gmail.com",
                  },
                  { label: "GitHub", href: "https://github.com/delepover56" },
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/taha-khan03/",
                  },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[#00ff5e26] bg-[#06180f] px-4 py-2 text-[9px] uppercase tracking-[0.28em] text-[#9fffbf] transition-all duration-300 hover:border-[#00ff5e66] hover:bg-[#00ff5e12] hover:text-white xxs:text-[10px]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form
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

            {Object.keys(errors).length > 0 && (
              <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
                <p className="poppins mb-1 text-xs uppercase tracking-[0.24em] text-red-300">
                  Please fix the highlighted fields
                </p>
                <ul className="poppins list-disc space-y-1 pl-5 text-xs text-red-200">
                  {Object.values(errors).map((err) => (
                    <li key={err?.message}>{err?.message}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 40,
                      message: "Name must be under 40 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Name can only contain letters",
                    },
                    setValueAs: (value) => value.trim(),
                  })}
                  onChange={handleFieldChange}
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(
                      /[^A-Za-z\s]/g,
                      ""
                    );
                  }}
                  placeholder="Full name"
                  className="w-full rounded-xl border border-[#00ff5e2a] bg-transparent px-4 py-3 text-[13px] text-white outline-none transition-all duration-300 focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44] xs:text-sm"
                />
                {errors.name && (
                  <p className="poppins mt-2 text-xs text-red-300">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                    setValueAs: (value) => value.trim().toLowerCase(),
                  })}
                  onChange={handleFieldChange}
                  placeholder="Email address"
                  className="w-full rounded-xl border border-[#00ff5e2a] bg-transparent px-4 py-3 text-[13px] text-white outline-none transition-all duration-300 focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44] xs:text-sm"
                />
                {errors.email && (
                  <p className="poppins mt-2 text-xs text-red-300">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <input
                  type="text"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[+()\s\d-]+$/,
                      message: "Phone can include numbers, spaces, +, and -",
                    },
                    validate: (value) =>
                      value.replace(/\D/g, "").length >= 7
                        ? true
                        : "Phone must be at least 7 digits",
                    setValueAs: (value) => value.trim(),
                  })}
                  onChange={handleFieldChange}
                  placeholder="Phone number"
                  className="w-full rounded-xl border border-[#00ff5e2a] bg-transparent px-4 py-3 text-[13px] text-white outline-none transition-all duration-300 focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44] xs:text-sm"
                />
                {errors.phone && (
                  <p className="poppins mt-2 text-xs text-red-300">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  {...register("subject", {
                    required: "Purpose is required",
                    minLength: {
                      value: 3,
                      message: "Purpose must be at least 3 characters",
                    },
                    maxLength: {
                      value: 80,
                      message: "Purpose must be under 80 characters",
                    },
                    pattern: {
                      value: /^[^<>]*$/,
                      message: "Purpose cannot include < or > characters",
                    },
                    setValueAs: (value) => value.trim(),
                  })}
                  onChange={handleFieldChange}
                  placeholder="Project purpose"
                  className="w-full rounded-xl border border-[#00ff5e2a] bg-transparent px-4 py-3 text-[13px] text-white outline-none transition-all duration-300 focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44] xs:text-sm"
                />
                {errors.subject && (
                  <p className="poppins mt-2 text-xs text-red-300">
                    {errors.subject.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <textarea
                rows="6"
                placeholder="Tell me about the project"
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 20,
                    message: "Message must be at least 20 characters",
                  },
                  maxLength: {
                    value: 1000,
                    message: "Message must be under 1000 characters",
                  },
                  pattern: {
                    value: /^[^<>]*$/,
                    message: "Message cannot include < or > characters",
                  },
                  setValueAs: (value) => value.trim(),
                })}
                onChange={handleFieldChange}
                className="w-full resize-none rounded-xl border border-[#00ff5e2a] bg-transparent px-4 py-3 text-[13px] text-white outline-none transition-all duration-300 focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44] xs:text-sm"
              />
              {errors.message && (
                <p className="poppins mt-2 text-xs text-red-300">
                  {errors.message.message}
                </p>
              )}
            </div>

            {emailStatus === "success" && (
              <p className="poppins text-sm text-[#00ff5e]">
                Your message was sent successfully.
              </p>
            )}
            {emailStatus === "error" && (
              <p className="poppins text-sm text-red-300">
                Failed to send message. Please try again later.
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-2xl border border-[#00ff5e66] bg-[#06180f] px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-[#00ff5e] cursor-pointer transition-color duration-300 hover:border-[#00ff5e] hover:bg-[#00ff5e] hover:font-bold hover:text-[#06210f] hover:shadow-[0_0_26px_rgba(0,255,94,0.35)] xs:text-xs xs:tracking-[0.28em] sm:text-sm"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
