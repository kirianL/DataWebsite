export interface MetricItem {
  value: string;
  label: string;
}

export interface ActivationItem {
  id: string;
  title: string;
  description: string;
  icon: "journey" | "streams" | "package";
}

export interface ServiceCardItem {
  id: string;
  title: string;
  description: string;
  highlighted?: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface InsightPost {
  id: string;
  category: string;
  title: string;
  author: string;
  readTime: string;
  image: string;
  alt: string;
}

export interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export const SITE_CONTENT = {
  topBar: {
    announcements: [
      "Últimas noticias — la sincronización en tiempo real para comercios del GAM ya está activa.",
      "Últimas noticias — conectores nativos con SINPE Móvil, Hacienda y BigQuery sin duplicar datos.",
      "Últimas noticias — observabilidad de webhooks en menos de un segundo desde San José.",
    ],
    phone: "(+506) 2201 4890",
    address: "Avenida Escazú, San José, Costa Rica",
  },
  nav: {
    brand: "Customerup",
    links: [
      { label: "Nosotros", href: "#why-choose-us" },
      { label: "Plataforma", href: "#activation" },
      { label: "Servicios", href: "#services" },
      { label: "Perspectivas", href: "#insights" },
      { label: "FAQ", href: "#faq" },
    ],
    signIn: "Ingresar",
    cta: "Probar gratis",
  },
  hero: {
    title: "Conecta con tus clientes en Costa Rica usando datos propios.",
    subtitle:
      "Customerup te ayuda a crear recorridos personalizados desde San José para cada canal, con claridad, rapidez y control total sobre las señales de tu audiencia.",
    primaryCta: "Empezar ahora",
    secondaryCta: "Agendar demo",
    campaignCard: {
      title: "Última campaña de producto",
      subtitle:
        "Diseña, previsualiza y colabora en nuestra plataforma de activación hecha para equipos de datos en Costa Rica.",
      channels: [
        { name: "Correo", count: "3,424", percent: 86 },
        { name: "Push", count: "2,343", percent: 62 },
        { name: "En la app", count: "1,200", percent: 42 },
      ],
    },
    showreelLabel: "Ver demo (1:23)",
    image: "/images/hero-office.png",
    imageAlt: "Especialista en datos conversando por teléfono en una oficina luminosa en San José",
  },
  metricsSection: {
    kicker: "Escala, adapta e innova",
    lead: "Pensada para equipos en todo Costa Rica, nuestra plataforma reduce la carga operativa y asegura un retorno medible para empresas de cualquier tamaño.",
    metrics: [
      { value: "99.55%", label: "Disponibilidad de la plataforma" },
      { value: "34B+", label: "Mensajes enviados en 2024" },
      { value: "5.4B+", label: "Webhooks enviados en 2024" },
      { value: "24/5", label: "Soporte directo desde San José" },
    ] satisfies MetricItem[],
  },
  activationSection: {
    kicker: "Datos + activación",
    lead: "Gestiona y personaliza los mensajes a tus clientes en un solo lugar. Porque cuando nacen de datos propios, un mensaje vale más que un clic: construye confianza.",
    cards: [
      {
        id: "journey",
        title: "Recorrido de datos",
        description:
          "Crea y automatiza mensajes por correo, WhatsApp o app con total flexibilidad y reglas locales.",
        icon: "journey",
      },
      {
        id: "streams",
        title: "Flujos de datos",
        description:
          "Centraliza tus eventos de facturación electrónica de Hacienda, SINPE y web en tiempo real.",
        icon: "streams",
      },
      {
        id: "package",
        title: "Kit de integración",
        description:
          "Programa, prueba y despliega webhooks y plantillas junto a tu equipo técnico sin enredos.",
        icon: "package",
      },
    ] satisfies ActivationItem[],
  },
  whyChooseUs: {
    kicker: "Por qué elegirnos",
    title: "Ayudamos a las empresas ticas a crecer con estrategia",
    lead: "Un equipo de ingenieros y estrategas de datos en San José que convierte señales dispersas en decisiones claras para cada punto de contacto.",
    cta: "Solicitar cotización",
    portrait: "/images/strategist-portrait.png",
    portraitAlt: "Estratega principal de datos trabajando en un escritorio de madera en Escazú",
    alignedStrategy: {
      title: "Estrategia alineada",
      description:
        "Planes de datos diseñados a la medida de tu negocio, no plantillas genéricas.",
    },
    provenGrowth: {
      title: "Crecimiento comprobado",
      description:
        "Empresas en el GAM logran pipelines hasta 4X más sólidos con datos de primera mano.",
      bigStat: "4X",
      outerLabel: "Estimación 2026",
      outerValue: "$56.15B",
      innerLabel: "2025",
      innerValue: "$21.8B",
    },
    fasterExecution: {
      title: "Ejecución más rápida",
      description:
        "Salimos a producción en semanas, no en meses, para que veas resultados pronto.",
      phases: [
        { label: "Planificación", duration: "1 semana" },
        { label: "Ejecución", duration: "17 semanas" },
        { label: "Lanzamiento", duration: "0.2 semanas" },
      ],
    },
    pills: ["Práctico", "Transparente", "Escalable"],
    darkCardCopy:
      "Te ayudamos a destacar en cada canal con mensajes claros que de verdad conectan.",
  },
  splitChart: {
    kicker: "El problema",
    titleLine1: "Los stacks de datos fallan",
    titleLine2: "cuando crece la demanda",
    statValue: "2M+",
    statUnit: "eventos",
    statLabel: "Señales de clientes perdidas cada día entre silos",
    dipTitle: "Retraso al mediodía",
    dipLine1: "Las cargas por lotes se frenan",
    dipLine2: "justo cuando sube el tráfico",
    spikeTitle: "Pico en la noche",
    spikeLine1: "La demanda en tiempo real sube",
    spikeLine2: "al lanzar campañas de quincena",
    rightStatementLine1: "Este desfase provoca",
    rightStatementLine2: "disparadores tardíos, datos",
    rightStatementLine3: "viejos y ventas perdidas.",
    skylineImage: "/images/city-skyline-cutout.png",
    skylineAlt: "Horizonte urbano que ilustra la demanda de tráfico de día y de noche",
  },
  servicesSection: {
    kicker: "Qué hacemos",
    title: "Nuestros servicios",
    lead: "Ingeniería de datos y estrategia desde Costa Rica para construir infraestructura confiable para tu equipo y tus clientes.",
    officeImage: "/images/team-office.png",
    officeAlt: "Equipo de ingeniería de datos colaborando en estudio en San José",
    cards: [
      {
        id: "consulting",
        title: "Consultoría de crecimiento estratégico",
        description: "Atribución de primera mano, modelado de ciclo de vida y orquestación de canales.",
        highlighted: true,
      },
      {
        id: "identity",
        title: "Identidad del cliente y gobernanza",
        description: "Perfiles unificados, manejo de consentimiento y cumplimiento con la Ley 8968.",
      },
      {
        id: "product",
        title: "Telemetría web y de producto",
        description: "SDKs ligeros de eventos y sincronización en tiempo real con tu warehouse.",
      },
      {
        id: "automation",
        title: "Operaciones y automatización",
        description: "Webhooks automatizados, pruebas de QA y monitoreo de campañas al instante.",
      },
    ] satisfies ServiceCardItem[],
  },
  processSection: {
    kicker: "Llamada de diagnóstico",
    title: "Así trabajamos contigo",
    caseImage: "/images/case-study-team.png",
    caseImageAlt: "Dos especialistas de producto revisando métricas de campaña juntos",
    steps: [
      {
        number: "01",
        title: "Diagnóstico y metas",
        description:
          "Mapeamos tu esquema de eventos, cuellos de botella actuales y metas comerciales.",
      },
      {
        number: "02",
        title: "Arquitectura y auditoría",
        description:
          "Revisamos tu warehouse, integraciones con SINPE o ERP y canales para quitar pasos de más.",
      },
      {
        number: "03",
        title: "Despliegue y medición",
        description:
          "Activamos disparadores en vivo en pocas semanas con atribución clara y seguimiento por cohorte.",
      },
    ] satisfies ProcessStep[],
  },
  insightsSection: {
    kicker: "Perspectivas",
    title: "Ideas claras, estrategias probadas",
    cta: "Ver más",
    posts: [
      {
        id: "post-1",
        category: "Generación de demanda",
        title: "Por qué los datos propios son el canal más confiable para crecer en Costa Rica",
        author: "Sofía Mora",
        readTime: "5 min de lectura",
        image: "/images/insights-collab.png",
        alt: "Dos colegas conversando sobre estrategia de datos en una oficina luminosa",
      },
      {
        id: "post-2",
        category: "Activación de datos",
        title: "Cómo bajar a la mitad la latencia de webhooks en cobros y alertas en tiempo real",
        author: "Esteban Solís",
        readTime: "6 min de lectura",
        image: "/images/case-study-team.png",
        alt: "Ingenieros revisando tableros de telemetría en tiempo real",
      },
      {
        id: "post-3",
        category: "Ciclo de vida",
        title: "Perfiles unificados para ordenar la mensajería en comercios del GAM",
        author: "Valeria Quesada",
        readTime: "4 min de lectura",
        image: "/images/team-office.png",
        alt: "Equipo colaborando en la arquitectura de recorridos de clientes",
      },
    ] satisfies InsightPost[],
  },
  faqSection: {
    kicker: "Preguntas frecuentes",
    title: "Preguntas frecuentes",
    items: [
      {
        id: "faq-1",
        number: "01",
        question: "¿Trabajan con empresas en todo Costa Rica?",
        answer:
          "Sí. Atendemos desde San José a empresas B2B, fintechs, comercios y plataformas digitales en todo el país y Centroamérica.",
      },
      {
        id: "faq-2",
        number: "02",
        question: "¿En cuánto tiempo se ven resultados?",
        answer:
          "Las primeras conexiones de datos y disparadores clave quedan operando en dos semanas, con impacto medible entre 30 y 60 días.",
      },
      {
        id: "faq-3",
        number: "03",
        question: "¿Se integra con nuestro warehouse, SINPE o ERP actual?",
        answer:
          "Sí. Conectamos de forma nativa con Snowflake, BigQuery, Postgres, webhooks de pago y proveedores de correo sin duplicar pipelines.",
      },
      {
        id: "faq-4",
        number: "04",
        question: "¿Qué pasa si nuestro equipo de desarrollo es pequeño?",
        answer:
          "Nuestros SDKs requieren una configuración mínima y nuestro equipo de ingeniería en Escazú te acompaña en el mapeo de eventos.",
      },
      {
        id: "faq-5",
        number: "05",
        question: "¿Cómo miden el retorno de cada campaña?",
        answer:
          "Cada evento, correo y webhook se vincula en tiempo real con conversión por cohorte, retención y ventas atribuidas.",
      },
    ] satisfies FaqItem[],
  },
  footer: {
    brand: "Diseñado en Costa Rica — Customerup",
    email: "hola@customerup.cr",
  },
};
