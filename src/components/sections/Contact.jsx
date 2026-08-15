import { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import FadeUp from "../common/FadeUp";
import { COLORS, FONT_DISPLAY, FONT_SCRIPT } from "../../constants/colors";
import { useLanguage } from "../../context/useLanguage";

const WEB3FORMS_ACCESS_KEY = "db4caf89-52ec-48b0-bdd4-f1b109841649";
// Sitekey público de Web3Forms para el plan gratuito de hCaptcha (no es
// secreto, así lo documenta Web3Forms). En un plan de pago se reemplaza
// por un sitekey propio.
const HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

const FIELDS = ["name", "email", "phone", "message"];

/**
 * Valida un campo del formulario y regresa el mensaje de error traducido
 * correspondiente, o "" si el valor es válido.
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
  const isSending = formStatus === "sending";

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
      // Solo revalidamos en vivo una vez que el campo ya fue tocado, para
      // no marcar error mientras la persona todavía está escribiendo.
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

    // El formulario tiene hCaptcha activado en Web3Forms: sin un token
    // válido, la API lo rechaza ("hCaptcha Token is mandatory for this
    // form"). El token llega por el callback onVerify del widget de
    // @hcaptcha/react-hcaptcha, no como un campo del <form> del DOM.
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
        // El token de hCaptcha es de un solo uso; reseteamos el widget
        // para que quede listo si la persona quiere mandar otro mensaje.
        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);
      } else {
        // Web3Forms manda un mensaje útil en `data.message` (p. ej. clave
        // inválida, límite de envíos, etc). Lo dejamos en consola para
        // poder depurar sin exponer detalles internos en la UI.
        console.error("Web3Forms submission failed:", data);
        setFormStatus("error");
        // El token ya se usó (o fue rechazado); hay que resolver el
        // captcha de nuevo antes de reintentar.
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
    borderColor: errors[field] ? COLORS.errorLight : "rgba(247,234,214,0.35)",
    color: COLORS.cream,
    outlineColor: COLORS.goldLight,
  });

  const inputClassName =
    "mws-input w-full rounded-lg px-4 py-3 text-base bg-transparent border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  return (
    <section
      id="contacto"
      className="px-6 py-24 md:py-28"
      style={{ background: COLORS.pine, color: COLORS.cream }}
    >
      <FadeUp className="max-w-2xl mx-auto text-center">
        <span
          className="text-2xl md:text-3xl"
          style={{ fontFamily: FONT_SCRIPT, color: COLORS.goldLight }}
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
          {/* Campos ocultos para Web3Forms: asunto del correo y trampa
              anti-spam (botcheck). El botcheck debe llegar vacío; los bots
              que autocompletan todos los campos lo llenan y Web3Forms
              descarta el envío. */}
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
            {/* El formulario tiene hCaptcha activado en el dashboard de
                Web3Forms. Usamos el componente oficial de React (en vez
                del snippet <div class="h-captcha"> + script embebido) porque
                ese approach se basa en escanear el DOM una sola vez al
                cargar la página, y en una SPA el formulario todavía no
                existe en ese momento: el checkbox nunca se dibujaba. */}
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
      </FadeUp>
    </section>
  );
}
