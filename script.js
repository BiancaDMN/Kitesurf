const addSpotToggler = '#addSpotToggler';
const addSpot = document.querySelector(addSpotToggler);
const addSpotButton = document.querySelector('#addSpotButton');

addSpotButton.addEventListener('click', () => {

    setTimeout(() => {

        if(!addSpot.classList.contains('showAddSpot')) {

            addSpot.classList.add('showAddSpot');
        };

    }, 250);

});

document.addEventListener("click", (e) => {

    const isClosest = e.target.closest(addSpotToggler);
    
    if (!isClosest && addSpot.classList.contains('showAddSpot')) {
        
        addSpot.classList.remove('showAddSpot');

    };

}); 

const closeAddSpotFormButton = document.querySelector('#closeAddSpotFormButton');

closeAddSpotFormButton.addEventListener("click", () => {
    
    if (addSpot.classList.contains('showAddSpot')) {
        
        addSpot.classList.remove('showAddSpot');

    };

});

const favouriteSpotsToggler = '#favouriteSpotsToggler';
const favouriteSpots = document.querySelector(favouriteSpotsToggler);
const favouriteSpotsButton = document.querySelector('#favouriteSpotsButton');

favouriteSpotsButton.addEventListener('click', () => {

    setTimeout(() => {

        if(!favouriteSpots.classList.contains('showFavouriteSpots')) {

            favouriteSpots.classList.add('showFavouriteSpots');

        }

    }, 250);

});

document.addEventListener("click", (e) => {

    const isClosest = e.target.closest(favouriteSpotsToggler);
    
    if (!isClosest && favouriteSpots.classList.contains('showFavouriteSpots')) {
        
        favouriteSpots.classList.remove('showFavouriteSpots');

    };

});

const profileToggler = '#profileToggler';
const profile = document.querySelector(profileToggler);
const profileButton = document.querySelector('#profileButton');

profileButton.addEventListener('click', () => {

    setTimeout(() => {

        if(!profile.classList.contains('showProfile')) {

            profile.classList.add("showProfile");
        }
    }, 250);

});

document.addEventListener("click", (e) => {

    const isClosest = e.target.closest(profileToggler);
    
    if (!isClosest && profile.classList.contains("showProfile")) {
        
        profile.classList.remove("showProfile");

    };

});

var map = L.map('map').setView([53.0000, 9.0000], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {

    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

}).addTo(map);

var request = new XMLHttpRequest();

request.open('GET', 'https://5ddbb358041ac10014de140b.mockapi.io/spot', true);

request.onload = function (){

    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400){

        data.forEach(places =>{

            const marker = L.marker([places.lat, places.long]).addTo(map);
            // marker.setAttribute('id', 'marker');

            const markerElement = document.createElement('div');
            markerElement.setAttribute('id', 'places');
            
                const markerName = document.createElement('div');
                markerName.setAttribute('id', 'marker-name');
                markerName.textContent = places.name;

                const markerCountry = document.createElement('div');
                markerCountry.setAttribute('id', 'marker-country');
                markerCountry.textContent = places.country;

                const markerProbability = document.createElement('div');
                markerProbability.setAttribute('class', 'marker');
                markerProbability.innerHTML = `wind probability
                    <br>
                        <span id="marker-probability">${places.probability}%</span>`;

                const markerLatitude = document.createElement('div');
                markerLatitude.setAttribute('class', 'marker');
                markerLatitude.innerHTML = `latitude
                    <br>
                        <span id='marker-latitude'>${places.lat}&#176 N</span>`;

                const markerLongitude = document.createElement('div');
                markerLongitude.setAttribute('class', 'marker');
                markerLongitude.innerHTML = `longitude
                    <br>
                        <span id='marker-longitude'>${places.long}&#176 W</span>`;

                const markerWhen = document.createElement('div');
                markerWhen.setAttribute('class', 'marker');
                markerWhen.innerHTML = `when to go
                    <br>
                        <span id='marker-when'>${places.month}</span>`;
                    
                const addButton = document.createElement('button');
                addButton.setAttribute('class', 'btn btn-outline-warning')
                addButton.setAttribute('id', 'addButton');
                addButton.textContent = `Add to favourites`
                addButton.addEventListener('click' , (e) => {

                    addToFavourite(places, marker);
                });

            markerElement.appendChild(markerName);
            markerElement.appendChild(markerCountry);
            markerElement.appendChild(markerProbability);
            markerElement.appendChild(markerLatitude);
            markerElement.appendChild(markerLongitude);
            markerElement.appendChild(markerWhen);
            markerElement.appendChild(addButton);

            marker.bindPopup(markerElement);
        })
    }
}

request.send();

function submitNewMarker(){

    // var togglerSpot = document.getElementById('togglerSpot');
    var addSpotForm = document.getElementById('addSpotForm');
    var inputName = document.getElementById('inputName');
    var inputCountry = document.getElementById('inputCountry');
    var inputWind = document.getElementById('inputWind');
    var inputLatitude = document.getElementById('inputLatitude');
    var inputLongitude = document.getElementById('inputLongitude');
    var selectMonths = document.getElementById('selectMonths');

    if(inputName.value != '' && inputCountry.value != '' && inputWind.value != '' && inputLatitude.value != '' && inputLongitude.value != '' && selectMonths.value != 'Select month'){

        const marker = L.marker([inputLatitude.value, inputLongitude.value]).addTo(map);

        const addMarkerElement = document.createElement('div');
            
                const addMarkerName = document.createElement('div');
                addMarkerName.setAttribute('id', 'marker-name');
                addMarkerName.textContent = inputName.value;

                const addMarkerCountry = document.createElement('div');
                addMarkerCountry.setAttribute('id', 'marker-country');
                addMarkerCountry.textContent = inputCountry.value;

                const addMarkerProbability = document.createElement('div');
                addMarkerProbability.setAttribute('class', 'marker');
                addMarkerProbability.innerHTML = `wind probability
                    <br>
                        <span id="marker-probability">${inputWind.value}%</span>`;

                const addMarkerLatitude = document.createElement('div');
                addMarkerLatitude.setAttribute('class', 'marker');
                addMarkerLatitude.innerHTML = `latitude
                    <br>
                        <span id='marker-latitude'>${inputLatitude.value}&#176 N</span>`;

                const addMarkerLongitude = document.createElement('div');
                addMarkerLongitude.setAttribute('class', 'marker');
                addMarkerLongitude.innerHTML = `longitude
                    <br>
                        <span id='marker-longitude'>${inputLongitude.value}&#176 W</span>`;

                const addMarkerWhen = document.createElement('div');
                addMarkerWhen.setAttribute('class', 'marker');
                addMarkerWhen.innerHTML = `when to go
                    <br>
                        <span id='marker-when'>${selectMonths.value}</span>`;
                    
                const addMarkerButton = document.createElement('button');
                addMarkerButton.setAttribute('class', 'btn btn-outline-warning')
                addMarkerButton.setAttribute('id', 'addButton');
                addMarkerButton.textContent = `Add to favourites`
                addMarkerButton.addEventListener('click' , (e) => {

                    addToFavourite(places, marker);
                });

                addMarkerElement.appendChild(addMarkerName);
                addMarkerElement.appendChild(addMarkerCountry);
                addMarkerElement.appendChild(addMarkerProbability);
                addMarkerElement.appendChild(addMarkerLatitude);
                addMarkerElement.appendChild(addMarkerLongitude);
                addMarkerElement.appendChild(addMarkerWhen);
                addMarkerElement.appendChild(addMarkerButton);

        marker.bindPopup(addMarkerElement);

        addSpotForm.reset();
        // togglerSpot.remove();
        // togglerSpot.close();

        return false;


    } else { 

        if(inputName.value == ''){
            document.getElementById('nameValidation').textContent = 'Name is required!';
            return false;
        };

        if(inputCountry.value == ''){
            document.getElementById('countryValidation').textContent = 'Country is required!';
            return false;
        };
        
        if(inputWind.value == ''){
            document.getElementById('probabilityValidation').textContent = 'Probability is required!';
            return false;
        };
        
        if(inputLatitude.value == ''){
            document.getElementById('latitudeValidation').textContent = 'Latitude is required!';
            return false;
        };
        
        if(inputLongitude.value == ''){
            document.getElementById('logitudeValidation').textContent = 'Longitude is required!';
            return false;
        };
        
         if(selectMonths.value == 'default'){
            document.getElementById('monthValidation').textContent = 'Month is required!';
            return false;
        };
    };
    
};

function addToFavourite(places){

    var addButton = document.getElementById('addButton');
    addButton.setAttribute('class', 'btn btn-outline-info');
    addButton.textContent = 'Added to favourite';
    addButton.disabled = true;

    var noFavouriteSpots = document.getElementById('noFavouriteSpots'); 
    noFavouriteSpots.innerHTML = `<h3>Your favourite spot</h3>
    <table class='table'>

        <thead>

            <tr>
               <th scope='col'>Name</th>
               <th scope='col'>Country</th>
               <th scope='col'>Wind</th>
               <th scope='col'>Latitude</th>
               <th scope='col'>Longitude</th>
               <th scope='col'>When to go</th>
           <tr>

    </thead>
    
    </table>`;

    var favouriteSpots = document.getElementById('favouriteSpots') ;

    const spot = document.createElement('table');
    spot.setAttribute('class', 'table');
    spot.setAttribute('id', 'spot');

    const tbodySpot = document.createElement('tbody');

    const trSpot = document.createElement('tr');

    const nameSpot = document.createElement('th');
    nameSpot.setAttribute('scope', 'row');
    nameSpot.setAttribute('id', 'nameSpot')
    nameSpot.textContent = places.name;

    const countrySpot = document.createElement('td');
    countrySpot.textContent = places.country;
    countrySpot.setAttribute('id', 'countrySpot')

    const probabilitySpot = document.createElement('td');
    probabilitySpot.textContent = `${places.probability}%`;
    probabilitySpot.setAttribute('id', 'probabilitySpot')

    const latitudeSpot = document.createElement('td');
    latitudeSpot.innerHTML = `${places.lat}&#176 N`;
    latitudeSpot.setAttribute('id', 'latitudeSpot')

    const longitudeSpot = document.createElement('td');
    longitudeSpot.innerHTML = `${places.long}&#176 W`;
    longitudeSpot.setAttribute('id', 'longitudeSpot')

    const whenSpot = document.createElement('td');
    whenSpot.setAttribute('class', 'whenSpot');
    whenSpot.textContent = places.month;
    whenSpot.setAttribute('id', 'whenSpot')

    const removeSpotButton = document.createElement('button');
    removeSpotButton.setAttribute('class', 'btn btn-outline-danger');
    removeSpotButton.setAttribute('id', 'removeSpotButton');
    removeSpotButton.textContent = 'x';
    removeSpotButton.addEventListener('click', removeFromFavourite);
   
    favouriteSpots.appendChild(spot);
    spot.appendChild(tbodySpot);
    tbodySpot.appendChild(trSpot);
    trSpot.appendChild(nameSpot);
    trSpot.appendChild(countrySpot);
    trSpot.appendChild(probabilitySpot);
    trSpot.appendChild(latitudeSpot);
    trSpot.appendChild(longitudeSpot);
    trSpot.appendChild(whenSpot);
    whenSpot.appendChild(removeSpotButton);

    var favouriteSpotsPage = document.getElementsByClassName('favourite-spots-page')[0];
    favouriteSpotsPage.innerHTML = `
    <button class="btn btn-outline-danger" id="">Cancel</button>
    <button class="btn btn-outline-dark" onclick="goToFavouriteSpots()">Go to your Favourite Page</button>`;
    favouriteSpotsPage.style.paddingTop = '10px';
    favouriteSpotsPage.style.display = 'flex';
    favouriteSpotsPage.style.justifyContent = 'space-around';
    
}

function removeFromFavourite(){

    var spot = document.getElementById('spot');
    spot.remove();

    var removeFavourites = document.getElementById('addButton');
    removeFavourites.setAttribute('class', 'btn btn-outline-warning')
    removeFavourites.innerHTML = `Add to favourites`;
    removeFavourites.disabled = false;

    var favouriteSpots = document.getElementById('favouriteSpots');

    if(favouriteSpots.textContent == ''){

        var noFavouriteSpots = document.getElementById('noFavouriteSpots');
        noFavouriteSpots.innerHTML = `<h3>No favourite spot in your list</h3>`;

        var favouriteSpotsPage = document.getElementsByClassName('favourite-spots-page')[0];
        favouriteSpotsPage.style.display = 'none';

    }

};

function logout(){

    window.location.replace('login.html');

};

const menuToggler = '#menuToggler';
const menu = document.querySelector(menuToggler);
const optionsButton = document.querySelector('#optionsButton');

optionsButton.addEventListener('click', () => {

    setTimeout(() => {

        if(!menu.classList.contains('showMenu')) {

            menu.classList.add('showMenu');
        }
    }, 250);

});

document.addEventListener("click", (e) => {

    const isClosest = e.target.closest(menuToggler);
    
    if (!isClosest && menu.classList.contains('showMenu')) {
        
        menu.classList.remove('showMenu');

    };

}); 

const closeOptionButton = document.querySelector('#closeOptionButton');

closeOptionButton.addEventListener("click", () => {
    
    if (menu.classList.contains('showMenu')) {
        
        menu.classList.remove('showMenu');

    };


});

const mobileAddSpotToggler = document.querySelector('#mobileAddSpotToggler');

mobileAddSpotToggler.addEventListener('click', () => {

    setTimeout(() => {

        if(menu.classList.contains('showMenu') && !addSpot.classList.contains('showAddSpot')) {

            menu.classList.remove('showMenu');

            addSpot.classList.add('showAddSpot');
        };

    }, 250);

});

function goToFavouriteSpots(){

    window.location.replace('favouriteSpots.html');
};