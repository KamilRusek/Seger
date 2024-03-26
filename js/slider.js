document.addEventListener('DOMContentLoaded', function () {
	let slideIndex = 0

	const slides = document.querySelectorAll('.slide')
	const dotsContainer = document.querySelector('.dots')

	slides.forEach((slide, index) => {
		const dot = document.createElement('span')
		dot.classList.add('dot')
		dot.addEventListener('click', () => {
			slideIndex = index
			showSlides()
		})
		dotsContainer.appendChild(dot)
	})

	function plusSlides(n) {
		slideIndex += n
		showSlides()
	}

	function showSlides() {
		const slides = document.getElementsByClassName('slide')
		const dots = document.querySelectorAll('.dot')
		if (slideIndex >= slides.length) {
			slideIndex = 0
		}
		if (slideIndex < 0) {
			slideIndex = slides.length - 1
		}
		for (let i = 0; i < slides.length; i++) {
			slides[i].classList.remove('active')
			dots[i].classList.remove('active')
		}
		slides[slideIndex].classList.add('active')
		dots[slideIndex].classList.add('active')
	}

	setInterval(function () {
		plusSlides(1)
	}, 5000) // Automatyczne przewijanie co 5 sekund

	const prevButton = document.querySelector('.prev')
	const nextButton = document.querySelector('.next')

	prevButton.addEventListener('click', () => {
		plusSlides(-1)
	})

	nextButton.addEventListener('click', () => {
		plusSlides(1)
	})

	showSlides() // Pokaż pierwszy slajd po załadowaniu strony
})
