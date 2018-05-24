// Select needed elements and store as variables
const hamburger   = document.querySelector('.hamburger'),
      navMenu     = document.querySelector('.nav-menu'),
      headerText  = document.querySelector('.main-header .title'),
      headerArrow = document.querySelector('.main-header svg'),
      navBtns     = [...document.querySelectorAll('.nav-links a')];

// Functionality for burger menu
function burgerMenu() {
	// Adds/Removes class from burger for css animation
	this.classList.toggle('is-active');
	navMenu.classList.toggle('open');
}

// For each nav link, find the corresponding content's position on page and assign to node object
// 'Smooth Scroll' to position on page when nav-link is clicked
navBtns.forEach(nav => {
	const id    = nav.textContent.toLowerCase(),
		  navEl = document.getElementById(id);
	// Find positon of corresponding content on page	  
	nav.position = (navEl.offsetTop - document.body.scrollTop);
	nav.addEventListener('click', function(e) {
		e.preventDefault();
		// Remove active class from all navs
		navBtns.forEach(nav => {
			nav.classList.remove('active');
		})
		// Adjust the amount of additional pixels to account for navbar on desktop
		if(window.screen.width >= 1064) {
			scrollTo(document.documentElement, (nav.position - (navMenu.offsetHeight + 20)));
		} else {
			scrollTo(document.documentElement, nav.position);
		}
		// nav - link styles as 'active'
		this.classList.add('active');
	})
})

// Smooth Scrolling Nav Buttons
// https://gist.github.com/andjosh/6764939
function scrollTo(element, to, duration= 500) {
	const start     = element.scrollTop,
		  change    = to - start,
		  increment = 20;
	let currentTime = 0;

	const animateScroll = (() => {
    	currentTime += increment;
    
    	const val = Math.easeInOutQuad(currentTime, start, change, duration);
    
    	element.scrollTop = val;

    	if (currentTime < duration) {
    		setTimeout(animateScroll, increment);
  		}
	});
	animateScroll();
};

Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

// Handles click functionality on burger menu
hamburger.addEventListener('click', burgerMenu);

window.addEventListener('scroll', function() {
	// Fades the main-header text and svg arrow when user scrollbars.
	const opacity = 1 - (this.scrollY / 500);
    headerText.style.opacity = opacity;
    headerArrow.style.opacity = opacity;
});















