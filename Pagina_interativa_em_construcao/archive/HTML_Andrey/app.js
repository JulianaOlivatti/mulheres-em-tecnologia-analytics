/**
 * TechCorp Brasil — People Analytics & DE&I
 * Interações da Página Web com Rolagem Contínua e Sistema de Cartões Sobrepostos
 * Design System Maison Artisan
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgressBar();
  initScrollSpyAndFloatingDots();
  initScrollRevealAnimations();
  initStackingCardsEffect();
  initPowerBIPersistence();
  initKeyboardNav();
});

// 1. Barra de Progresso Superior de Rolagem
function initScrollProgressBar() {
  const progressBar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  }, { passive: true });
}

// 2. Cabeçalho Transparente, ScrollSpy e Marcadores Flutuantes
function initScrollSpyAndFloatingDots() {
  const header = document.getElementById('siteHeader');
  const sections = ['parte1', 'parte2', 'parte3', 'parte4'];
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollDots = document.querySelectorAll('.scroll-dot');

  window.addEventListener('scroll', () => {
    // Transição sutil do cabeçalho: 100% transparente no topo, translúcido com blur ao rolar
    if (window.scrollY > 20) {
      if (header) header.classList.add('scrolled');
    } else {
      if (header) header.classList.remove('scrolled');
    }

    // Rastreamento das seções ativas
    const scrollPos = window.scrollY + 260;
    sections.forEach(id => {
      const sec = document.getElementById(id);
      if (sec) {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
          scrollDots.forEach(dot => {
            dot.classList.toggle('active', dot.getAttribute('data-target') === id);
          });
        }
      }
    });
  }, { passive: true });

  // Cliques suaves nos marcadores laterais
  scrollDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(dot.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Cliques suaves nos links do cabeçalho
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// 3. Efeito de Cartões Sobrepostos Dinâmico (Stacking Cards Engine)
function initStackingCardsEffect() {
  const cards = document.querySelectorAll('.card-stack-section');
  if (!cards.length) return;

  function updateCardStack() {
    const vh = window.innerHeight;
    cards.forEach((card, index) => {
      const nextCard = cards[index + 1];
      if (nextCard) {
        const nextRect = nextCard.getBoundingClientRect();
        // Quando o próximo cartão está subindo e cobrindo o cartão atual
        if (nextRect.top < vh && nextRect.top >= 0) {
          const progress = 1 - (nextRect.top / vh); // de 0 até 1
          const scale = 1 - (progress * 0.05); // escala sutil: de 1.0 para 0.95
          const brightness = 1 - (progress * 0.35); // escurecimento sutil de profundidade
          const translateY = progress * -18;
          card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
          card.style.filter = `brightness(${brightness})`;
        } else if (nextRect.top < 0) {
          card.style.transform = 'scale(0.95) translateY(-18px)';
          card.style.filter = 'brightness(0.65)';
        } else {
          card.style.transform = 'scale(1) translateY(0px)';
          card.style.filter = 'brightness(1)';
        }
      }
    });
  }

  window.addEventListener('scroll', updateCardStack, { passive: true });
  window.addEventListener('resize', updateCardStack, { passive: true });
  updateCardStack();
}

// 4. Animações de Entrada (Scroll Reveal)
function initScrollRevealAnimations() {
  const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

// 5. Alternar abas do Dashboard (Power BI vs Offline)
function switchPreviewTab(mode) {
  const pbiView = document.getElementById('pbiView');
  const offlineView = document.getElementById('offlineView');
  const tabPbi = document.getElementById('tabPowerBi');
  const tabOff = document.getElementById('tabOffline');

  if (mode === 'pbi') {
    if (pbiView) pbiView.style.display = 'flex';
    if (offlineView) offlineView.style.display = 'none';
    if (tabPbi) tabPbi.classList.add('active');
    if (tabOff) tabOff.classList.remove('active');
  } else {
    if (pbiView) pbiView.style.display = 'none';
    if (offlineView) offlineView.style.display = 'flex';
    if (tabPbi) tabPbi.classList.remove('active');
    if (tabOff) tabOff.classList.add('active');
  }
}
window.switchPreviewTab = switchPreviewTab;

// 6. Modal de Configuração do Power BI
function openModal() {
  const modal = document.getElementById('modalConfig');
  const input = document.getElementById('pbiUrlInput');
  const savedUrl = localStorage.getItem('techcorp_powerbi_url') || '';
  if (input) input.value = savedUrl;
  if (modal) modal.classList.add('active');
}
window.openModal = openModal;

function closeModal() {
  const modal = document.getElementById('modalConfig');
  if (modal) modal.classList.remove('active');
}
window.closeModal = closeModal;

function savePbiUrl() {
  const input = document.getElementById('pbiUrlInput');
  let url = input ? input.value.trim() : '';

  // Se o usuário colou uma tag <iframe> inteira, extrai o atributo src
  if (url.includes('<iframe') && url.includes('src="')) {
    const match = url.match(/src="([^"]+)"/);
    if (match && match[1]) {
      url = match[1];
    }
  }

  if (url) {
    localStorage.setItem('techcorp_powerbi_url', url);
    applyPbiUrl(url);
  }
  closeModal();
}
window.savePbiUrl = savePbiUrl;

function applyPbiUrl(url) {
  const pbiView = document.getElementById('pbiView');
  if (pbiView) {
    pbiView.innerHTML = `
      <div style="width: 100%; height: 100%; min-height: 480px; position: relative;">
        <iframe src="${url}" style="width: 100%; height: 500px; border: none; border-radius: 14px; box-shadow: 0 8px 30px rgba(0,0,0,0.5);" allowFullScreen="true"></iframe>
        <div style="margin-top: 10px; display: flex; justify-content: flex-end; gap: 8px;">
          <button onclick="openModal()" class="glass-action-btn" style="font-size: 0.76rem;">Trocar Link</button>
        </div>
      </div>
    `;
  }
}

function initPowerBIPersistence() {
  const savedUrl = localStorage.getItem('techcorp_powerbi_url');
  if (savedUrl) {
    applyPbiUrl(savedUrl);
  }
}

// 7. Navegação Rápida por Teclado (Teclas 1, 2, 3, 4)
function initKeyboardNav() {
  const sectionIds = ['parte1', 'parte2', 'parte3', 'parte4'];
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('modalConfig');
    if (modal && modal.classList.contains('active')) return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (['1', '2', '3', '4'].includes(e.key)) {
      const index = parseInt(e.key, 10) - 1;
      const target = document.getElementById(sectionIds[index]);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
}
