const footer = document.querySelector('.footer')
fetch('/components/footer-offers.html')
	.then(res => res.text())
	.then(data => {
		footer.innerHTML = data
		const parser = new DOMParser()
		const doc = parser.parseFromString(data, 'text/html')
		const scriptElement = doc.querySelector('script') // Fix here
		if (scriptElement) {
			eval(scriptElement.textContent)
		}
	})

const offers = document.querySelector('.offers')
fetch('/components/offers-offers.html')
	.then(res => res.text())
	.then(data => {
		offers.innerHTML = data
		const parser = new DOMParser()
		const doc = parser.parseFromString(data, 'text/html')
		const scriptElement = doc.querySelector('script') // Fix here
		if (scriptElement) {
			eval(scriptElement.textContent)
		}
	})
