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
//product list

const template = document.querySelector("#template").content;
const main=document.querySelector("#products");
const pageCats=document.querySelector("#pageCats");
const urlParms=new URLSearchParams(window.location.search);
const productLink="http://wp.quickcocktails.dk/wp-json/wp/v2/";
const catID=urlParms.get("cat");

function findCats(){
    fetch(productLink+"categories").then(e=>e.json()).then(buildCats);
    
}

findCats()

if (catID) {
    loadByCats(catID)
} else {
    loadAllThings()
}

function buildCats(cats){
    cats.forEach(cat => {
        const newLink=document.createElement("a");
        newLink.textContent=cat.name;
        newLink.href="?cat="+cat.id;
        pageCats.appendChild(newLink);
    })
}

function loadByCats(cat){
    fetch(productLink+"products?categories="+cat+"&_embed").then(e=>e.json()).then(show);
}

function loadAllThings(){
    fetch(productLink+"products?_embed").then(e=>e.json()).then(show);
}

function show(products){
    products.forEach(product => {
        console.log(product)
        const clone=template.cloneNode(true);
        clone.querySelector(".prodimg").src = product.product_image.guid;
        clone.querySelector(".prodtitle").textContent = product.product_title;
        clone.querySelector(".price").textContent = product.product_price + " kr.";
        clone.querySelector(".etsy").href = product.product_etsy;
        main.appendChild(clone);
    })
}