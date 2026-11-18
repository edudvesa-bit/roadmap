const skillsData = [
  // ==========================================
  // GALÁXIA 1: NEBULA DOS FUNDAMENTOS (X: 100 - 450)
  // ==========================================
  {
    id: "git-github",
    name: "Git & GitHub Avançado",
    galaxy: "fundamentos",
    galaxyName: "Nébula dos Fundamentos",
    x: 150,
    y: 350,
    description: "Domine o controle de versão. Entenda como o Git funciona por baixo dos panos, como gerenciar ramificações de forma profissional e colaborar em equipes de alto nível.",
    checklist: [
      "Compreender a estrutura interna do diretório .git (objetos, referências, HEAD)",
      "Dominar comandos de ramificação avançados (merge vs. rebase)",
      "Aprender a fazer Rebase Interativo (git rebase -i) para limpar histórico",
      "Utilizar Cherry-pick para mover commits específicos",
      "Resolver conflitos complexos no terminal",
      "Implementar fluxos de trabalho (GitFlow, Trunk-Based Development)",
      "Criar Pull Requests profissionais com boas descrições"
    ],
    resources: [
      { name: "Git Book (Oficial)", url: "https://git-scm.com/book/pt-br/v2" },
      { name: "Oh My Git! (Jogo interativo)", url: "https://ohmygit.org/" },
      { name: "Visualizing Git (Simulador)", url: "https://git-school.github.io/visualizing-git/" }
    ],
    quest: {
      question: "Qual a diferença fundamental entre 'git merge' e 'git rebase' ao integrar alterações de uma branch secundária na principal?",
      options: [
        "O merge cria um novo commit de mesclagem mantendo o histórico cronológico exato, enquanto o rebase reaplica os commits por cima da branch alvo, reescrevendo o histórico para torná-lo linear.",
        "O rebase apaga a branch secundária permanentemente, enquanto o merge a mantém para referência futura.",
        "O merge é executado apenas localmente, enquanto o rebase exige conexão ativa com o servidor remoto (GitHub).",
        "O rebase copia apenas arquivos alterados, enquanto o merge junta todo o repositório em um arquivo ZIP."
      ],
      correctAnswer: 0
    },
    prerequisites: []
  },
  {
    id: "logica-ed",
    name: "Lógica, Estruturas de Dados & Complexidade",
    galaxy: "fundamentos",
    galaxyName: "Nébula dos Fundamentos",
    x: 300,
    y: 500,
    description: "O motor de qualquer software. Aprenda a analisar o consumo de tempo e memória dos seus algoritmos (Big-O) e escolha as estruturas de dados certas para cada problema.",
    checklist: [
      "Aprender a notação Big-O para avaliar tempo e espaço",
      "Implementar e entender Listas Encadeadas (simples e duplas)",
      "Dominar Pilhas (LIFO) e Filas (FIFO) e suas aplicações reais",
      "Compreender Tabelas Hash e técnicas de resolução de colisões",
      "Estudar Árvores Binárias de Busca (BST) e algoritmos de travessia",
      "Comparar algoritmos de ordenação (QuickSort vs. MergeSort)",
      "Aprender Busca Binária e sua eficiência O(log n)"
    ],
    resources: [
      { name: "Big-O Cheat Sheet", url: "https://www.bigocheatsheet.com/" },
      { name: "VisuAlgo (Visualização de Algoritmos)", url: "https://visualgo.net/" },
      { name: "Exercícios no LeetCode (Fáceis/Médios)", url: "https://leetcode.com/" }
    ],
    quest: {
      question: "Em uma Tabela Hash ideal (sem colisões frequentes), qual a complexidade de tempo de busca, inserção e remoção no pior caso e no caso médio, respectivamente?",
      options: [
        "Caso médio O(log n) e Pior caso O(n)",
        "Caso médio O(1) e Pior caso O(n)",
        "Caso médio O(1) e Pior caso O(1)",
        "Caso médio O(n) e Pior caso O(n²)"
      ],
      correctAnswer: 1
    },
    prerequisites: ["git-github"]
  },
  {
    id: "paradigmas",
    name: "Paradigmas de Programação",
    galaxy: "fundamentos",
    galaxyName: "Nébula dos Fundamentos",
    x: 450,
    y: 350,
    description: "Entenda as diferentes formas de pensar e estruturar seu código. Domine as nuances da Programação Orientada a Objetos e da Programação Funcional.",
    checklist: [
      "Dominar os 4 pilares da POO (Encapsulamento, Abstração, Herança, Polimorfismo)",
      "Entender a diferença entre Classes Abstratas e Interfaces",
      "Aplicar composição em vez de herança sempre que possível",
      "Compreender conceitos de Programação Funcional: Funções puras e Imutabilidade",
      "Usar funções de alta ordem (map, filter, reduce)",
      "Evitar efeitos colaterais (side effects) e manter transparência referencial"
    ],
    resources: [
      { name: "Composição vs Herança (Vídeo clássico)", url: "https://www.youtube.com/watch?v=wfMtDGfHWpA" },
      { name: "Functional-Light JS (Livro)", url: "https://github.com/getify/Functional-Light-JS" }
    ],
    quest: {
      question: "O que caracteriza uma 'Função Pura' no paradigma da Programação Funcional?",
      options: [
        "Uma função que não aceita argumentos e sempre retorna o mesmo valor constante.",
        "Uma função que altera variáveis globais mas executa de forma muito rápida.",
        "Uma função que, dados os mesmos argumentos, sempre retorna o mesmo resultado e não produz efeitos colaterais fora de seu escopo.",
        "Uma função escrita sem o uso de estruturas condicionais (if/else)."
      ],
      correctAnswer: 2
    },
    prerequisites: ["logica-ed"]
  },
  {
    id: "apis-web",
    name: "APIs & Protocolo HTTP",
    galaxy: "fundamentos",
    galaxyName: "Nébula dos Fundamentos",
    x: 450,
    y: 650,
    description: "Entenda a espinha dorsal da web. Saiba como sistemas conversam na internet usando o protocolo HTTP e construa APIs RESTful eficientes.",
    checklist: [
      "Dominar a estrutura de requisições e respostas HTTP (Headers, Body, Verbos)",
      "Entender e aplicar a semântica correta dos status codes (2xx, 3xx, 4xx, 5xx)",
      "Compreender as restrições arquiteturais do REST (Stateless, Uniform Interface)",
      "Identificar quais verbos HTTP são seguros e idempotentes",
      "Trabalhar com JSON de forma eficiente",
      "Configurar regras de CORS (Cross-Origin Resource Sharing)",
      "Implementar conceitos básicos de Rate Limiting para proteção"
    ],
    resources: [
      { name: "MDN: Visão Geral do HTTP", url: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Overview" },
      { name: "RESTful API Tutorial", url: "https://restfulapi.net/" },
      { name: "Postman API Network", url: "https://www.postman.com/explore" }
    ],
    quest: {
      question: "O que significa dizer que um método HTTP é 'idempotente'?",
      options: [
        "Significa que a requisição é encriptada por padrão antes de ser enviada.",
        "Significa que múltiplos disparos idênticos dessa requisição produzem o mesmo efeito no estado do servidor que um único disparo.",
        "Significa que a resposta é obrigatoriamente retornada em menos de 100 milissegundos.",
        "Significa que o servidor deleta os dados da requisição logo após enviá-la ao banco de dados."
      ],
      correctAnswer: 1
    },
    prerequisites: ["logica-ed"]
  },
  {
    id: "sql-bd",
    name: "Bancos de Dados Relacionais & SQL",
    galaxy: "fundamentos",
    galaxyName: "Nébula dos Fundamentos",
    x: 600,
    y: 500,
    description: "Aprenda a estruturar e consultar dados de forma segura e veloz usando bancos relacionais e a linguagem SQL pura.",
    checklist: [
      "Compreender o modelo relacional (Tabelas, Chaves Primárias, Chaves Estrangeiras)",
      "Escrever consultas SQL com JOINs (Inner, Left, Right, Full)",
      "Utilizar funções de agregação e agrupamentos (GROUP BY, HAVING)",
      "Criar índices (B-Tree) para otimizar a velocidade de busca",
      "Entender as propriedades ACID de transações de banco de dados",
      "Modelar bancos de dados aplicando Normalização (1NF, 2NF, 3NF)"
    ],
    resources: [
      { name: "SQLBolt (Aprenda SQL com exercícios práticos)", url: "https://sqlbolt.com/" },
      { name: "Use The Index, Luke (Guia de Índices)", url: "https://use-the-index-luke.com/" }
    ],
    quest: {
      question: "Qual das seguintes alternativas descreve corretamente a propriedade de 'Consistência' no padrão ACID?",
      options: [
        "Garante que o banco de dados permaneça ativo mesmo se houver falhas de hardware.",
        "Garante que uma transação leve o banco de dados de um estado válido para outro estado válido, respeitando todas as restrições declaradas.",
        "Garante que o resultado de uma transação concluída seja persistido permanentemente no disco físico.",
        "Garante que transações paralelas executem como se estivessem ocorrendo de forma sequencial."
      ],
      correctAnswer: 1
    },
    prerequisites: ["paradigmas", "apis-web"]
  },

  // ==========================================
  // NOVA GALÁXIA: CONSTELAÇÃO DO FRONTEND WEB (X: 750 - 1380, Y: 80)
  // ==========================================
  {
    id: "fe-html-css",
    name: "HTML5 & CSS3 Moderno",
    galaxy: "frontend",
    galaxyName: "Constelação do Frontend Web",
    x: 780,
    y: 80,
    description: "A escotilha visual da nave. Crie interfaces modernas, responsivas e totalmente acessíveis de acordo com as especificações da W3C.",
    checklist: [
      "Dominar o uso de tags HTML5 semânticas para SEO e legibilidade",
      "Estudar acessibilidade web (Diretrizes WCAG e papéis WAI-ARIA)",
      "Criar layouts complexos com CSS Flexbox e CSS Grid",
      "Implementar responsividade avançada (Media Queries e Container Queries)",
      "Gerenciar variáveis CSS (Custom Properties) para criação de temas"
    ],
    resources: [
      { name: "MDN: Aprenda Web Development", url: "https://developer.mozilla.org/pt-BR/docs/Learn" },
      { name: "Flexbox Froggy (Jogo de CSS)", url: "https://flexboxfroggy.com/#pt-br" },
      { name: "Guia de Acessibilidade Web (W3C)", url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/pt" }
    ],
    quest: {
      question: "De acordo com as diretrizes do WCAG, qual o comportamento correto sobre o uso de cores em elementos de interface web?",
      options: [
        "A cor deve ser o único meio de destacar botões de exclusão.",
        "A cor não deve ser usada como o único meio visual de transmitir informações, indicar uma ação, solicitar uma resposta ou distinguir um elemento visual.",
        "Todas as fontes devem obrigatoriamente ser renderizadas na cor verde limão para contraste.",
        "Os leitores de tela ignoram folhas de estilo, logo a cor dos elementos é irrelevante para a acessibilidade."
      ],
      correctAnswer: 1,
      prereqOverride: ["apis-web"] // Conexão a partir dos Fundamentos
    },
    prerequisites: ["apis-web"]
  },
  {
    id: "fe-js-moderno",
    name: "JavaScript Moderno (ES6+)",
    galaxy: "frontend",
    galaxyName: "Constelação do Frontend Web",
    x: 930,
    y: 80,
    description: "Dê vida às suas telas. Domine a manipulação da DOM, o fluxo assíncrono e os recursos mais modernos do JavaScript (ES6+).",
    checklist: [
      "Manipular dinamicamente elementos da página através da DOM API",
      "Utilizar sintaxe ES6+ (Destructuring, Arrow Functions, Rest/Spread)",
      "Compreender a concorrência e o Event Loop do JavaScript",
      "Dominar chamadas assíncronas com Promises e blocos Async/Await",
      "Consumir APIs externas utilizando a Fetch API",
      "Utilizar armazenamento local do navegador (LocalStorage e SessionStorage)"
    ],
    resources: [
      { name: "JavaScript.info (Tutorial completo)", url: "https://javascript.info/" },
      { name: "Lydia Hallie: Visualizing the Event Loop", url: "https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif" }
    ],
    quest: {
      question: "No Event Loop do JavaScript, qual a diferença na prioridade de execução entre as Microtasks (ex: Callbacks de Promises) e as Macrotasks (ex: Callbacks de setTimeout)?",
      options: [
        "Macrotasks rodam sempre primeiro porque são mais antigas na linguagem.",
        "A fila de Microtasks é processada inteiramente imediatamente após a execução do script atual e antes de processar qualquer nova Macrotask da fila.",
        "O motor do JavaScript escolhe aleatoriamente entre as duas filas para evitar gargalos na thread.",
        "Promises são convertidas em threads de baixo nível do sistema operacional e rodam em background independente do Event Loop."
      ],
      correctAnswer: 1
    },
    prerequisites: ["fe-html-css"]
  },
  {
    id: "fe-frameworks",
    name: "Componentização & React",
    galaxy: "frontend",
    galaxyName: "Constelação do Frontend Web",
    x: 1080,
    y: 80,
    description: "Modularidade extrema. Construa aplicações escaláveis aplicando os conceitos de componentização, reatividade e Hooks com o React.",
    checklist: [
      "Compreender os conceitos de arquitetura baseada em componentes",
      "Dominar gerenciamento de estado local com o hook useState",
      "Controlar efeitos colaterais na interface usando useEffect",
      "Compartilhar dados entre componentes usando Context API",
      "Otimizar renders utilizando hooks de memoização (useMemo, useCallback)",
      "Praticar a passagem de parâmetros unidirecional através de Props"
    ],
    resources: [
      { name: "React Documentation (Nova)", url: "https://react.dev/" },
      { name: "React Labs (Exercícios práticos)", url: "https://react.dev/learn" }
    ],
    quest: {
      question: "No React, por que é uma regra fundamental tratar o estado como imutável (ex: nunca fazer 'state.value = x' diretamente)?",
      options: [
        "Porque mutações diretas bloqueiam a compilação do JavaScript.",
        "Porque o React detecta alterações e dispara a renderização atualizada do componente comparando as referências do estado; alterar o objeto diretamente mantém a mesma referência e não atualiza a tela.",
        "Porque dados imutáveis ocupam menos espaço na memória VRAM da GPU do cliente.",
        "Porque objetos mutáveis são deletados automaticamente pelo navegador a cada 30 segundos."
      ],
      correctAnswer: 1
    },
    prerequisites: ["fe-js-moderno"]
  },
  {
    id: "fe-estado-roteamento",
    name: "Estado Global & Roteamento",
    galaxy: "frontend",
    galaxyName: "Constelação do Frontend Web",
    x: 1230,
    y: 80,
    description: "Controle fluxos complexos de dados. Gerencie rotas em SPAs e utilize bibliotecas de estado global eficientes.",
    checklist: [
      "Implementar roteamento dinâmico em SPAs usando React Router",
      "Gerenciar estados globais complexos sem acoplamento (Zustand ou Redux)",
      "Entender o fluxo unidirecional de dados (Actions -> Reducers/Setters)",
      "Implementar cache de dados de APIs e sincronização com React Query"
    ],
    resources: [
      { name: "Zustand Docs", url: "https://github.com/pmndrs/zustand" },
      { name: "TanStack Query (React Query) Guide", url: "https://tanstack.com/query/latest" }
    ],
    quest: {
      question: "Qual problema de design de software é evitado ao adotar uma biblioteca de estado global como Zustand em uma aplicação com muitos níveis de componentes?",
      options: [
        "Evita a necessidade de escrever testes automatizados para a interface.",
        "Evita o 'Prop Drilling' (passar props através de múltiplos níveis de componentes intermediários que não precisam desses dados apenas para chegar a um filho profundo).",
        "Impede que o usuário aperte F5 para atualizar a página.",
        "Garante que o banco de dados SQL seja atualizado instantaneamente do lado do cliente."
      ],
      correctAnswer: 1
    },
    prerequisites: ["fe-frameworks"]
  },
  {
    id: "fe-build-performance",
    name: "Performance & Build Tools",
    galaxy: "frontend",
    galaxyName: "Constelação do Frontend Web",
    x: 1380,
    y: 80,
    description: "Sua tela na velocidade da luz. Configure bundlers modernos, aplique otimizações de carregamento e atinja nota máxima em auditorias.",
    checklist: [
      "Configurar e otimizar projetos utilizando o bundler Vite",
      "Gerenciar dependências e scripts com o NPM ou Yarn",
      "Aplicar divisão de código (Code Splitting / Lazy Loading) em rotas",
      "Estruturar estilos modulares (CSS Modules ou Tailwind/CSS-in-JS)",
      "Auditar e consertar gargalos de performance usando o Google Lighthouse"
    ],
    resources: [
      { name: "Vite Guide", url: "https://vite.dev/" },
      { name: "web.dev: Métricas Web Essenciais (Core Web Vitals)", url: "https://web.dev/explore/vitals" }
    ],
    quest: {
      question: "Como a técnica de 'Code Splitting' (Divisão de Código) aliada ao Lazy Loading melhora o tempo de carregamento inicial de um site?",
      options: [
        "Ela divide o banco de dados relacional em pedaços que rodam no navegador.",
        "Ela quebra o bundle de JavaScript final em arquivos menores chamados chunks, fazendo com que o navegador baixe apenas o código necessário para a rota ativa atual, reduzindo o tempo de carregamento inicial.",
        "Ela comprime todas as imagens do site em arquivos de texto criptografados.",
        "Ela bloqueia o download de arquivos CSS para priorizar arquivos HTML puros."
      ],
      correctAnswer: 1
    },
    prerequisites: ["fe-estado-roteamento"]
  },

  // ==========================================
  // GALÁXIA 2: CINTURÃO DE ARQUITETURA & BOAS PRÁTICAS (X: 750 - 1100)
  // ==========================================
  {
    id: "clean-solid",
    name: "Clean Code & SOLID",
    galaxy: "arquitetura",
    galaxyName: "Cinturão de Arquitetura",
    x: 780,
    y: 350,
    description: "Código bom é código limpo. Aprenda a estruturar softwares fáceis de ler, manter e alterar aplicando princípios clássicos de engenharia.",
    checklist: [
      "Aplicar nomes descritivos e significativos a variáveis, funções e classes",
      "Reduzir o tamanho das funções de modo que façam apenas uma coisa",
      "Praticar os princípios DRY, KISS e YAGNI no dia a dia",
      "Compreender e aplicar SOLID: Single Responsibility e Open/Closed",
      "Entender o Liskov Substitution Principle e evitar quebras de polimorfismo",
      "Estruturar interfaces coesas (Interface Segregation)",
      "Praticar a Inversão de Dependências (DIP) criando contratos flexíveis"
    ],
    resources: [
      { name: "Código Limpo (Clean Code) - Livro de Robert C. Martin", url: "https://www.oreilly.com/library/view/clean-code-a/9780136083238/" },
      { name: "SOLID Dev.to Guide", url: "https://dev.to/srobold/solid-principles-explained-simply-with-examples-12ga" }
    ],
    quest: {
      question: "De acordo com o Princípio de Substituição de Liskov (LSP), o que deve ser verdadeiro ao herdar de uma classe?",
      options: [
        "A classe filha deve poder ser substituída por sua classe base sem alterar a corretude do programa.",
        "A classe filha deve sempre sobrescrever todos os métodos da classe pai para torná-los mais rápidos.",
        "A classe base deve obrigatoriamente instanciar a classe filha internamente.",
        "A herança deve ser usada em vez de interfaces em todos os cenários possíveis."
      ],
      correctAnswer: 0,
      prereqOverride: ["sql-bd"]
    },
    prerequisites: ["sql-bd"]
  },
  {
    id: "testes",
    name: "Testes Automatizados & TDD",
    galaxy: "arquitetura",
    galaxyName: "Cinturão de Arquitetura",
    x: 930,
    y: 250,
    description: "Crie escudos digitais para seu código. Aprenda a validar seu software automaticamente e utilize TDD para guiar o design de suas funções.",
    checklist: [
      "Entender a pirâmide de testes (Unitários vs. Integração vs. End-to-End)",
      "Escrever testes unitários isolados de infraestrutura externa",
      "Usar dublês de teste (Mocks, Stubs e Spies) corretamente",
      "Praticar o fluxo Red-Green-Refactor do TDD",
      "Analisar relatórios de cobertura de código (Code Coverage)",
      "Escrever código com injeção de dependências para facilitar os testes"
    ],
    resources: [
      { name: "TDD por Exemplo - Livro de Kent Beck", url: "https://www.amazon.com.br/TDD-Desenvolvimento-Guiado-por-Testes/dp/8573078423" },
      { name: "Martin Fowler: Test Double", url: "https://martinfowler.com/bliki/TestDouble.html" }
    ],
    quest: {
      question: "Qual a diferença essencial entre um 'Mock' e um 'Stub' ao escrever testes de unidade?",
      options: [
        "O Mock simula a conexão com um banco de dados real, enquanto o Stub simula chamadas de rede.",
        "O Stub apenas fornece dados preparados para responder a chamadas feitas durante o teste, enquanto o Mock também valida expectativas de comportamento (por exemplo, se um método foi chamado N vezes).",
        "O Mock é escrito no início do projeto e o Stub é gerado automaticamente pelo compilador ao final.",
        "Não há diferença; os dois termos descrevem exatamente a mesma técnica de teste."
      ],
      correctAnswer: 1
    },
    prerequisites: ["clean-solid"]
  },
  {
    id: "design-patterns",
    name: "Padrões de Projeto",
    galaxy: "arquitetura",
    galaxyName: "Cinturão de Arquitetura",
    x: 930,
    y: 450,
    description: "Não reinvente a roda. Use soluções consagradas para problemas recorrentes de design de software in sistemas orientados a objetos.",
    checklist: [
      "Compreender o catálogo clássico GoF (Gang of Four)",
      "Implementar padrões criacionais úteis (Factory Method, Singleton, Builder)",
      "Aplicar padrões estruturais (Adapter, Decorator, Facade)",
      "Aprender padrões comportamentais altamente comuns (Strategy, Observer, State)",
      "Entender a utilidade prática de DTOs (Data Transfer Objects) e Repositories"
    ],
    resources: [
      { name: "Refactoring.Guru (Excelente catálogo visual)", url: "https://refactoring.guru/pt-br/design-patterns" },
      { name: "Design Patterns in JS", url: "https://github.com/sohamkamani/javascript-design-patterns" }
    ],
    quest: {
      question: "Qual padrão de projeto seria ideal para definir uma família de algoritmos, encapsular cada um deles e torná-los intercambiáveis, permitindo que o algoritmo varie independentemente dos clientes que o utilizam?",
      options: [
        "Factory Method",
        "Singleton",
        "Strategy",
        "Adapter"
      ],
      correctAnswer: 2
    },
    prerequisites: ["clean-solid"]
  },
  {
    id: "sistemas-distribuidos",
    name: "Sistemas Distribuídos & Clean Arch",
    galaxy: "arquitetura",
    galaxyName: "Cinturão de Arquitetura",
    x: 1080,
    y: 350,
    description: "Projete sistemas desacoplados e resilientes. Aprenda a Clean Architecture e entenda as leis fundamentais que regem sistemas distribuídos.",
    checklist: [
      "Aplicar Clean Architecture ou Hexagonal Architecture separando domínio e infra",
      "Compreender os limites de acoplamento e buscar alta coesão",
      "Dominar o Teorema CAP (Consistência, Disponibilidade, Tolerância a Partição)",
      "Entender as diferenças conceituais entre Monólitos e Microsserviços",
      "Aprender a desenhar sistemas tolerantes a falhas parciais"
    ],
    resources: [
      { name: "Clean Architecture (Livro de Robert C. Martin)", url: "https://www.oreilly.com/library/view/clean-architecture-a/9780134494272/" },
      { name: "Teorema CAP - Explicação Visual", url: "https://robertgreiner.com/cap-theorem-revisited/" }
    ],
    quest: {
      question: "Segundo o Teorema CAP, na ocorrência de uma partição de rede (P) em um sistema distribuído, o arquiteto deve escolher obrigatoriamente entre quais duas propriedades?",
      options: [
        "Escalabilidade (S) ou Portabilidade (P)",
        "Segurança (S) ou Velocidade (V)",
        "Consistência (C) ou Disponibilidade (A)",
        "Latência (L) ou Durabilidade (D)"
      ],
      correctAnswer: 2
    },
    prerequisites: ["testes", "design-patterns"]
  },
  {
    id: "filas-assincrono",
    name: "Mensageria & Filas Assíncronas",
    galaxy: "arquitetura",
    galaxyName: "Cinturão de Arquitetura",
    x: 1230,
    y: 250,
    description: "Desafogue seu servidor. Aprenda a delegar processos demorados para background através de sistemas de mensageria e filas assíncronas.",
    checklist: [
      "Entender a diferença entre comunicação síncrona e assíncrona",
      "Diferenciar brokers de mensagem (RabbitMQ) de streams de eventos (Kafka)",
      "Implementar o modelo Publish/Subscribe (Pub/Sub)",
      "Garantir a idempotência de consumidores para evitar duplicidade de dados",
      "Gerenciar falhas em filas com Dead Letter Queues (DLQ)",
      "Lidar com Redis como gerenciador básico de filas de segundo plano"
    ],
    resources: [
      { name: "RabbitMQ Tutorials", url: "https://www.rabbitmq.com/getstarted.html" },
      { name: "Kafka Explained (Confluent)", url: "https://www.confluent.io/what-is-apache-kafka/" }
    ],
    quest: {
      question: "Ao utilizar uma fila com entrega garantida 'At-least-once' (Pelo menos uma vez), por que é vital que o consumidor seja 'idempotente'?",
      options: [
        "Porque o servidor de mensageria apaga mensagens não processadas imediatamente.",
        "Porque a mesma mensagem pode ser entregue mais de uma vez devido a oscilações de rede, e o processamento repetido não deve alterar o resultado final do sistema.",
        "Porque a idempotência faz com que as mensagens fiquem criptografadas automaticamente na fila.",
        "Porque garante que o processamento gaste menos memória RAM do servidor consumidor."
      ],
      correctAnswer: 1
    },
    prerequisites: ["sistemas-distribuidos"]
  },
  {
    id: "nosql-cache",
    name: "NoSQL & Estratégias de Cache",
    galaxy: "arquitetura",
    galaxyName: "Cinturão de Arquitetura",
    x: 1230,
    y: 450,
    description: "Performance extrema. Aprenda quando usar bancos NoSQL e utilize caches inteligentes em memória para reduzir a latência de leituras.",
    checklist: [
      "Conhecer as famílias NoSQL (Documentos, Chave-Valor, Colunas, Grafos)",
      "Dominar o uso do Redis para cache rápido e controle de sessões",
      "Modelar dados desnormalizados no MongoDB",
      "Implementar padrões de cache: Cache-Aside e Write-Through",
      "Gerenciar a expiração e invalidação de caches usando TTL e políticas LRU"
    ],
    resources: [
      { name: "Redis University", url: "https://university.redis.com/" },
      { name: "Estratégias de Cache (AWS Guide)", url: "https://aws.amazon.com/caching/best-practices/" }
    ],
    quest: {
      question: "Qual das seguintes opções descreve a estratégia de cache do tipo 'Cache-Aside'?",
      options: [
        "A aplicação grava as alterações no banco e no cache simultaneamente em uma única transação.",
        "A aplicação sempre consulta o cache primeiro. Se houver um 'cache miss', ela busca os dados no banco de dados, os retorna ao usuário e atualiza o cache para futuras requisições.",
        "O cache atualiza a si mesmo periodicamente em background a cada hora, sem interferência da aplicação.",
        "Os dados são mantidos exclusivamente no cache e nunca gravados em disco rígido."
      ],
      correctAnswer: 1
    },
    prerequisites: ["sistemas-distribuidos"]
  },

  // ==========================================
  // GALÁXIA 3: ÓRBITA DO DEVOPS & CLOUD (X: 1380 - 1650)
  // ==========================================
  {
    id: "docker",
    name: "Docker & Containerização",
    galaxy: "devops",
    galaxyName: "Órbita do DevOps",
    x: 1380,
    y: 200,
    description: "Rode seu app em qualquer lugar. Aprenda a empacotar seu código com suas dependências exatas de forma isolada, leve e segura.",
    checklist: [
      "Compreender a diferença entre Containers (Namespaces/Cgroups) e Máquinas Virtuais",
      "Escrever Dockerfiles limpos e seguros",
      "Otimizar imagens usando Multi-stage Builds e imagens base reduzidas (ex: Alpine)",
      "Orquestrar múltiplos containers localmente com o Docker Compose",
      "Entender volumes para persistência e redes isoladas para segurança"
    ],
    resources: [
      { name: "Docker Curriculum", url: "https://docker-curriculum.com/" },
      { name: "Boas Práticas de Dockerfile (Snyk)", url: "https://snyk.io/blog/best-practices-containerizing-nodejs-applications-with-docker/" }
    ],
    quest: {
      question: "Como o recurso de 'Multi-stage builds' no Dockerfile otimiza o ciclo de entrega de software?",
      options: [
        "Permite executar o container em múltiplos sistemas operacionais ao mesmo tempo.",
        "Gera backups automáticos da imagem na nuvem a cada linha modificada.",
        "Permite utilizar ambientes distintos para compilar o código e para rodar o app, deixando a imagem final de produção muito menor e sem dependências de compilação desnecessárias.",
        "Garante que o container use apenas memória RAM estática sem consumir disco."
      ],
      correctAnswer: 2,
      // Desbloqueável tanto via Backend quanto via Frontend!
      prereqOverride: ["filas-assincrono", "fe-build-performance"]
    },
    prerequisites: ["filas-assincrono"]
  },
  {
    id: "cicd",
    name: "Integração & Entrega Contínua (CI/CD)",
    galaxy: "devops",
    galaxyName: "Órbita do DevOps",
    x: 1530,
    y: 200,
    description: "Automação total. Crie esteiras automáticas que testam, analisam e publicam seu código de forma transparente a cada commit.",
    checklist: [
      "Entender o ciclo de feedback rápido de Continuous Integration (CI)",
      "Estruturar pipelines de CI com GitHub Actions ou GitLab CI",
      "Automatizar a publicação de imagens Docker em registries",
      "Dominar estratégias de deploy automático (Continuous Deployment)",
      "Implementar versionamento semântico de forma automatizada"
    ],
    resources: [
      { name: "GitHub Actions Guide", url: "https://docs.github.com/pt/actions" },
      { name: "SemVer - Versionamento Semântico", url: "https://semver.org/lang/pt-BR/" }
    ],
    quest: {
      question: "Qual a diferença teórica entre Continuous Delivery (Entrega Contínua) e Continuous Deployment (Implantação Contínua)?",
      options: [
        "No Continuous Delivery o deploy em produção é manual (após passar pelas esteiras de teste automáticas), enquanto no Continuous Deployment todo commit aprovado é implantado em produção automaticamente.",
        "Continuous Delivery aplica-se apenas a aplicativos mobile, enquanto Continuous Deployment aplica-se apenas a páginas web.",
        "Continuous Delivery não possui etapas de teste automatizado, ao contrário do Continuous Deployment.",
        "Não existe diferença; os termos são completamente sinônimos."
      ],
      correctAnswer: 0
    },
    prerequisites: ["docker"]
  },
  {
    id: "cloud-serverless",
    name: "Cloud Computing & Serverless",
    galaxy: "devops",
    galaxyName: "Órbita do DevOps",
    x: 1680,
    y: 200,
    description: "A nuvem ao seu dispor. Conheça as bases de provedores de nuvem como AWS ou GCP e implemente funções escaláveis sem gerenciar servidores.",
    checklist: [
      "Entender os modelos de serviço de nuvem (IaaS, PaaS, SaaS, Serverless)",
      "Dominar serviços essenciais da AWS (EC2, S3, RDS, IAM)",
      "Escrever e implantar funções Serverless (AWS Lambda / Cloud Functions)",
      "Compreender trade-offs de Serverless (Cold Starts, custos e timeouts)",
      "Aprender conceitos básicos de Infraestrutura como Código (IaC) com Terraform"
    ],
    resources: [
      { name: "AWS Cloud Practitioner (Curso gratuito)", url: "https://aws.amazon.com/pt/training/digital/aws-cloud-practitioner-essentials/" },
      { name: "Terraform Get Started", url: "https://developer.hashicorp.com/terraform/tutorials" }
    ],
    quest: {
      question: "Em arquiteturas Serverless baseadas em FaaS (como AWS Lambda), o que descreve o conceito de 'Cold Start'?",
      options: [
        "A queda de temperatura dos servidores físicos quando chove na região do datacenter.",
        "A latência adicional que ocorre na primeira execução de uma função após um período de inatividade, devido à necessidade do provedor de nuvem de provisionar um container e inicializar o runtime da aplicação.",
        "O travamento permanente da aplicação quando ela consome muitos dados estáticos.",
        "O tempo que a esteira de CI/CD leva para compilar arquivos binários na nuvem."
      ],
      correctAnswer: 1
    },
    prerequisites: ["cicd"]
  },
  {
    id: "seguranca-criptografia",
    name: "Segurança Web & Criptografia",
    galaxy: "devops",
    galaxyName: "Órbita do DevOps",
    x: 1530,
    y: 350,
    description: "Proteja sua órbita. Aprenda a defender suas aplicações contra as principais ameaças web e a proteger dados críticos de ponta a ponta.",
    checklist: [
      "Conhecer as falhas de segurança mais comuns listadas no OWASP Top 10",
      "Prevenir ataques comuns (SQL Injection, XSS, CSRF)",
      "Dominar autenticação moderna com JWT, OAuth 2.0 e OpenID Connect",
      "Entender criptografia simétrica (AES) e assimétrica (RSA, Curvas Elípticas)",
      "Aplicar hashing robusto para armazenar senhas de usuários (Bcrypt, Argon2)",
      "Implementar HTTPS e configurar certificados TLS de forma segura"
    ],
    resources: [
      { name: "OWASP Top 10 (Oficial)", url: "https://owasp.org/www-project-top-ten/" },
      { name: "JWT.io (Debugging de tokens)", url: "https://jwt.io/" },
      { name: "Crypto 101 (Curso aberto de criptografia)", url: "https://www.crypto101.io/" }
    ],
    quest: {
      question: "Qual mecanismo garante que as informações contidas em um JSON Web Token (JWT) não foram alteradas após o token ser emitido?",
      options: [
        "A criptografia simétrica obrigatória do corpo (Payload) do token.",
        "A assinatura digital no rodapé do token, criada a partir do cabeçalho e payload usando uma chave secreta privada do servidor.",
        "O fato de que os dados do JWT são apagados do navegador a cada 5 minutos automaticamente.",
        "A verificação visual feita pelo usuário ao abrir o arquivo do token."
      ],
      correctAnswer: 1
    },
    prerequisites: ["docker"]
  },
  {
    id: "observabilidade",
    name: "Observabilidade & Monitoramento",
    galaxy: "devops",
    galaxyName: "Órbita do DevOps",
    x: 1680,
    y: 350,
    description: "Os olhos da nave. Monitore a saúde de suas aplicações em produção usando logs estruturados, métricas de hardware e traces distribuídos.",
    checklist: [
      "Compreender os 3 pilares da observabilidade: Logs, Métricas e Traces",
      "Configurar logs estruturados em formato JSON na aplicação",
      "Coletar métricas do sistema usando Prometheus",
      "Criar dashboards interativos de monitoramento com o Grafana",
      "Implementar rastreamento distribuído (Tracing) para depurar microsserviços",
      "Criar sistemas de alerta automatizados baseados em limites saudáveis"
    ],
    resources: [
      { name: "Observabilidade para Iniciantes (Honeycomb)", url: "https://www.honeycomb.io/whitepapers/observability-for-software-engineers/" },
      { name: "Prometheus & Grafana Lab", url: "https://prometheus.io/docs/introduction/first_steps/" }
    ],
    quest: {
      question: "Qual o benefício crucial de utilizar logs estruturados (como o formato JSON) em vez de logs puramente textuais em produção?",
      options: [
        "Logs estruturados ocupam sempre 90% a menos de espaço em disco rígido.",
        "Logs textuais simples travam o processador da máquina se houver muitos erros.",
        "Logs estruturados permitem que ferramentas automatizadas indexem, pesquisem e filtrem dados rapidamente por atributos como userId, status ou tempo de execução.",
        "Logs estruturados são escritos em código binário que o usuário final não pode interceptar."
      ],
      correctAnswer: 2
    },
    prerequisites: ["cloud-serverless", "seguranca-criptografia"]
  },

  // ==========================================
  // GALÁXIA 4: SISTEMAS INTELIGENTES & ML (X: 750 - 1100, Y: 550 - 850)
  // ==========================================
  {
    id: "matematica-ia",
    name: "Matemática Essencial para IA",
    galaxy: "ml",
    galaxyName: "Sistemas Inteligentes & ML",
    x: 780,
    y: 650,
    description: "Os fundamentos matemáticos de tudo. Domine matrizes, vetores, derivadas e probabilidade básica para entender como as IAs aprendem.",
    checklist: [
      "Estudar Álgebra Linear: Vetores, Matrizes e multiplicação matricial",
      "Entender e calcular o Produto Escalar (Dot Product) e a Similaridade de Cosseno",
      "Aprender Cálculo: Conceito de Derivadas e Regra da Cadeia",
      "Dominar o algoritmo de otimização Gradient Descent (Gradiente Descendente)",
      "Estudar Estatística: Média, Mediana, Desvio Padrão e Distribuição Normal",
      "Aprender Probabilidade Condicional e o Teorema de Bayes"
    ],
    resources: [
      { name: "Álgebra Linear - Khan Academy", url: "https://pt.khanacademy.org/math/linear-algebra" },
      { name: "Cálculo 1 e 2 - Khan Academy", url: "https://pt.khanacademy.org/math/calculus-1" },
      { name: "3Blue1Brown: Essência do Álgebra Linear (YouTube)", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" }
    ],
    quest: {
      question: "Como o algoritmo de Gradient Descent (Gradiente Descendente) utiliza derivadas para otimizar os parâmetros de um modelo de Machine Learning?",
      options: [
        "Ele calcula a derivada para encontrar a direção de subida e maximizar o erro do modelo.",
        "Ele calcula a derivada da função de custo em relação aos pesos para determinar a direção de maior declive, permitindo ajustar os pesos gradualmente no sentido de minimizar o erro.",
        "Ele ignora as derivadas e sorteia valores aleatórios até que o erro caia a zero.",
        "Ele usa a derivada para apagar os dados que contêm ruídos ou falhas na medição."
      ],
      correctAnswer: 1,
      prereqOverride: ["nosql-cache"]
    },
    prerequisites: ["nosql-cache"]
  },
  {
    id: "ciencia-dados-python",
    name: "Ciência de Dados com Python",
    galaxy: "ml",
    galaxyName: "Sistemas Inteligentes & ML",
    x: 930,
    y: 650,
    description: "Aprenda a manipular grandes volumes de informação. Domine o ecossistema científico da linguagem Python usando notebooks interativos.",
    checklist: [
      "Configurar e rodar notebooks no Jupyter e Google Colab",
      "Utilizar NumPy para operações de alta performance em matrizes e vetores",
      "Manipular e limpar tabelas de dados usando DataFrames do Pandas",
      "Lidar com valores faltantes (NaN), duplicados e outliers nos dados",
      "Criar gráficos exploratórios com as bibliotecas Matplotlib e Seaborn"
    ],
    resources: [
      { name: "Python para Análise de Dados (Livro clássico)", url: "https://wesmckinney.com/book/" },
      { name: "Pandas User Guide", url: "https://pandas.pydata.org/docs/user_guide/index.html" },
      { name: "Google Colab", url: "https://colab.research.google.com/" }
    ],
    quest: {
      question: "Qual das seguintes funções do Pandas seria utilizada para mesclar dois DataFrames com base em uma coluna chave comum, similar a um JOIN no SQL?",
      options: [
        "pd.concat()",
        "df.merge()",
        "df.split()",
        "pd.pivot_table()"
      ],
      correctAnswer: 1
    },
    prerequisites: ["matematica-ia"]
  },
  {
    id: "ml-classico",
    name: "Fundamentos de ML Clássico",
    galaxy: "ml",
    galaxyName: "Sistemas Inteligentes & ML",
    x: 1080,
    y: 650,
    description: "A base do aprendizado de máquina. Entenda os tipos de aprendizado, como preparar suas features e como combater o terrível Overfitting.",
    checklist: [
      "Aprender a divisão de Aprendizado: Supervisionado, Não-Supervisionado e Reforço",
      "Compreender a diferença prática entre tarefas de Regressão e Classificação",
      "Entender o trade-off Viés-Variância (Bias-Variance Tradeoff)",
      "Dominar o conceito de Overfitting (Superajuste) e Underfitting (Subajuste)",
      "Praticar Feature Engineering: Normalização, Padronização e One-Hot Encoding"
    ],
    resources: [
      { name: "Curso Machine Learning (Andrew Ng / Coursera)", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
      { name: "Google Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course" }
    ],
    quest: {
      question: "O que caracteriza o problema de 'Overfitting' em um modelo preditivo de Machine Learning?",
      options: [
        "O modelo apresenta erros gigantescos tanto na base de treino quanto na base de teste por ser simples demais.",
        "O modelo decora perfeitamente os dados de treinamento (baixo erro de treino), mas perde a capacidade de generalizar, apresentando taxas de erro elevadas em dados inéditos de teste.",
        "O modelo roda muito lentamente devido a excesso de variáveis no banco de dados relacional.",
        "O modelo requer o uso de GPUs pesadas para conseguir computar somas básicas."
      ],
      correctAnswer: 1
    },
    prerequisites: ["ciencia-dados-python"]
  },
  {
    id: "scikit-learn",
    name: "Algoritmos & Scikit-Learn",
    galaxy: "ml",
    galaxyName: "Sistemas Inteligentes & ML",
    x: 1230,
    y: 650,
    description: "Coloque os modelos para rodar. Treine algoritmos de regressão, classificação e agrupamento utilizando a biblioteca Scikit-Learn.",
    checklist: [
      "Praticar modelagem preditiva utilizando a biblioteca Scikit-Learn",
      "Treinar modelos de Regressão Linear para previsões numéricas contínuas",
      "Aplicar classificadores: Regressão Logística, Decision Trees e Random Forest",
      "Compreender algoritmos baseados em margem como Support Vector Machines (SVM)",
      "Estudar agrupamento não-supervisionado com o algoritmo K-Means"
    ],
    resources: [
      { name: "Scikit-Learn Documentation", url: "https://scikit-learn.org/stable/" },
      { name: "Hands-On Machine Learning (Livro clássico de Aurélien Géron)", url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/" }
    ],
    quest: {
      question: "Como funciona a técnica de 'Random Forest' e por que ela tende a ser mais robusta do que uma única Árvore de Decisão simples?",
      options: [
        "Ela treina uma única árvore com profundidade infinita até que não ocorra nenhum erro.",
        "Ela cria uma floresta de múltiplas árvores de decisão treinadas em subconjuntos aleatórios de dados e features, combinando suas previsões (via média ou votação) para reduzir a variância e mitigar o overfitting.",
        "Ela converte textos em dados criptografados aleatórios antes de aplicar as condições lógicas.",
        "Ela usa computação quântica para simular múltiplos caminhos condicionais paralelos."
      ],
      correctAnswer: 1
    },
    prerequisites: ["ml-classico"]
  },
  {
    id: "validacao-modelos",
    name: "Avaliação & Deploy de Modelos",
    galaxy: "ml",
    galaxyName: "Sistemas Inteligentes & ML",
    x: 1380,
    y: 650,
    description: "Valide seu trabalho antes de subir. Domine as métricas de validação de modelos e disponibilize sua inteligência via APIs em produção.",
    checklist: [
      "Substituir validações simples por Validação Cruzada (K-Fold Cross Validation)",
      "Dominar métricas de classificação: Acurácia, Precisão, Recall e F1-Score",
      "Entender e interpretar Matrizes de Confusão e curvas ROC/AUC",
      "Avaliar modelos de regressão usando métricas MAE, MSE e R²",
      "Serializar modelos treinados utilizando Joblib ou Pickle",
      "Empacotar o modelo treinado em uma API veloz construída com FastAPI"
    ],
    resources: [
      { name: "FastAPI para Deploy de ML", url: "https://fastapi.tiangolo.com/" },
      { name: "Métricas de Avaliação de Modelos (Towards Data Science)", url: "https://towardsdatascience.com/metrics-to-evaluate-your-machine-learning-algorithm-f10ba6e38234" }
    ],
    quest: {
      question: "Em um modelo de classificação para detecção de fraudes em transações financeiras, por que a métrica de 'Recall' pode ser considerada mais prioritária do que a 'Precisão'?",
      options: [
        "Porque o Recall avalia o tempo de resposta em milissegundos do servidor de banco de dados.",
        "Porque o Recall mede a proporção de transações realmente fraudulentas que foram capturadas pelo modelo, minimizando os Falsos Negativos (deixar passar uma fraude real sem bloqueio), mesmo que isso gere alguns Falsos Positivos temporários.",
        "Porque a Precisão é muito complexa de calcular matematicamente e consome CPU desnecessária.",
        "Porque o Recall garante que a resposta do modelo seja sempre salva em formato JSON criptografado."
      ],
      correctAnswer: 1
    },
    prerequisites: ["scikit-learn"]
  },

  // ==========================================
  // GALÁXIA 5: CONSTELAÇÃO DAS IAS GENERATIVAS & LLMS (X: 1380 - 1950, Y: 450 - 900)
  // ==========================================
  {
    id: "deep-learning",
    name: "Deep Learning & Redes Neurais",
    galaxy: "llm",
    galaxyName: "IAs Generativas & LLMs",
    x: 1380,
    y: 800,
    description: "Crie cérebros sintéticos. Compreenda os fundamentos das redes neurais profundas, funções de ativação e implemente modelos usando PyTorch.",
    checklist: [
      "Compreender a estrutura de um neurônio artificial simples (Perceptron)",
      "Estudar funções de ativação não-lineares (Sigmoid, Tanh, ReLU, Softmax)",
      "Entender o fluxo de propagação de erro (Backpropagation) e o otimizador Adam",
      "Treinar redes multicamadas (MLP) para classificação básica",
      "Escrever loops de treinamento nativos utilizando a biblioteca PyTorch"
    ],
    resources: [
      { name: "Deep Learning Book (Gratuito)", url: "https://www.deeplearningbook.com.br/" },
      { name: "PyTorch Tutorials", url: "https://pytorch.org/tutorials/" },
      { name: "3Blue1Brown: Redes Neurais (YouTube)", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000DX_ZCJB-3Ut" }
    ],
    quest: {
      question: "Por que as funções de ativação em redes neurais profundas (como a ReLU) devem ser obrigatoriamente não-lineares?",
      options: [
        "Para acelerar o salvamento do modelo em disco rígido.",
        "Porque, sem não-linearidade, a composição de múltiplas camadas se comportaria como uma única função linear simples, impedindo a rede de aprender relações complexas e não-lineares nos dados.",
        "Para forçar os tensores do PyTorch a rodar sempre na GPU.",
        "Para limitar os números de entrada a valores obrigatoriamente inteiros."
      ],
      correctAnswer: 1,
      prereqOverride: ["validacao-modelos"]
    },
    prerequisites: ["validacao-modelos"]
  },
  {
    id: "transformers-nlp",
    name: "Transformers & NLP Moderno",
    galaxy: "llm",
    galaxyName: "IAs Generativas & LLMs",
    x: 1530,
    y: 800,
    description: "A revolução da linguagem. Estude a arquitetura Transformer que permitiu a criação dos modernos modelos de linguagem (GPT, Claude, Gemini).",
    checklist: [
      "Aprender método de Tokenização moderna (ex: Byte-Pair Encoding)",
      "Compreender o conceito e geração de Embeddings vetoriais para texto",
      "Dominar o mecanismo de Self-Attention (Auto-Atenção) em detalhes",
      "Diferenciar arquiteturas Decoder-only (GPT) de Encoder-only (BERT)",
      "Entender o processo probabilístico de geração autoregressiva de tokens"
    ],
    resources: [
      { name: "Artigo original: Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762" },
      { name: "Hugging Face Course (NLP)", url: "https://huggingface.co/course/chapter1/1" },
      { name: "The Illustrated Transformer (Blog clássico)", url: "https://jalammar.github.io/illustrated-transformer/" }
    ],
    quest: {
      question: "Qual a inovação crucial do mecanismo de 'Self-Attention' (Auto-Atenção) introduzido nos Transformers em relação a arquiteturas anteriores como LSTMs e RNNs?",
      options: [
        "Ele descarta o uso de matrizes matemáticas, focando apenas em busca de palavras-chave.",
        "Ele processa sequências de texto inteiras em paralelo (em vez de palavra por palavra sequencialmente) e calcula o nível de relação entre cada palavra e todas as outras na frase, independente da distância física entre elas.",
        "Ele obriga o modelo a responder perguntas em menos de 1 segundo utilizando menos memória RAM.",
        "Ele traduz automaticamente qualquer idioma para inglês antes de salvar os dados no banco relacional."
      ],
      correctAnswer: 1
    },
    prerequisites: ["deep-learning"]
  },
  {
    id: "prompt-eng-apis",
    name: "Engenharia de Prompt & APIs de LLM",
    galaxy: "llm",
    galaxyName: "IAs Generativas & LLMs",
    x: 1680,
    y: 800,
    description: "A arte de conversar com máquinas. Domine técnicas estruturadas de escrita de prompts e aprenda a integrar APIs de LLMs em seus sistemas.",
    checklist: [
      "Consumir APIs de modelos líderes de mercado (OpenAI, Anthropic, Gemini)",
      "Configurar parâmetros das APIs (Temperature, Top-P, Penalties, Max Tokens)",
      "Dominar técnicas de Few-Shot Prompting e Chain-of-Thought (Cadeia de Raciocínio)",
      "Estruturar System Instructions para modular comportamento e persona da IA",
      "Utilizar modelos open-source localmente com Ollama e formatos GGUF"
    ],
    resources: [
      { name: "Learn Prompting (Curso aberto)", url: "https://learnprompting.org/pt/" },
      { name: "OpenAI API Reference", url: "https://platform.openai.com/docs/api-reference" },
      { name: "Prompt Engineering Guide (DAIR.AI)", url: "https://www.promptingguide.ai/pt" }
    ],
    quest: {
      question: "Como o parâmetro de 'Temperatura' (Temperature) afeta a geração de texto gerada pelas APIs de LLMs?",
      options: [
        "Controla a temperatura física dos processadores das GPUs da OpenAI.",
        "Valores altos deixam as respostas mais previsíveis e determinísticas, enquanto valores baixos tornam a resposta criativa e totalmente imprevisível.",
        "Valores mais baixos tornam o modelo mais determinístico e focado nas palavras com maior probabilidade de acerto, enquanto valores mais altos aumentam a criatividade, diversidade e aleatoriedade dos tokens gerados.",
        "Controla a taxa de expiração de tokens e o limite de requisições que podem ser feitas por minuto na API."
      ],
      correctAnswer: 2
    },
    prerequisites: ["transformers-nlp"]
  },
  {
    id: "rag",
    name: "RAG & Bancos de Dados Vetoriais",
    galaxy: "llm",
    galaxyName: "IAs Generativas & LLMs",
    x: 1830,
    y: 650,
    description: "Expanda a memória da IA. Aprenda a injetar documentos privados atualizados no prompt da LLM utilizando bancos de dados vetoriais modernos.",
    checklist: [
      "Entender o problema de alucinação e janelas de contexto limitadas das LLMs",
      "Implementar a arquitetura completa de RAG (Retrieval-Augmented Generation)",
      "Aplicar diferentes estratégias de quebra de texto (Character, Recursive Chunking)",
      "Armazenar e indexar embeddings em bancos vetoriais (ChromaDB, Pinecone, FAISS)",
      "Realizar buscas semânticas utilizando a métrica de Similaridade de Cosseno"
    ],
    resources: [
      { name: "Pinecone Learning Center (Banco Vetorial)", url: "https://www.pinecone.io/learn/" },
      { name: "What is RAG? (IBM Guide)", url: "https://research.ibm.com/blog/retrieval-augmented-generation-what-is-rag" }
    ],
    quest: {
      question: "Qual das seguintes alternativas descreve corretamente uma vantagem chave de utilizar a arquitetura RAG em comparação com o Fine-Tuning completo de uma LLM?",
      options: [
        "RAG reduz permanentemente o custo de chamadas da API da LLM a zero centavos.",
        "RAG permite que a IA acesse fontes de dados dinâmicas, proprietárias e atualizadas em tempo real sem a necessidade de re-treinar ou ajustar os pesos do modelo através de processos computacionais caros.",
        "RAG torna a IA capaz de traduzir textos muito mais rapidamente do que os modelos normais.",
        "RAG converte os modelos de linguagem em bancos de dados puramente relacionais com suporte total a queries SQL."
      ],
      correctAnswer: 1
    },
    prerequisites: ["prompt-eng-apis"]
  },
  {
    id: "agentes-langchain",
    name: "Agentes de IA & LangChain",
    galaxy: "llm",
    galaxyName: "IAs Generativas & LLMs",
    x: 1830,
    y: 800,
    description: "Crie assistentes autônomos. Aprenda a orquestrar agentes inteligentes capazes de tomar decisões e utilizar ferramentas externas de forma independente.",
    checklist: [
      "Desenhar fluxos de decisão automatizados utilizando o framework LangChain",
      "Equipar LLMs com ferramentas externas através de Tool e Function Calling",
      "Construir agentes autônomos que implementam o loop cognitivo ReAct",
      "Orquestrar múltiplos agentes cooperativos com CrewAI ou LangGraph",
      "Implementar memórias persistentes em conversas de chat de longa duração"
    ],
    resources: [
      { name: "LangChain Documentation", url: "https://python.langchain.com/v0.2/docs/introduction/" },
      { name: "CrewAI Documentation", url: "https://docs.crewai.com/" },
      { name: "Artigo ReAct (Synergizing Reasoning and Acting)", url: "https://arxiv.org/abs/2210.03629" }
    ],
    quest: {
      question: "No contexto de Agentes de IA, como funciona o mecanismo de 'Function Calling' (Chamada de Função)?",
      options: [
        "O programador escreve códigos em Python que a LLM executa diretamente na memória física do seu computador sem controle de segurança.",
        "A LLM analisa a pergunta do usuário e o catálogo de ferramentas fornecidas, gerando de forma estruturada (geralmente JSON) os argumentos necessários para que o código da aplicação execute uma função externa e passe o retorno de volta para a IA responder.",
        "É um compilador que transforma prompts em linguagem assembly de forma imediata.",
        "É um comando SQL que apaga dados obsoletos do banco de dados quando a IA é chamada."
      ],
      correctAnswer: 1
    },
    prerequisites: ["prompt-eng-apis"]
  },
  {
    id: "llmops-otimizacao",
    name: "LLMOps & Otimização de Modelos",
    galaxy: "llm",
    galaxyName: "IAs Generativas & LLMs",
    x: 1980,
    y: 725,
    description: "Produção em escala industrial. Aprenda a otimizar modelos open-source para rodar com eficiência de hardware e gerencie custos de tokenização.",
    checklist: [
      "Compreender a técnica de Quantização de modelos (ex: FP16 para GGUF INT4/INT8)",
      "Conhecer os fundamentos de Fine-Tuning eficiente com LoRA e QLoRA",
      "Monitorar custos e latência de inferência (tokens/segundo) das APIs",
      "Utilizar frameworks de servir inferência velozes em produção como vLLM",
      "Implementar caches de prompt para economizar tokens repetidos"
    ],
    resources: [
      { name: "LoRA: Low-Rank Adaptation (Artigo original)", url: "https://arxiv.org/abs/2106.09685" },
      { name: "vLLM Engine", url: "https://docs.vllm.ai/en/latest/" },
      { name: "Guia de Quantização da Hugging Face", url: "https://huggingface.co/docs/optimum/concept_guides/quantization" }
    ],
    quest: {
      question: "O que é a 'Quantização' de modelos de linguagem e qual sua principal vantagem técnica?",
      options: [
        "É o processo de multiplicar o número de neurônios da rede por 4 para deixá-la mais inteligente.",
        "É a conversão das variáveis categóricas de texto em vetores normais utilizando embeddings vetoriais.",
        "É a redução da precisão numérica dos pesos do modelo (por exemplo, de floats de 32 bits para inteiros de 4 ou 8 bits), reduzindo drasticamente o consumo de memória RAM/VRAM e permitindo a execução em hardwares mais acessíveis com perda mínima de qualidade.",
        "É o processo de bloquear requisições repetidas de usuários na esteira de CI/CD."
      ],
      correctAnswer: 2
    },
    prerequisites: ["rag", "agentes-langchain"]
  }
];

// Exporta o banco de dados para ser usado na aplicação
if (typeof module !== "undefined" && module.exports) {
  module.exports = skillsData;
}
