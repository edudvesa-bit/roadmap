# 🐳 Aula 17 — Docker & Containerização

> *"Rode seu app em qualquer lugar. Aprenda a empacotar seu código com suas dependências exatas de forma isolada, leve e segura."*

---

## 1. 🚀 Briefing da Missão (Contexto Temático & Realidade de Mercado)

| Metadado do Setor | Especificação |
| :--- | :--- |
| **Galáxia** | Galáxia 4 — Órbita do DevOps & Cloud |
| **ID do Módulo** | `docker` |
| **Pré-requisitos** | [Mensageria & Filas Assíncronas](../03-cinturao-de-arquitetura/15-mensageria-filas-assincronas.md) (`filas-assincrono`) ou [Performance & Build Tools](../02-constelacao-do-frontend-web/10-performance-build-tools.md) (`fe-build-performance`) |
| **Próximas Aulas** | [Aula 18 — Integração & Entrega Contínua (CI/CD)](./18-integracao-entrega-continua-cicd.md) (`cicd`) e [Aula 20 — Segurança Web & Criptografia](./20-seguranca-web-criptografia.md) (`seguranca-criptografia`) |

### 🛸 Analogia do Navegador Cósmico: A Cápsula de Carga Padronizada (ISO Orbital)

Antes da década de 1950, embarcar mercadorias em um navio era um caos logístico: sacos de café, barris de óleo e caixotes de madeira exigiam guindastes diferentes, encaixavam mal no porão e estragavam no caminho. Quando inventaram o **contêiner marítimo padronizado**, tudo mudou: o navio, o trem e o caminhão passaram a mover exatamente a mesma caixa metálica lacrada, sem se importar com o que havia dentro.

No desenvolvimento de software, **Docker** é o contêiner orbital da engenharia moderna. Imagine que sua API Node.js ou Python é uma carga sensível que precisa da versão exata `20.11.1` do runtime, uma biblioteca específica de sistema operacional (`libvips` para imagens) e variáveis de ambiente definidas. Sem containers, você envia apenas a carga solta e reza para a estação espacial de produção ter a mesma atmosfera da sua máquina local. Com Docker, você lacra sua aplicação junto com toda a atmosfera mínima necessária dentro de uma **cápsula hermética e reproduzível**. Onde houver um motor compatível (Docker Engine), sua cápsula acopla e decola de forma idêntica — seja no seu notebook macOS, no Windows do colega ou no servidor Linux na nuvem.

### 💼 A Dor Real que Este Módulo Resolve nas Empresas

Toda empresa de tecnologia já sofreu com a clássica maldição do **"na minha máquina funciona"**:

1. **Inconsistência entre ambientes:** o dev júnior testa com Node 22 no Mac, o colega usa Node 18 no Windows, e o servidor de homologação roda Ubuntu com Node 16. O código quebra em produção por causa de uma diferença sutil de biblioteca nativa ou fuso horário.
2. **Onboarding lento:** um novo contratado leva três dias configurando Postgres, Redis, versões corretas de Python/Node e certificados locais antes de conseguir rodar o projeto pela primeira vez.
3. **Conflito de dependências na mesma máquina:** o Projeto A exige Postgres 13 e Python 3.9; o Projeto B exige Postgres 16 e Python 3.12. Instalar tudo direto no sistema operacional cria conflitos difíceis de rastrear.
4. **Desperdício de infraestrutura:** subir uma Máquina Virtual inteira (com gigabytes de sistema operacional completo) apenas para rodar um microsserviço de 50 MB desperdiça CPU, memória RAM e dinheiro na fatura de nuvem.

Docker resolve os quatro problemas de uma vez: **padronização, isolamento, portabilidade e economia de recursos**.

---

## 2. 📚 Carga de Conhecimento Completa (Tópico por Tópico)

### 2.1 Diferença entre Containers (Namespaces/Cgroups) e Máquinas Virtuais

Muita gente acha que um container é "uma Máquina Virtual pequenininha". **Tecnicamente, isso é falso.** Entender essa diferença separa quem apenas decora comandos de quem compreende a infraestrutura Linux por baixo dos panos.

* **Máquina Virtual (VM):** utiliza um **Hypervisor** (como VirtualBox, VMware, KVM ou Hyper-V) para emular hardware virtual (CPU, placa de rede, disco). Dentro de cada VM roda um **Sistema Operacional Convidado (Guest OS) completo**, com seu próprio **Kernel**. Isso consome gigabytes de disco e centenas de megabytes de RAM apenas para manter o sistema operacional vivo, além de levar dezenas de segundos (ou minutos) para inicializar.
* **Container (Docker / OCI):** **não** emula hardware e **não** carrega um segundo Kernel. Todos os containers em um host Linux compartilham o **mesmo Kernel do sistema operacional hospedeiro (Host OS)**. O container é, na essência, um **processo Linux comum isolado** por dois recursos nativos do kernel:
  * **Linux Namespaces:** criam a ilusão de isolamento para o processo. Cada container ganha sua própria árvore de processos (`PID namespace`), seu próprio sistema de arquivos raiz (`MNT namespace`), suas próprias interfaces de rede e portas (`NET namespace`), seus próprios usuários (`USER namespace`) e hostname (`UTS namespace`). Para o processo dentro do container, ele acha que é o PID 1 em uma máquina só dele.
  * **Control Groups (`cgroups`):** controlam e limitam **quanto recurso físico** o container pode consumir (teto de CPU, limite rígido de RAM, taxa de I/O de disco). Se um container vazar memória, o `cgroup` impede que ele derrube o servidor inteiro e os outros containers vizinhos.
  * **Union File System (OverlayFS):** permite montar camadas (layers) somente leitura empilhadas com uma camada gravável fina no topo. Se 10 containers usarem a mesma base `alpine`, o disco armazena a base **uma única vez**.

```mermaid
flowchart TB
    subgraph VM["Arquitetura de Máquinas Virtuais (VMs)"]
        direction TB
        AppVM1["App A + Libs"] --> GuestOS1["Guest OS Completo (Kernel A)"]
        AppVM2["App B + Libs"] --> GuestOS2["Guest OS Completo (Kernel B)"]
        GuestOS1 --> Hypervisor["Hypervisor (KVM / Hyper-V)"]
        GuestOS2 --> Hypervisor
        Hypervisor --> HostVM["Host OS + Hardware Físico"]
    end

    subgraph Container["Arquitetura de Containers (Docker)"]
        direction TB
        AppC1["Container A (App A + Libs)"] --> Engine["Docker Engine (containerd / runc)"]
        AppC2["Container B (App B + Libs)"] --> Engine
        Engine --> Kernel["Kernel Linux Compartilhado (Namespaces + Cgroups)"]
        Kernel --> HostC["Host OS + Hardware Físico"]
    end
```

> [!NOTE]
> **E no Windows e macOS?** Como containers Linux dependem de Namespaces e Cgroups do Kernel Linux, o **Docker Desktop** cria automaticamente uma VM Linux leve e transparente em segundo plano (usando WSL2 no Windows ou Virtualization.framework no macOS) para hospedar o Docker Engine. Em servidores de produção Linux, não existe VM intermediária — os containers rodam direto no Kernel do servidor.

| Critério | Máquina Virtual (VM) | Container Docker |
| :--- | :--- | :--- |
| **Isolamento** | Hardware virtual + Kernel separado (isolamento mais forte) | Processo Linux via `namespaces` + `cgroups` no mesmo Kernel |
| **Tamanho típico** | 2 GB a 20 GB+ | 15 MB a 300 MB |
| **Tempo de boot** | 30 segundos a minutos | Milissegundos a poucos segundos |
| **Overhead de RAM/CPU** | Alto (cada VM roda um OS inteiro) | Mínimo (apenas o processo da aplicação) |
| **Densidade por servidor** | Dezenas de VMs | Centenas ou milhares de containers |

---

### 2.2 Escrever Dockerfiles Limpos e Seguros

Um `Dockerfile` é a receita declarativa (passo a passo) usada pelo `docker build` para montar uma **Imagem** (o molde imutável). Quando executamos uma imagem com `docker run`, nasce um **Container** (a instância viva).

Cada instrução no `Dockerfile` (`FROM`, `WORKDIR`, `COPY`, `RUN`) gera uma **camada em cache (layer)**. A ordem das instruções dita tanto a velocidade do build quanto o nível de segurança da imagem:

1. **Fixe versões específicas (Pinning):** evite `FROM node:latest` em produção. `latest` é um ponteiro móvel que pode quebrar seu build silenciosamente na semana seguinte quando sair uma major version nova. Prefira `FROM node:20.18.0-alpine3.20` (ou com digest SHA256 em pipelines críticos).
2. **Use `.dockerignore` sempre:** sem `.dockerignore`, o comando `COPY . .` envia a pasta `.git`, o `node_modules` local do seu sistema operacional, arquivos `.env` com senhas locais e logs para dentro do contexto de build — deixando o build lento e vazando credenciais na imagem!
3. **Ordene camadas da menos mutável para a mais mutável:** copie primeiro `package.json` e `package-lock.json`, execute `npm ci`, e **só depois** copie o código-fonte (`COPY src/ ./src/`). Assim, quando você altera uma linha em `src/`, o Docker reaproveita o cache da camada de dependências e não baixa tudo da internet de novo.
4. **Nunca rode como `root` em produção:** por padrão, processos dentro do container rodam como `UID 0 (root)`. Se um invasor explorar uma vulnerabilidade na sua API e conseguir escapar do container, ter `UID 0` facilita a escalação de privilégios no host. Crie ou use um usuário sem privilégios (`USER node` ou `adduser`).
5. **Nunca coloque segredos em `ENV` ou `ARG` de build:** valores definidos em `ENV` ou `ARG` ficam gravados no histórico da imagem (`docker history`). Senhas de banco e chaves de API devem ser injetadas **apenas em tempo de execução** (`docker run -e`, Docker Secrets ou cofres como AWS Secrets Manager).
6. **Combine comandos `RUN` e limpe caches de pacotes:** cada `RUN` cria uma camada persistente. Se você instalar `apt-get` em um `RUN` e tentar apagar o cache em outro `RUN`, o arquivo apagado ainda ocupa espaço na camada anterior! Faça instalação e limpeza no mesmo `RUN` (`rm -rf /var/lib/apt/lists/*`).
7. **Prefira `CMD ["node", "dist/server.js"]` (exec form):** o formato array JSON executa o processo diretamente como PID 1, permitindo que ele receba sinais do sistema operacional como `SIGTERM` para realizar **Graceful Shutdown** (fechar conexões de banco antes de morrer), ao contrário da forma shell que envolve tudo em `/bin/sh -c`.

---

### 2.3 Otimizar Imagens com Multi-stage Builds e Imagens Base Reduzidas (ex: Alpine)

Uma aplicação TypeScript, Go, Java ou React precisa de **ferramentas pesadas para compilar** (compilador `tsc`, SDKs, `devDependencies`, `gcc`, `python3`), mas **não precisa de nada disso para rodar em produção**. Se você deixar o código-fonte, os arquivos de teste e os compiladores dentro da imagem final, terá dois problemas graves:

* **Imagem obesa:** lentidão para enviar ao registry (push) e lentidão para escalar novos containers em produção (pull).
* **Superfície de ataque inchada:** quanto mais binários (`curl`, `bash`, compiladores, pacotes de dev) existirem dentro do container, mais vulnerabilidades (CVEs) estarão disponíveis caso um invasor acesse o container.

O recurso de **Multi-stage Build** permite declarar múltiplos blocos `FROM` no mesmo `Dockerfile`:
* **Estágio 1 (`builder`):** usa uma imagem completa, instala todas as dependências (incluindo `devDependencies`), compila o TypeScript/Go/bundle e gera os artefatos finais (`dist/` ou binário estático).
* **Estágio 2 (`production`):** parte do zero com uma imagem base minúscula (como `alpine`, `slim` ou `distroless`), copia **somente** o código compilado e as dependências de produção usando `COPY --from=builder ...`. Tudo que existia no estágio `builder` é descartado!

#### Comparação de Imagens Base Comuns

| Imagem Base | Tamanho Aproximado | Características e Quando Usar |
| :--- | :--- | :--- |
| `node:20` (Debian Bookworm completo) | ~1.1 GB | Contém compiladores, git, curl, bibliotecas completas. Boa apenas para **estágio builder**, péssima para produção. |
| `node:20-slim` (Debian enxuto) | ~200 MB | Usa `glibc` padrão, sem ferramentas extras. Ótima escolha equilibrada quando bibliotecas nativas precisam de `glibc`. |
| `node:20-alpine` (Alpine Linux) | ~130 MB (base Alpine: ~7 MB) | Usa `musl libc` e `busybox`. Extremamente leve e com poucas CVEs. Atenção se usar pacotes nativos C++ ou binários compilados para `glibc`. |
| `gcr.io/distroless/nodejs20-debian12` | ~120 MB | Não possui sequer um shell (`/bin/sh`) ou gerenciador de pacotes. Máxima segurança para produção, embora dificulte debug interativo. |

---

### 2.4 Orquestrar Múltiplos Containers Localmente com o Docker Compose

Uma aplicação real raramente vive sozinha. Mesmo um projeto de portfólio costuma precisar de:
* API Backend (Node.js / Python / Go);
* Banco de Dados Relacional (PostgreSQL);
* Cache / Fila em Memória (Redis);
* Worker assíncrono separado.

Subir quatro containers digitando comandos gigantes de `docker run -p ... -v ... --network ... -e ...` no terminal é inviável e propenso a erros. É para isso que existe o **Docker Compose** (`compose.yaml` ou `docker-compose.yml`).

Com um único arquivo YAML versionado no Git, o Compose permite:
* Subir toda a stack com um único comando: `docker compose up -d --build`.
* Definir **ordem de inicialização real** usando `depends_on` com `condition: service_healthy` (não basta o container do Postgres estar "ligado", ele precisa estar aceitando conexões SQL!).
* Configurar **DNS interno automático**: dentro da rede do Compose, a API não acessa `localhost:5432` (porque `localhost` dentro do container da API é a própria API!); ela acessa `postgres:5432`, usando o nome do serviço como hostname.
* Aplicar limites de recursos, políticas de reinicialização (`restart: unless-stopped`), perfis de execução (`profiles`) e variáveis de ambiente a partir de um `.env` local (nunca commitado no Git).

---

### 2.5 Volumes para Persistência e Redes Isoladas para Segurança

Containers são **efêmeros por natureza**. Se o container do banco PostgreSQL for removido e recriado (`docker compose down && docker compose up`), tudo que foi salvo apenas na camada gravável interna do container desaparece para sempre!

#### Persistência com Volumes vs. Bind Mounts

```mermaid
flowchart LR
    C["Container PostgreSQL"] -->|"Monta em /var/lib/postgresql/data"| V["Named Volume: pg_data"]
    V -->|"Gerenciado pelo Docker"| HostDisk["Disco do Host (/var/lib/docker/volumes/)"]
    C2["Container API Dev"] -->|"Monta ./src em /app/src"| BM["Bind Mount (Pasta do Projeto)"]
    BM -->|"Hot Reload instantâneo"| DevFolder["Pasta Local do Desenvolvedor"]
```

1. **Named Volumes (Volumes Nomeados — ex: `pg_data:/var/lib/postgresql/data`):** criados e gerenciados pelo Docker Engine. Sobrevivem à destruição do container e oferecem melhor desempenho e compatibilidade de permissões. É o padrão para **bancos de dados e uploads persistentes**.
2. **Bind Mounts (ex: `./src:/app/src`):** mapeiam uma pasta específica do seu computador diretamente dentro do container. É o padrão para **desenvolvimento local** (permitindo *hot reload* quando você salva um arquivo no VS Code sem precisar rebuildar a imagem). Nunca use bind mount do código-fonte em produção.
3. **tmpfs Mounts:** armazenam dados apenas na memória RAM do host, nunca em disco. Útil para caches temporários ou tokens sensíveis que não devem tocar o disco.

#### Redes Isoladas (Networks)

Por padrão, quando você usa a rede bridge padrão ou expõe portas com `ports: ["5432:5432"]`, está abrindo portas no seu host. Em arquitetura segura com Docker Compose:
* **Separe redes em camadas:** crie uma rede `frontend_net` (onde ficam Proxy Reverso / API) e uma rede `backend_net` com `internal: true` (onde ficam API, Postgres e Redis).
* **Por que isso protege seu sistema?** Um container conectado apenas à rede `backend_net` (`internal: true`) não possui acesso à internet externa e não é acessível diretamente por quem está na camada de entrada. Apenas a API serve de ponte entre as duas redes.
* **Só exponha `ports` do que realmente precisa falar com o mundo externo:** em produção (ou mesmo localmente quando só a API consome o Redis), evite publicar a porta do Redis ou do banco de dados no host se não houver necessidade de acesso externo, ou restrinja para `127.0.0.1:5432:5432` em ambiente local.

---

## 3. 💻 Mão no Código (Jeito Iniciante vs. Padrão Profissional)

Vamos analisar o empacotamento de uma API Node.js + TypeScript que precisa compilar `src/*.ts` para `dist/*.js`.

### ❌ Jeito Iniciante (Antipadrão Comum)

```dockerfile
# ❌ ANTIPADRÃO: imagem base gigante (1.1 GB+), sem versão exata do patch
FROM node:20

WORKDIR /app

# ❌ Copia TUDO de uma vez (quebra o cache do npm install a cada alteração de código)
# ❌ Sem .dockerignore, copia .git, node_modules local e .env com senhas!
COPY . .

# ❌ Instala devDependencies (TypeScript, Jest, ESLint) que irão para produção
RUN npm install

# ❌ Compila e mantém código-fonte + ferramentas de build na imagem final
RUN npm run build

# ❌ Grava segredo no histórico da imagem (visível com docker history!)
ENV JWT_SECRET=minha_senha_super_secreta_123

EXPOSE 3000

# ❌ Roda como usuário root (UID 0) e via shell form (atrapalha SIGTERM)
CMD npm start
```

### ✅ Padrão Profissional (Multi-stage Build + Non-Root + `.dockerignore` + Compose Isolado)

Primeiro, o arquivo `.dockerignore` na raiz do projeto:

```gitignore
# .dockerignore
node_modules
dist
.git
.gitignore
.env
.env.*
*.log
coverage
README.md
docker-compose*.yml
Dockerfile*
```

Agora o `Dockerfile` profissional comentado linha a linha:

```dockerfile
# syntax=docker/dockerfile:1

# ==============================================================================
# ESTÁGIO 1: BUILDER (Compilação com todas as ferramentas de dev)
# ==============================================================================
FROM node:20.18.0-alpine3.20 AS builder

# Define o diretório de trabalho padrão dentro da imagem
WORKDIR /usr/src/app

# Copia apenas os manifestos primeiro para maximizar o reaproveitamento de cache
COPY package.json package-lock.json ./

# npm ci garante instalação determinística e idêntica ao package-lock.json
RUN npm ci

# Só agora copia o código-fonte TypeScript e arquivos de configuração de build
COPY tsconfig.json ./
COPY src ./src

# Compila TypeScript para JavaScript na pasta /usr/src/app/dist
RUN npm run build

# Remove devDependencies mantendo apenas pacotes necessários em produção
RUN npm prune --omit=dev


# ==============================================================================
# ESTÁGIO 2: PRODUCTION (Imagem final enxuta, sem compiladores e não-root)
# ==============================================================================
FROM node:20.18.0-alpine3.20 AS production

# Variável de ambiente padrão informando modo de execução (não é segredo)
ENV NODE_ENV=production

# Cria usuário/grupo dedicados sem privilégios ou usa o usuário 'node' já existente na imagem oficial
WORKDIR /usr/src/app

# Copia somente os artefatos compilados e as dependências de produção do estágio builder
# --chown=node:node já entrega os arquivos pertencendo ao usuário não-privilegiado
COPY --from=builder --chown=node:node /usr/src/app/package.json ./
COPY --from=builder --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=node:node /usr/src/app/dist ./dist

# Muda para o usuário não-root antes de executar qualquer processo
USER node

# Documenta a porta em que a aplicação escuta (não publica a porta sozinho)
EXPOSE 3000

# Verifica periodicamente se a aplicação está saudável internamente
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

# Exec form (array JSON): o Node roda como PID 1 e recebe SIGTERM corretamente
CMD ["node", "dist/server.js"]
```

Agora, o `docker-compose.yml` orquestrando API + PostgreSQL + Redis com redes isoladas e persistência:

```yaml
# docker-compose.yml
services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    container_name: galactic-api
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      PORT: 3000
      # Usa os nomes dos serviços ("postgres" e "redis") como hostnames DNS
      DATABASE_URL: "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}"
      REDIS_URL: "redis://redis:6379"
    # Só inicia a API depois que Postgres e Redis passarem no Healthcheck
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - edge_net
      - internal_net
    # Limites defensivos para evitar que um bug consuma toda a máquina host
    deploy:
      resources:
        limits:
          cpus: "0.50"
          memory: 512M

  postgres:
    image: postgres:16.4-alpine3.20
    container_name: galactic-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      # Volume nomeado: os dados sobrevivem mesmo após 'docker compose down'
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 5s
      timeout: 5s
      retries: 5
    # Fica SOMENTE na rede interna isolada (sem acesso direto externo nem portas públicas)
    networks:
      - internal_net

  redis:
    image: redis:7.4-alpine3.20
    container_name: galactic-redis
    restart: unless-stopped
    command: ["redis-server", "--appendonly", "yes"]
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - internal_net

volumes:
  postgres_data:
  redis_data:

networks:
  edge_net:
    driver: bridge
  internal_net:
    driver: bridge
    internal: true # Bloqueia tráfego de saída para a internet dentro da rede de dados
```

---

## 4. 🛠️ Laboratório de Voo (Exercício Prático Guiado)

**Duração estimada:** 45 minutos  
**Missão:** Reduzir uma imagem Docker inchada de ~1.1 GB para menos de 180 MB e orquestrar uma API conectada a um banco Postgres persistente com rede isolada.

### Passo a Passo Reproduzível

1. **Crie uma pasta de laboratório e inicialize um projeto Node/TypeScript mínimo:**
   ```bash
   mkdir lab-docker-orbital && cd lab-docker-orbital
   npm init -y
   npm install express pg
   npm install -D typescript @types/node @types/express
   npx tsc --init
   ```
2. **Crie um `src/server.ts`** simples com duas rotas:
   * `GET /health` retornando HTTP 200 `{ status: "ok" }`.
   * `GET /db-check` executando `SELECT NOW()` no PostgreSQL usando `process.env.DATABASE_URL`.
3. **Configure `"build": "tsc"` no `package.json`** e garanta no `tsconfig.json` que `rootDir` aponte para `src` e `outDir` para `dist`.
4. **Meça o antes e depois:**
   * Crie primeiro o `Dockerfile` ingênuo (`FROM node:20`) e faça `docker build -t api-gorda:v1 .`.
   * Crie o `.dockerignore` e o `Dockerfile` multi-stage com `node:20.18.0-alpine3.20` + `USER node`, e faça `docker build -t api-enxuta:v2 .`.
   * Compare os tamanhos reais com:
     ```bash
     docker images | grep api-
     ```
5. **Audite o usuário de execução:**
   ```bash
   docker run --rm api-enxuta:v2 id
   ```
   Verifique se a saída mostra `uid=1000(node) gid=1000(node)` em vez de `uid=0(root)`.
6. **Suba o ambiente completo com Docker Compose:**
   * Crie um `.env` com `POSTGRES_USER=piloto`, `POSTGRES_PASSWORD=orbita_segura`, `POSTGRES_DB=estacao`.
   * Rode `docker compose up -d --build`.
   * Teste `curl http://localhost:3000/health` e `curl http://localhost:3000/db-check`.
7. **Teste a persistência real de volumes:**
   * Rode `docker compose down` (sem `-v`!).
   * Suba novamente com `docker compose up -d` e confirme que os dados/tabelas criados no Postgres continuam intactos.

### ✅ Critérios de Domínio
- [ ] A imagem final `api-enxuta:v2` possui menos de 200 MB (redução superior a 75% em comparação à `api-gorda:v1`).
- [ ] O comando `docker run --rm api-enxuta:v2 id` confirma execução fora do usuário `root`.
- [ ] Nenhum arquivo `.env` ou pasta `.git` existe dentro da imagem (`docker run --rm api-enxuta:v2 ls -la`).
- [ ] A API conecta no PostgreSQL usando o hostname `postgres` na rede isolada `internal_net`, sem expor a porta `5432` publicamente.

---

## 5. 🎯 Resolução Comentada do Teste de Ignição (Quest Oficial)

> **Pergunta Oficial (`data.js`):**  
> *"Como o recurso de 'Multi-stage builds' no Dockerfile otimiza o ciclo de entrega de software?"*
>
> **A)** Permite executar o container em múltiplos sistemas operacionais ao mesmo tempo.  
> **B)** Gera backups automáticos da imagem na nuvem a cada linha modificada.  
> **C)** Permite utilizar ambientes distintos para compilar o código e para rodar o app, deixando a imagem final de produção muito menor e sem dependências de compilação desnecessárias.  
> **D)** Garante que o container use apenas memória RAM estática sem consumir disco.

### 🏆 Gabarito Oficial: **Alternativa C**

#### ✅ Por que a Alternativa C está correta?
Um **Multi-stage build** divide o `Dockerfile` em múltiplas etapas (`FROM ... AS builder` e `FROM ... AS production`). Na primeira etapa, usamos uma imagem completa com SDKs, compiladores (`tsc`, Maven, Go compiler) e dependências de desenvolvimento para gerar o artefato final (bundle ou binário). Na segunda etapa, partimos de uma imagem limpa e minúscula (como `alpine` ou `distroless`) e copiamos apenas o resultado compilado com `COPY --from=builder`. O resultado é uma imagem final drasticamente menor, mais rápida para trafegar em pipelines de CI/CD e com menor superfície de vulnerabilidades em produção.

#### ❌ Por que as demais estão incorretas?
* **Alternativa A (Errada):** Containers compartilham o kernel do sistema operacional hospedeiro; Multi-stage build não executa múltiplos sistemas operacionais simultaneamente. (Para gerar imagens compatíveis com diferentes arquiteturas de CPU, como `amd64` e `arm64`, usa-se `docker buildx`, que é outro conceito.)
* **Alternativa B (Errada):** O cache de camadas do Docker reutiliza etapas locais durante o build para ganhar velocidade, mas não realiza backups automáticos na nuvem a cada linha modificada.
* **Alternativa D (Errada):** Imagens e volumes de containers consomem espaço em disco normalmente (via camadas OverlayFS e volumes), e limites de RAM são definidos em runtime via `cgroups` (ex: flag `--memory`), não por Multi-stage builds.

---

## 6. 🎤 Kit de Apresentação (Como Dar Aula / Apresentar Este Módulo)

### 🎙️ Pitch Feynman de 2 Minutos (Script Pronto para Falar)

> "Sabe quando um desenvolvedor diz 'mas na minha máquina funciona!' e o sistema quebra em produção? Isso acontece porque enviávamos só o código-fonte esperando que o servidor tivesse exatamente a mesma versão de linguagem, bibliotecas do sistema operacional e configurações do nosso computador.
>
> O Docker resolve isso empacotando o aplicativo junto com todas as dependências exatas dentro de uma caixa padronizada chamada container — igual ao contêiner marítimo que padronizou o transporte mundial. Muita gente confunde container com Máquina Virtual, mas existe uma diferença gigantesca: uma VM simula um computador inteiro, inclusive instalando outro sistema operacional completo com kernel próprio, o que gasta gigabytes de RAM e demora para ligar. Já o container é apenas um processo isolado rodando direto no Kernel Linux da máquina hospedeira, usando dois mecanismos nativos chamados Namespaces, que dão a ilusão de máquina isolada, e Cgroups, que limitam quanta CPU e RAM aquele processo pode gastar.
>
> Na prática profissional, não basta jogar tudo dentro de um container de qualquer jeito. A gente escreve Dockerfiles com Multi-stage builds: usamos uma imagem pesada só na primeira etapa para compilar o código e depois copiamos apenas o arquivo compilado para uma imagem Alpine minúscula, rodando com usuário sem privilégio de root. E quando temos API, banco de dados e Redis trabalhando juntos, usamos o Docker Compose para subir tudo com um comando, guardando os dados do banco em Volumes persistentes e isolando o banco em uma rede interna onde ninguém de fora consegue bater direto."

### 🖼️ Roteiro de Slides (6 Slides)

| Slide | Título do Slide | Bullets-Chave | Sugestão Visual |
| :--- | :--- | :--- | :--- |
| **1** | **O Fim do "Na Minha Máquina Funciona"** | • A dor de ambientes divergentes<br>• Analogia do contêiner marítimo ISO<br>• Imagem (molde) vs. Container (instância) | Foto comparativa de navio cargueiro antigo vs. navio porta-contêineres |
| **2** | **VM vs. Container por Baixo dos Panos** | • VM: Hypervisor + Guest OS + Kernel próprio<br>• Container: mesmo Kernel + Namespaces + Cgroups<br>• Boot em milissegundos e alta densidade | Diagrama em camadas lado a lado (VM vs. Container) |
| **3** | **Anatomia de um Dockerfile Profissional** | • Ordem de camadas e cache do `npm ci`<br>• `.dockerignore` contra vazamentos<br>• Execução non-root (`USER node`) e sem segredos em `ENV` | Código Dockerfile anotado com setas verdes/vermelhas |
| **4** | **Multi-stage Build: De 1.1 GB para 130 MB** | • Estágio `builder` vs. estágio `production`<br>• Por que remover compiladores reduz CVEs<br>• Comparativo `node:20`, `slim`, `alpine` e `distroless` | Gráfico de barras comparando tamanhos em MB |
| **5** | **Docker Compose: Orquestração Local** | • Subindo API + Postgres + Redis em 1 comando<br>• `depends_on` com `service_healthy`<br>• DNS interno por nome de serviço | Bloco YAML limpo destacando `services` e `depends_on` |
| **6** | **Persistência & Redes Isoladas** | • Volumes Nomeados vs. Bind Mounts<br>• Containers efêmeros vs. dados duráveis<br>• Rede pública (`edge_net`) vs. rede interna (`internal_net`) | Esquema de caixas mostrando API como ponte entre as duas redes |

### ⚡ Roteiro de Demo Ao Vivo (3 Minutos)

1. **Minuto 0:00 – 1:00 (O Choque Visual do Tamanho):** no terminal, rode `docker images` mostrando a `api-gorda:v1` com ~1.1 GB e a `api-enxuta:v2` com ~140 MB. Rode `docker history api-enxuta:v2` para mostrar as camadas enxutas.
2. **Minuto 1:00 – 2:00 (Segurança & Cache ao Vivo):** mude uma linha no `src/server.ts` e rode `docker build -t api-enxuta:v2 .`, apontando para `CACHED` na etapa `npm ci` (provando velocidade de cache). Em seguida execute `docker run --rm api-enxuta:v2 whoami` mostrando `node` (não `root`).
3. **Minuto 2:00 – 3:00 (Persistência Real no Compose):** rode `docker compose up -d`, insira um registro via API no Postgres, execute `docker compose down && docker compose up -d` e consulte a API novamente provando que os dados sobreviveram no Volume.

### ❓ Perguntas Difíceis da Plateia

1. **"Se containers são tão mais leves e rápidos que VMs, por que a AWS, o Google e empresas grandes ainda usam Máquinas Virtuais na nuvem?"**
   * **Resposta segura:** *"Porque VMs e containers são complementares, não inimigos! Em nuvens públicas multi-inquilino (multi-tenant), onde códigos de empresas diferentes rodam nos mesmos servidores físicos, o isolamento por Hypervisor de uma VM ainda oferece uma fronteira de segurança mais forte do que compartilhar um único Kernel Linux. Por isso, na nuvem, quase sempre rodamos nossos containers Docker **dentro** de Máquinas Virtuais gerenciadas (como nós EC2 ou GKE), somando a segurança da VM com a agilidade de deploy dos containers."*
2. **"Qual a diferença entre `CMD` e `ENTRYPOINT` no Dockerfile? Quando usar cada um?"**
   * **Resposta segura:** *"O `ENTRYPOINT` define o executável principal fixo do container — aquilo que o container 'é' (por exemplo, `ENTRYPOINT ["node", "dist/server.js"]` ou um CLI). Já o `CMD` fornece argumentos padrão que podem ser facilmente sobrescritos quando alguém passa parâmetros no `docker run`. Em APIs web, usar `CMD ["node", "dist/server.js"]` facilita abrir um shell de debug com `docker run -it imagem sh` quando necessário; já quando queremos que o container funcione como um utilitário de linha de comando fechado, combinamos `ENTRYPOINT` com `CMD`."*

---

## 7. 💼 Radar do Mercado de Trabalho (Foco Dev Júnior)

### 🎯 3 Perguntas Reais de Entrevista Técnica Júnior

**1. "Se um container de banco de dados cair ou for recriado, o que acontece com os dados salvos nele? Como você evita perder tudo?"**
* **Resposta-modelo:** *"Por padrão, qualquer dado escrito dentro do sistema de arquivos gravável do container é efêmero e se perde quando o container é removido. Para evitar perda de dados, montamos um **Docker Volume** (ou volume gerenciado na nuvem) apontando para o diretório onde o banco grava seus arquivos, como `/var/lib/postgresql/data`. Assim, o ciclo de vida dos dados fica desacoplado do ciclo de vida do container."*

**2. "Sua imagem Docker demora 6 minutos para fazer build a cada mudança de 1 linha de código e está pesando 1.4 GB. O que você investigaria e alteraria?"**
* **Resposta-modelo:** *"Eu atacaria três pontos imediatamente: primeiro, criaria um `.dockerignore` para impedir que pastas como `.git` e `node_modules` entrem no contexto de build. Segundo, reordenaria o `Dockerfile` copiando `package.json` e `package-lock.json` antes do código-fonte, garantindo que o `npm ci` aproveite o cache de camadas quando só o código muda. Terceiro, implementaria um **Multi-stage build** usando uma imagem base enxuta como `alpine` ou `slim` no estágio final e copiando apenas o código compilado e dependências de produção."*

**3. "Como dois containers rodando no mesmo `docker-compose.yml` se comunicam entre si? Por que `localhost` não funciona?"**
* **Resposta-modelo:** *"Dentro de um container, `localhost` (127.0.0.1) aponta exclusivamente para a interface de loopback daquele próprio container, e não para a máquina hospedeira ou outros containers. Quando colocamos serviços no mesmo `docker-compose.yml`, o Docker cria uma rede bridge dedicada com um servidor DNS embutido. Então, a API se comunica com o banco usando o nome do serviço definido no YAML como hostname — por exemplo `postgres:5432`."*

### ⚖️ Erros Clássicos de Júnior vs. Postura Profissional

| ❌ Erro Clássico de Júnior | ✅ Postura Profissional |
| :--- | :--- |
| Colocar arquivo `.env` ou senha de banco dentro do `Dockerfile` com `COPY . .` | Usar `.dockerignore` rigoroso e injetar segredos apenas em runtime (`env_file` local ou Secret Manager). |
| Usar `FROM node:latest` sem fixar versão e rodar tudo como `root` | Fixar tag `major.minor.patch-alpine`, criar/usar usuário não-root (`USER node`) e validar com `HEALTHCHECK`. |
| Conectar a API ao banco com `localhost` e abrir porta `5432` pro mundo todo | Usar DNS interno do Compose (`postgres:5432`) e isolar bancos em rede `internal: true`. |
| Deixar o container morrer sem `depends_on` com healthcheck | Configurar `healthcheck` no Postgres/Redis e `condition: service_healthy` na API. |

### 🌟 Evidência para Portfólio / GitHub / LinkedIn

* **No GitHub:** adicione `Dockerfile` multi-stage, `.dockerignore` e `docker-compose.yml` (com `Makefile` ou scripts `npm run docker:up`) nos seus projetos de portfólio. No `README.md`, mostre o **antes e depois do tamanho da imagem** em uma tabelinha — recrutadores técnicos adoram ver métricas objetivas!
* **No LinkedIn:** publique um post curto mostrando como reduziu uma imagem de 1.1 GB para 135 MB com Multi-stage build + Alpine + non-root, explicando em 4 linhas o ganho de segurança e velocidade no deploy.

---

## 8. 📡 Transmissões Recomendadas & Próxima Órbita

### 📚 Recursos Oficiais da Nave (`data.js`)
* [Docker Curriculum](https://docker-curriculum.com/) — Guia interativo completo do zero até containers multi-serviço.
* [Boas Práticas de Dockerfile (Snyk)](https://snyk.io/blog/best-practices-containerizing-nodejs-applications-with-docker/) — Referência obrigatória sobre segurança, camadas, sinais de processo e imagens enxutas.

### 🧭 Conexão com a Próxima Órbita
Agora que você sabe empacotar sua aplicação em cápsulas Docker leves, isoladas e seguras, não faz sentido gerar e publicar essas imagens manualmente na sua própria máquina. Na próxima parada da Galáxia 4, vamos automatizar os propulsores: **[Aula 18 — Integração & Entrega Contínua (CI/CD)](./18-integracao-entrega-continua-cicd.md)**, onde cada `git push` dispara testes automáticos, constrói sua imagem Docker e a envia para a órbita de produção sem intervenção manual.
