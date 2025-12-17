// main.js — Efteleia: невидимый фиолетовый шлейф (линии, а не точки)
// Максимально слитный, исчезает при остановке

(function() {
  let lastX = 0;
  let lastY = 0;
  const trail = [];
  const MAX_LINES = 8; // максимум линий в следе
  const LINE_OPACITY = 0.40; // очень низкая прозрачность
  const LINE_COLOR = 'rgba(138, 111, 191, ' + LINE_OPACITY + ')';
  const LINE_WIDTH = '2px';
  const FADE_OUT_TIME = 600; // быстрое исчезновение
  const INACTIVITY_TIMEOUT = 400; // чистка при остановке

  let inactivityTimer;

  document.body.style.position = 'relative';
  document.body.style.overflowX = 'hidden';
  document.body.style.overflowY = 'auto';

  document.addEventListener('mousemove', (e) => {
    clearTimeout(inactivityTimer);

    const x = e.clientX;
    const y = e.clientY;

    // Если это первое движение — запоминаем позицию
    if (lastX === 0 && lastY === 0) {
      lastX = x;
      lastY = y;
      return;
    }

    // Создаём линию между предыдущей и текущей позицией
    const line = document.createElement('div');
    line.style.position = 'fixed';
    line.style.pointerEvents = 'none';
    line.style.zIndex = '9999';
    line.style.backgroundColor = LINE_COLOR;
    line.style.transition = 'opacity ' + FADE_OUT_TIME + 'ms ease-out';

    // Определяем направление линии
    const dx = x - lastX;
    const dy = y - lastY;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    line.style.width = length + 'px';
    line.style.height = LINE_WIDTH;
    line.style.transformOrigin = '0 0';
    line.style.transform = `rotate(${angle}deg)`;
    line.style.left = lastX + 'px';
    line.style.top = lastY + 'px';

    document.body.appendChild(line);
    trail.push(line);

    // Удаляем старые линии
    if (trail.length > MAX_LINES) {
      const oldLine = trail.shift();
      oldLine.style.opacity = '0';
      setTimeout(() => {
        if (oldLine.parentNode) {
          oldLine.remove();
        }
      }, FADE_OUT_TIME);
    }

    // Обновляем последнюю позицию
    lastX = x;
    lastY = y;

    // Запускаем таймер очистки
    inactivityTimer = setTimeout(() => {
      clearTrail();
    }, INACTIVITY_TIMEOUT);
  });

  document.addEventListener('mouseleave', () => {
    clearTrail();
  });

  function clearTrail() {
    trail.forEach(line => {
      line.style.opacity = '0';
      setTimeout(() => {
        if (line.parentNode) {
          line.remove();
        }
      }, FADE_OUT_TIME);
    });
    trail.length = 0;
    lastX = 0;
    lastY = 0;
  }
})();