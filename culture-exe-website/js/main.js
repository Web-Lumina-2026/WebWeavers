/* Shared interactions for every page. No build step or backend required. */
(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const prefersReducedMotion = () => {
    if (typeof window.matchMedia !== 'function') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };
  const readStoredMode = () => {
    try {
      return window.localStorage ? window.localStorage.getItem('culture-mode') : null;
    } catch (_) {
      return null;
    }
  };
  const writeStoredMode = value => {
    try {
      if (window.localStorage) window.localStorage.setItem('culture-mode', value);
    } catch (_) {
      // Storage may be blocked in some browser privacy modes; keep the UI working without it.
    }
  };
  // Persist the display mode for this browser session.
  const modeBtn = $('#modeToggle');
  const savedMode = readStoredMode();
  if (savedMode === 'neon') document.body.classList.add('neon-mode');
  if (modeBtn) {
    modeBtn.textContent = document.body.classList.contains('neon-mode') ? '◐ DAY MODE' : '◐ NIGHT MODE';
    modeBtn.addEventListener('click', () => {
      document.body.classList.toggle('neon-mode');
      const neon = document.body.classList.contains('neon-mode');
      writeStoredMode(neon ? 'neon' : 'classic');
      modeBtn.textContent = neon ? '◐ DAY MODE' : '◐ NIGHT MODE';
      pop();
    });
  }
  // Tiny optional oscillator click sound; off by default and only starts after interaction.
  let soundOn = false, audioContext;
  const soundBtn = $('#soundToggle');
  function pop() {
    if (!soundOn) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioContext.createOscillator(), gain = audioContext.createGain();
      osc.type = 'square'; osc.frequency.value = 520;
      gain.gain.setValueAtTime(.035, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + .07);
      osc.connect(gain); gain.connect(audioContext.destination); osc.start(); osc.stop(audioContext.currentTime + .07);
    } catch (_) { /* Audio is a bonus; ignore unsupported browsers. */ }
  }
  if (soundBtn) soundBtn.addEventListener('click', () => {
    soundOn = !soundOn;
    soundBtn.innerHTML = soundOn ? '♫ <span>SOUND ON</span>' : '♫ <span>SOUND OFF</span>';
    pop();
  });
  // Clock in the OS taskbar.
  function clock() { const d = new Date(); const c = $('#clock'); if(c) c.textContent = d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}); }
  clock(); setInterval(clock, 30000);
  // Link transition. Keep normal navigation accessible and functional.
  $$('a[href$=".html"]').forEach(a => a.addEventListener('click', e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank') return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname) return;
    e.preventDefault(); pop(); document.body.classList.add('page-leaving');
    setTimeout(() => location.href = a.href, prefersReducedMotion() ? 0 : 180);
  }));
  // Lenis smooth scroll when available; reduced-motion preference always wins.
  if (window.Lenis && !prefersReducedMotion()) {
    const lenis = new Lenis({duration:1.05,smoothWheel:true});
    function raf(time){lenis.raf(time);requestAnimationFrame(raf)} requestAnimationFrame(raf);
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
    }
  }
  // Konami code: up up down down left right left right B A.
  const sequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let entered = [];
  document.addEventListener('keydown', e => {
    entered.push(e.key); entered = entered.slice(-sequence.length);
    if (sequence.every((k,i)=>k.toLowerCase()===entered[i]?.toLowerCase())) {
      const crash = document.createElement('div'); crash.className='fake-crash';
      crash.innerHTML='<div><p>culture.exe has encountered a vibe.</p><h1>✨ SYSTEM OVERSTIMULATED ✨</h1><p>Too much culture. Not enough RAM.</p><button>REBOOT THE VIBE ↻</button></div>';
      Object.assign(crash.style,{position:'fixed',inset:0,zIndex:300,background:'#111',color:'#d5ff38',display:'grid',placeItems:'center',textAlign:'center',fontFamily:'monospace',padding:'24px'});
      crash.querySelector('button').style.cssText='padding:14px;background:#ff5caa;border:3px solid #fff;font-weight:bold;cursor:pointer';
      crash.querySelector('button').onclick=()=>crash.remove(); document.body.append(crash);
    }
  });
  // Generic card tilt, with motion disabled for users who request it.
  if (!prefersReducedMotion()) {
    $$('.portal-card,.genre-card,.team-card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(800px) rotateX(${-y*3}deg) rotateY(${x*3}deg) translateY(-3px)`;
      });
      card.addEventListener('pointerleave',()=>card.style.transform='');
    });
  }

  const scrollMascot = document.createElement('img');
  scrollMascot.className = 'scroll-mascot';
  scrollMascot.src = 'assets/scroll-cat-source.png';
  scrollMascot.alt = '';
  scrollMascot.setAttribute('aria-hidden', 'true');
  document.body.append(scrollMascot);
  let mascotFrame = 0;
  const moveMascot = () => {
    if (mascotFrame) return;
    mascotFrame = requestAnimationFrame(() => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight)) : 0;
      const travel = Math.max(0, window.innerWidth - scrollMascot.offsetWidth - 32);
      scrollMascot.style.transform = `translate3d(${travel * progress}px, 0, 0)`;
      mascotFrame = 0;
    });
  };
  window.addEventListener('scroll', moveMascot, {passive:true});
  window.addEventListener('resize', moveMascot);
  moveMascot();

  if (!prefersReducedMotion() && 'IntersectionObserver' in window) {
    const revealTargets = $$('.section-head,.portal-card,.genre-card,.team-card,.look-card,.art-piece,.trend-window,.stat-card,.meme-tile');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-revealed');
        observer.unobserve(entry.target);
      }
    }), {threshold:.12});
    revealTargets.forEach(target => observer.observe(target));
  }
})();