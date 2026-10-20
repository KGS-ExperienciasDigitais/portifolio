import type { CaseStudy } from "./types";

const img = "/images/cases/onboarding-orientado-a-problemas";

const guidingQuestion =
  "Como ajudar o cliente a identificar um ponto de partida relevante e executar as primeiras configurações sem exigir que ele conheça previamente as funcionalidades do produto?";

const subtitle =
  "Como redesenhei o onboarding da NextApps para orientar novos clientes a partir de suas necessidades, conectando diagnóstico, plano de ação e configuração guiada.";

export const caso2: CaseStudy = {
  slug: "onboarding-orientado-a-problemas",
  name: "Onboarding orientado a problemas",
  title: "Da escolha de funcionalidades à resolução de problemas",
  subtitle,
  summary: subtitle,
  cover: {
    src: `${img}/capa.png`,
    alt: "Quatro telas do onboarding da NextApps (necessidade, contexto, diagnóstico com plano de ação e configuração guiada)",
    width: 1920,
    height: 1200,
  },
  overview: {
    info: [
      { label: "Empresa", value: "NextApps" },
      {
        label: "Meu papel",
        value: "Pesquisa, análise de dados, estratégia da experiência, arquitetura de fluxos, UX Writing, UI e desenvolvimento",
      },
      { label: "Colaboração", value: "CEO, CTO e stakeholders" },
      { label: "Duração", value: "Aproximadamente duas semanas" },
      { label: "Ferramentas", value: "GA4, ChatGPT, papel e caneta, VS Code e Claude Code" },
      { label: "Status", value: "Implementado" },
    ],
  },
  sections: [
    {
      title: "Contexto",
      blocks: [
        {
          type: "text",
          body: [
            "A NextApps é uma plataforma SaaS B2B que reúne recursos de CRM, inteligência artificial, automações e integração com WhatsApp para apoiar a gestão da operação comercial.",
            "Na época do projeto, o onboarding orientava os novos clientes principalmente a conectar o WhatsApp e criar uma IA. Com a ampliação das funcionalidades da plataforma, essa experiência já não representava todas as possibilidades do produto.",
            "A necessidade de atualizar o onboarding surgiu da liderança, com o objetivo de oferecer uma experiência inicial mais alinhada à evolução da NextApps.",
            "A partir dessa demanda, fiquei responsável por pesquisar, estruturar e desenvolver uma nova experiência de entrada.",
            "O projeto, porém, ganhou uma segunda dimensão após a implementação da primeira proposta: ao acompanhar o comportamento dos usuários, identifiquei sinais de fricção e tomei a iniciativa de investigar uma abordagem diferente.",
          ],
        },
        { type: "subsection", title: "O desafio" },
        {
          type: "text",
          body: [
            "A NextApps oferece diferentes recursos para resolver problemas da operação comercial. Para um novo cliente, entretanto, reconhecer uma dificuldade no próprio negócio não significa necessariamente saber qual ferramenta utilizar para resolvê-la.",
            "O desafio inicial era atualizar o onboarding para apresentar melhor as possibilidades da plataforma.",
            "Ao longo do projeto, a questão evoluiu:",
          ],
        },
        {
          type: "callout",
          tone: "question",
          text: guidingQuestion,
        },
        {
          type: "text",
          body: "Também surgiu uma oportunidade de investigar a sequência da contratação, já que o onboarding estava posicionado antes da ativação do teste gratuito.",
        },
      ],
    },
    {
      title: "Processo",
      blocks: [
        { type: "subsection", title: "Primeira proposta: começar pelas funcionalidades" },
        {
          type: "text",
          body: [
            "Comecei com uma pesquisa exploratória e benchmarks de produtos SaaS, especialmente plataformas que combinavam gestão comercial, inteligência artificial e comunicação.",
            "Utilizei o ChatGPT como apoio para investigar referências, organizar possibilidades e explorar alternativas de experiência.",
            "A primeira proposta foi um hub de onboarding com três caminhos:",
          ],
          bullets: ["Configurar o CRM.", "Configurar uma IA.", "Solicitar ajuda para começar."],
          after: [
            "A intenção era permitir que o cliente escolhesse o recurso mais próximo de seu interesse e recebesse orientações para configurá-lo.",
            "Naquele momento, o cliente passava pelo onboarding antes de cadastrar o cartão e ativar os sete dias gratuitos.",
            "Após implementar essa primeira proposta, configurei uma exploração no GA4 para acompanhar o percurso dos usuários e observar como avançavam entre as etapas.",
          ],
        },

        { type: "subsection", title: "O que observei no GA4" },
        {
          type: "text",
          body: [
            "A análise acompanhava a navegação desde o site, passando pelo cadastro, pelo hub de onboarding e pelos caminhos de configuração, até planos e checkout.",
            "O relatório disponível registrava:",
          ],
        },
        {
          type: "table",
          columns: ["Etapa", "Contagem registrada"],
          align: ["left", "right"],
          rows: [
            ["Home", "2.128"],
            ["Cadastro", "58"],
            ["Informações de cadastro", "28"],
            ["Hub de onboarding", "26"],
            ["Configuração de CRM a partir do hub", "12"],
            ["Configuração de agentes a partir do hub", "6"],
            ["Planos a partir do hub", "8"],
            ["Checkout a partir de planos", "7"],
          ],
        },
        {
          type: "text",
          body: [
            "Além da distribuição entre os caminhos, o que mais chamou minha atenção foi o comportamento dentro das configurações.",
            "Alguns usuários começavam a configurar o CRM ou a IA, mas interrompiam o percurso antes de concluí-lo.",
            "Outros alternavam entre as funcionalidades: iniciavam o CRM e migravam para a IA, ou faziam o movimento contrário. Também observei casos em que o usuário concluía um caminho e, em seguida, começava outro.",
            "Essa alternância não representava necessariamente um erro. Um cliente poderia precisar de mais de um recurso. Entretanto, combinada às interrupções, levantou uma hipótese importante:",
          ],
        },
        {
          type: "callout",
          tone: "question",
          text: "Talvez estivéssemos pedindo ao cliente que escolhesse uma funcionalidade antes de compreender qual delas fazia sentido para sua necessidade.",
        },
        {
          type: "text",
          body: [
            "O relatório também mostrava uma queda entre cadastro e informações de cadastro, indicando que o onboarding não era o único ponto de atenção da jornada.",
            "Os dados não permitiam identificar a causa das interrupções, mas foram suficientes para justificar uma nova investigação.",
          ],
        },

        { type: "subsection", title: "Investigando uma abordagem orientada a problemas" },
        {
          type: "text",
          body: [
            "A partir do comportamento observado, retomei a pesquisa para explorar outras formas de orientar o primeiro uso.",
            "Utilizei o ChatGPT como apoio para discutir hipóteses e possíveis abordagens. Durante essa investigação, surgiu uma mudança de perspectiva: a NextApps resolve problemas da operação comercial, mas seus clientes nem sempre chegam sabendo qual funcionalidade precisam utilizar.",
            "Em vez de começar pela ferramenta, poderíamos começar pela dificuldade que motivou a busca pela plataforma.",
            "Para aprofundar essa hipótese, conversei individualmente com cinco clientes da NextApps pelo WhatsApp.",
            "Perguntei quais necessidades os haviam levado a procurar a plataforma.",
            "Os relatos incluíram dificuldades como:",
          ],
          bullets: [
            "Acompanhar o trabalho e as atividades da equipe.",
            "Ter visibilidade sobre a operação e os resultados de vendas.",
            "Entender a chegada e o tratamento dos leads.",
            "Facilitar a comunicação com clientes.",
            "Realizar disparos de e-mail e outras comunicações.",
            "Organizar cobranças e processos relacionados.",
          ],
          after: [
            "Essas conversas trouxeram evidências qualitativas para a nova direção. Os clientes descreviam situações que precisavam resolver, e não apenas nomes de funcionalidades.",
            "Reuni as necessidades levantadas, considerei os recursos disponíveis na NextApps e organizei os problemas em um mapa de afinidade.",
            "O agrupamento ajudou a identificar temas semelhantes e selecionar os problemas que seriam apresentados no novo onboarding.",
          ],
        },

        { type: "subsection", title: "A mudança de estratégia" },
        {
          type: "text",
          body: [
            "A principal decisão foi substituir uma entrada orientada por funcionalidades por uma experiência orientada às necessidades do cliente.",
            "Na primeira proposta, o usuário precisava decidir entre caminhos como CRM e IA.",
            "Na nova abordagem, ele começaria identificando uma situação de sua operação, como dificuldade para acompanhar leads, responder contatos ou recuperar oportunidades comerciais.",
            "A partir dessa escolha, a experiência faria perguntas complementares para compreender melhor o contexto e indicar um caminho de configuração.",
          ],
        },
        {
          type: "media",
          items: [
            {
              src: `${img}/tela-necessidade.png`,
              alt: "Tela do onboarding: O que você sente que precisa melhorar? Com quatro situações para escolher",
              width: 679,
              height: 520,
              caption: "Primeira etapa do novo onboarding: o cliente escolhe a situação que mais pesa hoje.",
            },
          ],
        },
        {
          type: "callout",
          tone: "question",
          text: "A hipótese era que reconhecer um problema familiar exigiria menos conhecimento prévio da plataforma do que escolher diretamente uma ferramenta.",
        },
        {
          type: "text",
          body: "Essa mudança também permitia explicar o valor das funcionalidades antes de solicitar sua configuração.",
        },

        { type: "subsection", title: "Reorganizando a jornada de contratação" },
        {
          type: "text",
          body: [
            "Em paralelo à revisão do onboarding, propus outra mudança: antecipar o checkout.",
            "Meu raciocínio partiu de uma analogia com a hierarquia de conteúdo em páginas. Quando uma informação importante está posicionada em uma região pouco acessada, podemos avaliar se aproximá-la do início facilita seu encontro.",
            "Apliquei uma lógica semelhante à jornada: se o site já apresentava a proposta de valor da NextApps e despertava interesse suficiente para gerar cadastros, talvez o onboarding estivesse acrescentando etapas antes da decisão de experimentar a plataforma.",
            "A hipótese era que aproximar o checkout do cadastro poderia facilitar a transição entre o interesse demonstrado e a ativação do teste.",
            "Propus alterar a sequência de:",
          ],
        },
        { type: "flow", label: "Antes", steps: ["Site", "Cadastro", "Onboarding", "Checkout"], highlight: [3] },
        { type: "flow", label: "Depois", steps: ["Site", "Cadastro", "Checkout e ativação do teste", "Onboarding"], highlight: [2] },
        {
          type: "text",
          body: "O período gratuito de sete dias permaneceu o mesmo nas duas versões. A mudança estava na ordem das etapas.",
        },

        { type: "subsection", title: "Estruturando os diagnósticos e planos de ação" },
        {
          type: "text",
          body: [
            "Com as necessidades organizadas, comecei a construir a lógica que conectaria os problemas declarados pelos clientes às possibilidades da NextApps.",
            "Utilizei papel e caneta para explorar perguntas, ramificações e sequências de configuração.",
            "Para definir os caminhos, alinhei as propostas com o CEO, que contribuiu com sua experiência em gestão comercial. Esse trabalho ajudou a relacionar cada situação apresentada pelo cliente a ações práticas dentro da plataforma.",
            "Os diagnósticos e planos de ação eram previamente estruturados.",
            "Conforme as respostas, o usuário seguia por um caminho específico. Algumas escolhas abriam perguntas adicionais, mas todas as ramificações e recomendações haviam sido definidas antes da implementação.",
            "A personalização, portanto, não dependia de uma IA gerando respostas em tempo real. Ela acontecia por meio de uma lógica de decisão construída a partir das necessidades mapeadas e dos recursos disponíveis.",
            "A experiência foi organizada em cinco momentos:",
          ],
        },
        {
          type: "table",
          columns: ["Momento", "Objetivo"],
          rows: [
            ["**Identificar a necessidade**", "Entender qual problema o cliente queria resolver"],
            ["**Conhecer o contexto**", "Aprofundar a situação por meio de perguntas complementares"],
            ["**Apresentar o diagnóstico**", "Interpretar as respostas e indicar um ponto de partida"],
            ["**Construir o plano de ação**", "Explicar quais ações e recursos poderiam ajudar"],
            ["**Orientar a execução**", "Acompanhar as configurações dentro da plataforma"],
          ],
        },
        {
          type: "text",
          body: [
            "Por exemplo, um cliente com contatos parados poderia receber um plano para importar sua base, organizar os contatos, reativar conversas e acompanhar novas oportunidades.",
            "O objetivo era que o cliente entendesse não apenas qual recurso utilizar, mas também por que aquela configuração fazia sentido para sua situação.",
          ],
        },
        {
          type: "gallery",
          columns: 2,
          items: [
            {
              src: `${img}/rascunho-1.jpg`,
              alt: "Rascunho 1: O que sente que precisa melhorar, com quatro situações possíveis",
              width: 1280,
              height: 720,
              label: "1. O que sente que precisa melhorar",
            },
            {
              src: `${img}/rascunho-2.jpg`,
              alt: "Rascunho 2: perguntas de contexto sobre onde estão os contatos e o que dificulta voltar a falar com eles",
              width: 1280,
              height: 720,
              label: "2. Perguntas de contexto",
            },
            {
              src: `${img}/rascunho-3.jpg`,
              alt: "Rascunho 3: diagnóstico, trazer os contatos para a NextApps e organizá-los em grupos",
              width: 1280,
              height: 720,
              label: "3. Diagnóstico",
            },
            {
              src: `${img}/rascunho-4.jpg`,
              alt: "Rascunho 4: micro diagnóstico, começar pela base atual e transformar contatos em oportunidades",
              width: 1280,
              height: 720,
              label: "4. Micro diagnóstico",
            },
            {
              src: `${img}/rascunho-5.jpg`,
              alt: "Rascunho 5: plano de correção, trazer contatos, organizar quem abordar, reativar conversas e acompanhar os interesses",
              width: 1280,
              height: 720,
              label: "5. Plano de correção",
            },
          ],
        },

        { type: "subsection", title: "Do plano de ação à configuração guiada" },
        {
          type: "text",
          body: [
            "Depois de responder às perguntas, o cliente recebia um diagnóstico e um plano de ação correspondente às necessidades identificadas.",
            "Ao aprovar o plano, era direcionado à primeira etapa de configuração dentro da NextApps.",
            "Nesse momento, um walkthrough com spotlight passava a acompanhar a execução, destacando os elementos relevantes da interface.",
            "As orientações conduziam ações como conectar o WhatsApp, criar um funil ou configurar uma IA, dependendo do caminho definido.",
            "Conforme avançava, o cliente recebia instruções relacionadas à etapa seguinte.",
            "Também mantive a possibilidade de avançar sem concluir uma ação e retornar às orientações anteriores.",
            "Essa decisão evitava transformar o walkthrough em uma sequência obrigatória. O cliente podia consultar as instruções e executar as configurações no próprio ritmo.",
          ],
        },
        {
          type: "callout",
          tone: "question",
          text: "A intenção era conectar orientação e execução, reduzindo a distância entre compreender o plano e saber onde realizar cada ação.",
        },

        { type: "subsection", title: "Design e desenvolvimento" },
        {
          type: "text",
          body: [
            "Participei diretamente do desenvolvimento, utilizando Claude Code no VS Code e trabalhando no repositório da NextApps.",
            "O CTO apoiou questões técnicas, enquanto as revisões envolveram o CEO e outros stakeholders.",
            "Essa proximidade entre design e desenvolvimento permitiu ajustar as decisões da experiência às condições técnicas da plataforma durante a implementação.",
            "O trabalho não se limitou à criação de novas telas. Envolveu reorganizar a jornada de contratação, definir regras de navegação, estruturar conteúdos e conectar as orientações às ações disponíveis no produto.",
          ],
        },

        { type: "subsection", title: "Testes de usabilidade" },
        {
          type: "text",
          body: "Após desenvolver a nova experiência, realizei testes moderados com três participantes:",
          bullets: [
            "Um analista interno familiarizado com a plataforma, em uma sessão presencial.",
            "Dois clientes da NextApps, em sessões remotas pelo Google Meet com compartilhamento de tela.",
          ],
          after: [
            "Cada participante começou pelo cadastro de uma conta de teste e percorreu a experiência desde a identificação de sua necessidade até a execução das configurações propostas.",
            "O único trecho excluído foi a inserção do cartão. Portanto, os testes avaliaram a experiência de primeiro uso, mas não o checkout nem a ativação efetiva do período gratuito.",
            "Durante as sessões, observei a navegação sem indicar onde clicar ou como executar as ações.",
          ],
        },
        {
          type: "text",
          heading: "O que os testes mostraram",
          body: [
            "Os três participantes concluíram seus respectivos percursos e executaram as configurações propostas sem minha ajuda.",
            "Quando o caminho exigia conectar o WhatsApp ou criar um funil, essas ações foram realizadas em uma configuração simples.",
            "Também propus uma tarefa adicional a um participante que havia criado uma IA: depois de concluir o onboarding, ele deveria localizar o gerenciamento do agente e desativá-lo.",
            "O participante realizou a ação com sucesso, indicando que conseguiu recuperar e aplicar uma orientação apresentada anteriormente naquela sessão.",
            "Os testes motivaram ajustes pontuais de nomenclatura. Não identifiquei necessidade de mudanças estruturais nos percursos avaliados.",
            "Esses resultados forneceram evidências iniciais de que os participantes conseguiam compreender e executar as tarefas propostas.",
          ],
        },
      ],
    },
    {
      title: "Resultados",
      blocks: [
        {
          type: "metrics",
          tone: "neutral",
          items: [
            { value: "7 de 10", label: "participantes concluíram os percursos sem ajuda" },
            { value: "5", label: "clientes entrevistados" },
            { value: "5", label: "momentos na nova experiência" },
          ],
        },
        {
          type: "text",
          body: [
            "A experiência implementada passou a conectar a necessidade declarada pelo cliente a um diagnóstico, um plano de ação e orientações para realizar as primeiras configurações dentro da NextApps.",
            "Após a implementação, também observei sinais positivos na continuidade dos novos clientes após o período gratuito.",
            "Antes do redesenho, alguns clientes cadastravam o cartão, ativavam os sete dias gratuitos e cancelavam antes da primeira cobrança.",
            "Com a nova jornada em funcionamento, passei a observar novos clientes concluindo o período de teste e permanecendo como clientes pagantes.",
            "Essa mudança percebida na operação sugeriu uma possível melhoria na transição entre experimentação e contratação.",
            "O resultado mais diretamente validado foi a capacidade dos participantes de concluir os percursos e realizar as configurações avaliadas nos testes.",
          ],
        },
      ],
    },
    {
      title: "Aprendizados e próximos passos",
      blocks: [
        {
          type: "text",
          heading: "Dados comportamentais ajudam a questionar hipóteses",
          body: [
            "A primeira proposta foi construída com base em referências e em uma interpretação inicial do problema.",
            "Ao acompanhar seu uso no GA4, encontrei comportamentos que me levaram a revisar essa direção.",
            "O aprendizado não foi que organizar um onboarding por funcionalidades é necessariamente errado, mas que essa abordagem pode não ser adequada quando os clientes ainda não compreendem quais recursos precisam utilizar.",
          ],
        },
        {
          type: "text",
          heading: "Entender o problema pode ser mais útil do que apresentar a ferramenta",
          body: [
            "As conversas com clientes ajudaram a perceber que as necessidades eram descritas em termos da operação: acompanhar equipes, entender vendas, tratar leads e facilitar a comunicação.",
            "Transformar essas situações em pontos de entrada permitiu construir uma experiência mais próxima da forma como os clientes expressavam seus objetivos.",
          ],
        },
        {
          type: "text",
          heading: "Orientação precisa chegar à execução",
          body: [
            "Apresentar um diagnóstico e um plano de ação não seria suficiente se o cliente continuasse sem saber como configurar a plataforma.",
            "Por isso, conectei o plano ao walkthrough, acompanhando as ações dentro do produto.",
            "Os testes reforçaram a importância de avaliar a execução das configurações, e não apenas a navegação pelas orientações.",
          ],
        },
        {
          type: "text",
          heading: "Uma melhoria de experiência pode envolver a jornada inteira",
          body: [
            "O projeto começou como uma atualização de onboarding, mas a análise revelou oportunidades que ultrapassavam essa etapa.",
            "A reorganização do checkout foi uma decisão de produto relacionada à sequência de contratação, enquanto a abordagem por problemas tratava da compreensão e do primeiro uso.",
            "Essa experiência reforçou a importância de investigar o fluxo completo antes de restringir uma solução a uma tela ou funcionalidade.",
          ],
        },
        { type: "subsection", title: "Próximos passos" },
        {
          type: "text",
          body: "Para aprofundar a avaliação da experiência, os próximos passos seriam:",
          bullets: [
            "Comparar períodos equivalentes antes e depois da implementação.",
            "Medir separadamente cadastro, conclusão do checkout, ativação do teste e primeira cobrança.",
            "Acompanhar a conclusão das configurações, além do avanço pelo walkthrough.",
            "Definir uma janela de retenção para avaliar a permanência de clientes pagantes.",
            "Investigar pessoas sem familiaridade prévia com a NextApps e usuários que interrompem a jornada.",
            "Avaliar separadamente, quando viável, o impacto da ordem do checkout e da abordagem orientada por problemas.",
          ],
          after:
            "O projeto mostrou que redesenhar uma experiência não significa apenas reorganizar interfaces. Neste caso, significou revisar hipóteses, investigar necessidades, reconsiderar a sequência da jornada e transformar orientações em ações dentro do produto.",
        },
      ],
    },
  ],
  steps: [
    {
      label: "Desafio",
      title: "Um onboarding que já não mostrava o produto",
      body: "O onboarding pedia para conectar o WhatsApp e criar uma IA, mas a NextApps tinha crescido. A liderança me pediu uma nova experiência de entrada.",
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
      label: "Dados",
      title: "O que o GA4 mostrou",
      body: [
        "A primeira versão era um hub com três caminhos: CRM, IA ou pedir ajuda. No GA4, vi pessoas interrompendo as configurações e alternando entre CRM e IA.",
        "Talvez estivéssemos pedindo uma escolha antes de o cliente saber do que precisava.",
      ],
      visual: [
        {
          type: "table",
          columns: ["Etapa", "Contagem registrada"],
          align: ["left", "right"],
          rows: [
            ["Hub de onboarding", "26"],
            ["Configuração de CRM a partir do hub", "12"],
            ["Configuração de agentes a partir do hub", "6"],
            ["Planos a partir do hub", "8"],
            ["Checkout a partir de planos", "7"],
          ],
        },
      ],
      more: "O que observei no GA4",
    },
    {
      label: "Problema",
      title: "Começar pelo problema, não pela ferramenta",
      body: "Conversei com cinco clientes pelo WhatsApp. Eles descreviam situações da operação, não funcionalidades. Por isso, a nova entrada pergunta o que o cliente sente que precisa melhorar.",
      visual: [
        {
          type: "media",
          items: [
            {
              src: `${img}/tela-necessidade.png`,
              alt: "Tela do onboarding: O que você sente que precisa melhorar? Com quatro situações para escolher",
              width: 679,
              height: 520,
            },
          ],
        },
      ],
      more: "Investigando uma abordagem orientada a problemas",
    },
    {
      label: "Checkout",
      title: "Teste ativado antes do onboarding",
      body: "Também propus antecipar o checkout: quem se cadastra já ativa os sete dias gratuitos e depois faz o onboarding. As duas mudanças foram ao ar juntas.",
      visual: [
        { type: "flow", label: "Antes", steps: ["Site", "Cadastro", "Onboarding", "Checkout"], highlight: [3] },
        { type: "flow", label: "Depois", steps: ["Site", "Cadastro", "Checkout e ativação do teste", "Onboarding"], highlight: [2] },
      ],
      more: "Reorganizando a jornada de contratação",
    },
    {
      label: "Plano",
      title: "Do diagnóstico à configuração guiada",
      body: "Com o CEO, liguei cada problema a perguntas de contexto, um diagnóstico e um plano de ação. Ao aprovar o plano, um walkthrough mostra onde fazer cada configuração na plataforma.",
      visual: [
        { type: "flow", steps: ["Necessidade", "Contexto", "Diagnóstico", "Plano de ação", "Execução"] },
        {
          type: "media",
          items: [
            {
              src: `${img}/rascunho-5.jpg`,
              alt: "Rascunho do plano de correção: trazer contatos, organizar quem abordar, reativar conversas e acompanhar os interesses",
              width: 1280,
              height: 720,
            },
          ],
        },
      ],
      more: "Estruturando os diagnósticos e planos de ação",
    },
    {
      label: "Resultado",
      title: "Percursos concluídos sem ajuda",
      body: "Nos testes moderados, acompanhei cada participante do cadastro às configurações, sem indicar onde clicar. Na operação, passei a ver novos clientes saindo do teste como pagantes.",
      visual: [
        {
          type: "metrics",
          tone: "neutral",
          items: [{ value: "7 de 10", label: "participantes concluíram os percursos sem ajuda" }],
        },
      ],
      more: "Resultados",
    },
  ],
  takeaway: {
    title: "O que aprendi",
    body: [
      "Os dados de uso me fizeram rever a primeira proposta. Entender o problema do cliente foi mais útil do que apresentar a ferramenta.",
      "E a orientação só funciona quando chega à execução: por isso o plano leva direto às configurações.",
    ],
  },
};
