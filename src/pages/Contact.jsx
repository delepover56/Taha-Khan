import { useForm } from "react-hook-form";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [emailStatus, setEmailStatus] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        "service_6vy2z4m",
        "template_qtaiccb",
        data,
        "HFW-a6QjiVhvMlD8Q"
      );
      setEmailStatus("success");
      reset();
    } catch (error) {
      setEmailStatus("error");
    }
  };

  return (
    <section className="flex w-full flex-col gap-10">
      <div className="rounded-3xl border border-[#00ff5e22] bg-[#0a120db8] p-7 backdrop-blur-xl shadow-[0_16px_34px_rgba(0,0,0,0.45)] sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="poppins text-[10px] uppercase tracking-[0.35em] text-[#7feaa0]">
              Contact
            </p>
            <h1 className="merienda mt-2 text-3xl text-white lg:text-4xl">
              Let's build together
            </h1>
          </div>
          <div className="rounded-2xl border border-[#00ff5e2a] bg-[#06180f] px-4 py-3 text-sm text-[#9fffbf]">
            Open to internships and freelance work.
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-6">
            <p className="poppins text-sm leading-relaxed text-[#c7ffd8] sm:text-base">
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
                  className="rounded-2xl border border-[#00ff5e1f] bg-[#0b140d] p-4"
                >
                  <p className="poppins text-[10px] uppercase tracking-[0.3em] text-[#7feaa0]">
                    {item.title}
                  </p>
                  <p className="poppins mt-2 text-sm text-white">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[#00ff5e1f] bg-[#0b140d] p-5">
              <p className="poppins text-[10px] uppercase tracking-[0.3em] text-[#7feaa0]">
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
                    className="rounded-full border border-[#00ff5e26] bg-[#06180f] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#9fffbf] transition-all duration-300 hover:border-[#00ff5e66] hover:bg-[#00ff5e12] hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 rounded-2xl border border-[#00ff5e1f] bg-[#0b140d] p-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Name can only contain letters",
                    },
                  })}
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(
                      /[^A-Za-z\s]/g,
                      ""
                    );
                  }}
                  placeholder="Full name"
                  className="w-full rounded-xl border border-[#00ff5e2a] bg-transparent px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44]"
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
                  })}
                  placeholder="Email address"
                  className="w-full rounded-xl border border-[#00ff5e2a] bg-transparent px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44]"
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
                    validate: (value) =>
                      value.replace(/\D/g, "").length >= 7
                        ? true
                        : "Phone must be at least 7 digits",
                  })}
                  placeholder="Phone number"
                  className="w-full rounded-xl border border-[#00ff5e2a] bg-transparent px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44]"
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
                  {...register("subject", { required: "Purpose is required" })}
                  placeholder="Project purpose"
                  className="w-full rounded-xl border border-[#00ff5e2a] bg-transparent px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44]"
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
                {...register("message", { required: "Message is required" })}
                className="w-full resize-none rounded-xl border border-[#00ff5e2a] bg-transparent px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#00ff5e] focus:ring-2 focus:ring-[#00ff5e44]"
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
              className="rounded-2xl border border-[#00ff5e66] bg-[#06180f] px-6 py-3 text-sm uppercase tracking-[0.28em] text-[#00ff5e] transition-all duration-300 hover:border-[#00ff5e] hover:bg-[#00ff5e] hover:text-[#06210f] hover:shadow-[0_0_26px_rgba(0,255,94,0.35)]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
