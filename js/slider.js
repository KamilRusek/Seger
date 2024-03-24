let slideIndex = 0
showSlides()

function plusSlides(n) {
	showSlides((slideIndex += n))
}

function showSlides() {
	let i
	const slides = document.getElementsByClassName('slide')
	if (slideIndex >= slides.length) {
		slideIndex = 0
	}
	if (slideIndex < 0) {
		slideIndex = slides.length - 1
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].classList.remove('active')
	}
	slides[slideIndex].classList.add('active')
}

setInterval(function () {
	plusSlides(1)
}, 5000) // Automatyczne przewijanie co 5 sekund
