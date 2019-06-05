// Mobile navigation

const mq = window.matchMedia("(max-width: 719px)");

if (mq.matches) {
    const mobile = document.getElementsByClassName("container");
    const subMenu = document.querySelectorAll(".submenu-Mobile");
    const dropSubmenu = document.querySelectorAll(".drop-submenu");


    for (let i = 0; i < dropSubmenu.length; i++) {
        dropSubmenu[i].addEventListener('click', function () {
            subMenu[i].classList.toggle("display-block");
        });
    }
}


// Used  in previous projects
// Inspired by  www.w3schools.com

function openMobileNav() {
    document.getElementById("mobileNav").style.width = "100%";
}

function closeMobileNav() {
    document.getElementById("mobileNav").style.width = "0%";
}


// Used  in previous project
// Scroll down more then 25px - see the button
window.onscroll = function () {
    scroll()
};

function scroll() {
    if (document.documentElement.scrollTop > 25) {
        document.getElementById("topBtn").style.display = "block";
    } else {
        document.getElementById("topBtn").style.display = "none";
    }
}


// Click the button - come back on the top of the page
function btnTopFunction() {
    document.documentElement.scrollTop = 0;
}

//logo on desktop
document.querySelector(".unicorn-logo").addEventListener("click", function(){
    window.open("index.html", "_self");
});