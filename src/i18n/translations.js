/**
 * Diccionarios de traducción del sitio.
 * Idioma por defecto: inglés ("en"). El usuario puede cambiar a español ("es")
 * desde el switch de idioma en el header (ver src/context/LanguageContext.jsx).
 */

export const LANGUAGES = ["en", "es"];
export const DEFAULT_LANGUAGE = "en";

export const translations = {
  en: {
    meta: {
      title: "Mística Web Studio — Brand, Web & SEO with Strategy and Soul",
      description:
        "Mística Web Studio: web design, development, accessibility and SEO with strategy and soul.",
    },
    skip: {
      toContent: "Skip to main content",
    },
    nav: {
      primaryLabel: "Main navigation",
      home: "Home",
      about: "About us",
      services: "Services",
      contact: "Contact",
      cta: "Book your session",
      ctaShort: "Book now",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      languageLabel: "Language",
    },
    hero: {
      eyebrow: "We are strategy with soul",
      titleLine1: "We transform your brand",
      titleConnector: "into",
      titleHighlight: "a universe",
      titleSuffix: "that sells",
      paragraph:
        "The magic of vision, the science of execution. Brand design, high-converting websites, and physical pieces that finally make your business feel completely yours.",
      ctaPrimary: "I want my brand diagnosis",
      ctaSecondary: "See services",
    },
    about: {
      eyebrow: "Who we are",
      titleLine1: "Two forces,",
      titleLine2: "one studio.",
      misticaWord: "Mística",
      misticaText:
        "is what happens before the code: the intuition that reads your audience, the accurate read of what your brand needs to say without saying it. It's the perspective that connects, that goes beyond the obvious.",
      webStudioWord: "Web Studio",
      webStudioText:
        "is the structure that holds that intuition: order, clear processes, and the technical capacity to build complete visual universes, from the logo to the last line of code.",
      closing:
        "No brand transforms through aesthetics alone, or strategy alone. We work at the exact point where both meet — and that's where your business starts to look like what it truly is.",
    },
    services: {
      eyebrow: "What we do",
      title: "One shared standard, from idea to code",
      items: [
        {
          title: "Web Design",
          items: ["Visual design consulting", "Site architecture"],
        },
        {
          title: "Web Development",
          items: [
            "Responsive development",
            "Web applications",
            "CMS integration and migration",
            "Third-party software integration",
            "Performance optimization",
            "Maintenance and support",
          ],
        },
        {
          title: "Web Accessibility",
          items: [
            "ADA and WCAG compliance",
            "Screen reader compatibility",
            "Interactive content compliance",
            "Keyboard navigation",
          ],
        },
        {
          title: "SEO & Performance",
          items: [
            "SEO optimization",
            "Site speed and performance",
            "Schema implementation",
            "Cookie compliance",
            "SSL certificates",
            "Google Tag Manager",
          ],
        },
        {
          title: "Technical Consulting & Infrastructure",
          items: [
            "CMS and tech stack selection",
            "Third-party software integrations",
            "Server requirements",
            "Security",
            "Infrastructure optimization",
          ],
        },
      ],
    },
    contact: {
      eyebrow: "Let's start something with soul",
      title: "Book your consulting session",
      paragraph:
        "Tell us about your business and we'll help you find the exact point where your strategy and your aesthetic connect.",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "youremail@example.com",
      phoneLabel: "Phone",
      phonePlaceholder: "+1 234 567 8900",
      phoneHint: "Include your country code, e.g. +1 234 567 8900.",
      messageLabel: "Tell us about your project",
      messagePlaceholder: "What does your brand need?",
      submit: "Send and book session",
      sending: "Sending...",
      success: "Thank you! We'll be in touch very soon.",
      error: "Something went wrong. Please try again or email us directly.",
      errors: {
        nameRequired: "Please enter your name.",
        nameInvalid: "Please enter your full name (at least 2 characters).",
        emailRequired: "Please enter your email address.",
        emailInvalid: "Please enter a valid email address.",
        phoneRequired: "Please enter your phone number.",
        phoneInvalid:
          "Please enter a valid phone number (7–15 digits; +, spaces and dashes are OK).",
        messageRequired: "Please tell us about your project.",
        messageTooShort:
          "Please add a few more details (at least 10 characters).",
        captchaRequired: "Please complete the captcha to continue.",
        formInvalid: "Please check the highlighted fields and try again.",
      },
    },
    footer: {
      tagline:
        "Strategy with soul. Brand design, websites, and physical pieces for businesses that want to look like what they truly are.",
      navHeading: "Navigation",
      contactHeading: "Contact",
      addressLine: "Mexico City, Mexico",
      rights: "© 2026 Mística Web Studio. All rights reserved.",
      motto: "The magic of vision, the science of execution.",
    },
  },

  es: {
    meta: {
      title: "Mística Web Studio — Marca, Web y SEO con Estrategia y Alma",
      description:
        "Mística Web Studio: diseño web, desarrollo, accesibilidad y SEO con estrategia y alma.",
    },
    skip: {
      toContent: "Saltar al contenido principal",
    },
    nav: {
      primaryLabel: "Navegación principal",
      home: "Inicio",
      about: "Quiénes somos",
      services: "Servicios",
      contact: "Contacto",
      cta: "Agenda tu sesión",
      ctaShort: "Agendar",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      languageLabel: "Idioma",
    },
    hero: {
      eyebrow: "Somos estrategia con alma",
      titleLine1: "Transformamos tu marca",
      titleConnector: "en",
      titleHighlight: "un universo",
      titleSuffix: "que vende",
      paragraph:
        "La magia de ver, la ciencia de ejecutar. Diseño de marca, sitios web de alta conversión y piezas físicas que hacen que tu negocio se sienta, por fin, completamente tuyo.",
      ctaPrimary: "Quiero mi diagnóstico de marca",
      ctaSecondary: "Ver servicios",
    },
    about: {
      eyebrow: "Quiénes somos",
      titleLine1: "Dos fuerzas,",
      titleLine2: "un mismo estudio.",
      misticaWord: "Mística",
      misticaText:
        "es lo que pasa antes del código: la intuición que lee a tu audiencia, la lectura certera de lo que tu marca necesita decir sin decirlo. Es la mirada que conecta, que va más allá de lo evidente.",
      webStudioWord: "Web Studio",
      webStudioText:
        "es la estructura que sostiene esa intuición: orden, procesos claros y la capacidad técnica de construir universos visuales completos, desde el logo hasta la última línea de código.",
      closing:
        "Ninguna marca se transforma solo con estética ni solo con estrategia. Nosotras trabajamos en ese punto exacto donde ambas se encuentran — y ahí es donde tu negocio empieza a verse como realmente es.",
    },
    services: {
      eyebrow: "Qué hacemos",
      title: "Un mismo criterio, de la idea al código",
      items: [
        {
          title: "Diseño Web",
          items: [
            "Visual design consulting",
            "Arquitectura del sitio (site architecture)",
          ],
        },
        {
          title: "Desarrollo Web",
          items: [
            "Desarrollo responsive",
            "Aplicaciones web",
            "Integración y migración de CMS",
            "Integración con software de terceros",
            "Optimización de rendimiento",
            "Mantenimiento y soporte",
          ],
        },
        {
          title: "Accesibilidad Web",
          items: [
            "Cumplimiento ADA y WCAG",
            "Compatibilidad con lectores de pantalla",
            "Cumplimiento en contenido interactivo",
            "Navegación por teclado",
          ],
        },
        {
          title: "SEO & Rendimiento",
          items: [
            "Optimización SEO",
            "Velocidad y rendimiento del sitio",
            "Implementación de schema",
            "Cumplimiento de cookies",
            "Certificados SSL",
            "Google Tag Manager",
          ],
        },
        {
          title: "Consultoría Técnica & Infraestructura",
          items: [
            "Selección de CMS y stack tecnológico",
            "Integraciones con software de terceros",
            "Requerimientos de servidor",
            "Seguridad",
            "Optimización de infraestructura",
          ],
        },
      ],
    },
    contact: {
      eyebrow: "Empecemos algo con alma",
      title: "Agenda tu sesión de consultoría",
      paragraph:
        "Cuéntanos sobre tu negocio y te ayudamos a encontrar el punto exacto donde tu estrategia y tu estética se conectan.",
      nameLabel: "Nombre",
      namePlaceholder: "Tu nombre",
      emailLabel: "Correo",
      emailPlaceholder: "tucorreo@ejemplo.com",
      phoneLabel: "Teléfono",
      phonePlaceholder: "+52 55 1234 5678",
      phoneHint: "Incluye tu código de país, ej. +52 55 1234 5678.",
      messageLabel: "Cuéntanos de tu proyecto",
      messagePlaceholder: "¿Qué necesita tu marca?",
      submit: "Enviar y agendar sesión",
      sending: "Enviando...",
      success: "¡Gracias! Te contactaremos muy pronto.",
      error: "Algo salió mal. Intenta de nuevo o escríbenos directamente.",
      errors: {
        nameRequired: "Por favor ingresa tu nombre.",
        nameInvalid: "Ingresa tu nombre completo (mínimo 2 caracteres).",
        emailRequired: "Por favor ingresa tu correo electrónico.",
        emailInvalid: "Ingresa un correo electrónico válido.",
        phoneRequired: "Por favor ingresa tu teléfono.",
        phoneInvalid:
          "Ingresa un teléfono válido (7–15 dígitos; se permiten +, espacios y guiones).",
        messageRequired: "Cuéntanos sobre tu proyecto.",
        messageTooShort: "Agrega un poco más de detalle (mínimo 10 caracteres).",
        captchaRequired: "Completa el captcha para continuar.",
        formInvalid: "Revisa los campos marcados e intenta de nuevo.",
      },
    },
    footer: {
      tagline:
        "Estrategia con alma. Diseño de marca, web y piezas físicas para negocios que quieren verse como realmente son.",
      navHeading: "Navegación",
      contactHeading: "Contacto",
      addressLine: "Ciudad de México, México",
      rights: "© 2026 Mística Web Studio. Todos los derechos reservados.",
      motto: "La magia de ver, la ciencia de ejecutar.",
    },
  },
};
