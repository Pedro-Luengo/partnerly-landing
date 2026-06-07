export const en = {
  lang: 'en',
  dir: 'ltr',

  meta: {
    title: 'Partnerly — The love coach that grows with you',
    description:
      'Single, crushing, dating, together or healing — Partnerly is the one coach that remembers your whole story and walks every chapter with you.',
    ogImage: '/og-en.png',
  },

  nav: {
    cta: 'Join the waitlist',
    ctaSigned: "You're in — see you at launch",
    langSwitch: 'ES',
    langSwitchLabel: 'Ver en español',
  },

  pill: 'Launching soon · Early access',

  hero: {
    h1a: 'The love coach that',
    h1b: 'grows with you',
    h1c: '.',
    sub: 'Single, crushing, dating, together or healing — Partnerly is the one coach that remembers your whole story and walks every chapter with you. Like a Duolingo for your love life.',
    inputPlaceholder: 'you@email.com',
    cta: 'Get early access',
    note: 'Be one of the first. No spam — one email when it\'s ready.',
  },

  success: {
    heading: 'You\'re on the list.',
    body: 'We\'ll send a single email the moment Partnerly opens its doors. Talk soon.',
    alreadyBody: 'You\'re already on the list — we\'ll reach out when it\'s time.',
  },

  gap: {
    eyebrow: 'The gap nobody fills',
    h2: 'Every other app drops you the moment your love life changes.',
    cards: [
      {
        strike: 'Dating apps',
        punch: 'Celebrate when you match — then vanish the second you find someone.',
      },
      {
        strike: 'Couple apps',
        punch: 'Built for two. When the relationship ends, so does your support.',
      },
      {
        strike: 'Partnerly',
        punch: 'Stays through every transition — because the chapters change, the coach doesn\'t.',
        isUs: true,
      },
    ],
  },

  stages: {
    eyebrow: 'One coach · every chapter',
    h2: 'From your first crush to starting over — and everything between.',
    loop: 'And when you\'re ready, it walks you back to the start — stronger this time.',
    nodes: ['Single', 'Crush', 'Dating', 'Together', 'Rough patch', 'Healing'],
  },

  pillars: {
    eyebrow: 'Why it works',
    h2: 'A real coaching experience — not another chatbot.',
    cards: [
      {
        title: 'It remembers you',
        body: 'A living picture of your patterns, values and history that grows with every chat. Advice that\'s about you — not generic.',
      },
      {
        title: 'A path to grow',
        body: 'Bite-sized lessons grounded in real relationship science, gamified so building healthier love feels like leveling up.',
      },
      {
        title: 'A companion with heart',
        body: 'Warm, honest and always in your corner. Here to make your real life healthier — never to keep you glued to a screen.',
      },
    ],
  },

  memory: {
    eyebrow: 'The difference',
    h2: 'It carries your whole story, so you never start from zero.',
    lead: 'Partners come and go. You stay. Partnerly builds a private, lasting model of <em>you</em> — your growth across every relationship and every stage — so the support only gets sharper over time.',
  },

  finalCta: {
    eyebrow: 'Early access',
    h2: 'Be there when Partnerly opens.',
    lead: 'Join the waitlist and get in before anyone else.',
    note: 'No spam — one email when it\'s ready.',
  },

  footer: {
    tagline: 'Coaching, grounded in science — not therapy.',
    copy: '© 2026 Partnerly. Made with care.',
    langSwitch: 'ES',
    langSwitchLabel: 'Ver en español',
  },

  consent: {
    message: 'We use cookies to understand how people find Partnerly. No personal data is sold.',
    accept: 'Accept',
    reject: 'Reject',
  },
} as const;

export type Translations = typeof en;
