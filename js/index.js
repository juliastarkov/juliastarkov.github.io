// Select needed elements and store as variables
const hamburger             = document.querySelector('.hamburger'),
      navMenu               = document.querySelector('.nav-menu');

// Functionality for burger menu
function burgerMenu() {
	this.classList.toggle('is-active');
	navMenu.classList.toggle('open');
}
hamburger.addEventListener('click', burgerMenu);

// Only Run JS Below for Start Page
if(document.querySelector('#main-header')) {
	const mainHeaderText     = document.querySelector('#main-header .title'),
          headerArrow        = document.querySelector('#main-header svg'),
          navBtns            = [...document.querySelectorAll('.nav-links a')],
          // Get each content section's height for smooth scroll functionality
          mainHeaderHeight   = document.getElementById('main-header').offsetHeight,
          featuredWorkHeight = document.getElementById('work').offsetHeight,
          aboutHeight        = document.getElementById('about').offsetHeight,
          contactHeight      = document.getElementById('contact').offsetHeight;
	// Smooth Scrolling Nav Buttons
	// https://gist.github.com/andjosh/6764939
	function scrollTo(element, to, duration) {
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

	// Removes 'active' class from all nav-link and adds to clicked link
	function changeActiveNav(thisNav) {
		navBtns.forEach(nav => {
			nav.classList.remove('active');
		})
		thisNav.classList.add('active');
	}

	// For each nav link, find the corresponding content's position on page and assign to node object
	// 'Smooth Scroll' to position on page when nav-link is clicked
	navBtns.forEach((nav, i) => {
		const id = nav.textContent.toLowerCase();
		// Assign corresponding element to node object
		nav.el = document.getElementById(id);
		// Find positon of corresponding content on page and assign to node object	  
		nav.position = (nav.el.offsetTop - document.body.scrollTop);
		nav.addEventListener('click', function(e) {
			e.preventDefault();
			// Remove active class from all nav-links and assign to clicked nav-link
			changeActiveNav(this);
			// Scroll to content
			scrollTo(document.documentElement, nav.position, 750);
		})
	})

	//////////////////////////////////////////////////////////
	// REFACTOR THE NAVBAR SCROLL 'ACTIVE CLASS' CODE BELOW
	// IT WORKS BUT VERY UGLY...
	//////////////////////////////////////////////////////////
	// Handles scroll functionality
	window.addEventListener('scroll', function() {
		// Fades the main-header text and svg arrow
		const opacity = 1 - (this.scrollY / 500);
	    mainHeaderText.style.opacity = opacity;
	    headerArrow.style.opacity = opacity;

	    // VERY HACKY WAY TO HANDLE NAVBAR SCROLLING ACTIVE CLASSES 
	    // MAKE IT PRETTY!!
	    // Follow pattern to add another section
	    // '- 70' allows the scroll to go past the nav height
	    if(document.documentElement.scrollTop <= mainHeaderHeight - 70) {
	    	changeActiveNav(navBtns[0]);
	    } else if(document.documentElement.scrollTop <= (mainHeaderHeight + featuredWorkHeight - 70)) {
	    	changeActiveNav(navBtns[1]);
	    } else if(document.documentElement.scrollTop <= (mainHeaderHeight + featuredWorkHeight + aboutHeight - 70)) {
	    	changeActiveNav(navBtns[2]);
	    } else {
	    	changeActiveNav(navBtns[3]);
	    }
	});
}















