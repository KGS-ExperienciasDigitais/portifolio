import type { CaseStudy } from "./types";

const img = "/images/cases/regua-de-comunicacao";

export const caso1: CaseStudy = {
  slug: "regua-de-comunicacao",
  name: "Régua de comunicação por e-mail",
  title: "Criando uma jornada de comunicação por e-mail do zero",
  subtitle:
    "Como estruturei uma régua de comunicação para acompanhar clientes de uma plataforma SaaS B2B, do cadastro ao pós-pagamento, com redução de chamados percebida pela equipe de suporte.",
  summary:
    "Como estruturei uma régua de comunicação para acompanhar clientes de uma plataforma SaaS B2B, do cadastro ao pós-pagamento, com redução de chamados percebida pela equipe de suporte.",
  cover: { src: `${img}/capa.png`, alt: "Quatro e-mails da régua de comunicação da NextApps com o símbolo da marca ao centro", width: 1920, height: 1200 },
  accent: "#0b875c",
  overview: {
    info: [
      { label: "Empresa", value: "NextApps — SaaS B2B" },
      { label: "Meu papel", value: "Identificação da oportunidade, mapeamento da jornada, priorização, UX Writing e design dos e-mails." },
      { label: "Colaboração", value: "CEO e CTO." },
      { label: "Ferramenta", value: "Figma." },
      { label: "Escopo", value: "18 pontos de contato mapeados e 12 e-mails desenvolvidos para o MVP." },
      { label: "Status", value: "Implementado." },
    ],
  },
  sections: [
    {
      title: "Contexto",
      blocks: [
        {
          type: "text",
          body: [
            "A NextApps é uma startup SaaS B2B de gestão de carteira de clientes que, na época do projeto, tinha três anos de operação.",
            "A plataforma reúne diferentes módulos em um mesmo ambiente, incluindo CRM, gestão de campanhas, automações de mensagens, recursos financeiros, recebimento de pagamentos e cobranças. Também oferece integrações com o WhatsApp oficial e convencional para facilitar a comunicação entre empresas e seus clientes.",
            "Com essa estrutura, os clientes conseguem gerenciar diferentes atividades da operação de forma autônoma.",
            "Como responsável pela área de experiência da NextApps, identifiquei uma oportunidade de melhoria: apesar das funcionalidades disponíveis, a plataforma ainda não contava com uma régua estruturada de comunicação para acompanhar seus próprios clientes nos momentos importantes do relacionamento.",
            "Considerando as práticas de comunicação do mercado e a importância de oferecer clareza em interações relacionadas a pagamentos e contratos, tomei a iniciativa de estruturar esse projeto.",
          ],
        },
        { type: "subsection", title: "O problema" },
        {
          type: "text",
          body: [
            "Embora os clientes conseguissem realizar suas atividades pela plataforma, não existiam comunicações estruturadas para confirmar ações ou explicar acontecimentos importantes, como pagamentos recebidos, cobranças recorrentes e falhas no pagamento.",
            "Essa ausência poderia gerar incertezas sobre o estado da contratação, especialmente em situações que envolviam dinheiro ou exigiam alguma ação do cliente.",
            "O desafio era estabelecer uma comunicação que oferecesse clareza e previsibilidade sem gerar contatos desnecessários.",
          ],
        },
        {
          type: "callout",
          tone: "question",
          text: "Como acompanhar o cliente com informações úteis, nos momentos certos, considerando suas necessidades e a estrutura disponível na empresa?",
        },
      ],
    },
    {
      title: "Processo",
      blocks: [
        { type: "subsection", title: "Pesquisa exploratória e referências" },
        {
          type: "text",
          body: [
            "Como tinha pouca experiência com comunicação por e-mail, comecei investigando o funcionamento das mensagens automatizadas e os eventos que poderiam acionar seus disparos.",
            "Também analisei referências de empresas como Spotify e Vivo, observando como organizavam suas mensagens e orientavam os clientes em diferentes situações.",
            "Três aspectos se destacaram nessa investigação:",
          ],
          bullets: [
            "**Clareza da informação:** apresentar o motivo do contato logo no início da mensagem.",
            "**Orientação à ação:** facilitar a identificação do próximo passo quando alguma ação fosse necessária.",
            "**Adequação ao canal:** considerar o uso de imagens e as diferenças de renderização do HTML entre clientes de e-mail.",
          ],
          after:
            "Esses aprendizados serviram como referência para estruturar o conteúdo e a apresentação visual das comunicações da NextApps.",
        },

        { type: "subsection", title: "Mapeamento da jornada" },
        {
          type: "text",
          body: [
            "Para compreender os momentos em que a comunicação seria relevante, utilizei meu conhecimento da operação e o entendimento dos processos da empresa para mapear os eventos do relacionamento com o cliente.",
            "O levantamento resultou em **18 pontos de contato**, abrangendo cadastro, pagamentos, recorrências, falhas, retentativas, bloqueios, recuperação e pesquisa de satisfação.",
            "Organizei esses eventos em cinco jornadas:",
          ],
          ordered: true,
          bullets: [
            "**Cadastro e primeiro pagamento:** da criação da conta à liberação do acesso.",
            "**Experiência e NPS:** acompanhamento da experiência após o início do uso.",
            "**Cobrança recorrente:** avisos, processamento e resultados das cobranças.",
            "**Recuperação:** inadimplência, bloqueio e regularização do pagamento.",
            "**Renovação:** comunicações relacionadas à continuidade do contrato.",
          ],
          after: [
            "Além dos eventos, considerei diferentes destinatários, como o responsável pela operação da conta e o responsável contratual ou decisor.",
            "Esse mapeamento ajudou a organizar as comunicações de acordo com o momento da jornada, o público envolvido e as informações necessárias.",
          ],
        },
        {
          type: "media",
          items: [
            {
              src: `${img}/pontos-de-contato.png`,
              alt: "Os 18 pontos de contato da régua, do cadastro à renovação, e os dois públicos: responsável pela conta e responsável contratual",
              width: 1742,
              height: 1094,
              caption: "Os 18 pontos de contato mapeados e os dois públicos que recebem as comunicações.",
            },
          ],
        },
        {
          type: "media",
          items: [
            {
              src: `${img}/cinco-jornadas.png`,
              alt: "Mapa das cinco jornadas, cada uma com seus gatilhos, etapas e desfecho esperado",
              width: 1742,
              height: 1221,
              caption: "As cinco jornadas, cada uma com gatilho, etapas e desfecho esperado.",
            },
          ],
        },

        { type: "subsection", title: "Priorização: do mapeamento ao MVP" },
        {
          type: "text",
          body: [
            "Dos 18 pontos de contato identificados, selecionei **12 e-mails para a primeira versão**, considerando a relevância para o cliente, as necessidades da operação e a viabilidade de implementação.",
            "Uma das decisões envolveu o processo de cobrança. A operação previa até cinco tentativas distribuídas ao longo de 15 dias, mas isso não significava que cada tentativa precisaria de uma peça de comunicação exclusiva.",
            "O recorte do MVP contemplou mensagens específicas para situações como pagamento pendente, cobrança recorrente, falha de pagamento, retentativa aprovada, retentativa malsucedida e bloqueio.",
            "Cada comunicação tinha uma finalidade própria, mesmo quando compartilhava informações ou elementos visuais com outras mensagens.",
            "A intenção era construir uma primeira versão que acompanhasse os principais acontecimentos do relacionamento com o cliente, mantendo os demais pontos mapeados como referência para a evolução da régua.",
          ],
        },
        {
          type: "media",
          items: [
            {
              src: `${img}/detalhamento-recorte.png`,
              alt: "Detalhamento dos pontos de contato com quando, quem recebe, canal, objetivo, informações obrigatórias, CTA e tom",
              width: 1721,
              height: 1246,
              zoomSrc: `${img}/detalhamento-completo.png`,
              zoomWidth: 1721,
              zoomHeight: 3880,
              caption: "Recorte com 5 dos 18 pontos de contato. Clique para ver a tabela completa.",
            },
          ],
        },

        { type: "subsection", title: "Conteúdo e tom de voz" },
        {
          type: "text",
          body: [
            "Com os pontos de contato definidos, trabalhei o conteúdo das mensagens considerando o contexto de cada envio.",
            "Uma confirmação de pagamento após o cadastro, por exemplo, representava uma situação diferente da confirmação de uma cobrança recorrente. Da mesma forma, uma falha inicial exigia uma abordagem diferente de uma retentativa malsucedida ou de um pagamento recuperado.",
            "Por isso, procurei adaptar as informações e o tom de voz de cada mensagem à situação vivida pelo cliente.",
            "Nos e-mails de confirmação, o foco estava em comunicar o resultado e esclarecer o estado da contratação ou do pagamento.",
            "Nas situações de falha e inadimplência, priorizei a explicação do problema, as informações relevantes da cobrança e a orientação sobre o que fazer.",
            "O objetivo era manter uma comunicação consistente, sem perder a clareza e a adequação a cada momento.",
          ],
        },

        { type: "subsection", title: "Design dos e-mails" },
        {
          type: "text",
          body: [
            "Desenvolvi os 12 e-mails no Figma, utilizando uma estrutura visual compartilhada para manter a identidade e a consistência entre as comunicações.",
            "A organização priorizou quatro elementos:",
          ],
          bullets: [
            "**Mensagem principal em destaque:** para que o cliente identificasse rapidamente o motivo do contato.",
            "**Informações contextualizadas:** como valor, data, status do pagamento e próximos passos, quando relevantes.",
            "**Chamada para ação clara:** com orientações como concluir pagamento, atualizar cartão, regularizar cobrança ou acessar a plataforma.",
            "**Consistência visual:** mantendo padrões de tipografia, cores, componentes e organização das informações.",
          ],
          after: [
            "Também diferenciei visualmente situações de sucesso, atenção e falha, utilizando títulos, indicadores de estado e elementos gráficos adequados ao contexto.",
            "O cuidado com a linguagem e a hierarquia visual foi especialmente importante nas comunicações financeiras, em que uma informação pouco clara poderia dificultar a compreensão do cliente.",
          ],
        },
        {
          type: "gallery",
          items: [
            { src: `${img}/email-cadastro.png`, alt: "E-mail de cadastro: Sua conta Next foi criada", width: 640, height: 1421, label: "Cadastro" },
            {
              src: `${img}/email-pagamento-confirmado.png`,
              alt: "E-mail de pagamento confirmado: seu acesso foi liberado",
              width: 640,
              height: 1577,
              label: "Pagamento confirmado",
            },
            {
              src: `${img}/email-falha-cobranca.png`,
              alt: "E-mail de falha na cobrança: não foi possível concluir sua cobrança",
              width: 640,
              height: 1650,
              label: "Falha na cobrança",
            },
            {
              src: `${img}/email-conta-bloqueada.png`,
              alt: "E-mail de bloqueio: sua conta foi bloqueada",
              width: 640,
              height: 1581,
              label: "Conta bloqueada",
            },
          ],
        },

        { type: "subsection", title: "Revisão, testes e implementação" },
        {
          type: "text",
          body: [
            "Com o projeto estruturado e os layouts desenvolvidos, apresentei a proposta ao CEO e ao CTO para revisão.",
            "Essa etapa permitiu avaliar o trabalho considerando os processos da empresa e suas possibilidades técnicas.",
            "Após a validação, também realizei testes para verificar como os e-mails se comportavam em desktop, mobile e diferentes dispositivos, identificando pontos que precisavam de ajustes na apresentação.",
            "Os 12 e-mails foram implementados, estabelecendo uma régua de comunicação que antes não existia na plataforma.",
          ],
        },
        {
          type: "callout",
          tone: "note",
          text: "A validação envolveu stakeholders e verificações de apresentação dos e-mails. Não foram realizados testes de usabilidade com clientes nessa etapa.",
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
            { value: "18", label: "pontos de contato mapeados" },
            { value: "5", label: "jornadas organizadas" },
            { value: "12", label: "e-mails implementados" },
          ],
        },
        {
          type: "text",
          body: [
            "A principal entrega foi a implementação de **12 comunicações estruturadas**, cobrindo diferentes momentos do relacionamento com o cliente.",
            "A iniciativa estabeleceu uma base de comunicação para situações que anteriormente não eram acompanhadas por uma régua de e-mails.",
            "Após a implementação, a equipe de suporte relatou perceber uma redução nos chamados relacionados à cobrança e à recorrência durante o atendimento diário.",
          ],
        },
        {
          type: "callout",
          tone: "note",
          text: "Esse resultado foi qualitativo. Não houve comparação quantitativa do volume de chamados antes e depois da implementação, portanto não é possível calcular uma redução percentual ou atribuir o efeito exclusivamente aos e-mails.",
        },
        {
          type: "text",
          body: "Ainda assim, a percepção da equipe representou um sinal positivo sobre a utilidade das comunicações implementadas.",
        },
      ],
    },
    {
      title: "Aprendizados e próximos passos",
      blocks: [
        {
          type: "text",
          body: [
            "Esse projeto reforçou minha compreensão de que a experiência do cliente não acontece apenas dentro da interface de um produto.",
            "Em uma plataforma de autosserviço, a comunicação também faz parte da jornada e pode ajudar as pessoas a compreender acontecimentos importantes, acompanhar suas contratações e identificar quando precisam agir.",
            "Aprendi também a importância de estruturar a comunicação antes de desenvolver as peças visuais, considerando eventos, destinatários, conteúdo e contexto de envio.",
            "A pesquisa de referências ampliou meu repertório sobre comunicação transacional, enquanto o desenvolvimento e os testes reforçaram a necessidade de equilibrar clareza, consistência visual e limitações técnicas do canal.",
            "Por fim, o projeto demonstrou a importância de transformar uma oportunidade identificada na experiência em uma entrega viável para o negócio.",
          ],
        },
        { type: "subsection", title: "Possibilidades de evolução" },
        {
          type: "text",
          body: "Com a primeira versão implementada, algumas oportunidades permaneceram para uma evolução futura:",
          bullets: [
            "Comparar quantitativamente os chamados de suporte relacionados à cobrança e à recorrência.",
            "Investigar com clientes a clareza das mensagens e dos próximos passos.",
            "Acompanhar indicadores de entrega e interação com os e-mails.",
            "Reavaliar os pontos de contato que não receberam comunicações próprias no MVP.",
          ],
          after:
            "Essas iniciativas poderiam ajudar a compreender melhor o impacto da régua e orientar ajustes baseados no comportamento real dos clientes.",
        },
      ],
    },
  ],
};
