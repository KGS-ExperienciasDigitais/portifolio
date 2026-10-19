import type { CaseMedia, CaseStudy } from "./types";

const img = "/images/cases/analise-heuristica";

const guidingQuestion =
  "Como identificar e comunicar oportunidades de melhoria em diferentes canais digitais, mantendo critérios consistentes de avaliação?";

const subtitle =
  "Como conduzi uma análise heurística do site, portal do segurado e aplicativo para identificar problemas de usabilidade, acessibilidade e consistência e transformá-los em propostas de melhoria.";

// Slides da apresentação original (marca anonimizada como "XYZ"). Os de notas e os de antes e depois aparecem no estudo completo e no resumo.
const slides = {
  overview: {
    src: `${img}/analise-heuristica-02.jpg`,
    alt: "Slide de visão geral da análise: contexto, objetivo, metodologia e possíveis oportunidades",
    width: 1920,
    height: 876,
  },
  site: {
    src: `${img}/analise-heuristica-03.jpg`,
    alt: "Insights do site institucional: notas de encontrabilidade, acessibilidade, desejabilidade, usabilidade, performance e narrativa em tabela e radar, ao lado da lista de problemas encontrados",
    width: 1920,
    height: 879,
  },
  portal: {
    src: `${img}/analise-heuristica-05.jpg`,
    alt: "Insights do portal do segurado: notas por dimensão em tabela e radar, com acessibilidade e usabilidade circuladas, ao lado da lista de problemas encontrados",
    width: 1920,
    height: 860,
  },
  app: {
    src: `${img}/analise-heuristica-07.jpg`,
    alt: "Insights do aplicativo do segurado: notas por dimensão em tabela e radar, ao lado da lista de problemas encontrados",
    width: 1920,
    height: 1080,
  },
  siteRedesign: {
    src: `${img}/analise-heuristica-04.jpg`,
    alt: "Antes e depois das páginas Benfeitorias e Produtos Agrícolas e Produtos do site, com notas apontando texto cortado, falta de breadcrumbs e baixo contraste",
    width: 1920,
    height: 881,
  },
  portalRedesign: {
    src: `${img}/analise-heuristica-06.jpg`,
    alt: "Antes e depois do login e da tela financeira do portal do segurado, com notas apontando falta da opção de ver a senha, baixo contraste e o cifrão no lugar errado",
    width: 1920,
    height: 879,
  },
} satisfies Record<string, CaseMedia>;

export const caso3: CaseStudy = {
  slug: "analise-heuristica",
  name: "Análise heurística de canais digitais",
  title: "Identificando oportunidades de melhoria na experiência digital da Liberty Seguros",
  subtitle,
  summary: subtitle,
  cover: {
    src: `${img}/capa.png`,
    alt: "Quatro telas redesenhadas na análise: as páginas Benfeitorias e Produtos do site, o login e a tela financeira do portal do segurado",
    width: 1920,
    height: 1200,
  },
  overview: {
    info: [
      { label: "Empresa", value: "Liberty Seguros — Grupo HDI" },
      { label: "Período", value: "Janeiro de 2024" },
      {
        label: "Meu papel",
        value: "Análise heurística, diagnóstico de UX, avaliação de acessibilidade, síntese dos achados e propostas de redesign",
      },
      { label: "Colaboração", value: "Início do projeto com Karine, UX Designer" },
      { label: "Canais avaliados", value: "Site institucional, portal do segurado e aplicativo" },
      { label: "Método", value: "Checklist heurístico e classificação por gravidade" },
      { label: "Entregáveis", value: "Diagnóstico, relatório consolidado e propostas visuais de melhoria" },
      { label: "Status", value: "Relatório entregue à liderança; implementação não confirmada" },
    ],
  },
  sections: [
    {
      title: "Contexto",
      blocks: [
        {
          type: "text",
          body: [
            "Em novembro de 2023, o Grupo HDI concluiu a aquisição da Liberty Seguros no Brasil.",
            "Nesse contexto de transformação organizacional, surgiu a oportunidade de avaliar a experiência dos canais digitais da Liberty e identificar pontos que poderiam ser melhorados.",
            "O projeto teve como foco o site institucional, o portal do segurado e o aplicativo, considerando aspectos de usabilidade, acessibilidade, consistência visual e performance.",
            "A necessidade da análise foi identificada pela Karine, com quem comecei o trabalho.",
            "Inicialmente, dividimos as interfaces que seriam avaliadas e registramos os achados em uma planilha compartilhada. Pouco tempo depois, ela foi direcionada para outro projeto, e assumi individualmente a continuidade da investigação.",
          ],
        },
        { type: "subsection", title: "O desafio" },
        {
          type: "text",
          body: [
            "Os canais digitais atendiam diferentes necessidades dos usuários e apresentavam uma quantidade significativa de páginas e interfaces.",
            "Avaliar apenas telas isoladas não seria suficiente para identificar problemas recorrentes ou compreender em quais aspectos a experiência precisava de maior atenção.",
            "O desafio era transformar uma avaliação ampla em um diagnóstico estruturado, capaz de demonstrar onde estavam os principais problemas e quais melhorias poderiam ser consideradas.",
          ],
        },
        {
          type: "callout",
          tone: "question",
          text: guidingQuestion,
        },
        {
          type: "text",
          body: "O objetivo não era redesenhar todos os canais, mas encontrar problemas relevantes e apresentar recomendações que ajudassem a orientar possíveis intervenções futuras.",
        },
      ],
    },
    {
      title: "Processo",
      blocks: [
        { type: "subsection", title: "Estruturando a avaliação heurística" },
        {
          type: "text",
          body: [
            "Para conduzir a investigação, utilizamos uma planilha com aproximadamente 100 perguntas, agrupadas em critérios relacionados às heurísticas de Nielsen, acessibilidade e performance.",
            "Esse checklist funcionava como referência para avaliar as interfaces e registrar os problemas identificados.",
          ],
        },
        {
          type: "media",
          items: [{ ...slides.overview, caption: "Abertura da apresentação: contexto, objetivo e metodologia da análise." }],
        },
        {
          type: "text",
          body: "O material consolidado contemplava três ambientes:",
        },
        {
          type: "table",
          columns: ["Canal", "Páginas registradas no material"],
          align: ["left", "right"],
          rows: [
            ["Site institucional", "228"],
            ["Portal do segurado", "45"],
            ["Aplicativo", "48"],
          ],
        },
        {
          type: "text",
          body: [
            "Esses números representam o escopo informado na apresentação original. Como não disponho mais da planilha, não é possível reconstituir o critério exato de contagem nem o número de verificações realizadas em cada página.",
            "Além do registro dos problemas, a avaliação utilizava uma classificação por gravidade.",
            "**Quanto menor a nota, mais grave era a situação da dimensão avaliada.**",
            "As pontuações foram organizadas em tabelas e gráficos de radar, permitindo visualizar os aspectos que exigiam atenção nos diferentes canais.",
            "Esses resultados representam a avaliação heurística realizada, não métricas de comportamento dos usuários ou resultados de testes de usabilidade.",
          ],
        },
        {
          type: "media",
          items: [{ ...slides.site, caption: "Site institucional: notas por dimensão e problemas encontrados." }],
        },
        {
          type: "media",
          items: [{ ...slides.portal, caption: "Portal do segurado: notas por dimensão e problemas encontrados." }],
        },
        {
          type: "media",
          items: [{ ...slides.app, caption: "Aplicativo: notas por dimensão e problemas encontrados." }],
        },

        { type: "subsection", title: "O que a análise revelou" },
        {
          type: "findings",
          intro:
            "Ao percorrer as interfaces, identifiquei problemas que se repetiam em diferentes páginas e componentes. Embora cada canal apresentasse situações específicas, os achados permitiram reconhecer alguns grupos de oportunidades.",
          items: [
            {
              title: "Acessibilidade e legibilidade",
              body: "Foram registrados problemas relacionados ao contraste entre textos, ícones e seus respectivos fundos. Essas situações poderiam dificultar a leitura das informações e a identificação de elementos importantes, especialmente para pessoas com limitações visuais. As oportunidades envolviam revisar combinações de cores, estados dos componentes e a legibilidade das informações, respeitando os padrões disponíveis no design system.",
            },
            {
              title: "Clareza de formulários e mensagens",
              body: "A análise identificou situações em que mensagens de erro e orientações não ofereciam feedback suficientemente claro ou apareciam em posições pouco adequadas. Em formulários, esse tipo de problema pode dificultar a compreensão do que precisa ser corrigido. As recomendações buscavam tornar o feedback mais próximo da ação do usuário, com mensagens compreensíveis e apresentação consistente.",
            },
            {
              title: "Navegação e orientação",
              body: "Também foram identificadas oportunidades relacionadas à orientação entre páginas e à clareza dos elementos interativos. Algumas interfaces apresentavam ausência de recursos de navegação contextual ou elementos cujo comportamento não era evidente pela aparência. Esses problemas poderiam dificultar o reconhecimento da localização atual e a compreensão dos próximos passos.",
            },
            {
              title: "Consistência entre páginas",
              body: "Outro grupo de achados estava relacionado às diferenças de apresentação de botões, ícones, espaçamentos e outros componentes. Mesmo quando uma inconsistência não impede diretamente uma tarefa, ela pode tornar a experiência menos previsível e exigir que o usuário reaprenda padrões de interação. Esse foi um dos aspectos que considerei ao desenvolver os exemplos de redesign.",
            },
            {
              title: "Comportamento e adaptação das interfaces",
              body: "A avaliação também registrou problemas como desalinhamentos, sobreposições, dificuldades de adaptação a diferentes tamanhos de tela e elementos que não apresentavam o comportamento esperado. Alguns desses casos indicavam oportunidades de correção pontual, sem necessidade de redesenhar integralmente as páginas.",
            },
          ],
        },

        { type: "subsection", title: "Transformando os achados em propostas de melhoria" },
        {
          type: "text",
          body: [
            "Após concluir a avaliação, selecionei interfaces que demonstravam de forma mais clara as oportunidades identificadas.",
            "**A escolha não foi baseada exclusivamente nas notas mais graves.** Busquei exemplos que permitissem explicar os problemas e mostrar como ajustes consistentes poderiam contribuir para melhorar diferentes páginas.",
            "Para desenvolver as propostas, utilizei o design system existente da empresa como referência.",
            "O objetivo era aproximar as interfaces dos padrões já definidos, em vez de criar uma nova linguagem visual.",
            "As propostas contemplaram intervenções como:",
          ],
          bullets: [
            "Ajustes de contraste e legibilidade.",
            "Revisão da hierarquia visual.",
            "Melhorias na apresentação de mensagens e formulários.",
            "Padronização de botões, ícones e espaçamentos.",
            "Ajustes em elementos de navegação e orientação.",
            "Correções de composição e comportamento das interfaces.",
          ],
          after: [
            "Em alguns casos, a intervenção mais adequada era pontual. Em outros, uma reorganização maior ajudava a demonstrar como os elementos poderiam funcionar em conjunto.",
            "Os redesigns apresentados no relatório foram exemplos de soluções possíveis para os problemas encontrados, não propostas de substituição integral dos canais.",
          ],
        },
        {
          type: "media",
          items: [{ ...slides.siteRedesign, caption: "Site institucional: Benfeitorias e Produtos Agrícolas e Produtos, antes e depois." }],
        },
        {
          type: "media",
          items: [{ ...slides.portalRedesign, caption: "Portal do segurado: login e tela financeira, antes e depois." }],
        },

        { type: "subsection", title: "A importância da padronização" },
        {
          type: "text",
          body: [
            "Um dos principais aprendizados da avaliação foi perceber que problemas aparentemente isolados podiam revelar oportunidades mais amplas de consistência.",
            "Diferenças recorrentes entre componentes, por exemplo, não precisavam ser tratadas apenas como alterações específicas de cada tela.",
            "Ao utilizar o design system como referência, procurei demonstrar como padrões compartilhados poderiam orientar melhorias em diferentes páginas.",
            "Isso permitia considerar não apenas o resultado visual de uma alteração, mas também sua possibilidade de reutilização e manutenção.",
            "As propostas buscavam, portanto, melhorar a experiência sem introduzir soluções desconectadas da estrutura existente do produto.",
          ],
        },

        { type: "subsection", title: "Consolidando o diagnóstico" },
        {
          type: "text",
          body: [
            "Depois da avaliação e da elaboração dos exemplos visuais, organizei os resultados em uma apresentação executiva.",
            "O material reunia o escopo dos canais avaliados, os resultados da classificação por gravidade, gráficos comparativos, problemas identificados e exemplos de antes e depois.",
            "A intenção era transformar uma análise técnica extensa em uma visão mais acessível das oportunidades de melhoria.",
            "Os gráficos permitiam observar as dimensões avaliadas, enquanto os exemplos visuais ajudavam a demonstrar como determinados problemas poderiam ser corrigidos.",
            "O relatório foi enviado à superintendência e à liderança da empresa.",
          ],
        },
      ],
    },
    {
      title: "Resultados e limitações",
      blocks: [
        {
          type: "text",
          body: [
            "O principal resultado do projeto foi a conclusão e a entrega de um diagnóstico estruturado da experiência digital da Liberty Seguros.",
            "Não tenho registro de um retorno formal sobre as recomendações nem confirmação de que as propostas tenham sido implementadas. Por isso, não é possível afirmar que os problemas foram corrigidos ou que houve melhoria mensurável de usabilidade, acessibilidade ou performance.",
            "Assim, o impacto documentado está na **identificação, organização e comunicação das oportunidades de melhoria**, e não na comprovação de seus efeitos após implementação.",
          ],
        },
      ],
    },
    {
      title: "Aprendizados e próximos passos",
      blocks: [
        {
          type: "text",
          heading: "Uma avaliação estruturada ajuda a reduzir a subjetividade",
          body: [
            "O checklist permitiu investigar diferentes interfaces utilizando critérios comuns, em vez de depender apenas de impressões visuais.",
            "Isso foi especialmente importante em um projeto com múltiplos canais e grande volume de páginas.",
          ],
        },
        {
          type: "text",
          heading: "Identificar problemas não significa redesenhar tudo",
          body: [
            "A análise mostrou oportunidades com diferentes níveis de intervenção.",
            "Algumas situações poderiam ser resolvidas com ajustes pontuais de contraste, conteúdo ou componentes. Outras exigiam uma revisão mais ampla da organização da interface.",
            "Aprendi a considerar a natureza do problema antes de propor o tamanho da solução.",
          ],
        },
        {
          type: "text",
          heading: "O design system é uma ferramenta de consistência",
          body: [
            "Utilizar os padrões existentes ajudou a relacionar as propostas de melhoria à realidade do produto.",
            "Mais do que criar interfaces visualmente diferentes, o objetivo era demonstrar como experiências mais consistentes poderiam ser construídas com os recursos disponíveis.",
          ],
        },
        {
          type: "text",
          heading: "A apresentação dos achados também faz parte do trabalho de UX",
          body: [
            "Uma análise extensa precisa ser compreensível para quem vai utilizá-la na tomada de decisão.",
            "Os gráficos, as classificações e as comparações visuais ajudaram a traduzir os problemas encontrados em oportunidades que poderiam ser discutidas pela liderança.",
          ],
        },
        {
          type: "text",
          heading: "Diagnóstico e impacto são etapas diferentes",
          body: [
            "A entrega do relatório representou a conclusão do trabalho de investigação e proposição.",
            "Para comprovar melhorias na experiência, ainda seria necessário implementar as recomendações e avaliar seus efeitos.",
            "Essa distinção reforçou a importância de comunicar com clareza o que foi identificado, o que foi proposto e o que efetivamente foi validado.",
          ],
        },
        { type: "subsection", title: "Possíveis próximos passos" },
        {
          type: "text",
          body: "Caso as recomendações fossem retomadas, os próximos passos seriam:",
          bullets: [
            "Recuperar ou reconstruir um inventário dos problemas ainda existentes.",
            "Validar a relevância dos achados no estado atual dos canais.",
            "Priorizar oportunidades considerando gravidade, frequência, impacto e esforço.",
            "Verificar quais correções poderiam ser realizadas diretamente com componentes do design system.",
            "Testar os fluxos mais críticos com usuários representativos.",
            "Implementar as melhorias selecionadas e acompanhar indicadores de experiência.",
          ],
          after:
            "O projeto reforçou que uma boa análise de UX não termina na identificação de problemas. Seu valor está também em organizar as evidências e torná-las úteis para orientar decisões de produto.",
        },
      ],
    },
  ],
  steps: [
    {
      label: "Desafio",
      title: "Três canais, um critério comum",
      body: "Depois da aquisição pela HDI, surgiu a chance de avaliar o site, o portal do segurado e o aplicativo da Liberty. Avaliar telas isoladas não mostraria os problemas que se repetiam.",
      visual: [
        {
          type: "callout",
          tone: "question",
          text: guidingQuestion,
        },
      ],
      more: "O desafio",
    },
    {
      label: "Método",
      title: "Um checklist para todos os canais",
      body: "A avaliação seguiu um checklist de cerca de 100 perguntas, entre heurísticas de Nielsen, acessibilidade e performance. Cada dimensão recebeu uma nota: quanto menor, mais grave.",
      visual: [{ type: "media", items: [slides.site] }],
      more: "Estruturando a avaliação heurística",
    },
    {
      label: "Achados",
      title: "Problemas que se repetiam",
      body: "Os problemas se repetiam em diferentes páginas e componentes e formaram cinco grupos: acessibilidade e legibilidade, formulários e mensagens, navegação, consistência entre páginas e comportamento das interfaces.",
      visual: [{ type: "media", items: [slides.portal] }],
      more: "O que a análise revelou",
    },
    {
      label: "Propostas",
      title: "Ajustes dentro do design system",
      body: "Escolhi as telas que melhor explicavam os problemas, não só as de nota mais grave, e redesenhei com o design system da empresa. A ideia era aproximar as páginas dos padrões existentes, não criar uma linguagem nova.",
      visual: [{ type: "media", items: [slides.siteRedesign] }],
      more: "Transformando os achados em propostas de melhoria",
    },
    {
      label: "Resultado",
      title: "Um diagnóstico para orientar decisões",
      body: "O relatório foi para a superintendência e a liderança. Não tive confirmação de implementação: o resultado documentado é o diagnóstico, não o seu efeito.",
      visual: [
        {
          type: "metrics",
          label: "Páginas registradas por canal",
          tone: "neutral",
          items: [
            { value: "228", label: "site institucional" },
            { value: "45", label: "portal do segurado" },
            { value: "48", label: "aplicativo" },
          ],
        },
      ],
      more: "Resultados e limitações",
    },
  ],
  takeaway: {
    title: "O que aprendi",
    body: [
      "Um checklist comum reduziu a subjetividade ao avaliar canais diferentes. E nem todo problema pede redesenho: muitos se resolvem com ajustes dentro do design system.",
      "Diagnóstico e impacto são etapas diferentes: comprovar a melhoria ainda exigiria implementar as propostas e medir.",
    ],
  },
};
