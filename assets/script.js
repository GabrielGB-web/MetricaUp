/* ==========================================================================
   METRICA UP — ENGINE & INTERACTIVE SCRIPT
   Slogan: "Tecnologia que Impulsiona Resultados"
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLogoUpIntro();
  initTechCanvas();
  initNavbar();
  initHeroTabs();
  initScrollReveal();
  initNumberCounters();
  initSystemModals();
  initContactForm();
  updateCopyrightYear();
});

/* ==========================================================================
   1. INTRO CINEMATOGRÁFICA — ANIMAÇÃO DO "UP" IMPULSIONANDO
   ========================================================================== */
function initLogoUpIntro() {
  const overlay = document.querySelector('#techIntroOverlay');
  if (!overlay) return;

  const progressBar = overlay.querySelector('.intro-progress-bar');
  const skipBtn = overlay.querySelector('#btnSkipIntro');
  let isDismissed = false;

  const dismissIntro = () => {
    if (isDismissed) return;
    isDismissed = true;
    overlay.classList.add('fade-out');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 650);
  };

  if (skipBtn) {
    skipBtn.addEventListener('click', dismissIntro);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dismissIntro();
  });

  // Progresso fluido sincronizado com o impulso do UP
  if (progressBar) {
    setTimeout(() => { progressBar.style.width = '35%'; }, 200);
    setTimeout(() => { progressBar.style.width = '70%'; }, 650);
    setTimeout(() => { progressBar.style.width = '100%'; }, 1100);
  }

  // Finalização e liberação do site
  setTimeout(() => {
    dismissIntro();
  }, 2200);
}

/* ==========================================================================
   2. CANVAS DE PARTÍCULAS TECNOLÓGICAS (NEURAL NETWORK)
   ========================================================================== */
function initTechCanvas() {
  const canvas = document.getElementById('techCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
  const connectionDistance = 140;

  const mouse = {
    x: null,
    y: null,
    radius: 140
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 1.8 + 0.8;
      this.baseAlpha = Math.random() * 0.45 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 1.6;
          this.y -= Math.sin(angle) * force * 1.6;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(85, 245, 46, ${this.baseAlpha})`;
      ctx.shadowColor = '#55f52e';
      ctx.shadowBlur = 6;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(85, 245, 46, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   3. NAVBAR COM LOGO & SCROLL
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('header');
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menuBtn.innerHTML = isOpen ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = '☰';
      });
    });
  }
}

/* ==========================================================================
   4. TABS DO TERMINAL / SHOWCASE DO HERO
   ========================================================================== */
function initHeroTabs() {
  const tabButtons = document.querySelectorAll('.panel-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabButtons.forEach((b) => b.classList.remove('active'));
      tabPanes.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   6. CONTADORES NUMÉRICOS ANIMADOS
   ========================================================================== */
function initNumberCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  counterElements.forEach((el) => observer.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-counter'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = 0;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(start + (target - start) * ease);

      el.textContent = `${prefix}${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${target}${suffix}`;
      }
    }

    requestAnimationFrame(update);
  }
}

/* ==========================================================================
   7. MODAL DETALHADO DOS SISTEMAS
   ========================================================================== */
const systemsData = {
  usacar: {
    title: 'ZipCars / ApexDrive USA',
    category: 'Locação Internacional & Gestão de Frotas (EUA)',
    tagline: 'Plataforma completa de locação de veículos com reservas online e telemetria de frota.',
    badge: 'Produção nos EUA',
    highlight: 'Desenvolvido para atender operações de locação automotiva no mercado norte-americano, eliminando papelada com vistorias 100% digitais via smartphone e integração com Zelle e Cash App.',
    specs: [
      { label: 'Stack Tecnológica', value: 'React 18 + Vite, TypeScript, TailwindCSS, Supabase & Node.js' },
      { label: 'Check-in / Check-out', value: 'Vistoria fotográfica com upload instantâneo e registro de avarias' },
      { label: 'Pagamentos Integrados', value: 'Gateways Zelle, Cash App e cartões internacionais' },
      { label: 'Gestão de Frotas', value: 'Telemetria, manutenções preventivas, controle de quilometragem e status' }
    ],
    impact: 'Redução de 75% no tempo de emissão de contratos e 0% de atritos com clientes na devolução graças à vistoria digital com histórico de imagens imutável.'
  },
  meioameio: {
    title: 'Sistema Atacadão Meio a Meio',
    category: 'Gestão Comercial & Sincronização de Metas em Tempo Real',
    tagline: 'Monitoramento estratégico de vendas e metas para atacado de alta rotatividade.',
    badge: 'Operação Atacadista',
    highlight: 'Centraliza a performance de supervisores e representantes comerciais (RCA), acompanhando metas dos principais pilares industriais (BIC, SOU+, etc.) e sincronizando dados locais de alta volumetria.',
    specs: [
      { label: 'Stack Tecnológica', value: 'Python FastAPI, SQLite Engine de Alta Performance, Frontend Reativo' },
      { label: 'Sincronizador PC', value: 'Agente em background para exportação e importação contínua de bases' },
      { label: 'Pilares & SKUs', value: 'Controle granular de positivação por produto, margem e meta mensal' },
      { label: 'Hierarquia Comercial', value: 'Visão individual para RCA, painel gerencial para supervisores e diretores' }
    ],
    impact: 'Transparência total dos números comerciais durante o mês vigente, elevando o batimento de metas em até 35% ao alertar desvios de positivação em tempo hábil.'
  },
  clientesflow: {
    title: 'Clientes Flow (Inteligência WinThor)',
    category: 'Inteligência de Vendas, Retenção & Churn Defense',
    tagline: 'Algoritmo preditivo de acompanhamento de carteira e combate à inatividade de clientes.',
    badge: 'Inteligência Comercial',
    highlight: 'Conectado à inteligência da rotina 8177 do WinThor, o sistema detecta proativamente clientes com risco de churn, departamentos perdidos e quedas abruptas de compra.',
    specs: [
      { label: 'Stack Tecnológica', value: 'Node.js, Express, React + Vite, PostgreSQL/Oracle Sync' },
      { label: 'Alerta de Inatividade', value: 'Rastreamento inteligente por dias sem compra e curva de consumo' },
      { label: 'Análise de Churn', value: 'Identificação de SKUs abandonados e substituição por concorrentes' },
      { label: 'Ação Comercial', value: 'Geração instantânea de roteiro de recuperação para vendedores' }
    ],
    impact: 'Redução drástica na perda silenciosa de clientes e recuperação rápida de contas inativas antes que migrem para a concorrência.'
  }
};

function initSystemModals() {
  const backdrop = document.getElementById('systemModalBackdrop');
  if (!backdrop) return;

  const modalTitle = backdrop.querySelector('#modalSystemTitle');
  const modalCategory = backdrop.querySelector('#modalSystemCategory');
  const modalHighlight = backdrop.querySelector('#modalSystemHighlight');
  const modalSpecsContainer = backdrop.querySelector('#modalSystemSpecs');
  const modalImpact = backdrop.querySelector('#modalSystemImpact');
  const closeBtn = backdrop.querySelector('#modalCloseBtn');
  const ctaBtn = backdrop.querySelector('#modalCtaBtn');

  const openModal = (sysKey) => {
    const data = systemsData[sysKey];
    if (!data) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalHighlight) modalHighlight.textContent = data.highlight;

    if (modalSpecsContainer) {
      modalSpecsContainer.innerHTML = data.specs
        .map(
          (s) => `
        <div class="modal-spec-item">
          <strong>${s.label}</strong>
          <span>${s.value}</span>
        </div>
      `
        )
        .join('');
    }

    if (modalImpact) modalImpact.textContent = data.impact;

    if (ctaBtn) {
      ctaBtn.href = `contato.html?interesse=${encodeURIComponent(data.title)}`;
    }

    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-open-system]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sysKey = btn.getAttribute('data-open-system');
      openModal(sysKey);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   8. FORMULÁRIO DE CONTATO INTELIGENTE
   ========================================================================== */
function initContactForm() {
  const form = document.querySelector('#contactForm');
  if (!form) return;

  const urlParams = new URLSearchParams(window.location.search);
  const interesseParam = urlParams.get('interesse');
  if (interesseParam) {
    const solucaoSelect = form.querySelector('#solucao');
    if (solucaoSelect) {
      for (let option of solucaoSelect.options) {
        if (option.value.toLowerCase().includes(interesseParam.toLowerCase())) {
          option.selected = true;
          break;
        }
      }
    }
    const msgTextarea = form.querySelector('#mensagem');
    if (msgTextarea && !msgTextarea.value) {
      msgTextarea.value = `Gostaria de saber mais informações e solicitar um projeto similar ao ${interesseParam}.`;
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('nome') || '';
    const company = data.get('empresa') || 'Não informado';
    const email = data.get('email') || '';
    const phone = data.get('telefone') || 'Não informado';
    const solution = data.get('solucao') || 'A definir';
    const deadline = data.get('prazo') || 'A combinar';
    const message = data.get('mensagem') || '';

    const whatsappMessage = `*Novo Contato — Metrica UP*%0A%0A*Nome:* ${encodeURIComponent(name)}%0A*Empresa:* ${encodeURIComponent(company)}%0A*E-mail:* ${encodeURIComponent(email)}%0A*Telefone:* ${encodeURIComponent(phone)}%0A*Solução:* ${encodeURIComponent(solution)}%0A*Prazo:* ${encodeURIComponent(deadline)}%0A%0A*Desafio:*%0A${encodeURIComponent(message)}`;

    const feedback = document.querySelector('#form-feedback');
    if (feedback) {
      feedback.style.display = 'block';
      feedback.style.color = '#55f52e';
      feedback.innerHTML = `✓ Mensagem preparada com sucesso! Abrindo canal de contato...`;
    }

    setTimeout(() => {
      const whatsappNumber = '5593991481515';
      if (whatsappNumber) {
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
      } else {
        const mailtoUri = `mailto:contato@metricaup.com.br?subject=${encodeURIComponent('Novo Projeto — ' + name)}&body=${whatsappMessage.replace(/%0A/g, '\n').replace(/\*/g, '')}`;
        window.location.href = mailtoUri;
      }
    }, 800);
  });
}

/* ==========================================================================
   9. ATUALIZAR ANO DO COPYRIGHT
   ========================================================================== */
function updateCopyrightYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}


/* ==========================================================================
   10. FILTROS INTERATIVOS DO PORTFÓLIO POWER BI
   ========================================================================== */
function initPowerBIFilters() {
  const filterButtons = document.querySelectorAll('.portfolio-filter-bar .filter-btn');
  const cards = document.querySelectorAll('.powerbi-grid-6 .system-card');

  if (!filterButtons.length || !cards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPowerBIFilters();
});


/* ==========================================================================
   11. LIGHTBOX MODAL (ZOOM EM TELA CHEIA NAS SCREENSHOTS)
   ========================================================================== */
function initLightbox() {
  // Cria o elemento de lightbox se não existir
  let lightbox = document.getElementById('lightboxModal');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightboxModal';
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <div class="lightbox-header">
          <div class="lightbox-title" id="lightboxTitle">Visualização do Projeto</div>
          <button class="lightbox-close-btn" id="lightboxCloseBtn" aria-label="Fechar zoom">✕</button>
        </div>
        <div class="lightbox-img-box">
          <img src="" id="lightboxImg" alt="Visualização em Alta Definição">
        </div>
        <div class="lightbox-footer">
          <span style="font-size:12px;color:var(--text-dim)">Metrica UP · Alta Definição</span>
          <div style="display:flex;gap:10px" id="lightboxActions">
            <!-- Botões injetados dinamicamente -->
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = lightbox.querySelector('#lightboxImg');
  const lightboxTitle = lightbox.querySelector('#lightboxTitle');
  const lightboxActions = lightbox.querySelector('#lightboxActions');
  const closeBtn = lightbox.querySelector('#lightboxCloseBtn');

  const openLightbox = (imgSrc, title, card) => {
    if (!lightboxImg) return;
    lightboxImg.src = imgSrc;
    if (lightboxTitle) lightboxTitle.textContent = title;

    if (lightboxActions && card) {
      const liveBtn = card.querySelector('.btn-live-powerbi');
      const openModalBtn = card.querySelector('.btn-open-modal');
      const requestBtn = card.querySelector('.card-link');

      let actionHtml = '';
      if (liveBtn) {
        actionHtml += `<a class="btn-live-powerbi" href="${liveBtn.href}" target="_blank" rel="noopener noreferrer">Testar no Power BI Service ↗</a>`;
      }
      if (openModalBtn) {
        const sysKey = openModalBtn.getAttribute('data-open-system');
        actionHtml += `<button class="btn btn-outline" style="padding:8px 14px;font-size:12px" data-open-system="${sysKey}" onclick="document.getElementById('lightboxModal').classList.remove('active');">Ver Arquitetura ↗</button>`;
      }
      if (requestBtn) {
        actionHtml += `<a class="btn btn-primary" style="padding:8px 14px;font-size:12px" href="${requestBtn.href}">Solicitar Projeto Similar ↗</a>`;
      }
      lightboxActions.innerHTML = actionHtml;

      // Reatacha evento no botão de arquitetura se houver
      lightboxActions.querySelectorAll('[data-open-system]').forEach(b => {
        b.addEventListener('click', (e) => {
          const k = b.getAttribute('data-open-system');
          const trigger = document.querySelector(`.system-card [data-open-system="${k}"]`);
          if (trigger) trigger.click();
        });
      });
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.system-screenshot-wrap').forEach((wrap) => {
    wrap.addEventListener('click', () => {
      const img = wrap.querySelector('img');
      const card = wrap.closest('.system-card');
      const title = card?.querySelector('h3')?.textContent || 'Projeto Metrica UP';
      if (img) openLightbox(img.src, title, card);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   12. CARD SPOTLIGHT EFFECT (BRILHO QUE SEGUE O MOUSE)
   ========================================================================== */
function initCardSpotlight() {
  const cards = document.querySelectorAll('.system-card, .card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   13. BOTÃO REVER INTRO
   ========================================================================== */
function initReplayIntro() {
  document.querySelectorAll('[data-replay-intro]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const overlay = document.querySelector('#techIntroOverlay');
      if (!overlay) return;

      overlay.style.display = 'flex';
      overlay.classList.remove('fade-out');

      const progressBar = overlay.querySelector('.intro-progress-bar');
      if (progressBar) progressBar.style.width = '0%';

      // Reinicia animações CSS refazendo os elementos
      const logoWrap = overlay.querySelector('.intro-logo-wrap');
      if (logoWrap) {
        const clone = logoWrap.cloneNode(true);
        logoWrap.parentNode.replaceChild(clone, logoWrap);
      }

      initLogoUpIntro();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

/* ==========================================================================
   14. WHATSAPP FAB TOOLTIP DISMISS
   ========================================================================== */
function initWhatsAppFab() {
  const closeTip = document.querySelector('#closeWaTip');
  const tip = document.querySelector('#waTooltip');
  if (closeTip && tip) {
    closeTip.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      tip.style.display = 'none';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
  initCardSpotlight();
  initReplayIntro();
  initWhatsAppFab();
});
