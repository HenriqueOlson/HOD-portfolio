export const languages = {
  en: 'English',
  pt: 'Português',
} as const;

export const defaultLang = 'en';

export type Language = keyof typeof languages;

export const translations = {
  en: {
    access: {
      eyebrow: 'Portfolio access',
      title: 'Choose how to explore',
      description: 'View the open projects or enter your password to see the full portfolio.',
      visitor: 'Continue as a visitor',
      havePassword: 'I have a password',
      passwordLabel: 'Portfolio password',
      passwordPlaceholder: 'Enter your password',
      invalidPassword: 'That password did not match. Try again.',
      back: 'Back',
      unlock: 'View all projects',
      expiry: 'Your access lasts for 10 minutes.',
    },
    nav: {
      about: 'About',
      portfolio: 'Portfolio',
      services: 'Services',
      contact: 'Contact',
    },
    hero: {
      availability: "I'm available for a new contract!",
      name: 'HENRIQUE OLSON',
      role: 'Senior Product Designer · AI Adoption',
      headlineLead: 'AI-DRIVEN',
      headlineAccent: 'PRODUCTS.',
      tagline: 'Leading AI adoption initiatives across Sales, Engineering, and Design, exploring new processes and workflows for scalable product development.',
      viewPortfolio: 'View Portfolio',
      contactMe: 'Let’s connect',
    },
    about: {
      title: 'About Me',
      paragraph1: "I’m a Senior Product Designer who turns complex problems into clear, scalable digital experiences. Over the past five years, I’ve designed web and mobile products in fintech and fast-growing technology teams, working closely with product managers, engineers, and business leaders from discovery through launch.",
      paragraph2: 'My work connects user needs with business goals. I’ve led mobile onboarding design that brought in 2,150 new accounts in three months, improved conversion through simpler account-opening experiences, and shipped products helping teams build scalable systems with AI.',
      paragraph3: 'Today, I lead designers and explore how AI can improve the way teams work and build products. I’m most energized by finding the right problem to solve, bringing people around a shared direction, and turning that direction into a product people can use.',
      badge1: '+5y Experience',
      badge3: 'Digital Design Bachelor',
      badge4: 'User Experience Specialized',
      badge5: 'Product Discovery Specialized',
      badge6: 'Lead Product Designer',
    },
    portfolio: {
      title: 'Portfolio',
      description: 'A selection of projects showcasing strategic design solutions and measurable results.',
      passwordProtected: 'Some projects are password protected,',
      reachOut: 'reach out for access!',
    },
    services: {
      title: 'Services',
      subtitle: "Companies often face 𝘂𝗻𝗱𝗲𝗿𝗽𝗲𝗿𝗳𝗼𝗿𝗺𝗶𝗻𝗴 𝗽𝗿𝗼𝗱𝘂𝗰𝘁𝘀, usually caused by low-quality design, lack of direction, and customer's knowledge — resulting in 𝗶𝗻𝗲𝗳𝗳𝗲𝗰𝘁𝗶𝘃𝗲 𝗯𝘂𝘀𝗶𝗻𝗲𝘀𝘀 𝗿𝗲𝘀𝘂𝗹𝘁𝘀. I design detailed interfaces and user-centered experiences that drive confidence—aligning speed with strategic growth.",
      uxDesign: {
        title: 'UX Design',
        description: "By understanding user needs and business goals, I map users' journeys to create seamless and intuitive workflows, optimizing usability and reducing friction—turning complex problems into clear, effective solutions.",
        bullets: ['User Journey Mapping', 'Information Architecture', 'Wireframing', 'Usability Optimization'],
      },
      uiDesign: {
        title: 'UI & Interaction Design',
        description: 'Transform drafts into polished, high-performing interfaces that create a sense of responsiveness and effortlessness, ensuring scalable and engaging natural experiences.',
        bullets: ['Visual Design', 'Interactive Prototypes', 'Design Systems', 'Micro-interactions'],
      },
      uxResearch: {
        title: 'UX Research',
        description: 'Uncover user behaviors, needs, and pain points transforming insights into strategic design decisions that enhance usability.',
        bullets: ['User Interviews', 'Behavioral Analysis', 'Usability Testing', 'Data-driven Insights'],
      },
      productDiscovery: {
        title: 'Product Discovery',
        description: 'Validate ideas early by identifying opportunities, defining user problems, and aligning solutions with business goals—ensuring a strong foundation before development.',
        bullets: ['Opportunity Assessment', 'Problem Definition', 'Solution Validation', 'Strategic Alignment'],
      },
      userTesting: {
        title: 'User Testing',
        description: 'Reduce guesswork by testing real user interactions, uncovering friction points, and refining the experience—leading to a more intuitive and high-performing product.',
        bullets: ['Usability Testing', 'A/B Testing', 'User Feedback', 'Performance Optimization'],
      },
      productStrategy: {
        title: 'Product Strategy',
        description: 'Define clear product vision and roadmap aligned with business objectives and user needs.',
        bullets: ['Strategic Planning', 'Roadmap Development', 'Goal Alignment', 'Success Metrics'],
      },
    },
    testimonials: {
      title: 'What Colleagues Say',
      subtitle: "Testimonials from amazing people I've had the pleasure to work with",
      source: 'Source: LinkedIn recommendations',
      items: [
        {
          name: 'Emily Chen',
          role: 'Senior Product Manager',
          text: "Henrique is a detail-oriented interaction designer with a strong ability to explore design spaces and uncover unique interactions to solve challenging problems. He applies the same rigor to discovery work—evaluating, synthesizing, and clearly communicating insights that bring clarity to the cross-functional team.",
        },
        {
          name: 'Daniel Kim',
          role: 'Design Lead',
          text: "Working with Henrique was a genuine pleasure. What set Henrique apart was his remarkable self-motivation coupled with an insatiable desire to evolve as a designer. Any design team would be fortunate to have Henrique's blend of innovative thinking, open mind, user advocacy, and collaborative spirit.",
        },
        {
          name: 'Sarah Johnson',
          role: 'UX Researcher',
          text: "Henrique is one of the most driven and hungry-to-learn people I've ever worked with. His curiosity, dedication, and constant push to grow really stand out — He's not just a great designer — he's also a great teammate, and any team would be lucky to have him.",
        },
        {
          name: 'Matheus Silva',
          role: 'Product Designer',
          text: "It has been wonderful working with Henrique. Although we are not on the same project, he is always willing to share his knowledge and experience. His feedback is always valuable and helpful!",
        },
        {
          name: 'Maria Costa',
          role: 'UX Designer',
          text: "I worked with Olson for a short period of time, but it was enough for him to demonstrate that he is a very engaged professional to understand the product's perspectives. He has a collaborative spirit and an easy personality to work with in a team.",
        },
        {
          name: 'Lucas Ferreira',
          role: 'Product Owner',
          text: "It was great to have Henrique in the team. He is a positive person that is very easy to work with, open to collaboration and to feedback. His work on this project was always user-centric, done with careful research and testing to validate his design solutions. His findings were fundamental for the decisions made in the project.",
        },
      ],
    },
    contact: {
      title: "Let's Work Together",
      description: "I'm always excited to work on new projects and help businesses achieve their goals through thoughtful design.",
      email: 'hello@henriqueolson.com',
      linkedin: 'LinkedIn',
      getInTouch: 'Get in Touch',
    },
    footer: {
      rights: '© 2026 Henrique Olson. All rights reserved.',
      madeWith: 'Made with',
      in: 'in Toronto',
    },
    freelance: {
      title: 'FREELANCE SERVICES',
      subtitle: 'Comprehensive product design services to help you create exceptional digital experiences that drive real business results.',
      backToHome: 'Back to Home',
      processTitle: 'My Process',
      processSteps: [
        { title: 'Discovery', description: 'Understanding your business, users, and goals' },
        { title: 'Research', description: 'Deep dive into user needs and market analysis' },
        { title: 'Design', description: 'Creating intuitive and beautiful interfaces' },
        { title: 'Validate', description: 'Testing with real users and iterating' },
        { title: 'Deliver', description: 'Handoff with detailed documentation' },
      ],
      cta: "Let's work together? Get in Touch!",
    },
    project: {
      backToPortfolio: 'Back to Portfolio',
      overview: 'Project Overview',
      tags: 'Tags',
      keyResults: 'KEY RESULTS',
    },
    badges: {
      mobile: 'Mobile',
      web: 'Web',
      soon: 'Soon',
    },
  },
  pt: {
    access: {
      eyebrow: 'Acesso ao portfólio',
      title: 'Escolha como explorar',
      description: 'Veja os projetos abertos ou insira sua senha para acessar o portfólio completo.',
      visitor: 'Continuar como visitante',
      havePassword: 'Tenho uma senha',
      passwordLabel: 'Senha do portfólio',
      passwordPlaceholder: 'Digite sua senha',
      invalidPassword: 'A senha não confere. Tente novamente.',
      back: 'Voltar',
      unlock: 'Ver todos os projetos',
      expiry: 'Seu acesso dura 10 minutos.',
    },
    nav: {
      about: 'Sobre',
      portfolio: 'Portfólio',
      services: 'Serviços',
      contact: 'Contato',
    },
    hero: {
      availability: 'Estou disponível para um novo contrato!',
      name: 'HENRIQUE OLSON',
      role: 'Senior Product Designer · Adoção de IA',
      headlineLead: 'PRODUTOS',
      headlineAccent: 'COM IA.',
      tagline: 'Liderando iniciativas de adoção de IA entre Vendas, Engenharia e Design, explorando novos processos e fluxos de trabalho para o desenvolvimento escalável de produtos.',
      viewPortfolio: 'Ver Portfólio',
      contactMe: 'Vamos conversar',
    },
    about: {
      title: 'Sobre Mim',
      paragraph1: 'Sou Senior Product Designer e transformo problemas complexos em experiências digitais claras e escaláveis. Nos últimos cinco anos, desenvolvi produtos web e mobile para fintechs e empresas de tecnologia em rápido crescimento, trabalhando em parceria com product managers, engenheiros e lideranças de negócio, da descoberta ao lançamento.',
      paragraph2: 'Meu trabalho conecta as necessidades dos usuários aos objetivos de negócio. Liderei o design de uma experiência mobile de onboarding que gerou 2.150 novas contas em três meses, melhorei a conversão ao simplificar a abertura de contas e lancei produtos que ajudam equipes a criar sistemas escaláveis com IA.',
      paragraph3: 'Hoje, lidero designers e exploro como a IA pode melhorar a forma como as equipes trabalham e desenvolvem produtos. Tenho mais energia quando encontro o problema certo para resolver, alinho pessoas em torno de uma direção comum e transformo essa direção em um produto que as pessoas possam usar.',
      badge1: '+5 anos de Experiência',
      badge3: 'Bacharel em Design Digital',
      badge4: 'Especializado em Experiência do Usuário',
      badge5: 'Especializado em Product Discovery',
      badge6: 'Lead Product Designer',
    },
    portfolio: {
      title: 'Portfólio',
      description: 'Uma seleção de projetos apresentando soluções de design estratégico e resultados mensuráveis.',
      passwordProtected: 'Alguns projetos são protegidos por senha,',
      reachOut: 'entre em contato para acesso!',
    },
    services: {
      title: 'Serviços',
      subtitle: 'As empresas frequentemente enfrentam 𝗽𝗿𝗼𝗱𝘂𝘁𝗼𝘀 𝗰𝗼𝗺 𝗯𝗮𝗶𝘅𝗼 𝗱𝗲𝘀𝗲𝗺𝗽𝗲𝗻𝗵𝗼, geralmente causados por design de baixa qualidade, falta de direção e conhecimento do cliente — resultando em 𝗿𝗲𝘀𝘂𝗹𝘁𝗮𝗱𝗼𝘀 𝗱𝗲 𝗻𝗲𝗴ó𝗰𝗶𝗼 𝗶𝗻𝗲𝗳𝗶𝗰𝗮𝘇𝗲𝘀. Eu projeto interfaces detalhadas e experiências centradas no usuário que transmitem confiança—alinhando velocidade com crescimento estratégico.',
      uxDesign: {
        title: 'UX Design',
        description: 'Ao entender as necessidades dos usuários e objetivos de negócio, mapeio jornadas dos usuários para criar fluxos de trabalho seamless e intuitivos, otimizando a usabilidade e reduzindo atritos—transformando problemas complexos em soluções claras e eficazes.',
        bullets: ['Mapeamento de jornada', 'Wireframing & prototipagem', 'Arquitetura da informação', 'Otimização de usabilidade'],
      },
      uiDesign: {
        title: 'UI & Design de Interação',
        description: 'Transformo rascunhos em interfaces polidas e de alto desempenho que criam uma sensação de responsividade e facilidade, garantindo experiências naturais escaláveis e envolventes.',
        bullets: ['Sistemas de design visual', 'Bibliotecas de componentes', 'Micro-interações', 'Design responsivo'],
      },
      uxResearch: {
        title: 'Pesquisa UX',
        description: 'Conduzo pesquisas qualitativas e quantitativas para entender comportamentos, necessidades e motivações dos usuários através de técnicas de observação, análise de tarefas e metodologias de feedback.',
        bullets: ['Entrevistas com usuários', 'Testes de usabilidade', 'Análise competitiva', 'Design de pesquisas'],
      },
      productDiscovery: {
        title: 'Product Discovery',
        description: 'Valido ideias cedo identificando oportunidades, definindo problemas dos usuários e alinhando soluções com objetivos de negócio—garantindo uma base sólida antes do desenvolvimento.',
        bullets: ['Avaliação de oportunidades', 'Definição de problemas', 'Validação de soluções', 'Alinhamento estratégico'],
      },
      userTesting: {
        title: 'Testes com Usuários',
        description: 'Reduzo suposições testando interações reais de usuários, descobrindo pontos de atrito e refinando a experiência—levando a um produto mais intuitivo e de alto desempenho.',
        bullets: ['Testes de usabilidade', 'Testes A/B', 'Feedback dos usuários', 'Otimização de performance'],
      },
      productStrategy: {
        title: 'Estratégia de Produto',
        description: 'Defino visão de produto clara e roadmap alinhados com objetivos de negócio e necessidades dos usuários.',
        bullets: ['Planejamento estratégico', 'Desenvolvimento de roadmap', 'Alinhamento de objetivos', 'Métricas de sucesso'],
      },
    },
    testimonials: {
      title: 'O Que Colegas Dizem',
      subtitle: 'Depoimentos de pessoas incríveis com quem tive o prazer de trabalhar',
      source: 'Fonte: Recomendações do LinkedIn',
      items: [
        {
          name: 'Emily Chen',
          role: 'Gerente de Produto Sênior',
          text: "Henrique é um interaction designer orientado a detalhes com uma forte capacidade de explorar espaços de design e descobrir interações únicas para resolver problemas desafiadores. Ele aplica o mesmo rigor ao trabalho de discovery—avaliando, sintetizando e comunicando claramente insights que trazem clareza para a equipe multifuncional.",
        },
        {
          name: 'Daniel Kim',
          role: 'Design Lead',
          text: "Trabalhar com Henrique foi um prazer genuíno. O que diferenciou Henrique foi sua notável auto-motivação aliada a um desejo insaciável de evoluir como designer. Qualquer equipe de design teria sorte em ter a combinação de pensamento inovador, mente aberta, defesa do usuário e espírito colaborativo de Henrique.",
        },
        {
          name: 'Sarah Johnson',
          role: 'Pesquisadora UX',
          text: "Henrique é uma das pessoas mais dedicadas e sedentas por aprendizado com quem já trabalhei. Sua curiosidade, dedicação e constante impulso para crescer realmente se destacam — Ele não é apenas um ótimo designer — ele também é um grande colega de equipe, e qualquer equipe teria sorte em tê-lo.",
        },
        {
          name: 'Matheus Silva',
          role: 'Product Designer',
          text: "Tem sido maravilhoso trabalhar com Henrique. Embora não estejamos no mesmo projeto, ele está sempre disposto a compartilhar seu conhecimento e experiência. Seu feedback é sempre valioso e útil!",
        },
        {
          name: 'Maria Costa',
          role: 'UX Designer',
          text: "Trabalhei com Olson por um curto período de tempo, mas foi o suficiente para ele demonstrar que é um profissional muito engajado em entender as perspectivas do produto. Ele tem um espírito colaborativo e uma personalidade fácil de trabalhar em equipe.",
        },
        {
          name: 'Lucas Ferreira',
          role: 'Product Owner',
          text: "Foi ótimo ter Henrique na equipe. Ele é uma pessoa positiva que é muito fácil de trabalhar, aberta à colaboração e ao feedback. Seu trabalho neste projeto foi sempre centrado no usuário, feito com pesquisa e testes cuidadosos para validar suas soluções de design. Suas descobertas foram fundamentais para as decisões tomadas no projeto.",
        },
      ],
    },
    contact: {
      title: 'Vamos Trabalhar Juntos',
      description: 'Estou sempre animado para trabalhar em novos projetos e ajudar empresas a alcançar seus objetivos através de design cuidadoso.',
      email: 'hello@henriqueolson.com',
      linkedin: 'LinkedIn',
      getInTouch: 'Entre em Contato',
    },
    footer: {
      rights: '© 2026 Henrique Olson. Todos os direitos reservados.',
      madeWith: 'Feito com',
      in: 'em Toronto',
    },
    freelance: {
      title: 'SERVIÇOS FREELANCE',
      subtitle: 'Serviços completos de design de produto para ajudá-lo a criar experiências digitais excepcionais que geram resultados reais de negócios.',
      backToHome: 'Voltar ao Início',
      processTitle: 'Meu Processo',
      processSteps: [
        { title: 'Discovery', description: 'Entendendo seu negócio, usuários e objetivos' },
        { title: 'Pesquisa', description: 'Mergulho profundo nas necessidades dos usuários e análise de mercado' },
        { title: 'Design', description: 'Criando interfaces intuitivas e bonitas' },
        { title: 'Validar', description: 'Testando com usuários reais e iterando' },
        { title: 'Entregar', description: 'Handoff com documentação detalhada' },
      ],
      cta: "Vamos trabalhar juntos? Entre em Contato!",
    },
    project: {
      backToPortfolio: 'Voltar ao Portfólio',
      overview: 'Visão Geral do Projeto',
      tags: 'Tags',
      keyResults: 'RESULTADOS PRINCIPAIS',
    },
    badges: {
      mobile: 'Mobile',
      web: 'Web',
      soon: 'Em breve',
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t<K extends keyof typeof translations.en>(key: K): typeof translations.en[K] {
    return translations[lang][key] as typeof translations.en[K];
  };
}

export function getLocalizedPath(path: string, lang: Language): string {
  // Remove leading slash and any existing locale prefix
  const cleanPath = path.replace(/^\//, '').replace(/^(en|pt)\//, '');

  // For default language, don't add prefix (cleaner URLs)
  if (lang === defaultLang) {
    return `/${cleanPath}`;
  }

  return `/${lang}/${cleanPath}`;
}
