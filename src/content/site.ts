import type { MediaItem } from "@/components/ui/Media";

// Todos os dados pessoais do site ficam aqui. Troque os placeholders pelos seus dados.

export const site = {
  name: "Kevin",
  fullName: "Kevin Souza",
  role: "UX/UI Designer",
  tagline: "Desenho produtos digitais faceis, úteis e intencionais. Conheça meu trabalho abaixo.",
  description: "Portfólio de UX/UI Design com estudos de caso de produtos digitais.",
  // Versão principal do domínio, sem barra no fim (o www redireciona para ela na hospedagem).
  url: "https://kevintheux.com.br",

  // Prévia ao compartilhar o link (LinkedIn, WhatsApp): JPG 1200×630, menos de 300 KB, em public/og/.
  // Preencha `src` quando a arte existir (ex.: "/og/home.jpg"); sem ela, o link sai sem imagem.
  shareImage: { alt: "Kevin Souza, UX/UI Designer" } as MediaItem,

  links: {
    email: "seuemail@exemplo.com",
    linkedin: "https://www.linkedin.com/in/kevintheux/",
    behance: "https://www.behance.net/seu-perfil",
    cv: "/cv/kevin-souza-curriculo.pdf",
  },

  location: {
    city: "São Paulo, Brasil",
    timeZone: "America/Sao_Paulo",
  },

  profile: {
    headline: "Product Designer & UX",
    bio: "Product Designer e UX/UI Designer com mais de 4 anos de experiência. Na Yelum Seguradora, conduzi um card sorting com 15 corretores que reduziu o tempo de cotação do seguro residencial de 25 para 13 minutos.",
    // A primeira começa no centro do carrossel; as outras seguem em volta.
    photos: [
      { src: "/images/perfil/kevin-imgs/pixelshow.jpg", alt: "Kevin e equipe no Pixel Show, em frente ao painel “Keep Art Human”" },
      { src: "/images/perfil/kevin-imgs/dex.jpeg", alt: "Crachá do Design & Experience 2024 com o nome Kevin Souza, na mão do Kevin" },
      { src: "/images/perfil/kevin-imgs/empatia.jpeg", alt: "Kevin em frente ao painel “Empatia” do Grupo Liberty Brasil, segurando uma plaquinha de emoji sorrindo de lado" },
      { src: "/images/perfil/kevin-imgs/estacao-de-trabalho.jpeg", alt: "Estação de trabalho: notebook com código aberto, teclado, caderno e porta-retratos" },
      { src: "/images/perfil/kevin-imgs/UX.jpeg", alt: "“UX” desenhado à mão em caneta preta numa superfície amarela, assinado Kevin" },
      { src: "/images/perfil/kevin-imgs/hobby.jpeg", alt: "Tatuagens e desenhos em traço fino, um dos hobbies do Kevin" },
      { src: "/images/perfil/kevin-imgs/lazer.jpeg", alt: "Controle de PlayStation em frente à TV com a biblioteca de jogos aberta" },
      { src: "/images/perfil/kevin-imgs/crianca.jpeg", alt: "Kevin criança, de óculos e blusa listrada, fazendo careta numa festa" },
    ],
    heroPhoto: {
      src: "/images/perfil/dexconf.jpg",
      alt: "Kevin no Design & Experience 2024, de braços abertos em frente ao painel do evento",
      width: 800,
      height: 667,
    },
  },

  experience: [
    {
      title: "UX/UI Designer | Product Designer",
      company: "NextApps",
      period: "Mar 2026 – Out 2026",
      location: "São Paulo, SP",
      highlights: [
        "Como responsável pela área de experiência, estruturei o fluxo de cobrança com e-mails marketing cobrindo 18 touchpoints, do cadastro à falha nas cobranças, em contato direto com o time de desenvolvimento.",
        "Construí e consolidei o design system, criando documentações compartilhadas com os devs.",
      ],
    },
    {
      title: "UX/UI Designer | Product Designer",
      company: "Yelum Seguradora",
      period: "Fev 2022 – Set 2024",
      location: "São Paulo, SP",
      highlights: [
        "Integração de IA via chatbot na abertura de sinistro, com brainstorm, sessões de navegação assistida e testes de usabilidade.",
        "Com a implantação do chatbot, reduzimos em 30% o número de ligações no SAC.",
        "Card sorting com 15 corretores: o tempo de cotação do seguro residencial caiu de 25 para 13 minutos (−50%).",
      ],
    },
    {
      title: "UX/UI Designer | Product Designer",
      company: "Yelum Seguradora",
      period: "Fev 2022 – Set 2024",
      location: "São Paulo, SP",
      highlights: [
        "Construção de 2 novas jornadas (seguro de vida e residência), com 2 sessões de Focus Group, prototipação e testes de usabilidade.",
        "Aumento do NPS de 62% para 65% após a implementação das jornadas.",
      ],
    },
  ],

  currently: {
    title: "Atualmente",
    item: "A Arte da Guerra",
    kind: "Livro · Sun Tzu",
    cover: {
      src: "/images/livro/arte-da-guerra.jpg",
      alt: "Capa do livro A Arte da Guerra, de Sun Tzu",
      width: 267,
      height: 445,
    },
  },

  // `logo` aponta para public/logos/tools/<logo>.svg; `mono` = logo preta, invertida no tema escuro.
  tools: [
    { name: "Figma", logo: "figma" },
    { name: "Framer", logo: "framer", mono: true },
    { name: "Maze", logo: "maze", mono: true },
    { name: "Miro", logo: "miro" },
    { name: "Notion", logo: "notion", mono: true },
    { name: "ChatGPT", logo: "chatgpt", mono: true },
    { name: "Claude AI", logo: "claude-ai" },
    { name: "Google Analytics", logo: "google-analytics" },
    { name: "Photoshop", logo: "photoshop" },
    { name: "Illustrator", logo: "illustrator" },
    { name: "HTML", logo: "html" },
    { name: "CSS", logo: "css" },
  ],

  methods: [
    "Design Thinking",
    "Pesquisa com usuários",
    "Card Sorting",
    "Focus Group",
    "Testes de usabilidade",
    "Navegação assistida",
    "Análise heurística",
    "Desk research",
    "Design System",
    "Prototipação",
  ],
} as const;

export const navItems = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
] as const;
