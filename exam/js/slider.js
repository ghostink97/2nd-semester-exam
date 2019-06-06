// Used in one of the past projects ( Huset )

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

            // If it's a carousel event
            if (event.carousel == 1) {

                const clone = carouselItem.cloneNode(true);

                const carouselImage = clone.querySelector(".carousel-image");
                const carouselTitle = clone.querySelector(".carousel-title");
                const carouselAddress = clone.querySelector(".carousel-address");

                carouselImage.src = event.slider_image.guid;
                carouselTitle.innerHTML = event.news_title;

                let start_dateFrom;

                if (event.start_date !== '0000-00-00') {
                    start_dateFrom = ' from ' + event.start_date;
                } else {
                    start_dateFrom = '';
                }

                let end_date;
                if (event.end_date !== '0000-00-00') {
                    end_date = ' until ' + event.end_date;
                } else {
                    end_date = '';
                }

                let start_time;
                if (event.start_time.length > 1) {
                    start_time = ' from ' + event.start_time;
                } else {
                    start_time = '';
                }
                let end_time;
                if (event.end_time.length > 1) {
                    end_time = ' until ' + event.end_time;
                } else {
                    end_time = '';
                }

                let comma;
                if (start_time.length > 1) {
                    comma = ', ';
                } else {
                    comma = '';
                }

                clone.querySelector(".carousel-date").textContent = `Opening: ` + `${start_dateFrom}` + `${end_date}` + `${comma}` + `${start_time}` + `${end_time}`;
                carouselAddress.innerHTML = "Address: " + event.news_address;

                carousel.appendChild(clone);
            }

            // If it's not a carousel event 
            if (event.carousel == 0) {

            }

        }

    });
    doCarousel();
}

function doCarousel() {
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

    window.plusSlides = function (n) {

        showSlides(slideIndex += n);
    }

    window.currentSlide = function (n) {
        showSlides(slideIndex = n);

    }
}


function showSlides(n) {
    var j;
    let dots = document.getElementsByClassName("dot");
    let slides = document.querySelectorAll(".mySlides");

    let arraySlides = [...slides];


    if (n === arraySlides.length) {
        n = 0;
        slideIndex = 0;
    }

    if (n < 0) {
        n = arraySlides.length - 1;
        slideIndex = arraySlides.length - 1;
    }

    for (j = 0; j < arraySlides.length; j++) {
        arraySlides[j].style.display = "none";
    }
    for (j = 0; j < dots.length; j++) {
        dots[j].className = dots[j].className.replace(" active", "");
    }

    arraySlides[n].style.display = "block";
    dots[n].className += " active";
}