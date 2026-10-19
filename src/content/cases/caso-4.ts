import type { CaseMedia, CaseStudy } from "./types";

const img = "/images/cases/reformulacao-aba-corretor";

const guidingQuestion =
  "Como dar mais autonomia ao corretor para complementar documentos sem perder a clareza das responsabilidades, o acompanhamento e a rastreabilidade da pendência?";

const subtitle =
  "Como reformulei a experiência de envio e acompanhamento de documentos para dar mais autonomia aos corretores e reduzir a dependência de devolutivas entre áreas.";

// Slides da apresentação original, todos em 1280×720. No 03 e no 15 os dados pessoais estão tarjados; no 11, desfocados.
const slide = (n: string, alt: string): CaseMedia => ({ src: `${img}/reformulacao-corretores-${n}.jpg`, alt, width: 1280, height: 720 });

const slides = {
  demand: slide(
    "02",
    "Demanda da Aceitação: otimizar o local e o processo de envio de documentos, sem confundir o corretor nem gerar interações manuais desnecessárias, e permitir o envio independentemente de quem estiver responsável pela pendência",
  ),
  before: slide(
    "03",
    "A aba de pendências antes da reformulação, com três botões de ação e notas sobre a ordem das colunas, o uso dos botões e onde inserir o envio de documentos; usuário e nome do arquivo tarjados",
  ),
  list: slide("04", "Etapa 1: a lista reordenada, com os três botões trocados pela ação Tratar Pendência e um novo ícone de histórico"),
  upload: slide("05", "Etapa 2: a janela Tratar pendência com três arquivos selecionados, contador de arquivos, um x para excluir cada um e o botão Enviar"),
  attach: slide(
    "06",
    "Etapa 3: com a pendência sob responsabilidade da Liberty, a ação mostra Em análise e o corretor ganha a coluna Anexar documento",
  ),
  complement: slide(
    "07",
    "Etapa 4: o corretor anexa o documento esquecido com uma observação, sem gerar um novo workflow; o contador passa a quatro arquivos",
  ),
  history: slide("08", "Etapa 5: o histórico da pendência, com títulos em destaque e linhas divisórias entre as atualizações"),
  close: slide("09", "Etapa 6: na janela da Aceitação, Enviar pede um arquivo que falta e Concluir encerra a pendência"),
  closed: slide("10", "Etapa 7: a pendência concluída, com o ícone de anexar desabilitado e o histórico ainda disponível"),
  final: slide("11", "Tela final do cotador, com a nova aba de pendências entre as ocorrências da proposta"),
  testGoal: slide(
    "13",
    "Objetivo do teste: entender como corretores e analistas interagem com a interface e se as mudanças geram dificuldades, com o gráfico da Nielsen Norman Group sobre testar com cinco usuários",
  ),
  testMethod: slide(
    "14",
    "Como os testes foram feitos: protótipo no Figma, testes no Maze e sessões assistidas pelo Teams, de 8 a 14 de maio de 2024, com corretores e analistas internos e 14 a 20 minutos por sessão",
  ),
  feedback: slide(
    "15",
    "Comentários dos participantes, com os nomes tarjados: enviar documentos a qualquer momento, anexar mais de um documento com o workflow na fila da Liberty, a sugestão de um atendente para dúvidas e elogios à simplicidade",
  ),
} satisfies Record<string, CaseMedia>;

export const caso4: CaseStudy = {
  slug: "reformulacao-aba-corretor",
  name: "Reformulação da aba de pendências",
  title: "Simplificando o tratamento de pendências no cotador Auto",
  subtitle,
  summary: subtitle,
  cover: {
    src: `${img}/capa.png`,
    alt: "Três telas da proposta: o cotador com a nova aba de pendências, a janela de envio com três arquivos selecionados e o histórico da pendência",
    width: 1920,
    height: 1200,
  },
  overview: {
    info: [
      { label: "Empresa", value: "Liberty Seguros — Grupo HDI" },
      { label: "Projeto", value: "Reformulação da aba de pendências do cotador Auto" },
      { label: "Período", value: "Maio de 2024" },
      {
        label: "Meu papel",
        value:
          "Investigação, UX Research, análise de fluxos, estratégia da experiência, UX/UI Design, prototipação, testes de usabilidade e handoff",
      },
      { label: "Colaboração", value: "Squad de seguros Auto, área de Aceitação, corretores e analistas internos" },
      { label: "Ferramentas", value: "Figma, Maze e Microsoft Teams" },
      { label: "Validação", value: "5 participantes: 3 corretores e 2 analistas internos" },
      { label: "Status", value: "Solução validada em testes e entregue para desenvolvimento; implementação não confirmada" },
    ],
  },
  sections: [
    {
      title: "Contexto",
      blocks: [
        {
          type: "text",
          body: [
            "Na época do projeto, eu integrava a squad de seguros Auto da Liberty Seguros.",
            "A área de Aceitação havia identificado dificuldades no processo de tratamento de pendências documentais e encaminhado uma demanda para nossa equipe, que passou a fazer parte do backlog.",
            "Essas pendências surgiam quando era necessário solicitar, revisar ou complementar documentos durante a operação de seguros.",
            "O processo envolvia corretores, responsáveis pelo envio das informações, e analistas internos, responsáveis por avaliar a documentação recebida.",
            "Quando um documento estava incorreto ou faltava algum arquivo, a resolução dependia de novas interações entre as partes.",
            "A demanda inicial buscava melhorar esse processo. Minha participação começou quando a squad assumiu o trabalho e se estendeu até a concepção, validação e entrega da solução para desenvolvimento.",
          ],
        },
        { type: "subsection", title: "O desafio" },
        {
          type: "text",
          body: [
            "No fluxo existente, o tratamento das pendências dependia de quem estava responsável pela próxima ação.",
            "O corretor enviava os documentos solicitados e a área de Aceitação realizava a análise. Caso algum arquivo estivesse incorreto ou incompleto, era necessário comunicar o problema e solicitar uma nova complementação.",
            "Na prática, essas devolutivas poderiam prolongar o processo.",
            "Um documento enviado incorretamente, por exemplo, precisava ser analisado antes que a inconsistência fosse comunicada ao corretor. A partir daí, o andamento dependia de uma nova resposta e de outras interações no workflow.",
            "**O problema não estava apenas no envio do arquivo, mas na dependência de movimentações entre as partes para corrigir uma pendência.**",
          ],
        },
        {
          type: "callout",
          tone: "question",
          text: guidingQuestion,
        },
      ],
    },
    {
      title: "Processo",
      blocks: [
        { type: "subsection", title: "Entendendo o problema com a operação" },
        {
          type: "text",
          body: [
            "Depois que a squad assumiu a demanda, participei das conversas com as áreas envolvidas e com corretores para compreender como o tratamento das pendências acontecia.",
            "Aprofundei especialmente a investigação com as analistas da área de Aceitação, buscando entender o que acontecia quando um documento precisava ser corrigido ou complementado.",
            "As conversas mostraram que o processo poderia exigir diferentes devolutivas até que a documentação estivesse adequada para análise.",
            "Também ficou evidente que uma parte da dificuldade estava relacionada às permissões de interação com a pendência.",
            "Quando a responsabilidade estava com a seguradora, o corretor não tinha a mesma liberdade para complementar os arquivos, o que podia exigir uma nova movimentação no workflow.",
            "Essa observação explicava o pedido da Aceitação: a possibilidade de enviar documentos estava vinculada à responsabilidade atual pela pendência.",
          ],
        },
        {
          type: "media",
          items: [{ ...slides.before, caption: "A aba de pendências antes da reformulação e os pontos analisados. Dados pessoais tarjados." }],
        },

        { type: "subsection", title: "A principal oportunidade de melhoria" },
        {
          type: "text",
          body: "A demanda da Aceitação já apontava a direção: permitir que o corretor enviasse documentos **independentemente de quem estivesse responsável pela pendência**, enquanto ela não estivesse concluída.",
        },
        {
          type: "media",
          items: [{ ...slides.demand, caption: "A demanda da Aceitação: a solicitação, o funcionamento do fluxo e o que se esperava da reformulação." }],
        },
        {
          type: "text",
          body: "A investigação mostrou por que esse pedido importava. No fluxo existente, duas ações estavam muito relacionadas:",
          bullets: ["A responsabilidade por analisar e tratar a pendência.", "A possibilidade de complementar os documentos associados a ela."],
          after: [
            "Separá-las permitiria ao corretor enviar arquivos adicionais sem depender de uma devolução da pendência apenas para realizar o anexo. Enquanto isso, a área de Aceitação continuaria responsável pelo tratamento e acompanhamento da solicitação.",
            "Meu trabalho foi transformar esse pedido em uma experiência: definir onde a nova ação ficaria na aba, quais regras valeriam em cada estado da pendência e como corretores e analistas acompanhariam o que fosse enviado.",
            "A hipótese era que essa flexibilidade reduziria interações operacionais desnecessárias e facilitaria a correção de documentos.",
          ],
        },

        { type: "subsection", title: "Da oportunidade à reformulação do fluxo" },
        {
          type: "text",
          body: [
            "A partir dessa direção, passei a trabalhar na reformulação da aba de pendências do cotador Auto.",
            "A proposta precisava oferecer mais autonomia aos corretores, mas também manter informações suficientes para que ambas as partes compreendessem o estado da pendência.",
            "O trabalho envolveu tanto a organização da interface quanto os comportamentos e regras de interação, em um fluxo de sete etapas, da abertura da pendência ao encerramento.",
          ],
        },
        {
          type: "text",
          heading: "Simplificar a lista de pendências",
          body: [
            "Reorganizei a apresentação das informações para facilitar a identificação e o tratamento de cada pendência.",
            "A proposta também simplificava as ações disponíveis, substituindo a distribuição anterior de três botões por uma ação principal de **“Tratar Pendência”**.",
            "A intenção era reduzir a quantidade de decisões apresentadas diretamente na listagem e concentrar as operações relacionadas em uma experiência mais clara.",
          ],
        },
        {
          type: "media",
          items: [{ ...slides.list, caption: "Etapa 1: colunas reordenadas, uma única ação e o novo ícone de histórico." }],
        },
        {
          type: "text",
          heading: "Facilitar o envio de documentos",
          body: [
            "A nova experiência permitia selecionar e anexar múltiplos documentos, com indicação da quantidade de arquivos escolhidos.",
            "Essa melhoria buscava tornar a interação mais compreensível, especialmente em situações que exigiam o envio de vários arquivos para resolver uma única pendência.",
          ],
        },
        {
          type: "media",
          items: [{ ...slides.upload, caption: "Etapa 2: vários arquivos de uma vez, com contador e opção de excluir cada um." }],
        },
        {
          type: "text",
          heading: "Permitir complementação sem devolução",
          body: [
            "Essa foi a principal mudança funcional do projeto.",
            "Depois do envio, a pendência volta para a Aceitação e a ação passa a mostrar “Em análise”. Para o corretor, aparece a coluna **“Anexar documento”**, disponível mesmo com a pendência fora da sua responsabilidade.",
            "Se ele esquecer um arquivo, vê o que já foi anexado, adiciona o que falta e pode deixar uma observação. Esse complemento não gera uma nova movimentação no workflow e fica registrado no histórico.",
          ],
        },
        {
          type: "media",
          items: [{ ...slides.attach, caption: "Etapa 3: com a pendência em análise, o corretor ganha a coluna “Anexar documento”." }],
        },
        {
          type: "media",
          items: [{ ...slides.complement, caption: "Etapa 4: o documento esquecido entra com uma observação, sem gerar um novo workflow." }],
        },
        {
          type: "text",
          heading: "Preservar o acompanhamento",
          body: [
            "A reformulação também contemplava a visualização das atualizações e do histórico da pendência.",
            "Esse cuidado era importante porque oferecer mais liberdade para adicionar arquivos não poderia prejudicar a compreensão sobre o que já havia sido enviado ou sobre o andamento da análise.",
          ],
        },
        {
          type: "media",
          items: [{ ...slides.history, caption: "Etapa 5: o histórico, com títulos em destaque e linhas entre as atualizações." }],
        },
        {
          type: "text",
          heading: "Tornar a conclusão mais clara",
          body: [
            "A proposta considerava o encerramento da pendência após o atendimento dos requisitos e a indisponibilidade de novas ações quando ela estivesse concluída.",
            "Essa regra ajudava a diferenciar uma pendência ainda em tratamento de outra que já havia encerrado seu ciclo.",
          ],
        },
        {
          type: "media",
          items: [{ ...slides.close, caption: "Etapa 6: a Aceitação pode pedir um arquivo que falta (Enviar) ou encerrar a pendência (Concluir)." }],
        },
        {
          type: "media",
          items: [{ ...slides.closed, caption: "Etapa 7: pendência concluída, com o anexo desabilitado e o histórico ainda disponível." }],
        },

        { type: "subsection", title: "Uma melhoria além da interface" },
        {
          type: "text",
          body: [
            "A principal mudança do projeto não foi visual.",
            "A reformulação de botões, listagens e componentes ajudava a tornar a experiência mais simples, mas a mudança com maior potencial de impacto estava na lógica operacional.",
            "Essa proposta beneficiaria dois públicos:",
          ],
        },
        {
          type: "table",
          columns: ["Público", "Necessidade atendida"],
          rows: [
            ["Corretores", "Complementar documentos com mais autonomia e acompanhar a pendência com clareza"],
            ["Analistas de Aceitação", "Receber informações adicionais sem depender de movimentações desnecessárias no workflow"],
          ],
        },
        {
          type: "text",
          body: [
            "A melhoria esperada envolvia menos esforço de interação, maior clareza do processo e possível redução do tempo de resolução.",
            "Esses benefícios eram hipóteses da solução e ainda precisariam ser medidos após uma eventual implementação.",
          ],
        },

        { type: "subsection", title: "Prototipando a nova experiência" },
        {
          type: "text",
          body: [
            "Com a estrutura definida, desenvolvi a proposta de interface no Figma.",
            "O protótipo representava o fluxo completo de tratamento de pendências, da listagem à conclusão.",
            "Busquei organizar a experiência de modo que os usuários conseguissem compreender o que estava acontecendo e executar as ações necessárias sem precisar interpretar regras complexas do workflow.",
            "A proposta foi apresentada às analistas da área de Aceitação e recebeu uma avaliação positiva.",
            "Essa recepção inicial reforçou a pertinência do caminho escolhido e abriu espaço para a validação com usuários dos dois lados do processo.",
          ],
        },
        {
          type: "media",
          items: [{ ...slides.final, caption: "A tela final do cotador, com a nova aba de pendências entre as ocorrências da proposta." }],
        },

        { type: "subsection", title: "Planejando os testes de usabilidade" },
        {
          type: "text",
          body: [
            "Depois de desenvolver o protótipo, fiquei responsável por planejar e conduzir toda a avaliação de usabilidade.",
            "Defini a metodologia, preparei as tarefas, organizei as sessões e analisei os resultados.",
            "Os testes aconteceram entre **8 e 14 de maio de 2024**, com cinco participantes: três corretores e dois analistas internos.",
            "Utilizei o Figma para apresentar a proposta, o Maze para estruturar a avaliação e o Microsoft Teams para acompanhar as sessões assistidas.",
            "As sessões documentadas tiveram duração aproximada de 14 a 20 minutos.",
            "O objetivo era observar se os participantes compreendiam a nova lógica e conseguiam utilizar os fluxos propostos para tratar as pendências.",
          ],
        },
        {
          type: "media",
          items: [{ ...slides.testGoal, caption: "O objetivo do teste e a referência da Nielsen Norman Group para o tamanho da amostra." }],
        },
        {
          type: "media",
          items: [{ ...slides.testMethod, caption: "Ferramentas, período, público e duração das sessões." }],
        },

        { type: "subsection", title: "Aprofundando a pesquisa com IA" },
        {
          type: "text",
          body: [
            "Durante o planejamento dos testes, também utilizei um recurso de inteligência artificial disponível no Maze para aprofundar respostas qualitativas.",
            "Eu selecionava previamente os campos da pesquisa nos quais esse recurso poderia ser utilizado.",
            "Quando o participante respondia a uma dessas perguntas, a IA formulava automaticamente uma pergunta complementar com base no conteúdo da resposta.",
            "Por exemplo, diante de um comentário sobre dificuldade ou frustração, o recurso poderia solicitar mais detalhes sobre o que havia provocado aquela percepção.",
            "Dessa forma, era possível explorar respostas com maior profundidade sem precisar antecipar manualmente todas as perguntas de acompanhamento.",
            "Minha responsabilidade continuou sendo definir os objetivos da pesquisa, selecionar os momentos adequados para o aprofundamento e interpretar os resultados.",
            "A IA funcionou como apoio à coleta qualitativa, não como substituta da análise de UX Research.",
          ],
        },

        { type: "subsection", title: "O que os testes mostraram" },
        {
          type: "text",
          body: [
            "Todos os participantes compreenderam a lógica da reformulação e conseguiram utilizar os fluxos avaliados sem dificuldades observadas durante as sessões.",
            "Não identifiquei problemas que exigissem alterações estruturais no protótipo após os testes.",
            "Além da observação das interações, pedi que cada participante avaliasse, de 0 a 10, quanto a reformulação impactaria seu dia a dia.",
            "Os comentários abertos destacaram a autonomia para complementar documentos e trouxeram uma sugestão: um caminho para falar com um atendente em caso de dúvida.",
          ],
        },
        {
          type: "media",
          items: [{ ...slides.feedback, caption: "Comentários dos participantes, com os nomes tarjados." }],
        },

        { type: "subsection", title: "Handoff e entrega" },
        {
          type: "text",
          body: [
            "Após concluir os testes, consolidei os resultados na apresentação do projeto e preparei o handoff de design.",
            "Compartilhei o material da avaliação e o arquivo do Figma com as equipes envolvidas, documentando a experiência proposta para dar continuidade ao desenvolvimento.",
            "A entrega contemplou os fluxos, as interfaces e os comportamentos previstos para o tratamento das pendências.",
          ],
        },
      ],
    },
    {
      title: "Resultados e impacto",
      blocks: [
        {
          type: "metrics",
          label: "Quanto a reformulação impacta o seu dia a dia? (de 0 a 10)",
          tone: "neutral",
          items: [
            { value: "10", label: "nota de 4 participantes" },
            { value: "9", label: "nota de 1 participante" },
            { value: "9,8", label: "média" },
          ],
        },
        {
          type: "text",
          body: [
            "O projeto resultou em uma proposta de reformulação da aba de pendências do cotador Auto, fundamentada nas necessidades levantadas com a operação e avaliada com corretores e analistas internos.",
            "A avaliação indicou uma percepção bastante positiva da proposta, coerente com a recepção do protótipo pelas analistas da Aceitação.",
            "Entretanto, os testes usaram um protótipo e uma amostra pequena: a nota representa **impacto percebido**, e não uma medição de redução do tempo de tratamento das pendências em produção.",
            "Da mesma forma, a ausência de dificuldades observadas indica que os percursos avaliados foram compreendidos por aqueles participantes, mas não elimina a possibilidade de problemas em outros cenários de uso.",
            "Como a implementação não foi confirmada e não tenho dados operacionais posteriores, não é possível afirmar que houve a redução esperada de devolutivas e do tempo de resolução.",
          ],
        },
      ],
    },
    {
      title: "Aprendizados e próximos passos",
      blocks: [
        {
          type: "text",
          heading: "O problema real nem sempre está na interface",
          body: [
            "A demanda chegou como uma necessidade de reformulação da aba de pendências e já trazia a regra desejada.",
            "As conversas com as analistas mostraram por que ela importava: parte importante da dificuldade estava na dependência de transferências de responsabilidade para realizar determinadas ações.",
            "Isso reforçou a importância de investigar as regras e o processo por trás da interface antes de definir uma solução.",
          ],
        },
        {
          type: "text",
          heading: "Autonomia precisa vir acompanhada de clareza",
          body: [
            "Permitir que o corretor complementasse documentos poderia facilitar sua rotina, mas a solução também precisava preservar o acompanhamento das pendências pela área interna.",
            "Por isso, as decisões de interface consideraram histórico, estados e ações disponíveis ao longo do processo.",
          ],
        },
        {
          type: "text",
          heading: "Envolver diferentes públicos melhora a avaliação",
          body: [
            "O fluxo atendia tanto corretores quanto analistas internos.",
            "Testar com representantes desses dois públicos permitiu observar a compreensão da proposta sob perspectivas diferentes e coletar percepções relacionadas às suas rotinas.",
          ],
        },
        {
          type: "text",
          heading: "IA pode aprofundar a pesquisa sem substituir o pesquisador",
          body: [
            "O recurso do Maze ajudou a explorar respostas qualitativas com perguntas complementares geradas automaticamente.",
            "A experiência reforçou que ferramentas de IA podem apoiar a investigação quando utilizadas com um objetivo claro e integradas a uma metodologia conduzida pelo pesquisador.",
          ],
        },
        {
          type: "text",
          heading: "Validar uma proposta não é o mesmo que medir seu impacto",
          body: [
            "Os testes mostraram boa compreensão dos fluxos e uma avaliação positiva do impacto esperado.",
            "Entretanto, para comprovar ganhos de eficiência operacional, seria necessário acompanhar a experiência depois de implementada.",
            "Essa distinção é importante para comunicar os resultados com precisão.",
          ],
        },
        { type: "subsection", title: "Próximos passos" },
        {
          type: "text",
          body: "Caso a solução fosse retomada para implementação ou avaliação posterior, os próximos passos seriam:",
          bullets: [
            "Confirmar as regras de negócio para envio complementar de documentos.",
            "Avaliar cenários de exceção e possíveis conflitos entre anexos e análise em andamento.",
            "Acompanhar o tempo médio de resolução das pendências.",
            "Medir a frequência de devolutivas e movimentações no workflow.",
            "Monitorar o uso da funcionalidade de complementação de documentos.",
            "Investigar eventuais dificuldades após o lançamento.",
          ],
          after:
            "O projeto mostrou que melhorar uma experiência pode exigir mais do que reorganizar telas. Neste caso, a principal oportunidade estava em uma dependência do processo, e o trabalho foi transformá-la em uma forma mais simples de interação entre corretores e analistas.",
        },
      ],
    },
  ],
  steps: [
    {
      label: "Desafio",
      title: "Correções que dependiam de idas e vindas",
      body: "Quando um documento vinha errado ou incompleto, a correção dependia de novas devolutivas entre o corretor e a Aceitação. Cada ajuste podia virar uma nova movimentação no workflow.",
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
      label: "Demanda",
      title: "Separar quem analisa de quem anexa",
      body: "A Aceitação pediu que o corretor pudesse enviar documentos independentemente de quem estivesse responsável pela pendência. As conversas mostraram o porquê: anexar estava preso a essa responsabilidade.",
      visual: [{ type: "media", items: [slides.demand] }],
      more: "A principal oportunidade de melhoria",
    },
    {
      label: "Fluxo",
      title: "Anexar sem devolver a pendência",
      body: "Com a pendência em análise, o corretor ganha a coluna “Anexar documento”. O complemento entra no histórico sem gerar uma nova movimentação no workflow.",
      visual: [{ type: "media", items: [slides.attach] }],
      more: "Da oportunidade à reformulação do fluxo",
    },
    {
      label: "Interface",
      title: "Uma ação no lugar de três botões",
      body: "Na lista, os botões de ação viraram um só, “Tratar Pendência”. No envio, o corretor anexa vários arquivos de uma vez e vê quantos escolheu.",
      visual: [{ type: "media", items: [slides.list] }],
      more: "Da oportunidade à reformulação do fluxo",
    },
    {
      label: "Testes",
      title: "Testado com os dois lados do processo",
      body: "Planejei e conduzi testes assistidos com corretores e analistas internos, no Maze e pelo Teams. A IA do Maze aprofundava as respostas abertas com perguntas de acompanhamento.",
      visual: [{ type: "media", items: [slides.feedback] }],
      more: "Planejando os testes de usabilidade",
    },
    {
      label: "Resultado",
      title: "Fluxos compreendidos, impacto bem avaliado",
      body: "Os testes não pediram mudanças estruturais, e a solução foi entregue para desenvolvimento. A nota mede impacto percebido: a implementação não foi confirmada.",
      visual: [
        {
          type: "metrics",
          tone: "neutral",
          items: [
            { value: "5 de 5", label: "participantes usaram os fluxos sem dificuldades observadas" },
            { value: "9,8", label: "média do impacto esperado no dia a dia, de 0 a 10" },
          ],
        },
      ],
      more: "Resultados e impacto",
    },
  ],
  takeaway: {
    title: "O que aprendi",
    body: [
      "Parte do problema estava numa regra do processo, não na tela: separar quem trata a pendência de quem pode anexar dá autonomia ao corretor sem tirar o acompanhamento da Aceitação.",
      "Validar não é medir: a nota mostra impacto percebido, e comprovar ganho de eficiência exigiria acompanhar a solução em produção.",
    ],
  },
};
