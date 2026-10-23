(() => {
  const section = document.getElementById('mandalaScroll');
  if (!section || (typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;

  const update = () => {
    const scrollRange = section.offsetHeight - window.innerHeight;
    const progress = scrollRange > 0
      ? Math.min(1, Math.max(0, (window.scrollY - section.offsetTop) / scrollRange))
      : 0;
    section.style.setProperty('--mandala-rotation', `${progress * 250}deg`);
    section.style.setProperty('--mandala-scale', `${1 - progress * .3}`);
    section.style.setProperty('--wordmark-y', `${-progress * 72}vh`);
    section.style.setProperty('--wordmark-scale', `${1 - progress * .18}`);
  };

  let frame = 0;
  const scheduleUpdate = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      update();
      frame = 0;
    });
  };

  window.addEventListener('scroll', scheduleUpdate, {passive:true});
  window.addEventListener('resize', scheduleUpdate);
  update();
})();
