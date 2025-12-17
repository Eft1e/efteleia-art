// main.js — Efteleia: тихий отклик на любой клик
// Каждое прикосновение оставляет след. Каждый след — фиолетовый.

document.addEventListener('click', (e) => {
  // Игнорируем клики по ссылкам, которые ведут на другую страницу?
  // Нет — пусть всё живёт!

  const ripple = document.createElement('div');
  ripple.style.position = 'fixed';
  ripple.style.left = (e.clientX - 10) + 'px';
  ripple.style.top = (e.clientY - 10) + 'px';
  ripple.style.width = '20px';
  ripple.style.height = '20px';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'rgba(138, 111, 191, 0.25)';
  ripple.style.pointerEvents = 'none';
  ripple.style.zIndex = '9999';
  ripple.style.transform = 'scale(0)';
  ripple.style.opacity = '1';
  ripple.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
  document.body.appendChild(ripple);

  // Запускаем анимацию
  requestAnimationFrame(() => {
    ripple.style.transform = 'scale(2)';
    ripple.style.opacity = '0';
  });

  // Удаляем элемент после анимации
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.remove();
    }
  }, 300);
});
