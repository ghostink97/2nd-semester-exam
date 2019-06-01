let modal = document.querySelector("#modal");

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
//used in previous projects

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

        clone.querySelector(".details").addEventListener("click", () => {
          fetch(productLink + "products/" + product.id + "?_embed").then(e => e.json()).then(data => (showDetails(data)));
      });

        main.appendChild(clone);
    })
}

//show details into the modal
function showDetails(product){
  modal.querySelector("h1").textContent=product.product_title;
  modal.querySelector("#pic").src=product.product_image.guid;
  modal.querySelector("#productPrice").textContent=product.product_price + " kr.";

  if(product.product_measure){
    modal.querySelector("#measure").textContent="Height: "+product.product_measure;
  }
  
  if(product.product_material){
    modal.querySelector("#material").textContent="Materials: "+product.product_material;
  }
  
  modal.querySelector("#description").textContent=product.product_description;
  modal.querySelector("button").href=product.product_etsy;

  modal.classList.remove("hide");
}

modal.querySelector("#cross").addEventListener("click", function () {
  modal.classList.add("hide");
});