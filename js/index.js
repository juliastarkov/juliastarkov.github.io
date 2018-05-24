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

function changeActiveNav(thisNav) {
	navBtns.forEach(nav => {
		nav.classList.remove('active');
	})
	// nav - link styles as 'active'
	thisNav.classList.add('active');
}

// For each nav link, find the corresponding content's position on page and assign to node object
// 'Smooth Scroll' to position on page when nav-link is clicked
navBtns.forEach(nav => {
	const id    = nav.textContent.toLowerCase();
	// Assign corresponding element to node
	nav.el = document.getElementById(id);
	// Find positon of corresponding content on page and assign to node	  
	nav.position = (nav.el.offsetTop - document.body.scrollTop);
	nav.addEventListener('click', function(e) {
		e.preventDefault();
		// Remove active class from all navs
		changeActiveNav(this);
		// Scroll to content
		scrollTo(document.documentElement, nav.position);
	})
})

// Handles click functionality on burger menu
hamburger.addEventListener('click', burgerMenu);

// SUPER HACKY SELECTING FOR NAVBAR SCROLLING ACTIVE CLASSES
const nav1 = navBtns[0];
const nav2 = navBtns[1];
const nav3 = navBtns[2];
const nav4 = navBtns[3];
const header = document.getElementById('header').offsetHeight;
const work = document.getElementById('work').offsetHeight;
const about = document.getElementById('about').offsetHeight;
const contact = document.getElementById('contact').offsetHeight;

window.addEventListener('scroll', function() {
	// Fades the main-header text and svg arrow when user scrollbars.
	const opacity = 1 - (this.scrollY / 500);
    headerText.style.opacity = opacity;
    headerArrow.style.opacity = opacity;

    // VERY HACKY WAY TO HANDLE NAVBAR SCROLLING ACTIVE CLASSES 
    // MAKE IT PRETTY!!
    if(document.documentElement.scrollTop <= header - 70) {
    	changeActiveNav(nav1);
    } else if(document.documentElement.scrollTop <= (header + work - 70)) {
    	changeActiveNav(nav2);
    } else if(document.documentElement.scrollTop <= (header + work + about - 70)) {
    	changeActiveNav(nav3);
    } else {
    	changeActiveNav(nav4);
    }
});















