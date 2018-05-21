// Select needed elements and store as variables
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Functionality for burger menu
function burgerMenu() {
	// Adds/Removes class from burger for css animation
	this.classList.toggle('is-active');
	navMenu.classList.toggle('open');
}

// Handles click functionality on burger menu
hamburger.addEventListener('click', burgerMenu);