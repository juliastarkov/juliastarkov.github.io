// Open the Modal
function openModal() {
    document.getElementById('myModal').style.display = "block";
    slideTarget = "myModalSlides"
}

// Close the Modal
function closeModal() {
        document.getElementById('myModal').style.display = "none";
        slideTarget = "mySlides"
}

var slideIndex = 1;
var slideTarget = "mySlides";
showSlides(slideIndex);


function plusSlides(n) {
        showSlides(slideIndex += n);
}

function currentSlide(n) {
        showSlides(slideIndex = n);
}

function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName(slideTarget);
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1};    
        if (n < 1) {slideIndex = slides.length};
        for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";  
        }
        slides[slideIndex-1].style.display = "block";  
}