// js/main.js

document.addEventListener('DOMContentLoaded', () => {
	// --- 0. Automatyczny Rok w Stopce ---
	const yearSpan = document.getElementById('current-year')
	if (yearSpan) {
		yearSpan.innerText = new Date().getFullYear()
	}

	// --- 1. Obsługa Menu Mobilnego ---
	const mobileBtn = document.getElementById('mobile-menu-btn')
	const mobileMenu = document.getElementById('mobile-menu')

	if (mobileBtn && mobileMenu) {
		mobileBtn.addEventListener('click', () => {
			mobileMenu.classList.toggle('hidden')
		})

		document.querySelectorAll('#mobile-menu a').forEach(link => {
			link.addEventListener('click', () => {
				mobileMenu.classList.add('hidden')
			})
		})
	}

	// --- 2. Obsługa Formularza Kontaktowego ---
	const contactForm = document.getElementById('contactForm')

	if (contactForm) {
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault()

			const form = this
			const statusMsg = document.getElementById('formStatus')
			const btn = form.querySelector('button')
			const originalBtnText = btn.innerText

			btn.innerText = 'Wysyłanie...'
			btn.disabled = true

			const formData = new FormData(form)

			fetch(form.action, {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json',
				},
			})
				.then(response => {
					if (response.ok) {
						statusMsg.innerText = 'Wiadomość została wysłana pomyślnie!'
						statusMsg.className = 'text-center text-sm mt-4 text-green-600 font-bold block'
						form.reset()
					} else {
						statusMsg.innerText = 'Wystąpił problem przy wysyłaniu formularza.'
						statusMsg.className = 'text-center text-sm mt-4 text-red-600 font-bold block'
					}
				})
				.catch(error => {
					statusMsg.innerText = 'Błąd połączenia. Spróbuj ponownie później.'
					statusMsg.className = 'text-center text-sm mt-4 text-red-600 font-bold block'
				})
				.finally(() => {
					btn.innerText = originalBtnText
					btn.disabled = false
					if (statusMsg) statusMsg.classList.remove('hidden')

					setTimeout(() => {
						if (statusMsg) statusMsg.classList.add('hidden')
					}, 5000)
				})
		})
	}

	// --- 3. Obsługa Cookies ---
	const cookieBanner = document.getElementById('cookie-banner')
	const acceptCookiesBtn = document.getElementById('accept-cookies')

	if (cookieBanner && acceptCookiesBtn) {
		if (!localStorage.getItem('cookiesAccepted')) {
			setTimeout(() => {
				cookieBanner.classList.remove('translate-y-full')
			}, 1000)
		}

		acceptCookiesBtn.addEventListener('click', () => {
			localStorage.setItem('cookiesAccepted', 'true')
			cookieBanner.classList.add('translate-y-full')
		})
	}

	// --- 4. Dark Mode / Light Mode ---
	const toggleDesktop = document.getElementById('theme-toggle')
	const toggleMobile = document.getElementById('theme-toggle-mobile')
	const themeToggles = [toggleDesktop, toggleMobile].filter(el => el !== null)
	const html = document.documentElement

	if (
		localStorage.getItem('theme') === 'dark' ||
		(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
	) {
		html.classList.add('dark')
	} else {
		html.classList.remove('dark')
	}

	themeToggles.forEach(toggle => {
		toggle.addEventListener('click', () => {
			if (html.classList.contains('dark')) {
				html.classList.remove('dark')
				localStorage.setItem('theme', 'light')
			} else {
				html.classList.add('dark')
				localStorage.setItem('theme', 'dark')
			}
		})
	})

	// --- 5. Inicjalizacja języka przy starcie ---
	const savedLang = localStorage.getItem('lang')
	if (savedLang) {
		setLanguage(savedLang)
	}
})

// --- Funkcje Globalne ---

function setLanguage(lang) {
	if (typeof translations === 'undefined' || !translations[lang]) return

	// 1. Aktualizacja tekstów
	const elements = document.querySelectorAll('[data-i18n]')
	elements.forEach(el => {
		const key = el.getAttribute('data-i18n')
		if (translations[lang][key]) {
			if (el.tagName === 'META') {
				el.setAttribute('content', translations[lang][key])
			} else if (el.tagName === 'TITLE') {
				document.title = translations[lang][key]
			} else {
				el.innerHTML = translations[lang][key]
			}
		}
	})

	// 2. Aktualizacja przycisków języka (TERAZ DZIAŁA NA MOBILE I DESKTOP)
	// Najpierw usuwamy klasę 'active' ze wszystkich przycisków
	document.querySelectorAll('.lang-btn').forEach(btn => {
		btn.classList.remove('active')
	})

	// Następnie dodajemy 'active' do wszystkich przycisków wybranego języka
	// Wymaga dodania atrybutu data-lang="pl" w HTML
	document.querySelectorAll(`.lang-btn[data-lang="${lang}"]`).forEach(btn => {
		btn.classList.add('active')
	})

	localStorage.setItem('lang', lang)
}

/**
 * FUNKCJA PRZEŁĄCZANIA SEKCJI (Oferta / Galeria)
 * Naprawiona, aby obsługiwać priorytety Tailwinda za pomocą !hidden
 */
function toggleSection(sectionId, btnId, itemClass, displayClass) {
	const btn = document.getElementById(btnId)
	const hiddenItems = document.querySelectorAll('.' + itemClass)
	let isExpanded = btn.getAttribute('data-expanded') === 'true'
	const currentLang = localStorage.getItem('lang') || 'pl'

	if (window.innerWidth >= 1024) return

	hiddenItems.forEach(item => {
		if (!isExpanded) {
			// POKAZUJEMY - po prostu usuwamy hidden
			item.classList.remove('hidden')
		} else {
			// CHOWAMY - po prostu dodajemy hidden
			item.classList.add('hidden')
		}
	})

	isExpanded = !isExpanded
	btn.setAttribute('data-expanded', isExpanded)

	if (typeof translations !== 'undefined' && translations[currentLang]) {
		const textKey = isExpanded ? 'show_less' : 'show_more'
		const iconClass = isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'
		btn.innerHTML = translations[currentLang][textKey] + ` <i class="fas ${iconClass} ml-2"></i>`
	}

	if (!isExpanded) {
		document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
	}
}
