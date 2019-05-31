const template = document.querySelector("#template").content;
let eventList = document.querySelector("#eventsList");
let page = 1;
let lookingForData = false;

function fetchEvents() {
    lookingForData = true;

    let endpoint = "http://wp.quickcocktails.dk/wp-json/wp/v2/news?_embed&per_page=2&page=" + page;
    
    fetch(endpoint)
        .then(e => e.json())
        .then(showEvents);
}

function showEvents(data) {
    console.log(data)
    lookingForData = false;
    data.forEach(showSingleEvent);
}

function showSingleEvent(anEvent) {
    let clone = template.cloneNode(true);
    
    console.log(anEvent); 
    
    clone.querySelector("#eventimg").setAttribute("src", anEvent.news_image.guid);
    clone.querySelector("#title").textContent = anEvent.news_title;
    clone.querySelector("#adress").textContent = "Adress: " + anEvent.news_adress;
    clone.querySelector("#date").textContent = "Opening: " + anEvent.news_date + ", " + " from " + anEvent.start_time + " to " + anEvent.end_time;
    clone.querySelector("#description").textContent = anEvent.news_description;
    
    
    eventList.appendChild(clone);
 
}

fetchEvents();


//found this stuff online
setInterval(function () {

    if (showMore() && lookingForData === false) {
        console.log("We've reached rock bottom, fetching articles")
        page++;
        fetchEvents();
    }
}, 1000)

function showMore() {
    const scrollY = window.scrollY
    const visible = document.documentElement.clientHeight
    const pageHeight = document.documentElement.scrollHeight
    const bottomOfPage = visible + scrollY >= pageHeight
    return bottomOfPage || pageHeight < visible
}