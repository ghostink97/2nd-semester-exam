// Used  in previous projects
// Inspired by  www.w3schools.com

function openMobileNav() {
  document.getElementById("mobileNav").style.width = "100%";
}

function closeMobileNav() {
  document.getElementById("mobileNav").style.width = "0%";
}


// Used  in previous projects
// Scroll down more then 25px - see the button
window.onscroll = function() {scroll()};

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
