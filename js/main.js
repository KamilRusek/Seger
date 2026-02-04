// js/main.js

document.addEventListener('DOMContentLoaded', () => {
	// --- Automatyczny rok w stopce ---
	const yearSpan = document.getElementById('current-year')
	if (yearSpan) {
		yearSpan.innerText = new Date().getFullYear()
	}

	// --- Obsługa menu mobilnego ---
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

	// --- Obsługa formularza kontaktowego (FormSubmit) ---
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
				headers: { Accept: 'application/json' },
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
				.catch(() => {
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

	// --- Obsługa Cookies (RODO / GDPR) ---
	const cookieBanner = document.getElementById('cookie-banner')
	const acceptBtn = document.getElementById('accept-cookies')
	const rejectBtn = document.getElementById('reject-cookies')

	// Funkcja uruchamiająca analitykę (np. Google Analytics)
	function loadAnalytics() {
		console.log('Analityka włączona (Zgoda użytkownika)')

		// KROK 1: Dynamicznie dodajemy bibliotekę Google
		const script = document.createElement('script')
		script.src = 'https://www.googletagmanager.com/gtag/js?id=G-FC4KCVRPQB'
		script.async = true
		document.head.appendChild(script)

		// KROK 2: Konfiguracja
		window.dataLayer = window.dataLayer || []
		function gtag() {
			dataLayer.push(arguments)
		}
		gtag('js', new Date())
		gtag('config', 'G-FC4KCVRPQB')
	}

	// Sprawdzamy decyzję zapisaną w pamięci
	const cookieConsent = localStorage.getItem('cookie_consent') // 'granted' lub 'denied'

	if (!cookieConsent) {
		// Brak decyzji -> Pokaż banner po 1 sekundzie
		if (cookieBanner) {
			setTimeout(() => {
				cookieBanner.classList.remove('translate-y-full')
			}, 1000)
		}
	} else if (cookieConsent === 'granted') {
		// Zgoda już była -> Ładujemy analitykę od razu
		loadAnalytics()
	}

	// Obsługa kliknięcia AKCEPTUJ
	if (acceptBtn && cookieBanner) {
		acceptBtn.addEventListener('click', () => {
			localStorage.setItem('cookie_consent', 'granted') // Zapisz zgodę
			loadAnalytics() // Uruchom skrypty
			cookieBanner.classList.add('translate-y-full') // Schowaj banner
		})
	}

	// Obsługa kliknięcia ODRZUĆ
	if (rejectBtn && cookieBanner) {
		rejectBtn.addEventListener('click', () => {
			localStorage.setItem('cookie_consent', 'denied') // Zapisz odmowę
			// NIE uruchamiamy loadAnalytics()
			cookieBanner.classList.add('translate-y-full') // Schowaj banner
		})
	}

	// --- Tryb Ciemny / Jasny (Dark Mode) ---
	const toggleDesktop = document.getElementById('theme-toggle')
	const toggleMobile = document.getElementById('theme-toggle-mobile')
	const themeToggles = [toggleDesktop, toggleMobile].filter(el => el !== null)
	const html = document.documentElement

	// Sprawdzenie zapisanego motywu lub preferencji systemowych
	if (
		localStorage.getItem('theme') === 'dark' ||
		(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
	) {
		html.classList.add('dark')
	} else {
		html.classList.remove('dark')
	}

	// Obsługa przełączników
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

	// --- Inicjalizacja języka przy starcie ---
	const savedLang = localStorage.getItem('lang')
	if (savedLang) {
		setLanguage(savedLang)
	}
})

// ==========================================
// FUNKCJE GLOBALNE
// ==========================================

// --- Zmiana języka (i18n) i aktualizacja atrybutów ---
function setLanguage(lang) {
	if (typeof translations === 'undefined' || !translations[lang]) return

	// Mapowanie kodów na standard ISO (np. cz -> cs)
	const htmlLangCodes = {
		pl: 'pl',
		en: 'en',
		cz: 'cs',
		sk: 'sk',
	}

	// Aktualizacja atrybutu lang w HTML (ważne dla SEO/przeglądarek)
	document.documentElement.setAttribute('lang', htmlLangCodes[lang] || lang)

	// Aktualizacja tekstów na stronie
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

	// Aktualizacja aktywnych przycisków języka
	document.querySelectorAll('.lang-btn').forEach(btn => {
		btn.classList.remove('active')
	})
	document.querySelectorAll(`.lang-btn[data-lang="${lang}"]`).forEach(btn => {
		btn.classList.add('active')
	})

	localStorage.setItem('lang', lang)
}

// --- Rozwijanie sekcji (Oferta / Galeria) na mobile ---
function toggleSection(sectionId, btnId, itemClass, displayClass) {
	const btn = document.getElementById(btnId)
	const hiddenItems = document.querySelectorAll('.' + itemClass)
	let isExpanded = btn.getAttribute('data-expanded') === 'true'
	const currentLang = localStorage.getItem('lang') || 'pl'

	if (window.innerWidth >= 1024) return

	hiddenItems.forEach(item => {
		if (!isExpanded) {
			item.classList.remove('hidden')
		} else {
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

// --- Obsługa Galerii (Modal / Lightbox) ---
function openModal(src) {
	const modal = document.getElementById('imageModal')
	const modalImg = document.getElementById('modalImg')
	if (modal && modalImg) {
		modalImg.src = src
		modal.classList.remove('hidden')
	}
}

function closeModal() {
	const modal = document.getElementById('imageModal')
	if (modal) {
		modal.classList.add('hidden')
	}
}
