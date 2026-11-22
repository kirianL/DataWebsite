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
    announcement: "Latest news — Real-time audience sync is now live on our platform.",
    phone: "(+12) 342 444 556",
    address: "80 Harrison Lane, FL 32547",
  },
  nav: {
    brand: "Customerup",
    links: [
      { label: "About us", href: "#why-choose-us" },
      { label: "Platform", href: "#activation" },
      { label: "Services", href: "#services" },
      { label: "Insights", href: "#insights" },
      { label: "FAQ", href: "#faq" },
    ],
    signIn: "Sign in",
    cta: "Start trial",
  },
  hero: {
    title: "Drive your customer engagement with first-party data.",
    subtitle:
      "Customerup helps you craft personalized journeys across every channel with clarity, speed, and full control over your audience signals.",
    primaryCta: "Get started",
    secondaryCta: "Book demo",
    campaignCard: {
      title: "Latest product campaign",
      subtitle:
        "Code, preview, and collaborate using the activation platform built for modern data teams.",
      channels: [
        { name: "Email", count: "3,424", percent: 86 },
        { name: "Push", count: "2,343", percent: 62 },
        { name: "In-app", count: "1,200", percent: 42 },
      ],
    },
    showreelLabel: "Watch our showreel (1:23)",
    image: "/images/hero-office.png",
    imageAlt: "Customer engagement specialist speaking on the phone in a sunlit modern office",
  },
  metricsSection: {
    kicker: "Scale, flex, and innovate",
    lead: "Designed for universal usability, our platform minimizes operational overhead, ensuring measurable ROI for brands of all sizes.",
    metrics: [
      { value: "99.55%", label: "Platform uptime" },
      { value: "34B+", label: "Messages sent in 2024" },
      { value: "5.4B+", label: "Webhooks sent in 2024" },
      { value: "24/5", label: "Global support coverage" },
    ] satisfies MetricItem[],
  },
  activationSection: {
    kicker: "Data + activation",
    lead: "Manage and tailor customer messages within one unified platform. Because when powered by first-party data, it is more than a message—it is a relationship.",
    cards: [
      {
        id: "journey",
        title: "Data journey",
        description:
          "Easily create and automate your messages with full flexibility and personalization options.",
        icon: "journey",
      },
      {
        id: "streams",
        title: "Data streams",
        description:
          "Gather and send your first-party data to all the tools you need to support steady growth.",
        icon: "streams",
      },
      {
        id: "package",
        title: "Package info",
        description:
          "Jump into coding, previewing, and teaming up on our email and webhook development platform.",
        icon: "package",
      },
    ] satisfies ActivationItem[],
  },
  whyChooseUs: {
    kicker: "Why choose us",
    title: "We help companies grow with strategies",
    lead: "A global team of data-first engineers and strategists building semantic relevancy and category signals across every touchpoint.",
    cta: "Get a quote",
    portrait: "/images/strategist-portrait.png",
    portraitAlt: "Lead data strategist sitting at a clean wooden desk in a bright studio",
    alignedStrategy: {
      title: "Aligned strategy",
      description:
        "Custom-built data plans designed around your goals, not generic templates.",
    },
    provenGrowth: {
      title: "Proven growth",
      description:
        "Clients see up to 4X stronger pipelines through consistent first-party strategies.",
      bigStat: "4X",
      outerLabel: "2026 estimation",
      outerValue: "$56.15B",
      innerLabel: "2025",
      innerValue: "$21.8B",
    },
    fasterExecution: {
      title: "Faster execution",
      description:
        "We launch campaigns in weeks, not months, so you start seeing results sooner.",
      phases: [
        { label: "Planning phase", duration: "1 week" },
        { label: "Execution phase", duration: "17 weeks" },
        { label: "Review & launch", duration: "0.2 weeks" },
      ],
    },
    pills: ["Practical", "Transparent", "Scalable"],
    darkCardCopy:
      "We help you stand out across every channel with messaging that actually connects.",
  },
  splitChart: {
    kicker: "Problem",
    titleLine1: "Data stacks break",
    titleLine2: "under their own scale",
    statValue: "2M+",
    statUnit: "events",
    statLabel: "Customer signals dropped daily across silos",
    dipTitle: "Midday lag",
    dipLine1: "Batch syncs stall",
    dipLine2: "while traffic climbs",
    spikeTitle: "Evening spike",
    spikeLine1: "Real-time demand surges",
    spikeLine2: "as campaigns launch",
    rightStatementLine1: "This mismatch creates",
    rightStatementLine2: "delayed triggers, stale",
    rightStatementLine3: "segments, and lost ROI.",
    skylineImage: "/images/city-skyline-cutout.png",
    skylineAlt: "Cutout city skyline illustrating daytime and evening traffic demand",
  },
  servicesSection: {
    kicker: "What we do",
    title: "Our services",
    lead: "A global team of data engineers and growth specialists crafting reliable infrastructure for both your stack and your customers.",
    officeImage: "/images/team-office.png",
    officeAlt: "Data engineering team collaborating inside a sunlit studio office",
    cards: [
      {
        id: "consulting",
        title: "Strategic growth consulting",
        description: "First-party attribution, lifecycle modeling, and channel orchestration.",
        highlighted: true,
      },
      {
        id: "identity",
        title: "Customer identity & data systems",
        description: "Unified profiles, consent governance, and deterministic matching.",
      },
      {
        id: "product",
        title: "Web & product telemetry",
        description: "Low-latency event SDKs and real-time warehouse sync.",
      },
      {
        id: "automation",
        title: "Operations & workflow automation",
        description: "Automated webhooks, QA pipelines, and campaign observability.",
      },
    ] satisfies ServiceCardItem[],
  },
  processSection: {
    kicker: "Strategy call",
    title: "Here is what to expect",
    caseImage: "/images/case-study-team.png",
    caseImageAlt: "Two product specialists reviewing campaign metrics together",
    steps: [
      {
        number: "01",
        title: "Discovery & goals",
        description:
          "We start by mapping your event schema, current bottlenecks, and revenue targets.",
      },
      {
        number: "02",
        title: "Architecture & audit",
        description:
          "We evaluate your warehouse, SDKs, and messaging channels to remove redundant hops.",
      },
      {
        number: "03",
        title: "Rollout & measurement",
        description:
          "We ship live triggers in weeks with clear attribution and weekly cohort reviews.",
      },
    ] satisfies ProcessStep[],
  },
  insightsSection: {
    kicker: "Insights",
    title: "Fresh ideas, proven strategies",
    cta: "View more",
    posts: [
      {
        id: "post-1",
        category: "Demand generation",
        title: "Why first-party data is your most reliable growth channel",
        author: "Xenin Leijon",
        readTime: "5 min read",
        image: "/images/insights-collab.png",
        alt: "Two colleagues discussing data strategy in a bright office",
      },
      {
        id: "post-2",
        category: "Data activation",
        title: "Cutting webhook latency in half for real-time product triggers",
        author: "Elena Vance",
        readTime: "6 min read",
        image: "/images/case-study-team.png",
        alt: "Engineers reviewing real-time telemetry dashboards",
      },
      {
        id: "post-3",
        category: "Lifecycle",
        title: "How unified customer profiles simplify multi-channel messaging",
        author: "Marcus Chen",
        readTime: "4 min read",
        image: "/images/team-office.png",
        alt: "Team collaborating on customer journey architecture",
      },
    ] satisfies InsightPost[],
  },
  faqSection: {
    kicker: "FAQ",
    title: "Frequently asked questions",
    items: [
      {
        id: "faq-1",
        number: "01",
        question: "Do you work with companies in my industry?",
        answer:
          "We specialize in B2B SaaS, fintech, e-commerce, and enterprise platforms with complex customer journeys and strict data governance needs.",
      },
      {
        id: "faq-2",
        number: "02",
        question: "How soon will I see results?",
        answer:
          "Initial data stream connections and core lifecycle triggers go live within the first two weeks, with measurable pipeline impact in 30 to 60 days.",
      },
      {
        id: "faq-3",
        number: "03",
        question: "Can you integrate with our existing data warehouse and tools?",
        answer:
          "Yes. Customerup connects natively with Snowflake, BigQuery, Postgres, and major email, push, and webhook providers without duplicating pipelines.",
      },
      {
        id: "faq-4",
        number: "04",
        question: "What if our engineering bandwidth is limited?",
        answer:
          "Our lightweight SDKs and pre-built connectors require minimal engineering setup, and our solutions team handles schema mapping with you.",
      },
      {
        id: "faq-5",
        number: "05",
        question: "How do you measure campaign and pipeline success?",
        answer:
          "Every event, message, and webhook is tied back to cohort conversion, retention, and pipeline velocity in real time.",
      },
    ] satisfies FaqItem[],
  },
  footer: {
    brand: "Design by — Customerup",
    email: "hi@customerup.io",
  },
};
