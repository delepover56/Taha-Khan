import { memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  fadeUp,
  hoverGlow,
  slideRight,
  staggerContainer,
  staggerItem,
} from "@/animations/motionPresets";
import ProfileCard from "@/components/reactbits/ProfileCard/ProfileCard";
import { StarBorder } from "@/components/reactbits";
import sideInfoBox from "@/data/sideInfoBox.json";

const ICON_MAP = {
  phone: (
    <>
      <path d="M16.75 2h-10c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm-10 18V4h10l.002 16H6.75z"></path>
      <circle cx="11.75" cy="18" r="1"></circle>
    </>
  ),
  email: (
    <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path>
  ),
  location: (
    <>
      <path d="M12 14c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z"></path>
      <path d="M11.42 21.814a.998.998 0 0 0 1.16 0C12.884 21.599 20.029 16.44 20 10c0-4.411-3.589-8-8-8S4 5.589 4 9.995c-.029 6.445 7.116 11.604 7.42 11.819zM12 4c3.309 0 6 2.691 6 6.005.021 4.438-4.388 8.423-6 9.73-1.611-1.308-6.021-5.294-6-9.735 0-3.309 2.691-6 6-6z"></path>
    </>
  ),
  birthday: (
    <path d="M19 5h-6V2h-2v3H5C3.346 5 2 6.346 2 8v10c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.654-1.346-3-3-3zM5 7h14a1 1 0 0 1 1 1l.001 3.12c-.896.228-1.469.734-1.916 1.132-.507.45-.842.748-1.588.748-.745 0-1.08-.298-1.587-.747-.595-.529-1.409-1.253-2.915-1.253-1.505 0-2.319.724-2.914 1.253-.507.45-.841.747-1.586.747-.743 0-1.077-.297-1.582-.747-.447-.398-1.018-.905-1.913-1.133V8a1 1 0 0 1 1-1zM4 18v-4.714c.191.123.374.274.583.461C5.178 14.276 5.991 15 7.495 15c1.505 0 2.319-.724 2.914-1.253.507-.45.841-.747 1.586-.747s1.08.298 1.587.747c.595.529 1.409 1.253 2.915 1.253s2.321-.724 2.916-1.253c.211-.188.395-.34.588-.464L20.002 18H4z"></path>
  ),
  instagram: (
    <>
      <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
      <circle cx="16.806" cy="7.207" r="1.078"></circle>
      <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
    </>
  ),
  github: (
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.168c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.204.084 1.837 1.236 1.837 1.236 1.07 1.832 2.809 1.302 3.495.995.108-.774.418-1.302.76-1.602-2.665-.305-5.467-1.333-5.467-5.932 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.007-.322 3.3 1.231a11.49 11.49 0 0 1 3.005-.404c1.02.005 2.046.138 3.005.404 2.29-1.553 3.295-1.231 3.295-1.231.656 1.653.244 2.873.12 3.176.77.84 1.232 1.91 1.232 3.22 0 4.609-2.807 5.624-5.479 5.92.43.372.814 1.1.814 2.216v3.285c0 .32.216.694.824.577C20.565 21.796 24 17.303 24 12 24 5.373 18.627 0 12 0z" />
  ),
  linkedin: (
    <>
      <circle cx="4.983" cy="5.009" r="2.188"></circle>
      <path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"></path>
    </>
  ),
  whatsapp: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"
    ></path>
  ),
};

const SOCIAL_HOVER_CLASSES = {
  instagram:
    "hover:border-transparent hover:bg-gradient-to-br hover:from-[#405de6] hover:via-[#e1306c] hover:to-[#ffdc80] hover:shadow-[0_0_18px_rgba(225,48,108,0.28)]",
  github:
    "hover:border-white/30 hover:bg-gradient-to-br hover:from-[#0f172a] hover:via-[#1e293b] hover:to-[#334155] hover:shadow-[0_0_18px_rgba(51,65,85,0.34)]",
  linkedin:
    "hover:border-transparent hover:bg-gradient-to-br hover:from-[#0a66c2] hover:via-[#0ea5e9] hover:to-[#38bdf8] hover:shadow-[0_0_18px_rgba(14,165,233,0.28)]",
  whatsapp:
    "hover:border-transparent hover:bg-gradient-to-br hover:from-[#22c55e] hover:via-[#16a34a] hover:to-[#86efac] hover:shadow-[0_0_18px_rgba(34,197,94,0.28)]",
};

const MyInfo = () => {
  const shouldReduceMotion = useReducedMotion();
  const panelVariants = slideRight(shouldReduceMotion);
  const listVariants = staggerContainer(shouldReduceMotion, 0.05, 0.06);
  const itemVariants = staggerItem(shouldReduceMotion);
  const initialState = shouldReduceMotion ? "show" : "hidden";

  return (
    <motion.aside
      variants={panelVariants}
      initial={initialState}
      animate="show"
      className="min-w-0 w-full max-w-full lg:sticky lg:top-10"
    >
      <motion.div
        variants={fadeUp(shouldReduceMotion)}
        className="min-w-0 w-full max-w-full"
      >
        <ProfileCard
          avatar={
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-[#00ff5e55] bg-[#06180f] shadow-[0_0_24px_rgba(0,255,94,0.12)] xxs:h-22 xxs:w-22 sm:h-24 sm:w-24">
              <img
                src={sideInfoBox.profile.avatarSrc}
                alt={sideInfoBox.profile.avatarAlt}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#00ff5e33]" />
            </div>
          }
          name={sideInfoBox.profile.name}
          role={sideInfoBox.profile.role}
          status={
            <div className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full border border-[#00ff5e2e] bg-[#07180f] px-3 py-1 sm:py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#00ff5e] shadow-[0_0_8px_rgba(0,255,94,0.6)] animate-[glowPulse_2.8s_ease-in-out_infinite]" />
              <span className="poppins type-caption capitalize tracking-[0.28em] text-[#9fffbf]">
                {sideInfoBox.profile.statusText}
              </span>
            </div>
          }
          actions={
            <>
              <div className="flex flex-wrap items-center gap-3 sm:w-max self-center md:self-start">
                {sideInfoBox.socialLinks.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={hoverGlow(shouldReduceMotion)}
                    className={[
                      "group flex h-10 w-10 items-center justify-center rounded-xl border border-[#00ff5e26] bg-[#06180f] bg-clip-padding shadow-[0_8px_18px_rgba(0,0,0,0.4)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff5e66] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a08] xs:h-11 xs:w-11",
                      SOCIAL_HOVER_CLASSES[item.iconKey] ??
                      "hover:border-transparent hover:bg-gradient-to-br hover:from-[#06180f] hover:via-[#00ff5e33] hover:to-[#00ff5e66]",
                    ].join(" ")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#9fffbf"
                      className="h-4 w-4 transition-colors duration-200 group-hover:fill-white xs:h-5 xs:w-5"
                    >
                      {ICON_MAP[item.iconKey]}
                    </svg>
                    <span className="sr-only">{item.label}</span>
                  </motion.a>
                ))}
              </div>

              <StarBorder
                href={sideInfoBox.profile.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="poppins-semibold w-max md:w-full sm:w-max self-center justify-center text-center text-[11px] uppercase tracking-[0.24em] shadow-[0_0_22px_rgba(0,255,94,0.14)] hover:text-white xs:text-xs xs:tracking-[0.28em] sm:text-sm"
              >
                {sideInfoBox.profile.resumeLabel}
              </StarBorder>
            </>
          }
        >
          <div className="rounded-2xl border border-[#00ff5e1f] bg-[#07130d] p-4">
            <p className="poppins type-body leading-relaxed text-[#c7ffd8]">
              {sideInfoBox.profile.intro}
            </p>
          </div>

          <div className="flex max-w-full flex-wrap gap-2">
            {sideInfoBox.stackItems.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#00ff5e2f] bg-[#06180f] px-3 py-1.5 text-[9px] uppercase tracking-[0.24em] text-[#9fffbf] transition-colors duration-200 hover:border-[#00ff5e88] hover:bg-[#00ff5e14] hover:text-white xxs:text-[10px]"
              >
                {item}
              </span>
            ))}
          </div>

          <motion.div
            variants={listVariants}
            initial={initialState}
            animate="show"
            className="grid min-w-0 gap-3"
          >
            {sideInfoBox.contactItems.map((item) => {
              const isEmail = item.label === "Email";

              return (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  whileHover={hoverGlow(shouldReduceMotion)}
                  className="group flex min-w-0 max-w-full items-center gap-3 overflow-hidden rounded-2xl border border-[#00ff5e24] bg-[#08130d] p-3.5 transition-colors duration-200 hover:border-[#00ff5e88] hover:bg-[#00ff5e12] xs:gap-4 xs:p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#00ff5e1f] bg-[#06180f] transition-colors duration-200 group-hover:border-[#00ff5e66] group-hover:bg-[#00ff5e14] xs:h-11 xs:w-11">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#00ff5e"
                      className="h-5 w-5 transition-colors duration-200 group-hover:fill-white xs:h-[22px] xs:w-[22px]"
                    >
                      {ICON_MAP[item.iconKey]}
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="poppins type-caption uppercase tracking-[0.28em] text-[#7feaa0]">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className={[
                          "poppins-semibold type-body-sm text-white hover:text-[#00ff5e] xxs:text-[11px] xs:text-[13px]",
                          isEmail
                            ? "break-all text-[12px] xs:text-[13px] sm:text-sm lg:whitespace-nowrap lg:break-normal lg:text-[13px] xl:text-sm"
                            : "break-words",
                        ].join(" ")}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="poppins-semibold type-body-sm break-words text-white xxs:text-[11px]">
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </ProfileCard>
      </motion.div>
    </motion.aside>
  );
};

export default memo(MyInfo);
