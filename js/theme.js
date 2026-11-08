/* ОСНОВНАЯ РАБОТА: реализуйте переключение темы без библиотеки.
 * "auto" означает отсутствие атрибута data-theme у <html>.
 * В таком случае тёмную тему применяет CSS media query.
 * Настройку нужно сохранять в localStorage (ключ "atlas-theme").
 */
const STORAGE_KEY = 'atlas-theme';

const root = document.documentElement;
const themeSelect = document.querySelector('#theme-select');
const demoAction = document.querySelector('#demo-action');
const demoFeedback = document.querySelector('#demo-feedback');

function applyTheme(choice) {
  // TODO: если choice === 'auto' — root.removeAttribute('data-theme').
  if (choice === 'auto') {
    root.removeAttribute('data-theme');
  // TODO: иначе — root.dataset.theme = choice.
  } else {
    root.dataset.theme = choice;
  }
  // TODO: синхронизируйте значение themeSelect.value.
  if (themeSelect) {
    themeSelect.value = choice;
  }

  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch (e) {
    console.warn('localStorage недоступен:', e);
  }
}

// TODO: при загрузке прочитайте сохранённое значение из localStorage.
function initTheme() {
  let savedTheme = 'auto';
  try {
    savedTheme = localStorage.getItem(STORAGE_KEY) || 'auto';
  } catch (e) {
    console.warn('Не удалось прочитать из localStorage:', e);
  }
// TODO: допустимые значения: auto / light / dark; иначе используйте auto.
if (!['auto', 'light', 'dark'].includes(savedTheme)) {
    savedTheme = 'auto';
  }applyTheme(savedTheme);
}

initTheme();

// TODO: обработайте событие change у themeSelect и сохраните настройку.
// Подсказка: если localStorage недоступен, оставьте интерфейс рабочим.
if (themeSelect) {
  themeSelect.addEventListener('change', (event) => {
    applyTheme(event.target.value);
  });
}

/* Обратная связь от кнопки — уже готова. */
demoAction.addEventListener('click', () => {
  demoFeedback.textContent = 'Демонстрация: действие выполнено, новая заявка создана.';
});

/* САМОСТОЯТЕЛЬНАЯ РАБОТА: переключатель плотности и сохранение выбора. */
const DENSITY_KEY = 'atlas-density';
const densitySelect = document.querySelector('#density-select');

function applyDensity(choice) {
  if (choice === 'compact') {
    root.setAttribute('data-density', 'compact');
  } else {
    root.removeAttribute('data-density');
  }

  if (densitySelect) {
    densitySelect.value = choice;
  }

  try {
    localStorage.setItem(DENSITY_KEY, choice);
  } catch (e) {
    console.warn('localStorage недоступен:', e);
  }
}

function initDensity() {
  let savedDensity = 'normal';
  try {
    savedDensity = localStorage.getItem(DENSITY_KEY) || 'normal';
  } catch (e) {
    console.warn('Не удалось прочитать из localStorage:', e);
  }

  if (!['normal', 'compact'].includes(savedDensity)) {
    savedDensity = 'normal';
  }
  applyDensity(savedDensity);
}

initDensity();

if (densitySelect) {
  densitySelect.addEventListener('change', (event) => {
    applyDensity(event.target.value);
  });
}
