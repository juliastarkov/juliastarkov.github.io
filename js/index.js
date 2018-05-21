// Select needed elements and store as variables
const hamburger   = document.querySelector('.hamburger'),
      navMenu     = document.querySelector('.nav-menu'),
      headerText  = document.querySelector('.main-header .title'),
      headerArrow = document.querySelector('.main-header svg');

// Functionality for burger menu
function burgerMenu() {
	// Adds/Removes class from burger for css animation
	this.classList.toggle('is-active');
	navMenu.classList.toggle('open');
}

// Handles click functionality on burger menu
hamburger.addEventListener('click', burgerMenu);

window.addEventListener('scroll', function() {
	// Fades the main-header text and svg arrow when user scrollbars.
	const opacity = 1 - (this.scrollY / 500);
    headerText.style.opacity = opacity;
    headerArrow.style.opacity = opacity;
});