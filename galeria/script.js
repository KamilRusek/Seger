document.addEventListener('DOMContentLoaded', event => {
	let slideIndex = 0
	const slides = document.querySelectorAll('.slide')

	function showSlides() {
		slides.forEach(slide => {
			slide.classList.remove('active')
		})
		slideIndex++
		if (slideIndex > slides.length) {
			slideIndex = 1
		}
		slides[slideIndex - 1].classList.add('active')
		setTimeout(showSlides, 5000) // Change image every 5 seconds
	}

	if (slides.length > 0) {
		slides[0].classList.add('active') // Initial display of the first slide
	}
	showSlides() // Initial call to start the slideshow
})
