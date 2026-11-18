// ==========================================================================
// CONFIGURAÇÕES GLOBAIS E ESTADO DA APLICAÇÃO
// ==========================================================================
let state = {
  unlockedSkills: ["git-github"], // 'git-github' é liberado por padrão
  completedChecklist: {},
  muted: false,
  zoom: 0.85,
  panX: 100,
  panY: 100,
  activeSkillId: null
};

// Configurações do Canvas de Estrelas
let stars = [];
const STAR_COUNT = 150;
let canvas, ctx;
let mouseX = 0, mouseY = 0;

// Variáveis para arrastar o mapa (Pan)
let isDragging = false;
let startX, startY;
let dragThreshold = 5;
let dragMoved = false;

// Audio Context (carregado sob demanda)
let audioCtx = null;

// Projetos de Consolidação mapeados para os nós finais de cada Galáxia
const consolidationProjects = {
  "sql-bd": {
    title: "Projeto de Consolidação: Nébula dos Fundamentos",
    description: "Crie um aplicativo de linha de comando (CLI) que consuma uma API pública (ex: GitHub API), manipule os dados coletados na memória usando algoritmos de ordenação manuais e salve um relatório estruturado em um banco de dados SQLite local, utilizando consultas SQL puras."
  },
  "fe-build-performance": {
    title: "Projeto de Consolidação: Constelação do Frontend Web",
    description: "Desenvolva uma Single Page Application (SPA) responsiva em React utilizando Vite. A aplicação deve carregar dinamicamente dados de uma API (por exemplo, catálogo de filmes ou produtos), implementar rotas protegidas e dinâmicas com React Router, gerenciar estados globais com Zustand e aplicar técnicas de otimização de performance como Code Splitting, lazy loading de componentes e cache de consultas com React Query."
  },
  "nosql-cache": {
    title: "Projeto de Consolidação: Cinturão de Arquitetura",
    description: "Desenvolva uma API REST para um e-commerce simplificado aplicando Clean Architecture. Salve dados de pedidos em um banco relacional, envie notificações para uma fila Redis/RabbitMQ e processe-as em segundo plano de forma assíncrona, salvando os produtos mais buscados em um cache Redis."
  },
  "observabilidade": {
    title: "Projeto de Consolidação: Órbita do DevOps & Cloud",
    description: "Escreva uma esteira CI/CD (GitHub Actions) para empacotar o projeto anterior em um container Docker otimizado (multi-stage). Configure deploys automatizados na nuvem e integre monitoramento básico de saúde (Uptime) com painel Grafana/Prometheus."
  },
  "validacao-modelos": {
    title: "Projeto de Consolidação: Sistemas Inteligentes & ML",
    description: "Obtenha um conjunto de dados públicos. Crie um script Python para realizar análise exploratória e limpeza com Pandas. Treine dois modelos diferentes usando Scikit-Learn (ex: SVM vs Random Forest) com validação cruzada, escolha o melhor baseado no F1-Score e crie uma API FastAPI para servir predições."
  },
  "llmops-otimizacao": {
    title: "Projeto de Consolidação: Constelação Generativa & LLMs",
    description: "Desenvolva um Agente de Suporte Técnico com RAG. O sistema deve ler manuais em markdown locais, gerar embeddings, salvá-los em um banco vetorial local (ChromaDB) e responder a perguntas do usuário. Equipado com ferramentas, se o agente não encontrar resposta no banco vetorial, ele deve rodar um script python de teste ou consultar a web antes de responder."
  }
};

// Ícones Temáticos por Habilidade
const skillIcons = {
  // Fundamentos
  "git-github": "📁",
  "logica-ed": "🧠",
  "paradigmas": "⚙️",
  "apis-web": "🌐",
  "sql-bd": "💾",
  // Frontend
  "fe-html-css": "🎨",
  "fe-js-moderno": "⚡",
  "fe-frameworks": "⚛️",
  "fe-estado-roteamento": "🛣️",
  "fe-build-performance": "📦",
  // Arquitetura
  "clean-solid": "💎",
  "testes": "🛡️",
  "design-patterns": "📐",
  "sistemas-distribuidos": "🕸️",
  "filas-assincrono": "📥",
  "nosql-cache": "⚡",
  // DevOps
  "docker": "🐳",
  "cicd": "🚀",
  "cloud-serverless": "☁️",
  "seguranca-criptografia": "🔐",
  "observabilidade": "📡",
  // ML
  "matematica-ia": "📐",
  "ciencia-dados-python": "🐍",
  "ml-classico": "🤖",
  "scikit-learn": "📊",
  "validacao-modelos": "🎯",
  // LLM
  "deep-learning": "🧠",
  "transformers-nlp": "🗣️",
  "prompt-eng-apis": "💬",
  "rag": "📚",
  "agentes-langchain": "🤝",
  "llmops-otimizacao": "🌌"
};

// ==========================================================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadState(); // Carrega progresso local síncrono
  initStarfield();
  renderSkillTree();
  drawConnections();
  updateProgressHUD();
  setupEventListeners();

  // Verifica se é a primeira visita
  if (!localStorage.getItem("galactic_visited")) {
    document.getElementById("intro-modal").classList.remove("hidden");
  } else {
    document.getElementById("intro-modal").classList.add("hidden");
  }
});

// ==========================================================================
// SISTEMA DE AUDIO (WEB AUDIO API - SINTETIZADOR DIGITAL)
// ==========================================================================
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playSound(type) {
  if (state.muted) return;
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === "hover") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(1000, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
      gainNode.gain.setValueAtTime(0.015, now);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "unlock") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.6);
      
      const filter = audioCtx.createBiquadFilter();
      filter.type = "peaking";
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(2000, now + 0.6);
      filter.Q.setValueAtTime(8, now);

      osc.disconnect(gainNode);
      osc.connect(filter);
      filter.connect(gainNode);

      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.linearRampToValueAtTime(0.12, now + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === "success") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
      
      gainNode.gain.setValueAtTime(0.06, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === "fail") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(90, now + 0.4);
      
      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.linearRampToValueAtTime(0.08, now + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      
      osc.start(now);
      osc.stop(now + 0.4);
    }
  } catch (e) {
    console.error("Falha no Web Audio API: ", e);
  }
}

// ==========================================================================
// RENDERIZADOR DO CANVAS DE ESTRELAS (STARFIELD PARALLAX COM BRILHO)
// ==========================================================================
function initStarfield() {
  canvas = document.getElementById("starfield");
  ctx = canvas.getContext("2d");
  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
  });

  // Gera estrelas
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.2 + 0.4,
      speedX: (Math.random() - 0.5) * 0.04,
      speedY: (Math.random() * 0.12) + 0.04,
      opacity: Math.random() * 0.75 + 0.25,
      color: getRandomStarColor()
    });
  }

  requestAnimationFrame(updateStarfield);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function getRandomStarColor() {
  const colors = ["#ffffff", "#e0f2fe", "#bae6fd", "#fef3c7", "#fef08a", "#ccfbf1"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function updateStarfield() {
  ctx.fillStyle = "#020208";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    let targetX = star.x - mouseX * (star.size * 0.3);
    let targetY = star.y - mouseY * (star.size * 0.3);

    star.y += star.speedY;
    star.x += star.speedX;

    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
    if (star.x > canvas.width) star.x = 0;
    if (star.x < 0) star.x = canvas.width;

    ctx.beginPath();
    ctx.arc(targetX, targetY, star.size, 0, Math.PI * 2);
    ctx.fillStyle = star.color;
    ctx.globalAlpha = star.opacity;

    if (star.size > 1.8) {
      ctx.shadowBlur = 8;
      ctx.shadowColor = star.color;
    } else {
      ctx.shadowBlur = 0;
    }

    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1.0;
  });

  requestAnimationFrame(updateStarfield);
}

// ==========================================================================
// RENDERIZAÇÃO DA ÁRVORE DE HABILIDADES
// ==========================================================================
function renderSkillTree() {
  const mapContainer = document.getElementById("map-container");
  
  const existingNodes = mapContainer.querySelectorAll(".skill-node");
  existingNodes.forEach(node => node.remove());

  skillsData.forEach((skill) => {
    const node = document.createElement("div");
    node.id = `node-${skill.id}`;
    node.className = `skill-node locked`;

    node.style.left = `${skill.x}px`;
    node.style.top = `${skill.y}px`;

    const wrapper = document.createElement("div");
    wrapper.className = "planet-wrapper";

    const pulseGlow = document.createElement("div");
    pulseGlow.className = "planet-pulse-glow";
    wrapper.appendChild(pulseGlow);

    const body = document.createElement("div");
    body.className = "planet-body";

    const icon = document.createElement("span");
    icon.className = "planet-icon";
    icon.innerText = skillIcons[skill.id] || "⭐";
    body.appendChild(icon);
    wrapper.appendChild(body);

    const ring = document.createElement("div");
    ring.className = "planet-ring";
    wrapper.appendChild(ring);

    node.appendChild(wrapper);

    const label = document.createElement("div");
    label.className = "planet-label";
    label.innerText = skill.name;
    node.appendChild(label);

    node.addEventListener("mouseenter", () => playSound("hover"));
    node.addEventListener("click", (e) => {
      if (dragMoved) return;
      openDetailsPanel(skill.id);
    });

    mapContainer.appendChild(node);
  });

  updateNodeVisualStates();
}

function updateNodeVisualStates() {
  skillsData.forEach((skill) => {
    const node = document.getElementById(`node-${skill.id}`);
    if (!node) return;

    node.className = `skill-node locked`;

    const status = getSkillStatus(skill.id);
    node.classList.add(status);

    if (status === "unlocked") {
      node.classList.add(`g-${skill.galaxy}`);
    }
  });
}

function getSkillStatus(skillId) {
  if (state.unlockedSkills.includes(skillId)) {
    return "unlocked";
  }

  const skill = skillsData.find(s => s.id === skillId);
  if (!skill) return "locked";

  if (skill.prereqOverride && skill.prereqOverride.some(id => state.unlockedSkills.includes(id))) {
    return "available";
  }

  if (skill.prerequisites.length > 0 && skill.prerequisites.every(id => state.unlockedSkills.includes(id))) {
    return "available";
  }

  if (skill.prerequisites.length === 0 && !state.unlockedSkills.includes(skillId)) {
    return "available";
  }

  return "locked";
}

// ==========================================================================
// DESENHAR CONEXÕES (LINHAS SVG)
// ==========================================================================
function drawConnections() {
  const svg = document.getElementById("connections-svg");
  
  const paths = svg.querySelectorAll("path");
  paths.forEach(p => p.remove());

  skillsData.forEach((skill) => {
    skill.prerequisites.forEach((prereqId) => {
      const parent = skillsData.find(s => s.id === prereqId);
      if (!parent) return;
      createSvgPath(parent, skill, svg);
    });

    if (skill.prereqOverride) {
      skill.prereqOverride.forEach((prereqId) => {
        const parent = skillsData.find(s => s.id === prereqId);
        if (!parent) return;
        createSvgPath(parent, skill, svg);
      });
    }
  });
}

function createSvgPath(parent, skill, svgElement) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.className = "connection-line";

  const x1 = parent.x;
  const y1 = parent.y;
  const x2 = skill.x;
  const y2 = skill.y;

  const dx = Math.abs(x2 - x1) * 0.5;
  const dPath = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
  path.setAttribute("d", dPath);

  const parentUnlocked = state.unlockedSkills.includes(parent.id);
  const childUnlocked = state.unlockedSkills.includes(skill.id);
  const childAvailable = getSkillStatus(skill.id) === "available";

  if (parentUnlocked && childUnlocked) {
    path.classList.add("unlocked");
  } else if (parentUnlocked && childAvailable) {
    path.classList.add("pulse");
  }

  svgElement.appendChild(path);
}

// ==========================================================================
// INTERATIVIDADE DO PAINEL LATERAL (ESTUDOS E QUESTS)
// ==========================================================================
function openDetailsPanel(skillId) {
  state.activeSkillId = skillId;
  const skill = skillsData.find(s => s.id === skillId);
  if (!skill) return;

  const panel = document.getElementById("hud-side-panel");
  panel.classList.add("open");
  panel.classList.add("active-glow");
  setTimeout(() => panel.classList.remove("active-glow"), 600);

  document.getElementById("panel-galaxy").innerText = skill.galaxyName;
  document.getElementById("panel-title").innerText = skill.name;
  document.getElementById("panel-desc").innerText = skill.description;

  const status = getSkillStatus(skillId);
  const statusTag = document.getElementById("panel-status-tag");
  statusTag.className = `panel-status-tag ${status}`;
  
  if (status === "locked") {
    statusTag.innerHTML = `🔒 SISTEMA BLOQUEADO`;
  } else if (status === "available") {
    statusTag.innerHTML = `⚡ IGNIÇÃO PRONTA`;
  } else {
    statusTag.innerHTML = `⭐ GALÁXIA EXPLORADA`;
  }

  // Checklist
  const checklistContainer = document.getElementById("panel-checklist");
  checklistContainer.innerHTML = "";
  const completedList = state.completedChecklist[skillId] || [];

  skill.checklist.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = `checklist-item ${completedList.includes(index) ? "checked" : ""}`;
    
    const checkbox = document.createElement("div");
    checkbox.className = "checklist-checkbox";
    checkbox.innerHTML = "✓";
    
    const text = document.createElement("span");
    text.className = "checklist-text";
    text.innerText = item;

    li.appendChild(checkbox);
    li.appendChild(text);

    li.addEventListener("click", () => {
      toggleChecklistItem(skillId, index, li);
    });

    checklistContainer.appendChild(li);
  });

  // Recursos
  const resourcesContainer = document.getElementById("panel-resources");
  resourcesContainer.innerHTML = "";

  skill.resources.forEach((res) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.className = "resource-link";
    link.href = res.url;
    link.target = "_blank";
    link.innerHTML = `<span>${res.name}</span> <span>➜</span>`;
    li.appendChild(link);
    resourcesContainer.appendChild(li);
  });

  renderQuestSection(skill, status);

  // Consolidação
  const projectBox = document.getElementById("panel-consolidation-box");
  if (consolidationProjects[skillId]) {
    projectBox.innerHTML = `
      <div class="consolidation-card">
        <h4>🎖️ ${consolidationProjects[skillId].title}</h4>
        <p>${consolidationProjects[skillId].description}</p>
      </div>
    `;
    projectBox.style.display = "block";
  } else {
    projectBox.style.display = "none";
  }
}

function toggleChecklistItem(skillId, index, element) {
  if (!state.completedChecklist[skillId]) {
    state.completedChecklist[skillId] = [];
  }

  const idx = state.completedChecklist[skillId].indexOf(index);
  if (idx > -1) {
    state.completedChecklist[skillId].splice(idx, 1);
    element.classList.remove("checked");
  } else {
    state.completedChecklist[skillId].push(index);
    element.classList.add("checked");
    playSound("hover");
  }

  saveState();
  updateProgressHUD();
}

function renderQuestSection(skill, status) {
  const questBox = document.getElementById("panel-quest-box");
  questBox.innerHTML = "";

  if (status === "locked") {
    const parentNames = skill.prerequisites
      .filter(id => !state.unlockedSkills.includes(id))
      .map(id => skillsData.find(s => s.id === id)?.name || id);

    if (skill.prereqOverride) {
      skill.prereqOverride
        .filter(id => !state.unlockedSkills.includes(id))
        .forEach(id => {
          const name = skillsData.find(s => s.id === id)?.name;
          if (name && !parentNames.includes(name)) parentNames.push(name);
        });
    }

    questBox.innerHTML = `
      <div style="text-align: center; padding: 20px; color: var(--text-muted);">
        <p>⚠️ Criptografia de navegação travada.</p>
        <p style="font-size: 11px; margin-top: 8px;">Desbloqueie primeiro:</p>
        <p style="color: #ff4b4b; font-weight: bold; font-size: 12px; margin-top: 4px;">
          ${parentNames.join(" ou ")}
        </p>
      </div>
    `;
    
    updateActionButton("locked");
    return;
  }

  const qDiv = document.createElement("div");
  qDiv.className = "quest-box";

  const questionText = document.createElement("p");
  questionText.className = "quest-question";
  questionText.innerText = skill.quest.question;
  qDiv.appendChild(questionText);

  const optionsContainer = document.createElement("div");
  optionsContainer.className = "quest-options";

  let selectedOptionIndex = null;

  skill.quest.options.forEach((opt, idx) => {
    const optDiv = document.createElement("div");
    optDiv.className = "quest-option";
    
    const bullet = document.createElement("span");
    bullet.className = "option-bullet";
    bullet.innerText = `${String.fromCharCode(65 + idx)}.`;
    
    const text = document.createElement("span");
    text.innerText = opt;

    optDiv.appendChild(bullet);
    optDiv.appendChild(text);

    if (status === "unlocked") {
      optDiv.style.cursor = "default";
      if (idx === skill.quest.correctAnswer) {
        optDiv.classList.add("correct");
      }
    } else {
      optDiv.addEventListener("click", () => {
        const options = optionsContainer.querySelectorAll(".quest-option");
        options.forEach(o => o.classList.remove("selected", "wrong"));
        
        optDiv.classList.add("selected");
        selectedOptionIndex = idx;
        playSound("hover");
      });
    }

    optionsContainer.appendChild(optDiv);
  });

  qDiv.appendChild(optionsContainer);
  questBox.appendChild(qDiv);

  if (status === "unlocked") {
    updateActionButton("unlocked");
  } else {
    updateActionButton("available", () => {
      if (selectedOptionIndex === null) {
        showSystemAlert("⚠️ Escolha uma alternativa para decifrar!");
        return;
      }

      if (selectedOptionIndex === skill.quest.correctAnswer) {
        unlockSkill(skill.id);
      } else {
        playSound("fail");
        const selectedOption = optionsContainer.querySelector(".quest-option.selected");
        if (selectedOption) {
          selectedOption.classList.remove("selected");
          selectedOption.classList.add("wrong");
        }
        showSystemAlert("☄️ Ignição Falhou! Algoritmo incorreto.");
      }
    });
  }
}

function updateActionButton(status, clickCallback) {
  const btn = document.getElementById("panel-action-btn");
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);

  newBtn.className = `panel-action-btn ${status}-btn`;
  
  if (status === "locked") {
    newBtn.innerHTML = `🔒 Sistemas Bloqueados`;
    newBtn.disabled = true;
  } else if (status === "unlocked") {
    newBtn.innerHTML = `✓ Habilidade Ativada`;
    newBtn.disabled = true;
  } else {
    newBtn.innerHTML = `🚀 Decifrar Coordenadas`;
    newBtn.disabled = false;
    newBtn.addEventListener("click", clickCallback);
  }
}

// ==========================================================================
// FLUXO DE DESBLOQUEIO DE HABILIDADE
// ==========================================================================
function unlockSkill(skillId) {
  if (state.unlockedSkills.includes(skillId)) return;

  state.unlockedSkills.push(skillId);
  saveState();
  
  playSound("success");
  playSound("unlock");
  triggerUnlockParticles(skillId);
  showSystemAlert("✨ Nova órbita desbloqueada!", "success");

  updateNodeVisualStates();
  drawConnections();
  updateProgressHUD();
  openDetailsPanel(skillId);
}

function triggerUnlockParticles(skillId) {
  const skill = skillsData.find(s => s.id === skillId);
  if (!skill) return;

  const mapContainer = document.getElementById("map-container");
  const colors = ["#00f2fe", "#39ff14", "#ffffff", "#ffd700", "#ff007f"];

  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = `${skill.x}px`;
    p.style.top = `${skill.y}px`;
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.boxShadow = `0 0 8px ${p.style.backgroundColor}`;
    
    const size = Math.random() * 6 + 3;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 120 + 40;
    const tx = Math.cos(angle) * speed;
    const ty = Math.sin(angle) * speed;

    p.style.setProperty("--tx", `${tx}px`);
    p.style.setProperty("--ty", `${ty}px`);

    mapContainer.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }
}

// ==========================================================================
// NOTIFICAÇÕES (ALERT HUD)
// ==========================================================================
function showSystemAlert(msg, type = "error") {
  const alertEl = document.getElementById("system-alert");
  alertEl.innerText = msg;
  
  if (type === "success") {
    alertEl.className = "success-alert show";
  } else {
    alertEl.className = "show";
  }

  setTimeout(() => {
    alertEl.classList.remove("show");
  }, 3500);
}

// ==========================================================================
// MONITOR DE PROGRESSO
// ==========================================================================
function updateProgressHUD() {
  const total = skillsData.length;
  const unlocked = state.unlockedSkills.length;
  const pct = Math.round((unlocked / total) * 100);

  document.getElementById("hud-progress-bar").style.width = `${pct}%`;
  document.getElementById("hud-progress-pct").innerText = `${pct}%`;

  let totalXP = unlocked * 100;
  Object.keys(state.completedChecklist).forEach(key => {
    totalXP += state.completedChecklist[key].length * 10;
  });

  document.getElementById("hud-xp-val").innerText = totalXP;
  document.getElementById("hud-unlocked-val").innerText = `${unlocked}/${total}`;
}

// ==========================================================================
// PERSISTÊNCIA LOCAL PURA (LOCAL STORAGE)
// ==========================================================================
function saveState() {
  localStorage.setItem("galactic_unlocked", JSON.stringify(state.unlockedSkills));
  localStorage.setItem("galactic_checklist", JSON.stringify(state.completedChecklist));
  localStorage.setItem("galactic_muted", state.muted);
}

function loadState() {
  const localUnlocked = localStorage.getItem("galactic_unlocked");
  const localChecklist = localStorage.getItem("galactic_checklist");
  
  if (localUnlocked) {
    state.unlockedSkills = JSON.parse(localUnlocked);
  } else {
    state.unlockedSkills = ["git-github"];
  }
  if (localChecklist) {
    state.completedChecklist = JSON.parse(localChecklist);
  } else {
    state.completedChecklist = {};
  }

  const localMuted = localStorage.getItem("galactic_muted");
  if (localMuted) {
    state.muted = (localMuted === "true");
    updateMuteButtonVisual();
  }
}

function resetProgress() {
  if (confirm("🚨 ALERTA: Você está prestes a resetar todo o sistema de navegação e limpar o progresso de estudos. Confirmar desintegração de dados?")) {
    state.unlockedSkills = ["git-github"];
    state.completedChecklist = {};
    saveState();
    
    updateNodeVisualStates();
    drawConnections();
    updateProgressHUD();
    
    document.getElementById("hud-side-panel").classList.remove("open");
    playSound("fail");
    showSystemAlert("🛰️ Memória estelar restaurada para as coordenadas padrão.", "success");
  }
}

// ==========================================================================
// FUNÇÕES DE BACKUP / IMPORTAÇÃO E EXPORTAÇÃO DE ARQUIVO JSON
// ==========================================================================
function exportProgress() {
  try {
    const dataStr = JSON.stringify({
      unlockedSkills: state.unlockedSkills,
      completedChecklist: state.completedChecklist
    }, null, 2);
    
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "galactic_progress.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    playSound("success");
    showSystemAlert("📥 Coordenadas de progresso exportadas!", "success");
  } catch (err) {
    console.error("Falha ao exportar progresso:", err);
    showSystemAlert("☄️ Erro ao tentar exportar o arquivo.");
  }
}

function importProgress(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      
      // Validação rápida de integridade do arquivo
      if (Array.isArray(imported.unlockedSkills) && typeof imported.completedChecklist === "object") {
        state.unlockedSkills = imported.unlockedSkills;
        state.completedChecklist = imported.completedChecklist;
        
        // Assegura nó inicial desbloqueado
        if (!state.unlockedSkills.includes("git-github")) {
          state.unlockedSkills.push("git-github");
        }
        
        saveState();
        
        // Sincroniza render e HUD
        updateNodeVisualStates();
        drawConnections();
        updateProgressHUD();
        
        // Fecha painel aberto
        document.getElementById("hud-side-panel").classList.remove("open");
        
        playSound("success");
        playSound("unlock");
        showSystemAlert("📤 Transmissão importada com sucesso!", "success");
      } else {
        throw new Error("Formato de chaves inválido no arquivo.");
      }
    } catch (err) {
      console.error("Erro ao ler JSON de progresso:", err);
      playSound("fail");
      showSystemAlert("☄️ Transmissão corrompida. Arquivo inválido!");
    }
  };
  reader.readAsText(file);
}

// ==========================================================================
// CONTROLES DE ZOOM, PAN E EVENTOS DO MOUSE
// ==========================================================================
function setupEventListeners() {
  const viewport = document.getElementById("map-viewport");
  const container = document.getElementById("map-container");

  document.getElementById("panel-close-btn").addEventListener("click", () => {
    document.getElementById("hud-side-panel").classList.remove("open");
    state.activeSkillId = null;
  });

  document.getElementById("modal-start-btn").addEventListener("click", () => {
    localStorage.setItem("galactic_visited", "true");
    document.getElementById("intro-modal").classList.add("hidden");
    initAudio();
  });

  // Controles Flutuantes
  document.getElementById("zoom-in-btn").addEventListener("click", () => adjustZoom(0.12));
  document.getElementById("zoom-out-btn").addEventListener("click", () => adjustZoom(-0.12));
  document.getElementById("recenter-btn").addEventListener("click", centerMap);
  document.getElementById("reset-btn").addEventListener("click", resetProgress);
  
  // Botões de Import/Export
  document.getElementById("export-btn").addEventListener("click", exportProgress);
  
  const importBtn = document.getElementById("import-btn");
  const fileInput = document.getElementById("import-file-input");
  
  importBtn.addEventListener("click", () => {
    fileInput.click();
  });
  
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      importProgress(e.target.files[0]);
      fileInput.value = ""; // Reseta input
    }
  });

  const muteBtn = document.getElementById("mute-btn");
  muteBtn.addEventListener("click", () => {
    state.muted = !state.muted;
    saveState();
    updateMuteButtonVisual();
    if (!state.muted) {
      playSound("hover");
    }
  });

  // Pan (Arrastar mapa com bounds)
  viewport.addEventListener("mousedown", (e) => {
    if (e.target.closest("#hud-top") || e.target.closest("#hud-side-panel") || e.target.closest("#floating-controls") || e.target.closest("#intro-modal")) {
      return;
    }
    isDragging = true;
    dragMoved = false;
    startX = e.clientX - state.panX;
    startY = e.clientY - state.panY;
    container.style.transition = "none";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - startX;
    const newY = e.clientY - startY;

    if (Math.abs(newX - state.panX) > dragThreshold || Math.abs(newY - state.panY) > dragThreshold) {
      dragMoved = true;
    }

    state.panX = newX;
    state.panY = newY;
    
    applyBounds();
    updateMapTransform();
  });

  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      container.style.transition = "transform 0.1s ease-out";
    }
  });

  // Zoom no cursor do mouse via Scroll
  viewport.addEventListener("wheel", (e) => {
    e.preventDefault();
    const zoomFactor = 0.045;
    const direction = e.deltaY < 0 ? 1 : -1;
    
    const rect = viewport.getBoundingClientRect();
    const mouseXVal = e.clientX - rect.left;
    const mouseYVal = e.clientY - rect.top;

    adjustZoom(direction * zoomFactor, mouseXVal, mouseYVal);
  }, { passive: false });

  centerMap();
}

// Limites do Pan
function applyBounds() {
  const viewport = document.getElementById("map-viewport");
  const W = viewport.clientWidth;
  const H = viewport.clientHeight;
  const Z = state.zoom;

  const margin = 200; 
  const minX = W - 2300 * Z - margin;
  const maxX = margin;
  const minY = H - 1100 * Z - margin;
  const maxY = margin;

  state.panX = Math.max(minX, Math.min(maxX, state.panX));
  state.panY = Math.max(minY, Math.min(maxY, state.panY));
}

// Algoritmo de Zoom focado no cursor ou centro da tela
function adjustZoom(amount, mouseXVal = null, mouseYVal = null) {
  const oldZoom = state.zoom;
  state.zoom = Math.max(0.35, Math.min(1.7, state.zoom + amount));
  
  const viewport = document.getElementById("map-viewport");
  const focusX = mouseXVal !== null ? mouseXVal : viewport.clientWidth / 2;
  const focusY = mouseYVal !== null ? mouseYVal : viewport.clientHeight / 2;
  
  const mapX = (focusX - state.panX) / oldZoom;
  const mapY = (focusY - state.panY) / oldZoom;
  
  state.panX = focusX - mapX * state.zoom;
  state.panY = focusY - mapY * state.zoom;
  
  applyBounds();
  updateMapTransform();
}

function centerMap() {
  const viewport = document.getElementById("map-viewport");
  
  state.zoom = 0.75;
  state.panX = (viewport.clientWidth / 2) - (500 * state.zoom);
  state.panY = (viewport.clientHeight / 2) - (350 * state.zoom);
  
  applyBounds();
  updateMapTransform();
}

function updateMapTransform() {
  const container = document.getElementById("map-container");
  container.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoom})`;

  // Movimenta nebulosas no fundo
  const nebulaPurple = document.getElementById("nebula-purple");
  const nebulaBlue = document.getElementById("nebula-blue");
  const nebulaCyan = document.getElementById("nebula-cyan");
  
  if (nebulaPurple) nebulaPurple.style.transform = `translate(${state.panX * 0.12}px, ${state.panY * 0.12}px)`;
  if (nebulaBlue) nebulaBlue.style.transform = `translate(${state.panX * 0.08}px, ${state.panY * 0.08}px)`;
  if (nebulaCyan) nebulaCyan.style.transform = `translate(${state.panX * 0.16}px, ${state.panY * 0.16}px)`;
}

function updateMuteButtonVisual() {
  const btn = document.getElementById("mute-btn");
  if (state.muted) {
    btn.innerHTML = "🔇";
    btn.classList.add("active");
  } else {
    btn.innerHTML = "🔊";
    btn.classList.remove("active");
  }
}
