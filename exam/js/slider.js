//////// Slider JS 

let endpoint = "http://wp.quickcocktails.dk/wp-json/wp/v2/news?_embed";

const carouselItem = document.querySelector("#carousel-item").content;
const carousel = document.querySelector("#carousel");
const carouselDots = document.querySelector("#dots");
let slideIndex = 0;

  

loadData(endpoint);

function loadData(fetchURL) {
    fetch(fetchURL).then(e => e.json()).then(data => show(data));
}

function show(events) {
    events.forEach(event => {

        if (event) {

            // If it's carousel event
            if (event.carousel == 1) {
                
                const clone = carouselItem.cloneNode(true);

                const carouselImage = clone.querySelector(".carousel-image");
                const carouselTitle = clone.querySelector(".carousel-title");

                carouselImage.src = event.news_image.guid;

                carouselTitle.innerHTML = event.news_title;             
            
                carousel.appendChild(clone);
            }

            // If it's not a carousel event 
            if (event.carousel == 0) {

            }
            
        }

    });
    doCarousel();
}

function doCarousel(){
    const carouselSlides = document.querySelectorAll(".mySlides");
    if (carouselSlides != 0) {
        // Next & Previous Buttons on the Carousel
        let nextArrow = document.createElement("a");
        let previousArrow = document.createElement("a");
        nextArrow.classList.add("next");
        previousArrow.classList.add("prev");
        nextArrow.setAttribute("onclick", "plusSlides(1)");
        previousArrow.setAttribute("onclick", "plusSlides(-1)");
        nextArrow.innerHTML = "&#10095;";
        previousArrow.innerHTML = "&#10094;";
        carousel.appendChild(previousArrow);
        carousel.appendChild(nextArrow);


        for (i = 0; i < carouselSlides.length; i++) {
            let carouselDot = document.createElement("span");
            carouselDot.classList.add("dot");
            carouselDot.setAttribute("onclick", "currentSlide(" + (i) + ")");
            carouselDots.appendChild(carouselDot);
        }
    }

    showSlides(slideIndex);

     window.plusSlides = function(n) {
        
         showSlides(slideIndex += n);
     }

     window.currentSlide = function(n) {
         console.log(n);
         showSlides(slideIndex = n);

     }
}
   

 function showSlides(n) {
    console.log(n);
    var j;
    let dots = document.getElementsByClassName("dot");
    let slides = document.querySelectorAll(".mySlides");

    let arraySlides = [...slides];


    if (n === arraySlides.length) {
        n = 0;
        slideIndex = 0;
    }

   if (n < 0) {
       n =  arraySlides.length  -1;
    slideIndex = arraySlides.length  -1;
    }

    for (j = 0; j < arraySlides.length; j++) {
        arraySlides[j].style.display = "none";
    }
    for (j = 0; j < dots.length; j++) {
        dots[j].className = dots[j].className.replace(" active", "");
    }

    console.log(arraySlides, n);

    arraySlides[n].style.display = "block";
    dots[n].className += " active";
}                   
