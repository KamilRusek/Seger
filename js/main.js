//Działanie nawigacji mobilnej
let burgerMenuOpen = document.querySelector('.burger-icon')
let burgerMenuClose = document.querySelector('.close-icon')
let navOptions = document.querySelector('.nav-mobile-active')
let burgerIcon = document.querySelector('.burger-icon')

const toggleNavigation = () => {
	navOptions.classList.toggle('unactive')
	navOptions.classList.toggle('active')
	burgerIcon.classList.toggle('burger-active')
}

burgerMenuOpen.addEventListener('click', toggleNavigation)
burgerMenuClose.addEventListener('click', toggleNavigation)

//Zamykanie nawigacji podczas wybrania opcji
let navOptions2 = document.querySelectorAll('.nav-mobile-option')

Array.from(navOptions2).forEach(navOption => {
	navOption.addEventListener('click', toggleNavigation)
})
