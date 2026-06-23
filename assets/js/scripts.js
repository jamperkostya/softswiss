var swiper = new Swiper(".mySwiper", {
	pagination: {
		el: ".swiper-pagination",
		type: "progressbar",
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	on: {
		init: function () {
			updateSliderCounter(this);
		},
		slideChange: function () {
			updateSliderCounter(this);
		},
	},
	breakpoints: {
		// если ширина экрана >= 768px
		768: {
			slidesPerView: 2,
			spaceBetween: 20 // отступ между слайдами на десктопе
		},
		1280: {
			slidesPerView: 4,
			spaceBetween: 20 // отступ между слайдами на десктопе
		}
	},
});
function updateSliderCounter(swiperInstance) {
	const currentEl = document.getElementById('current-slide');
	const totalEl = document.getElementById('total-slides');

	if (currentEl && totalEl) {
		currentEl.textContent = swiperInstance.realIndex + 1;
		const totalSlides = swiperInstance.slides.filter(
			(slide) => !slide.classList.contains('swiper-slide-duplicate')
		).length;
		totalEl.textContent = totalSlides;
	}
}
document.addEventListener('DOMContentLoaded', () => {
	// 1. Ищем ВСЕ кнопки с классом .btn-menu (найдет и мобильную, и планшетную)
	const menuButtons = document.querySelectorAll('.btn-menu');
	const menu = document.querySelector('.menu');

	// Проверяем, что меню вообще существует на странице и кнопок больше нуля
	if (menu && menuButtons.length > 0) {
		
		// 2. Вешаем событие клика на КАЖДУЮ найденную кнопку
		menuButtons.forEach(btnMenu => {
			btnMenu.addEventListener('click', (e) => {
				e.preventDefault(); // Предотвращаем прыжок по ссылке #
				
				// Переключаем класс active у меню
				menu.classList.toggle('active');
				
				// Переключаем класс active у ВСЕХ кнопок меню одновременно, 
				// чтобы анимация гамбургера (крестик) сработала везде
				menuButtons.forEach(btn => btn.classList.toggle('active'));
			});
		});

		// 3. Закрываем меню при клике на любую ссылку внутри него
		const menuLinks = menu.querySelectorAll('a');
		menuLinks.forEach(link => {
			link.addEventListener('click', () => {
				menu.classList.remove('active');
				// Убираем active со всех кнопок при закрытии
				menuButtons.forEach(btn => btn.classList.remove('active'));
			});
		});
	}
});
document.addEventListener('DOMContentLoaded', () => {
	const parallaxItems = document.querySelectorAll('.parallax');

	// Функция, которая запускает параллакс
	function handleParallax() {
		const scrollPosition = window.scrollY;
		const windowWidth = window.innerWidth;

		// Включаем логику только в рамках вашего медиа-запроса
		if (windowWidth >= 768 ) {
			
			parallaxItems.forEach(item => {
				// Получаем скорость из data-атрибута, если его нет — ставим 0.1 по умолчанию
				const speed = parseFloat(item.getAttribute('data-speed')) || 0.1;
				
				// Считаем сдвиг
				const yPos = scrollPosition * speed;

				// Двигаем элемент через requestAnimationFrame
				window.requestAnimationFrame(() => {
					item.style.transform = `translateY(${yPos}px)`;
				});
			});

		} else {
			// Если экран стал меньше 768 или больше 1280, сбрасываем трансформацию в ноль
			parallaxItems.forEach(item => {
				window.requestAnimationFrame(() => {
					item.style.transform = 'translateY(0px)';
				});
			});
		}
	}

	// Слушаем скролл
	window.addEventListener('scroll', handleParallax);
	
	// Слушаем изменение размеров экрана (на случай, если перевернули планшет)
	window.addEventListener('resize', handleParallax);
});
const THEME_KEY = 'preferredTheme';
const toggleBtn = document.getElementById('theme-switcher');
const html = document.documentElement;

// Функция применения темы
function applyTheme(theme) {
	if (theme === 'dark') {
		html.setAttribute('data-theme', 'dark');
	} else {
		html.removeAttribute('data-theme');
	}
	localStorage.setItem(THEME_KEY, theme);
}

// Логика клика: строго переключаем туда-сюда
toggleBtn.addEventListener('click', () => {
	const isDark = html.getAttribute('data-theme') === 'dark';
	applyTheme(isDark ? 'light' : 'dark');
});

// Инициализация при загрузке страницы
function initTheme() {
	const savedTheme = localStorage.getItem(THEME_KEY);
	if (savedTheme) {
		applyTheme(savedTheme);
	} else {
		// Если зашли впервые — берем тему из настроек операционной системы
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		applyTheme(prefersDark ? 'dark' : 'light');
	}
}

initTheme();