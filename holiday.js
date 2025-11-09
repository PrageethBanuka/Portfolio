// Holiday helpers: bottom Christmas border + date-based snow container toggle
(function () {
  const FORCE = globalThis.HOLIDAY_FORCE; // true/false to override; undefined to auto
  const prefersReduce = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

  function inHolidayWindow(d = new Date()) {
    const m = d.getMonth(); // 0=Jan ... 10=Nov 11=Dec
    const day = d.getDate();
    // Active: Nov 25–Nov 30, all of Dec, Jan 1–5
    return (m === 10 && day >= 25) || (m === 11) || (m === 0 && day <= 5);
  }

  function ensureSnowContainer(show) {
    let el = document.querySelector('.snow-container');
    if (!el) {
      el = document.createElement('div');
      el.className = 'snow-container';
      document.body.appendChild(el);
    }
    // Keep the element present to avoid errors in existing snow script; just toggle visibility
    el.style.display = show ? 'block' : 'none';
  }

  function ensureBottomBorder(show) {
    let border = document.getElementById('christmas-border');
    if (!border) {
      border = document.createElement('div');
      border.id = 'christmas-border';
      document.body.appendChild(border);
    }
    border.style.display = show ? 'block' : 'none';
  }

  function ensureSnowPile(show) {
    let pile = document.getElementById('snow-pile');
    if (!pile) {
      pile = document.createElement('div');
      pile.id = 'snow-pile';
      document.body.appendChild(pile);
    }
    pile.style.display = show ? 'block' : 'none';
  }

  function init() {
    const active = FORCE === true || (FORCE !== false && inHolidayWindow());
    const showMotion = active && !prefersReduce;
    // Snowflakes only if holiday and not reduced motion
    ensureSnowContainer(showMotion);
    // Border and small snow pile even with reduced motion (static)
    ensureBottomBorder(active);
    ensureSnowPile(active);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
