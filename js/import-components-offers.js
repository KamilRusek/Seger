const nav = document.querySelector('.nav')
fetch('/components/navigation-offers.html')
	.then(res => res.text())
	.then(data => {
		nav.innerHTML = data
		const parser = new DOMParser()
		const doc = parser.parseFromString(data, 'text/html')
		eval(doc.querySelector('script').textContent)
	})

const footer = document.querySelector('.footer')
fetch('/components/footer-offers.html')
	.then(res => res.text())
	.then(data => {
		footer.innerHTML = data
		const parser = new DOMParser()
		const doc = parser.parseFromString(data, 'text/html')
		eval(doc.querySelector('script').textContent)
	})

const offers = document.querySelector('.offers')
fetch('/components/offers-offers.html')
	.then(res => res.text())
	.then(data => {
		offers.innerHTML = data
		const parser = new DOMParser()
		const doc = parser.parseFromString(data, 'text/html')
		eval(doc.querySelector('script').textContent)
	})