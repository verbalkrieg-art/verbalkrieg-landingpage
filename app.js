(() => {
  const menu = document.querySelector('.menu');
  const links = document.querySelector('.navlinks');
  if (menu && links) {
    menu.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      menu.textContent = open ? 'SCHLIESSEN' : 'MENÜ';
    });
    links.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      links.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.textContent = 'MENÜ';
    }));
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('motion-ready');
  window.requestAnimationFrame(() => document.documentElement.classList.add('motion-loaded'));

  const scan = document.querySelector('.scanLabel');
  const consolePanel = document.querySelector('.mediaConsole');
  const states = ['CLAIMS WERDEN GETRENNT', 'BEGRIFFE WERDEN GEPRÜFT', 'FRAMING WIRD SICHTBAR', 'GEGENPOSITION ENTSTEHT', 'OFFENE BEWEISLAST MARKIERT'];
  let state = 0;
  if (scan && consolePanel && !reducedMotion) {
    consolePanel.classList.add('phase-0');
    window.setInterval(() => {
      scan.classList.add('changing');
      window.setTimeout(() => {
        state = (state + 1) % states.length;
        scan.textContent = states[state];
        consolePanel.className = consolePanel.className.replace(/\sphase-\d/g, '');
        consolePanel.classList.add(`phase-${state}`);
        scan.classList.remove('changing');
      }, 220);
    }, 3200);
  }

  const hero = document.querySelector('.hero');
  if (hero && !reducedMotion && window.matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('pointermove', (event) => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      hero.style.setProperty('--pointer-x', `${(x * 100).toFixed(1)}%`);
      hero.style.setProperty('--pointer-y', `${(y * 100).toFixed(1)}%`);
      if (consolePanel) {
        consolePanel.style.setProperty('--tilt-x', `${((.5 - y) * 1.5).toFixed(2)}deg`);
        consolePanel.style.setProperty('--tilt-y', `${((x - .5) * 1.8).toFixed(2)}deg`);
        consolePanel.style.setProperty('--glow-x', `${(x * 100).toFixed(1)}%`);
        consolePanel.style.setProperty('--glow-y', `${(y * 100).toFixed(1)}%`);
      }
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--pointer-x', '50%');
      hero.style.setProperty('--pointer-y', '32%');
      if (consolePanel) {
        consolePanel.style.setProperty('--tilt-x', '0deg');
        consolePanel.style.setProperty('--tilt-y', '0deg');
      }
    });
  }

  const revealTargets = document.querySelectorAll('.sectionIntro, .problemGrid, .inputDeck, .auditQuestions, .process, .studioWindow, .roleGrid, .ledgerGrid, .ledgerRules, .reportWindow, .featureGrid, .audienceGrid, .limitsCopy, .alphaNotice, .finalCta h2');
  revealTargets.forEach((element) => element.classList.add('reveal-block'));
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach((element) => observer.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  }
})();
