import { useEffect, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { motion } from "framer-motion";
import Sparkle from "../common/Sparkle";
import { COLORS, FONT_DISPLAY, FONT_SCRIPT } from "../../constants/colors";
import { useLanguage } from "../../context/useLanguage";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useScrollDownReveal } from "../../hooks/useScrollDownReveal";
import { initReveals } from "../../lib/reveal";

// Sparkles on either side of the form — the same ones from the Hero/intro,
// here they fade in on scroll and then twinkle on their own (Sparkle
// already carries its own continuous animation via CSS).
const SIDE_SPARKLES = [
  { className: "left-[4%] top-[18%] w-5 h-5 md:w-7 md:h-7", size: 28, color: "goldLight", delay: 0 },
  { className: "left-[9%] top-[55%] w-4 h-4 md:w-5 md:h-5", size: 20, color: "turquoiseLight", delay: 0.9 },
  { className: "left-[3%] bottom-[12%] w-4 h-4", size: 18, color: "gold", delay: 1.6 },
  { className: "right-[4%] top-[22%] w-5 h-5 md:w-7 md:h-7", size: 28, color: "turquoiseLight", delay: 0.4 },
  { className: "right-[8%] top-[58%] w-4 h-4 md:w-6 md:h-6", size: 22, color: "goldLight", delay: 1.2 },
  { className: "right-[3%] bottom-[15%] w-4 h-4", size: 18, color: "gold", delay: 1.9 },
];

const WEB3FORMS_ACCESS_KEY = "db4caf89-52ec-48b0-bdd4-f1b109841649";
// Public Web3Forms sitekey for the free hCaptcha plan (not a secret,
// Web3Forms documents it as such). On a paid plan this gets replaced
// with a dedicated sitekey.
const HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

const FIELDS = ["name", "email", "phone", "message"];

/**
 * Validates a form field and returns the corresponding translated error
 * message, or "" if the value is valid.
 */
function validateField(field, rawValue, t) {
  const value = rawValue.trim();
  const errors = t.contact.errors;

  switch (field) {
    case "name":
      if (!value) return errors.nameRequired;
      if (value.length < 2) return errors.nameInvalid;
      return "";

    case "email":
      if (!value) return errors.emailRequired;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return errors.emailInvalid;
      return "";

    case "phone": {
      if (!value) return errors.phoneRequired;
      const hasOnlyValidChars = /^[+]?[\d\s().-]+$/.test(value);
      const digitCount = value.replace(/\D/g, "").length;
      if (!hasOnlyValidChars || digitCount < 7 || digitCount > 15) {
        return errors.phoneInvalid;
      }
      return "";
    }

    case "message":
      if (!value) return errors.messageRequired;
      if (value.length < 10) return errors.messageTooShort;
      return "";

    default:
      return "";
  }
}

const emptyState = { name: "", email: "", phone: "", message: "" };

export default function Contacto() {
  const { t } = useLanguage();
  const prefersReducedMotion = usePrefersReducedMotion();
  // idle | invalid | sending | success | error
  const [formStatus, setFormStatus] = useState("idle");
  const [errors, setErrors] = useState(emptyState);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [captchaError, setCaptchaError] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });
  const captchaRef = useRef(null);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isSending = formStatus === "sending";

  // "Bottom to top" via GSAP + ScrollTrigger through src/lib/reveal.js
  // (same generic data-attributes as Services.jsx): the form block enters
  // from below as soon as the section is reached.
  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const cleanup = initReveals(sectionRef.current);
    return cleanup;
  }, [prefersReducedMotion]);

  // The section starts cream; on scroll down, a pine curtain sweeps in
  // left to right and settles covering the whole section — the same
  // pine look it always had. Same `clip-path` technique and the same
  // 1400ms timing as Services.jsx's curtain (just a horizontal sweep
  // instead of vertical), so the two read as one consistent effect while
  // scrolling through the page. Scroll-down-only and one-way, via
  // useScrollDownReveal: scrolling back up never re-hides it once it has
  // dropped, and it never triggers early just by scrolling up into view.
  // Reduced motion skips straight to the pine end state.
  const scrollRevealed = useScrollDownReveal(sectionRef, { amount: 0.35 });
  const revealed = prefersReducedMotion || scrollRevealed;
  const textColor = revealed ? COLORS.cream : COLORS.pine;
  const eyebrowColor = revealed ? COLORS.goldLight : COLORS.goldText;
  const textTransitionClass = prefersReducedMotion
    ? ""
    : "transition-colors duration-[1400ms] ease-in-out";
  const curtainTransitionClass = prefersReducedMotion
    ? ""
    : "transition-[clip-path] duration-[1400ms] ease-in-out";

  function handleBlur(field) {
    return (event) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, event.target.value, t),
      }));
    };
  }

  function handleChange(field) {
    return (event) => {
      // Only revalidate live once the field has already been touched, so
      // we don't flag an error while the person is still typing.
      setErrors((prev) =>
        touched[field]
          ? { ...prev, [field]: validateField(field, event.target.value, t) }
          : prev,
      );
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    const nextErrors = {};
    let firstInvalidField = null;
    FIELDS.forEach((field) => {
      const value = form.elements.namedItem(field)?.value ?? "";
      const error = validateField(field, value, t);
      nextErrors[field] = error;
      if (error && !firstInvalidField) firstInvalidField = field;
    });

    setErrors(nextErrors);
    setTouched({ name: true, email: true, phone: true, message: true });

    if (firstInvalidField) {
      setFormStatus("invalid");
      form.elements.namedItem(firstInvalidField)?.focus();
      return;
    }

    // The form has hCaptcha enabled on Web3Forms: without a valid token,
    // the API rejects it ("hCaptcha Token is mandatory for this form").
    // The token arrives via the onVerify callback of the
    // @hcaptcha/react-hcaptcha widget, not as a DOM <form> field.
    if (!captchaToken) {
      setCaptchaError(t.contact.errors.captchaRequired);
      setFormStatus("invalid");
      return;
    }
    setCaptchaError("");

    setFormStatus("sending");
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("h-captcha-response", captchaToken);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setFormStatus("success");
        form.reset();
        setErrors(emptyState);
        setCaptchaError("");
        setTouched({ name: false, email: false, phone: false, message: false });
        // The hCaptcha token is single-use; reset the widget so it's
        // ready if the person wants to send another message.
        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);
      } else {
        // Web3Forms sends a useful message in `data.message` (e.g.
        // invalid key, submission limit, etc). We log it to the console
        // so we can debug without exposing internal details in the UI.
        console.error("Web3Forms submission failed:", data);
        setFormStatus("error");
        // The token was already used (or got rejected); the captcha
        // needs to be solved again before retrying.
        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);
      }
    } catch (err) {
      console.error("Web3Forms network/request error:", err);
      setFormStatus("error");
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
    }
  }

  const statusMessage =
    formStatus === "sending"
      ? t.contact.sending
      : formStatus === "success"
        ? t.contact.success
        : formStatus === "error"
          ? t.contact.error
          : formStatus === "invalid"
            ? captchaError || t.contact.errors.formInvalid
            : "";

  const fieldStyle = (field) => ({
    borderColor: errors[field]
      ? COLORS.errorLight
      : revealed
        ? "rgba(247,234,214,0.35)"
        : "rgba(18,59,55,0.35)",
    color: textColor,
    outlineColor: COLORS.goldLight,
  });

  const inputClassName =
    "mws-input w-full rounded-lg px-4 py-3 text-base bg-transparent border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 md:py-28"
      style={{ background: COLORS.cream }}
    >
      {/* Pine curtain layer: clipped left to right (same 1400ms timing
          as Services.jsx's top-to-bottom one, just a horizontal sweep
          instead). `revealed` false -> collapsed to nothing at the left
          edge (cream showing); true -> fully open, covering the section
          like a curtain sliding in from the left. The insets go just
          past 0%/100% (100.5%/-0.5%) instead of landing exactly on them
          — right on 100% some browsers round the "fully collapsed"
          clip region to a hairline of visible pine at the edge instead
          of truly zero width, which showed up as a thin green line. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${curtainTransitionClass}`}
        style={{
          background: COLORS.pine,
          clipPath: revealed ? "inset(0 -0.5% 0 -0.5%)" : "inset(0 100.5% 0 -0.5%)",
        }}
      />

      {!prefersReducedMotion &&
        SIDE_SPARKLES.map((s, i) => (
          <motion.div
            key={i}
            className={`absolute z-0 ${s.className}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.8, delay: 0.15 * i }}
          >
            <Sparkle size={s.size} color={COLORS[s.color]} delay={s.delay} />
          </motion.div>
        ))}

      <div
        ref={contentRef}
        data-reveal
        data-reveal-direction="down"
        className={`relative z-10 max-w-2xl mx-auto text-center ${textTransitionClass}`}
        style={{ color: textColor }}
      >
        <span
          className={`text-2xl md:text-3xl ${textTransitionClass}`}
          style={{ fontFamily: FONT_SCRIPT, color: eyebrowColor }}
        >
          {t.contact.eyebrow}
        </span>
        <h2
          className="text-3xl md:text-[2.5rem] leading-[1.15] mt-4"
          style={{ fontFamily: FONT_DISPLAY }}
        >
          {t.contact.title}
        </h2>
        <p className="mt-5 text-base opacity-80 max-w-md mx-auto">
          {t.contact.paragraph}
        </p>

        <form
          className="mt-10 text-left grid gap-4 max-w-md mx-auto"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Hidden fields for Web3Forms: email subject and an anti-spam
              honeypot (botcheck). The botcheck must arrive empty; bots
              that autofill every field fill it in, and Web3Forms
              discards the submission. */}
          <input type="hidden" name="subject" value="Nuevo mensaje desde misticawebstudio.com" />
          <input type="hidden" name="from_name" value="Mística Web Studio" />
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div>
            <label
              htmlFor="name"
              className="block text-xs uppercase tracking-[0.2em] mb-2 opacity-70"
            >
              {t.contact.nameLabel}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              placeholder={t.contact.namePlaceholder}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              onBlur={handleBlur("name")}
              onChange={handleChange("name")}
              className={inputClassName}
              style={fieldStyle("name")}
            />
            {errors.name && (
              <p
                id="name-error"
                role="alert"
                className="mt-1.5 text-xs"
                style={{ color: COLORS.errorLight }}
              >
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs uppercase tracking-[0.2em] mb-2 opacity-70"
            >
              {t.contact.emailLabel}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={t.contact.emailPlaceholder}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              onBlur={handleBlur("email")}
              onChange={handleChange("email")}
              className={inputClassName}
              style={fieldStyle("email")}
            />
            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="mt-1.5 text-xs"
                style={{ color: COLORS.errorLight }}
              >
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs uppercase tracking-[0.2em] mb-2 opacity-70"
            >
              {t.contact.phoneLabel}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              placeholder={t.contact.phonePlaceholder}
              aria-invalid={!!errors.phone}
              aria-describedby={
                errors.phone ? "phone-hint phone-error" : "phone-hint"
              }
              onBlur={handleBlur("phone")}
              onChange={handleChange("phone")}
              className={inputClassName}
              style={fieldStyle("phone")}
            />
            <p id="phone-hint" className="mt-1.5 text-xs opacity-60">
              {t.contact.phoneHint}
            </p>
            {errors.phone && (
              <p
                id="phone-error"
                role="alert"
                className="mt-1.5 text-xs"
                style={{ color: COLORS.errorLight }}
              >
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs uppercase tracking-[0.2em] mb-2 opacity-70"
            >
              {t.contact.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              required
              minLength={10}
              placeholder={t.contact.messagePlaceholder}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              onBlur={handleBlur("message")}
              onChange={handleChange("message")}
              className={`${inputClassName} resize-none`}
              style={fieldStyle("message")}
            />
            {errors.message && (
              <p
                id="message-error"
                role="alert"
                className="mt-1.5 text-xs"
                style={{ color: COLORS.errorLight }}
              >
                {errors.message}
              </p>
            )}
          </div>

          <div>
            {/* The form has hCaptcha enabled in the Web3Forms dashboard.
                We use the official React component (instead of the
                <div class="h-captcha"> + embedded script snippet)
                because that approach relies on scanning the DOM once on
                page load, and in an SPA the form doesn't exist yet at
                that point: the checkbox would never render. */}
            <HCaptcha
              ref={captchaRef}
              sitekey={HCAPTCHA_SITEKEY}
              theme="dark"
              reCaptchaCompat={false}
              onVerify={(token) => {
                setCaptchaToken(token);
                setCaptchaError("");
              }}
              onExpire={() => setCaptchaToken(null)}
              onError={() => {
                setCaptchaToken(null);
                console.error("hCaptcha failed to load or verify.");
              }}
            />
            {captchaError && (
              <p
                role="alert"
                className="mt-1.5 text-xs"
                style={{ color: COLORS.errorLight }}
              >
                {captchaError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="mws-submit mt-2 rounded-full px-8 py-4 font-medium text-[15px] tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: COLORS.gold,
              color: COLORS.pineDeep,
              outlineColor: COLORS.cream,
            }}
          >
            {isSending ? t.contact.sending : t.contact.submit}
          </button>
          <p
            role="status"
            aria-live="polite"
            className="text-sm min-h-5"
            style={{
              color:
                formStatus === "error" || formStatus === "invalid"
                  ? COLORS.errorLight
                  : COLORS.goldLight,
            }}
          >
            {statusMessage}
          </p>
        </form>
      </div>
    </section>
  );
}
