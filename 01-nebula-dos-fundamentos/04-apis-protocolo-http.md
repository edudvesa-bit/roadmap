# 🌐 Aula 04 — APIs & Protocolo HTTP

> *"Entenda a espinha dorsal da web. Saiba como sistemas conversam na internet usando o protocolo HTTP e construa APIs RESTful eficientes."*

---

## 1. 🚀 Briefing da Missão (Contexto Temático & Realidade de Mercado)

### Metadados do Setor
| Campo | Especificação |
| :--- | :--- |
| **Galáxia** | Galáxia 1: Nébula dos Fundamentos (`fundamentos`) |
| **ID do Módulo** | `apis-web` |
| **Pré-requisitos** | [Aula 02 — Lógica, Estruturas de Dados & Complexidade](./02-logica-estruturas-dados-complexidade.md) (`logica-ed`) |
| **Próximas Órbitas** | [Aula 05 — Bancos de Dados Relacionais & SQL](./05-bancos-de-dados-relacionais-sql.md) e Galáxia 2 (`fe-html-css`) |
| **Nível de Impacto** | Crítico — Toda aplicação web, mobile ou integração de microsserviços depende de HTTP |

### Analogia Espacial: O Navegador Cósmico e o Protocolo Universal de Rádio Subespacial
Imagine mil estações espaciais construídas por civilizações diferentes: uma usa computadores em Java, outra em Python, outra em Rust e outra exibe hologramas em React no navegador. Como todas conseguem trocar mensagens sem entender a arquitetura interna umas das outras? Através de um **protocolo universal padronizado de rádio**: o **HTTP (*Hypertext Transfer Protocol*)**.

Cada transmissão tem um formato rigoroso: um **Verbo de Intenção** (você quer ler telemetria, criar um registro ou destruir um satélite?), um **Endereço do Recurso** (URI), um **Envelope de Metadados** (Headers explicando idioma, autorização e formato da carga) e, quando aplicável, a **Carga Útil** (Body em JSON). Em troca, a estação receptora nunca responde apenas com "silêncio" — ela devolve sempre um **Código de Status** dizendo se a missão foi cumprida (`200`, `201`), se você errou o comando (`400`, `404`), ou se o reator dela explodiu (`500`).

### Qual dor real este módulo resolve em uma empresa?
Sem domínio real de HTTP e REST, desenvolvedores júniores criam APIs que geram caos entre Frontend, Mobile e Backend:
1. **APIs "200 OK com erro dentro":** O backend retorna HTTP `200` com `{ "erro": true, "mensagem": "Usuário não autorizado" }`, quebrando bibliotecas de cache, monitoramento e clientes HTTP que assumem sucesso na faixa `2xx`.
2. **Bloqueios misteriosos de CORS:** O endpoint funciona perfeitamente no Postman/Insomnia, mas falha no navegador do usuário e o desenvolvedor tenta resolver com `Access-Control-Allow-Origin: *` sem entender o risco de segurança com cookies/credenciais.
3. **Endpoints expostos sem controle de taxa:** Um bot ou bug de loop infinito no frontend dispara 50.000 requisições por segundo no login ou na busca, derrubando o banco de dados inteiro por falta de Rate Limiting.

---

## 2. 📚 Carga de Conhecimento Completa (Tópico por Tópico)

### 2.1 Anatomia de Requisições e Respostas HTTP (Headers, Body, Verbos)
O HTTP é um protocolo da camada de aplicação (sobre TCP/IP no HTTP/1.1 e HTTP/2, ou QUIC/UDP no HTTP/3) baseado no modelo **Requisição-Resposta (*Request-Response*)**. O cliente abre a comunicação enviando uma mensagem de texto estruturada, e o servidor responde.

#### Estrutura de uma Requisição (*HTTP Request*)
```http
POST /api/v1/naves HTTP/1.1
Host: api.academiagalactica.dev
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Accept: application/json

{
  "nome": "Voyager-IX",
  "classe": "exploracao"
}
```
1. **Request Line (Linha de Requisição):** Composta por **Verbo (Método)** + **Caminho/URI** (com possíveis *Query Params* como `?classe=exploracao&pagina=2`) + **Versão do HTTP**.
2. **Headers (Cabeçalhos):** Pares `Chave: Valor` com metadados essenciais: `Host`, `Content-Type` (diz o formato do Body enviado), `Accept` (diz o formato esperado de volta), `Authorization` (credenciais), `User-Agent` e `Cache-Control`.
3. **Linha em branco obrigatória:** Separa os cabeçalhos do corpo.
4. **Body (Corpo):** Opcional. Contém os dados enviados (comum em `POST`, `PUT` e `PATCH`). Por padrão, `GET`, `HEAD` e `DELETE` não devem depender de Body.

#### Estrutura de uma Resposta (*HTTP Response*)
```http
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
Location: /api/v1/naves/42
X-RateLimit-Remaining: 59

{
  "id": 42,
  "nome": "Voyager-IX",
  "classe": "exploracao"
}
```
Composta por **Status Line** (versão + código numérico + frase descritiva), **Headers de Resposta** (ex: `Location` apontando para o novo recurso criado, `Set-Cookie`, headers de rate limit) e **Body** opcional.

#### Os Verbos HTTP Principais
- **`GET`**: Recupera representação de um recurso ou lista. Nunca deve alterar dados no servidor.
- **`POST`**: Envia dados para criar um novo recurso subordinado à coleção ou disparar um processamento.
- **`PUT`**: Substitui **completamente** o recurso no endereço especificado (se você omitir um campo opcional no PUT, ele deve ser limpo/sobrescrito; dependendo da API, também pode criar se o ID for fornecido pelo cliente).
- **`PATCH`**: Aplica uma modificação **parcial** no recurso (atualiza apenas os campos enviados, ex: só `{ "email": "novo@dev.com" }`).
- **`DELETE`**: Remove o recurso identificado pela URI.
- **`HEAD`**: Idêntico ao `GET`, porém retorna **apenas os Headers e Status**, sem Body (ótimo para checar se um arquivo grande existe ou seu `Content-Length` antes de baixar).
- **`OPTIONS`**: Consulta quais métodos e cabeçalhos são aceitos pelo servidor (usado automaticamente pelo navegador no *Preflight* de CORS).

---

### 2.2 Semântica dos Status Codes HTTP (`2xx`, `3xx`, `4xx`, `5xx`)
Status codes padronizados permitem que clientes, navegadores, proxies e ferramentas de observabilidade entendam imediatamente o desfecho da requisição sem precisar parsear strings em português dentro do JSON.

| Faixa | Significado Geral | Códigos Essenciais para Memorizar e Aplicar |
| :--- | :--- | :--- |
| **`2xx` (Sucesso)** | A requisição foi recebida, compreendida e aceita com sucesso. | **`200 OK`** (leitura/atualização normal); **`201 Created`** (novo recurso criado via `POST`, ideal incluir header `Location`); **`204 No Content`** (sucesso sem corpo de resposta, padrão clássico para `DELETE`). |
| **`3xx` (Redirecionamento)** | O cliente precisa executar uma ação adicional (geralmente seguir outra URL). | **`301 Moved Permanently`** (mudança definitiva, caches e Google atualizam); **`302 Found`** / **`307 Temporary Redirect`** (redirecionamento temporário); **`304 Not Modified`** (cache local do cliente ainda é válido, economiza banda). |
| **`4xx` (Erro do Cliente)** | O cliente enviou algo inválido, não autenticado ou proibido. | **`400 Bad Request`** (JSON malformado ou sintaxe inválida); **`401 Unauthorized`** (não autenticado — falta token válido); **`403 Forbidden`** (autenticado, mas sem permissão/cargo para aquela ação); **`404 Not Found`** (recurso inexistente); **`409 Conflict`** (ex: e-mail já cadastrado); **`422 Unprocessable Content`** (sintaxe JSON válida, mas violou regra de validação semântica); **`429 Too Many Requests`** (excedeu Rate Limit). |
| **`5xx` (Erro do Servidor)** | O servidor falhou ao tentar cumprir uma requisição aparentemente válida. | **`500 Internal Server Error`** (exceção não tratada no código); **`502 Bad Gateway`** (proxy/API Gateway recebeu resposta inválida do serviço de trás); **`503 Service Unavailable`** (servidor sobrecarregado ou em manutenção); **`504 Gateway Timeout`** (serviço interno demorou além do limite). |

**Regra de ouro entre `401` e `403`:** `401` significa *"Quem é você? Identifique-se!"* (falta login/JWT válido). `403` significa *"Eu sei exatamente quem você é, mas você não tem autorização para entrar aqui!"* (ex: usuário comum tentando acessar painel de administrador).

---

### 2.3 Restrições Arquiteturais do REST (*Representational State Transfer*)
REST não é um protocolo nem uma biblioteca — é um **estilo arquitetural** definido por Roy Fielding em 2000 sobre o HTTP. Uma API só é genuinamente **RESTful** quando respeita suas 6 restrições fundamentais:

1. **Client-Server (Cliente-Servidor):** Separação clara de responsabilidades. A interface de usuário (Cliente) evolui independentemente da persistência e regras de negócio (Servidor).
2. **Stateless (Sem Estado de Sessão no Servidor):** **Restrição crucial!** O servidor **não armazena contexto de sessão do cliente em memória entre requisições**. Cada requisição vinda do cliente deve conter toda a informação necessária para ser compreendida (como o token `Authorization: Bearer ...` e os parâmetros completos). Por quê? Porque assim qualquer servidor atrás de um *Load Balancer* pode atender à próxima requisição do mesmo usuário, garantindo escalabilidade horizontal.
3. **Cacheable (Cacheável):** Toda resposta deve declarar explicitamente se pode ou não ser armazenada em cache intermediário (via headers como `Cache-Control: max-age=60` ou `no-store`) e usar validadores como `ETag`.
4. **Uniform Interface (Interface Uniforme):** Convenções previsíveis em toda a API:
   - Identificação de recursos por substantivos no plural nas URIs (`/pedidos/123` em vez de `/buscarPedido?id=123` ou `/criarUsuario`).
   - Manipulação de recursos através de representações (JSON) e verbos HTTP corretos.
   - Mensagens autodescritivas (`Content-Type`, Status Codes precisos).
   - *HATEOAS* (opcional na maioria das APIs comerciais, onde a resposta inclui links de ações possíveis).
5. **Layered System (Sistema em Camadas):** O cliente não precisa saber se está falando direto com o servidor final da aplicação ou passando por CDN, WAF, API Gateway e Load Balancer no caminho.
6. **Code on Demand (Opcional):** O servidor pode enviar código executável (como JavaScript) para estender a funcionalidade do cliente.

---

### 2.4 Segurança e Idempotência nos Verbos HTTP
Dois conceitos matemáticos e operacionais cobrados em entrevistas e essenciais para construir clientes resilientes (com *retries* automáticos) são **Segurança (*Safe*)** e **Idempotência (*Idempotent*)**:

- **Método Seguro (*Safe*):** É um método **somente leitura** — não altera o estado armazenado dos recursos no servidor (além de registros passivos de auditoria/logs/métricas).
- **Método Idempotente (*Idempotent*):** Executar **1 vez** ou executar **N vezes idênticas** em sequência deixa o estado dos recursos no servidor exatamente **igual** ao efeito da primeira execução! *(Nota: o Status Code retornado na 2ª tentativa pode até mudar — ex: `DELETE /itens/5` retorna `204` na 1ª vez e `404` na 2ª —, mas o **estado do servidor** após a 1ª e a 10ª tentativa é o mesmo: o item 5 continua deletado!).*

| Verbo HTTP | Seguro (*Safe*)? | Idempotente (*Idempotent*)? | Explicação Prática |
| :--- | :---: | :---: | :--- |
| **`GET`** | ✅ Sim | ✅ Sim | Apenas lê o recurso. Rodar 1 ou 100 vezes não altera nada no banco. |
| **`HEAD`** | ✅ Sim | ✅ Sim | Apenas lê metadados/headers. Sem efeito no estado. |
| **`OPTIONS`** | ✅ Sim | ✅ Sim | Apenas consulta capacidades e regras de CORS. |
| **`PUT`** | ❌ Não | ✅ Sim | Altera dados no servidor, mas enviar `{ nome: "Ana" }` para `/usuarios/7` 10 vezes deixa o usuário 7 exatamente igual à 1ª vez. |
| **`DELETE`** | ❌ Não | ✅ Sim | Altera dados removendo o recurso. Repetir o mesmo `DELETE /usuarios/7` continua mantendo o usuário 7 ausente. |
| **`POST`** | ❌ Não | ❌ **Não** | Cada `POST /pedidos` cria um **novo** pedido diferente! Se o cliente der *retry* automático após um timeout, pode cobrar o cartão do cliente duas vezes (a menos que você implemente uma `Idempotency-Key` no header!). |
| **`PATCH`** | ❌ Não | ⚠️ Depende | Se for absoluto (`{ "status": "pago" }`), comporta-se de forma idempotente; se for relativo (`{ "incrementarSaldo": 50 }`), não é idempotente! Por especificação HTTP, não é garantido idempotente. |

---

### 2.5 Trabalhando com JSON de Forma Eficiente
O **JSON (*JavaScript Object Notation*)** tornou-se o formato padrão de troca de dados em APIs REST por ser leve, legível por humanos e nativamente mapeável em quase todas as linguagens. Porém, trabalhar com JSON em nível profissional exige cuidados específicos:

1. **Tipos suportados vs. limitações:** JSON aceita apenas `string` (sempre com aspas duplas), `number` (sem `NaN`/`Infinity`, e cuidado com precisão de inteiros grandes além de `Number.MAX_SAFE_INTEGER`), `boolean`, `null`, `array` e `object`. **JSON não tem tipo `Date`** (trafegue datas sempre em **ISO-8601 UTC**, ex: `"2026-11-18T00:45:00Z"`) nem suporta `undefined`, funções ou `BigInt` nativamente.
2. **Segurança no `JSON.parse()`:** Nunca dê `JSON.parse(body)` solto sem `try/catch`! Um cliente malicioso ou quebrado enviando payload inválido derrubará seu processo Node.js com `SyntaxError` se não for capturado e convertido em `400 Bad Request`.
3. **Limitação de tamanho do Body e *Backpressure*:** Nunca leia streams de requisição infinitamente na memória RAM. Em servidores HTTP, limite o tamanho máximo permitido do payload (ex: `1 MB` com retorno `413 Payload Too Large`), senão um atacante derruba seu servidor por esgotamento de memória (*Out of Memory*).
4. **Envelope e Padronização:** Mantenha nomes consistentes (preferência de mercado: `camelCase` ou `snake_case`, nunca misturados na mesma API) e pagine listas grandes (`?page=1&limit=20` ou paginação por cursor) para nunca retornar 500.000 linhas em um único JSON de 80 MB.

---

### 2.6 Configurando Regras de CORS (*Cross-Origin Resource Sharing*)
Por segurança, os navegadores aplicam a **Same-Origin Policy (Política de Mesma Origem)**: um script rodando em `https://app.meusite.com` **não pode** ler respostas de `https://api.outrodominio.com` (ou mesmo de `http://localhost:3000` para `http://localhost:8080`, pois **protocolo + domínio + porta** formam a Origem!).

**Importante:** O CORS é uma proteção executada **pelo navegador**, não por ferramentas como `curl`, Postman ou chamadas servidor-para-servidor! É o servidor quem autoriza o navegador devolvendo cabeçalhos `Access-Control-*`.

#### Fluxo do CORS Simples vs. Preflight (`OPTIONS`)
Quando o frontend faz uma requisição "não simples" (por exemplo, um `POST` ou `PUT` com `Content-Type: application/json` ou enviando header customizado `Authorization`), o navegador envia **automaticamente antes** uma requisição **`OPTIONS` (Preflight)** perguntando ao servidor se a origem e os métodos são permitidos:

```mermaid
sequenceDiagram
    participant Browser as Navegador (https://app.site.com)
    participant API as Servidor API (https://api.site.com)
    Browser->>API: OPTIONS /api/naves (Origin, Access-Control-Request-Method: POST)
    API-->>Browser: 204 No Content (Access-Control-Allow-Origin: https://app.site.com)
    Browser->>API: POST /api/naves (Authorization + JSON Body)
    API-->>Browser: 201 Created (Access-Control-Allow-Origin: https://app.site.com)
```

- **Nunca use `Access-Control-Allow-Origin: *` junto com `Access-Control-Allow-Credentials: true`** (o navegador inclusive bloqueia essa combinação por especificação!). Em produção, valide a origem recebida no header `Origin` contra uma *allowlist* explícita de domínios confiáveis da sua empresa.

---

### 2.7 Conceitos Básicos de Rate Limiting para Proteção
**Rate Limiting** restringe quantas requisições um cliente (identificado por endereço IP, API Key ou ID do usuário no JWT) pode fazer dentro de uma janela de tempo. Ele protege sua infraestrutura contra:
- Ataques de força bruta em rotas de login (`/auth/login`) ou recuperação de senha;
- Raspagem abusiva de dados (*scraping*) e negação de serviço (DoS);
- Bugs em clientes frontend que entram em loop infinito de chamadas `useEffect`.

#### Algoritmos mais comuns
1. **Fixed Window Counter (Janela Fixa):** Conta requisições no minuto atual (ex: máximo 60 req/min). Simples de implementar (e ótimo para começar), mas permite um pequeno pico na virada do minuto (60 reqs em `00:59` + 60 reqs em `01:00`).
2. **Sliding Window (Janela Deslizante):** Calcula o limite olhando os últimos 60 segundos contínuos a partir do instante atual, eliminando o pico na borda do minuto.
3. **Token Bucket (Balde de Fichas):** Um balde tem capacidade máxima `C` e recebe fichas a uma taxa constante. Cada requisição consome 1 ficha; se acabar, retorna **`429 Too Many Requests`**. Permite rajadas controladas sem travar imediatamente usuários legítimos.

Boas práticas ao bloquear com `429`: envie cabeçalhos informativos como `Retry-After` (segundos para tentar novamente) e `X-RateLimit-Remaining`.

---

## 3. 💻 Mão no Código (Jeito Iniciante vs. Padrão Profissional)

Vamos construir uma mini API REST em **Node.js puro (`node:http`)** — sem depender de nenhum framework — para enxergar exatamente cada engrenagem do HTTP funcionando, e em seguida um cliente `fetch` resiliente.

#### ❌ Jeito Iniciante (Sem status corretos, sem CORS seguro, sem limite de payload e sem Rate Limit)
```javascript
import http from "node:http";

const naves = [];

http.createServer((req, res) => {
  let body = "";
  req.on("data", (chunk) => { body += chunk; });
  req.on("end", () => {
    if (req.url === "/criarNave") { // ANTIPADRÃO: verbo na URL em vez de POST /naves
      const dados = JSON.parse(body); // PERIGO: crasha o servidor se vier JSON inválido!
      naves.push(dados);
      res.writeHead(200); // ANTIPADRÃO: sempre 200, mesmo para criação ou erro
      res.end("ok"); // ANTIPADRÃO: sem Content-Type application/json
      return;
    }
    res.end(JSON.stringify({ erro: "Rota não existe" })); // Devolve 200 OK num erro 404!
  });
}).listen(3000);
```

#### ✅ Padrão Profissional (REST semântico, `JSON.parse` protegido, CORS allowlist e Rate Limiting)
```javascript
import http from "node:http";

const PORT = 3000;
const MAX_BODY_BYTES = 1024 * 64; // Limite de 64 KB para evitar abuso de RAM
const ALLOWED_ORIGINS = new Set(["http://localhost:5173", "https://app.galactica.dev"]);

// Rate Limiter simples em memória (Janela Fixa: 10 requisições a cada 60 segundos por IP)
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateBuckets = new Map();

const naves = new Map([[1, { id: 1, nome: "Apollo-XI", classe: "exploracao" }]]);
let nextId = 2;

function checkRateLimit(ip) {
  const agora = Date.now();
  const registro = rateBuckets.get(ip);

  if (!registro || agora > registro.resetAt) {
    const novo = { count: 1, resetAt: agora + RATE_LIMIT_WINDOW_MS };
    rateBuckets.set(ip, novo);
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, retryAfterSec: 0 };
  }

  if (registro.count >= RATE_LIMIT_MAX) {
    const retryAfterSec = Math.ceil((registro.resetAt - agora) / 1000);
    return { allowed: false, remaining: 0, retryAfterSec };
  }

  registro.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX - registro.count, retryAfterSec: 0 };
}

function sendJson(res, statusCode, payload, extraHeaders = {}) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    ...extraHeaders,
  });
  if (statusCode === 204) {
    res.end();
    return;
  }
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let bytes = 0;
    const chunks = [];

    req.on("data", (chunk) => {
      bytes += chunk.length;
      if (bytes > MAX_BODY_BYTES) {
        reject(Object.assign(new Error("Payload excede o limite de 64 KB"), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => {
      if (chunks.length === 0) return resolve({});
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf-8")));
      } catch {
        reject(Object.assign(new Error("JSON malformado no corpo da requisição"), { status: 400 }));
      }
    });

    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  // 1. Aplicação segura de CORS com Allowlist
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Responde imediatamente ao Preflight OPTIONS do navegador
  if (req.method === "OPTIONS") {
    return sendJson(res, 204, null);
  }

  // 2. Rate Limiting por IP do cliente
  const clientIp = req.socket.remoteAddress || "unknown";
  const rate = checkRateLimit(clientIp);
  res.setHeader("X-RateLimit-Limit", String(RATE_LIMIT_MAX));
  res.setHeader("X-RateLimit-Remaining", String(rate.remaining));

  if (!rate.allowed) {
    return sendJson(
      res,
      429,
      { error: "Muitas requisições. Aguarde antes de tentar novamente." },
      { "Retry-After": String(rate.retryAfterSec) }
    );
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  try {
    // GET /api/v1/naves -> Seguro e Idempotente (200 OK)
    if (req.method === "GET" && url.pathname === "/api/v1/naves") {
      return sendJson(res, 200, { data: Array.from(naves.values()) });
    }

    // POST /api/v1/naves -> Não idempotente (201 Created + Location)
    if (req.method === "POST" && url.pathname === "/api/v1/naves") {
      const body = await readJsonBody(req);
      if (!body.nome || typeof body.nome !== "string") {
        return sendJson(res, 422, { error: "Campo obrigatório 'nome' deve ser uma string." });
      }
      const novaNave = { id: nextId++, nome: body.nome.trim(), classe: body.classe || "padrao" };
      naves.set(novaNave.id, novaNave);
      return sendJson(res, 201, novaNave, { Location: `/api/v1/naves/${novaNave.id}` });
    }

    // DELETE /api/v1/naves/:id -> Idempotente (204 No Content ou 404 Not Found)
    const matchId = url.pathname.match(/^\/api\/v1\/naves\/(\d+)$/);
    if (req.method === "DELETE" && matchId) {
      const id = Number(matchId[1]);
      if (!naves.has(id)) {
        return sendJson(res, 404, { error: `Nave ${id} não encontrada.` });
      }
      naves.delete(id);
      return sendJson(res, 204, null);
    }

    return sendJson(res, 404, { error: "Endpoint não encontrado." });
  } catch (err) {
    const status = err.status || 500;
    return sendJson(res, status, { error: status === 500 ? "Erro interno do servidor" : err.message });
  }
});

server.listen(PORT, () => console.log(`API REST cósmica ouvindo na porta ${PORT}`));
```

---

## 4. 🛠️ Laboratório de Voo (Exercício Prático Guiado)

**Tempo estimado:** 45 minutos
**Objetivo:** Subir o servidor HTTP acima localmente e testá-lo pelo terminal com `curl` (ou Postman/Insomnia), validando verbos, Status Codes, CORS Preflight e Rate Limiting `429`.

### Passo a Passo Reproduzível

1. **Salve o código profissional da Seção 3 como `api-naves.mjs`** e inicie com `node api-naves.mjs`.
2. **Crie um recurso (`201 Created`) e observe o header `Location`**:
   ```bash
   curl -i -X POST http://localhost:3000/api/v1/naves \
     -H "Content-Type: application/json" \
     -d '{"nome": "Enterprise-D", "classe": "cruzador"}'
   ```
3. **Teste erro de validação (`422`) e JSON quebrado (`400`)**:
   ```bash
   curl -i -X POST http://localhost:3000/api/v1/naves \
     -H "Content-Type: application/json" \
     -d '{"classe": "sem-nome"}'

   curl -i -X POST http://localhost:3000/api/v1/naves \
     -H "Content-Type: application/json" \
     -d '{json-quebrado'
   ```
4. **Simule um Preflight de CORS (`OPTIONS`)** com origem autorizada vs. origem desconhecida:
   ```bash
   curl -i -X OPTIONS http://localhost:3000/api/v1/naves \
     -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: POST"
   ```
5. **Acione o Rate Limiting (`429 Too Many Requests`)**:
   - Dispare 12 requisições `GET http://localhost:3000/api/v1/naves` em menos de 1 minuto (com um loop `for` no Bash) e observe os headers `X-RateLimit-Remaining` caindo até `0`, seguido por `HTTP/1.1 429` com `Retry-After`.
6. **Desafio extra:** Adicione a rota `PUT /api/v1/naves/:id` garantindo comportamento idempotente!

### Critérios de Domínio
- [ ] Você consegue explicar olhando o output do `curl -i` cada linha da resposta: Status Line, Headers e Body.
- [ ] Seu teste de CORS retornou `Access-Control-Allow-Origin: http://localhost:5173` para a origem confiável e **omitiu** o header para uma origem maliciosa (`http://evil.com`).
- [ ] A partir da 11ª chamada no mesmo minuto, o servidor respondeu com status `429` e o header `Retry-After`.

---

## 5. 🎯 Resolução Comentada do Teste de Ignição (Quest Oficial)

> **Pergunta Oficial (`apis-web`):**
> *O que significa dizer que um método HTTP é 'idempotente'?*

- **A)** *"Significa que a requisição é encriptada por padrão antes de ser enviada."*
- **B)** *"Significa que múltiplos disparos idênticos dessa requisição produzem o mesmo efeito no estado do servidor que um único disparo."*
- **C)** *"Significa que a resposta é obrigatoriamente retornada em menos de 100 milissegundos."*
- **D)** *"Significa que o servidor deleta os dados da requisição logo após enviá-la ao banco de dados."*

### ✅ Resposta Correta: **Alternativa B**

**Por que a Alternativa B está correta:**
Na especificação oficial do protocolo HTTP (RFC 9110), idempotência é uma propriedade sobre o **efeito no estado do servidor**: se uma requisição idêntica (como `PUT /perfil` com os mesmos dados, `GET /produtos` ou `DELETE /posts/9`) for enviada 1 vez ou 5 vezes seguidas (por exemplo, devido a um reenvio automático após queda de Wi-Fi), o estado resultante armazenado no servidor será exatamente o mesmo que teria sido produzido por uma única requisição bem-sucedida.

**Por que as outras 3 alternativas estão erradas:**
- **Alternativa A (Incorreta):** Encriptação em trânsito é responsabilidade do **TLS/HTTPS**, não tendo relação com idempotência nem com a escolha do método HTTP.
- **Alternativa C (Incorreta):** Idempotência refere-se exclusivamente à previsibilidade sobre o **estado dos dados no servidor**, nunca a garantias de latência ou tempo de resposta (SLA).
- **Alternativa D (Incorreta):** Essa afirmação é inventada e não descreve nenhum conceito do protocolo HTTP (e contradiz inclusive a ideia de persistência).

---

## 6. 🎤 Kit de Apresentação (Como Dar Aula / Apresentar Este Módulo)

### Pitch Feynman de 2 Minutos (Texto Pronto para Falar)
> "Quando você abre um app no celular ou um site no navegador e clica em 'Comprar', o seu dispositivo não acessa diretamente o banco de dados da empresa — isso seria um desastre de segurança. Em vez disso, ele manda uma carta super padronizada pela internet usando o **protocolo HTTP**.
>
> Essa carta tem quatro coisas simples: o **Verbo** (o que eu quero fazer: `GET` para ler, `POST` para criar, `PUT` ou `PATCH` para atualizar, `DELETE` para apagar), o **Endereço** do recurso, os **Cabeçalhos** (como o crachá de autorização e o aviso de que a carta está em JSON) e o **Corpo** com os dados. O servidor lê, processa e devolve um **Status Code** de 3 dígitos que conta a história na hora: família `200` deu bom, `400` você cliente mandou algo errado, `500` o servidor quebrou.
>
> Agora, tem três detalhes que separam um dev iniciante de um profissional: primeiro, saber que `GET`, `PUT` e `DELETE` são **idempotentes** — se a internet cair e o app tentar mandar de novo, não duplica nada, diferente do `POST`! Segundo, entender que o **CORS** não é um bug chato, é o navegador protegendo o usuário contra sites maliciosos tentando roubar dados de outra origem. E terceiro, proteger sua API com **Rate Limiting**, que coloca um porteiro barrando robôs com o código `429` antes que derrubem seu banco de dados!"

### Roteiro de Slides (6 Slides)
1. **Slide 1 — Título:** *"Como Sistemas Conversam: HTTP & APIs RESTful na Prática"* | Visual: Diagrama Cliente (App/Browser) <-> Envelope HTTP <-> Servidor API.
2. **Slide 2 — Raio-X da Mensagem HTTP:** Request Line, Headers, Body e Verbos (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) | Visual: Envelope de carta anatômico colorido com setas para cada bloco.
3. **Slide 3 — Semântica de Status Codes:** `2xx`, `3xx`, `4xx` vs. `5xx` (e o clássico duelo `401` vs. `403`, `400` vs. `422`) | Visual: Semáforo de cores por faixa com exemplos reais de uso.
4. **Slide 4 — REST, Stateless e Idempotência:** Por que Stateless escala e por que `POST` precisa de cuidado no retry | Visual: Load balancer distribuindo 2 requisições do mesmo usuário para servidores diferentes sem perder sessão.
5. **Slide 5 — O Fantasma do CORS Explicado:** *Same-Origin Policy* + Fluxo `OPTIONS` Preflight | Visual: `sequenceDiagram` com o navegador pedindo permissão antes de enviar o `POST`.
6. **Slide 6 — Segurança Operacional:** JSON seguro (limites e validação) + Rate Limiting (`429 Too Many Requests`) | Visual: Balde de fichas (Token Bucket) barrando excesso de requisições.

### Roteiro de Demo Ao Vivo (3 Minutos)
1. **Minuto 1:** Abra a aba **Network** do DevTools do Chrome em qualquer site real, filtre por `Fetch/XHR` e aponte ao vivo um Request Header (`Authorization`, `Origin`), Response Header (`Content-Type`, `Cache-Control`) e Status Code.
2. **Minuto 2:** No terminal, execute um `curl -i -X POST` no seu servidor `api-naves.mjs` mostrando o `201 Created` e depois dispare um JSON inválido para mostrar o `400 Bad Request` sem derrubar o servidor.
3. **Minuto 3:** Rode um loop rápido no terminal para estourar as 10 requisições e mostre ao vivo o servidor bloqueando com `429 Too Many Requests` e `Retry-After`.

### Perguntas Difíceis da Plateia (Respostas Seguras)
- **Pergunta 1:** *"Por que o CORS bloqueia minha requisição no React/navegador, mas quando eu testo a mesma URL no Postman ou Insomnia ela funciona?"*
  - **Resposta:** "Porque o CORS é uma política de segurança implementada **exclusivamente pelos navegadores web** para impedir que um site aberto em uma aba (ex: `site-duvidoso.com`) use os seus cookies ou sua rede interna para fazer requisições escondidas para outro site (ex: `meu-banco.com`). O Postman, `curl` e chamadas backend-para-backend não executam scripts de terceiros não confiáveis dentro de um navegador, logo não aplicam Same-Origin Policy."
- **Pergunta 2:** *"Qual a diferença prática entre `PUT` e `PATCH`? Posso usar só `PUT` para tudo?"*
  - **Resposta:** "O `PUT` representa a **substituição completa** do recurso no destino — se o usuário tem `{ nome, email, telefone }` e você envia um `PUT` apenas com `{ nome }`, pela semântica estrita o `email` e o `telefone` deveriam ser apagados/nulos, o que torna o `PUT` sempre idempotente. Já o `PATCH` envia apenas um **delta de atualização parcial** (`{ email: "novo@email.com" }`), economizando tráfego e evitando apagar campos não enviados."

---

## 7. 💼 Radar do Mercado de Trabalho (Foco Dev Júnior)

### 3 Perguntas Reais de Entrevista Técnica Júnior
1. **Pergunta:** *"Qual a diferença entre os status codes `401 Unauthorized` e `403 Forbidden`?"*
   - **Resposta-modelo:** "Apesar do nome histórico `Unauthorized`, o código **`401`** significa **falta de autenticação**: o servidor não sabe quem é o usuário (token JWT ausente, expirado ou senha errada). Já o **`403 Forbidden`** significa que o usuário foi autenticado com sucesso (o servidor sabe quem ele é), mas **não tem permissão** para acessar aquele recurso específico — por exemplo, um cliente comum tentando acessar a rota de exclusão administrativa."
2. **Pergunta:** *"Como você garante que um endpoint de pagamento com `POST /pagamentos` não cobre o cliente duas vezes se o app reenviar a requisição por instabilidade de rede?"*
   - **Resposta-modelo:** "Como `POST` não é idempotente por natureza, aplicamos o padrão de **Chave de Idempotência (*Idempotency-Key*)**. O cliente gera um UUID único por intenção de compra e envia no header `Idempotency-Key`. No backend, antes de processar a cobrança, verifico no banco/cache (idealmente com lock ou restrição `UNIQUE`) se aquela chave já foi processada: se sim, não executo a cobrança novamente e apenas devolvo a mesma resposta salva anteriormente."
3. **Pergunta:** *"O que significa uma API REST ser `Stateless` e qual o impacto disso para escalar a aplicação?"*
   - **Resposta-modelo:** "Ser `Stateless` significa que o servidor não guarda estado de sessão da conversa do cliente na memória RAM entre uma requisição e outra. Toda requisição traz consigo suas credenciais (como um JWT) e todo o contexto necessário. O grande ganho é a escalabilidade horizontal: posso colocar 10 instâncias da minha API atrás de um Load Balancer e qualquer instância consegue responder a qualquer requisição sem precisar de 'sessão presa' (*sticky sessions*)."

### Erros Clássicos de Júnior vs. Postura Profissional
- ❌ **Comportamento de Júnior:** Criar rotas cheias de verbos estilo RPC malfeito (`POST /api/deletarUsuarioPorId`, `GET /api/criarProduto`) e retornar `200 OK` para erros de validação.
  - ✅ **Postura Profissional:** Usar substantivos no plural na URI (`DELETE /api/v1/usuarios/42`, `POST /api/v1/produtos`) combinados com os verbos HTTP corretos e Status Codes semânticos (`201`, `204`, `400`, `404`, `422`).
- ❌ **Comportamento de Júnior:** Fazer `fetch(url)` no frontend sem verificar `if (!response.ok)` (achando que erro `404` ou `500` cai automaticamente no bloco `catch`).
  - ✅ **Postura Profissional:** Lembrar que o `fetch()` só rejeita a Promise em **falha de rede/DNS/cancelamento**; status `4xx` e `5xx` resolvem a Promise normalmente, portanto sempre verificamos `if (!response.ok)` e configuramos timeout com `AbortSignal.timeout()`.

### Evidência para Portfólio / GitHub / LinkedIn
- **No GitHub:** Publique uma API REST com uma coleção exportada do **Postman / Insomnia** ou arquivo `requests.http` no repositório demonstrando testes de todos os status codes (`200`, `201`, `204`, `400`, `404`, `422`, `429`).
- **No LinkedIn:** Escreva um post didático explicando com um diagrama simples *"Por que o CORS acontece no navegador e nunca no Postman"* — é uma das dúvidas mais pesquisadas por iniciantes e gera excelente engajamento técnico.

---

## 8. 📡 Transmissões Recomendadas & Próxima Órbita

### Materiais Oficiais de Aprofundamento (`data.js`)
- 📖 **[MDN: Visão Geral do HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Overview)** — Documentação definitiva em português sobre mensagens HTTP, cabeçalhos, fluxos e conexões.
- 🏛️ **[RESTful API Tutorial](https://restfulapi.net/)** — Guia completo das restrições REST, boas práticas de nomenclatura de recursos e tabela de métodos idempotentes.
- 🚀 **[Postman API Network](https://www.postman.com/explore)** — Explore coleções de APIs reais (GitHub, Stripe, NASA, Spotify) para estudar como grandes empresas modelam suas URIs, headers e paginações.

### Próximas Órbitas Desbloqueadas
Com os protocolos de comunicação web dominados, você completou as duas ramificações intermediárias da **Nébula dos Fundamentos**:
1. ➡️ **[Aula 05 — Bancos de Dados Relacionais & SQL (`sql-bd`)](./05-bancos-de-dados-relacionais-sql.md)** *(requer também a [Aula 03](./03-paradigmas-de-programacao.md))* — Para aprender a persistir e consultar os dados que sua API trafega com velocidade e integridade.
2. ➡️ **Galáxia 2 — Constelação do Frontend Web (`fe-html-css`)** — Este módulo também desbloqueia sua jornada visual na criação de interfaces web!
