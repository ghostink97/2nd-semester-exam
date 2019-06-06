const template = document.querySelector("#template").content;
let eventList = document.querySelector("#eventsList");
let page = 1;
let lookingForData = false;

function fetchEvents() {
    lookingForData = true;

    let endpoint = "http://wp.quickcocktails.dk/wp-json/wp/v2/news?_embed&per_page=2&page=" + page;

    fetch(endpoint)
        .then(e => e.json())
        .then(showEvents).catch((error) => {
            lookingForData = true;
        });


}

function showEvents(data) {
    if (data && data.code && data.code === 'rest_post_invalid_page_number') {
        lookingForData = true;

    } else {
        data.forEach(showSingleEvent);
    }


}

function showSingleEvent(anEvent) {
    let clone = template.cloneNode(true);

    clone.querySelector("#eventimg").setAttribute("src", anEvent.news_image.guid);
    clone.querySelector("#news-title").textContent = anEvent.news_title;
    clone.querySelector("#address").textContent = "Address: " + anEvent.news_address;

    let start_dateFrom;
    
    if (anEvent.start_date !== '0000-00-00') {
        start_dateFrom = ' from ' + anEvent.start_date;
    } else {
        start_dateFrom = '';
    }

    let end_date;
    if (anEvent.end_date !== '0000-00-00') {
        end_date = ' until ' + anEvent.end_date;
    } else {
        end_date = '';
    }

    let start_time;
    if (anEvent.start_time.length > 1) {
        start_time = ' from ' + anEvent.start_time.slice(0, -3);
    } else {
        start_time = '';
    }

    let end_time;
    if (anEvent.end_time.length > 1) {
        end_time = ' until ' + anEvent.end_time.slice(0, -3);
    } else {
        end_time = '';
    }

    let comma;
    if (start_time.length > 1) {
        comma = ', ';
    } else {
        comma = '';
    }

    clone.querySelector("#date").textContent = `Opening: ` + `${start_dateFrom}` + `${end_date}` + `${comma}` + `${start_time}` + `${end_time}`;
    clone.querySelector("#description").textContent = anEvent.news_description;

    eventList.appendChild(clone);
    lookingForData = false;

}

fetchEvents();


// found this stuff online
setInterval(function () {
    if (showMore() && lookingForData === false) {
        page++;
        fetchEvents();
    }
}, 1000)

function showMore() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        return true;
    } else {
        return false;
    }
};