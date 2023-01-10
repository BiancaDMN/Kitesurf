function addSpotDropdownButton(){

    document.getElementById('dropdownAddSpot').classList.toggle('showAddSpot');
}

function favouriteDropdownButton(){
    
    document.getElementById('dropdownFavourite').classList.toggle('showFavourite');

};

function profileDropdownButton(){

    document.getElementById('dropdownProfile').classList.toggle('showProfile');
}

var map = L.map('map').setView([53.0000, 9.0000], 4);


var wmsLayer = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
    layers: 'TOPO-OSM-WMS'
}).addTo(map);

var basemaps = {
    Topography: L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'TOPO-WMS'
    }),

    Places: L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'OSM-Overlay-WMS'
    }),

    'Topography, then places': L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'TOPO-WMS,OSM-Overlay-WMS'
    }),

    'Places, then topography': L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'OSM-Overlay-WMS,TOPO-WMS'
    })
};

L.control.layers(basemaps).addTo(map);

basemaps.Topography.addTo(map);

var request = new XMLHttpRequest();

request.open('GET', 'https://5ddbb358041ac10014de140b.mockapi.io/spot', true);

request.onload = function () {

    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400){

        data.forEach(places => {

            const marker = L.marker([places.lat, places.long]).addTo(map);

            const markerElement = document.createElement('div');
            markerElement.setAttribute('id', 'markerElement');
            
                const placesName = document.createElement('div');
                placesName.setAttribute('id', 'placesName');
                placesName.textContent = places.name;

                const placesCountry = document.createElement('div');
                placesCountry.setAttribute('id', 'placesCountry');
                placesCountry.textContent = places.country;

                const placesProbability = document.createElement('div');
                placesProbability.setAttribute('id', 'placesProbability');
                placesProbability.innerHTML = `wind probability
                    <br>
                        <span id='probability'>${places.probability}%</span>`;

                const placesLatitude = document.createElement('div');
                placesLatitude.setAttribute('id', 'placesLatitude');
                placesLatitude.innerHTML = `latitude
                    <br>
                        <span id='latitude'>${places.lat}&#176 N</span>`;

                const placesLongitude = document.createElement('div');
                placesLongitude.setAttribute('id', 'placesLongitude');
                placesLongitude.innerHTML = `longitude
                    <br>
                        <span id='longitude'>${places.long}&#176 W</span>`;

                const placesMonth = document.createElement('div');
                placesMonth.setAttribute('id', 'placesMonth');
                placesMonth.innerHTML = `when to go
                    <br>
                        <span id='month'>${places.month}</span>`;
                    
                const addButton = document.createElement('button');
                addButton.setAttribute('id', 'addButton');
                addButton.textContent = `+ add to favourites`
                addButton.addEventListener('click' , (e) => {

                    addToFavourite(places, marker);
                });

            markerElement.appendChild(placesName);
            markerElement.appendChild(placesCountry);
            markerElement.appendChild(placesProbability);
            markerElement.appendChild(placesLatitude);
            markerElement.appendChild(placesLongitude);
            markerElement.appendChild(placesMonth);
            markerElement.appendChild(addButton);

            marker.bindPopup(markerElement);

            var table = document.getElementsByClassName('table')[0];

            const tbody = document.createElement('tbody');
        
            tbody.innerHTML = `<tr>
                <th style='padding: 8px;'>${places.name}</th>
                    <td style='padding: 8px;'>${places.country}</td>
                    <td style='padding: 8px;'>${places.lat}</td>
                    <td style='padding: 8px;'>${places.long}</td>
                    <td style='padding: 8px;'>${places.probability}%</td>
                    <td style='padding: 8px;'>${places.month}</td>
            </tr>`;
            
            table.appendChild(tbody);
            
        });

    }; 

};

request.send();

function submitSpot(){

    var addName = document.getElementById('addName').value;
    var addCountry = document.getElementById('addCountry').value;
    var addWind = document.getElementById('addWind').value;
    var addLatitude = document.getElementById('addLatitude').value;
    var addLongitude = document.getElementById('addLongitude').value;
    var selectMonths = document.getElementById('selectMonths').value;

    var newMarker = {addName, addCountry, addWind, addLatitude, addLongitude, selectMonths}

    const marker = L.marker([newMarker.addLatitude, newMarker.addLongitude]).addTo(map);

    const markerElement = document.createElement('div');
    markerElement.setAttribute('id', 'markerElement');
            
        const placesName = document.createElement('div');
        placesName.setAttribute('id', 'placesName');
        placesName.textContent = newMarker.addName;

        const placesCountry = document.createElement('div');
        placesCountry.setAttribute('id', 'placesCountry');
        placesCountry.textContent = newMarker.addCountry;

        const placesProbability = document.createElement('div');
        placesProbability.setAttribute('id', 'placesProbability');
        placesProbability.innerHTML = `wind probability
            <br>
                <span id='probability'>${newMarker.addWind}%</span>`;

        const placesLatitude = document.createElement('div');
        placesLatitude.setAttribute('id', 'placesLatitude');
        placesLatitude.innerHTML = `latitude
            <br>
                <span id='latitude'>${newMarker.addLatitude}&#176 N</span>`;

        const placesLongitude = document.createElement('div');
        placesLongitude.setAttribute('id', 'placesLongitude');
        placesLongitude.innerHTML = `longitude
            <br>
                <span id='longitude'>${newMarker.addLongitude}&#176 W</span>`;

        const placesMonth = document.createElement('div');
        placesMonth.setAttribute('id', 'placesMonth');
        placesMonth.innerHTML = `when to go
            <br>
                <span id='month'>${newMarker.selectMonths}</span>`;
                    
        const addButton = document.createElement('button');
        addButton.setAttribute('id', 'addButton');
        addButton.textContent = `+ add to favourites`
        addButton.addEventListener('click' , (e) => {

            addToFavourite(newMarker, marker);
        });

        markerElement.appendChild(placesName);
        markerElement.appendChild(placesCountry);
        markerElement.appendChild(placesProbability);
        markerElement.appendChild(placesLatitude);
        markerElement.appendChild(placesLongitude);
        markerElement.appendChild(placesMonth);
        markerElement.appendChild(addButton);

        marker.bindPopup(markerElement);

        var spotForm = document.getElementById('spotForm');
        spotForm.reset();
        
}

function addToFavourite(places, parentElement){

    var favouriteTitle = document.getElementsByClassName('favouriteTitle')[0];
    favouriteTitle.innerHTML = `<h3>Your favourite spot</h3>
        <br>
        <table class='favouritesTable'>
            <thead>
                <th>
                    <div id='favouriteTableElement'>Name</div>
                </th>
                <th>
                    <div id='favouriteTableElement'>Country</div>
                </th>
                <th>
                    <div id='favouriteTableElement'>Wind Prob</div>
                </th>
                <th>
                    <div id='favouriteTableElement'>Latitude </div>
                </th>
                <th>
                    <div id='favouriteTableElement'>Longitude</div>
                </th>
                <th>
                    <div id='favouriteTableElement'>When to go</div>
                </th>
            </thead>
        </table>
        <hr>`;

    var favouriteSpots = document.getElementsByClassName('favouriteSpots')[0];

        const spot = document.createElement('div');
        spot.setAttribute('class', 'spot');

        const spotName = document.createElement('div');
        spotName.setAttribute('id', 'spotName')
        spotName.textContent = places.name;

        const spotCountry = document.createElement('div');
        spotCountry.setAttribute('id', 'spotCountry');
        spotCountry.textContent = places.country;

        const spotProbability = document.createElement('div');
        spotProbability.setAttribute('id', 'spotProbability');
        spotProbability.textContent = `${places.probability}%`;

        const spotLatitude = document.createElement('div');
        spotLatitude.setAttribute('id', 'spotLatitude');
        spotLatitude.innerHTML = `${places.lat}&#176 N`;

        const spotLongitude = document.createElement('div');
        spotLongitude.setAttribute('id', 'spotLongitude');
        spotLongitude.innerHTML = `${places.long}&#176 W`;

        const spotMonth = document.createElement('div');
        spotMonth.setAttribute('id', 'spotMonth');
        spotMonth.textContent = places.month;

        const removeButton = document.createElement('button');
        // removeButton.setAttribute('class', 'btn-danger');
        removeButton.setAttribute('id', 'removeButton');
        removeButton.textContent = `x`;
        removeButton.addEventListener('click', (e) => {

            removeFromFavourite(places, spot);
        })

    favouriteSpots.appendChild(spot);
    spot.appendChild(spotName);
    spot.appendChild(spotCountry);
    spot.appendChild(spotProbability);
    spot.appendChild(spotLatitude);
    spot.appendChild(spotLongitude);
    spot.appendChild(spotMonth);
    spotMonth.appendChild(removeButton);

    var addFavourites = document.getElementById('addButton');
    addFavourites.innerHTML = `spot added to favourites`;
    // addFavourites.style.backgroundColor = `black`;
    // addFavourites.style.borderColor = `black`;
    addFavourites.innerHTML = `- remove from favourites`;
    addFavourites.style.backgroundColor = `#dc3545`;
    addFavourites.style.borderColor = `#dc3545`;
    // addFavourites.addEventListener('click' , (e) =>{

    //     removeButtonChangeFunction(places, spot);
        
    // });

    var favouriteSpotsNewIndex = document.getElementsByClassName('favouriteSpotsNewIndex')[0];
    favouriteSpotsNewIndex.innerHTML = `<a id="favouriteSpotsIndex" href="favouriteSpots.html">Go to your list</a>`;
    favouriteSpotsNewIndex.style.border = `1px solid black`;
    favouriteSpotsNewIndex.style.backgroundColor = `black`;
    favouriteSpotsNewIndex.style.fontSize = `15px`;
    favouriteSpotsNewIndex.style.padding = `6px 12px 6px 12px`;
    favouriteSpotsNewIndex.style.textAlign = `center`;

}

function removeFromFavourite(places, parentElement){

    parentElement.remove();

    var removeFavourites = document.getElementById('addButton');
    removeFavourites.innerHTML = `+ add to favourites`;
    removeFavourites.style.backgroundColor = `#d6ce3a`;
    removeFavourites.style.borderColor = `#d6ce3a`;


    if (removeFromFavourite){

        var favouriteDropdown = document.getElementsByClassName('favouriteDropdown');
        
        var spot = document.getElementsByClassName('spot');

        var spots = 0;

       for(spots = 0; spots = spot.length; i++){

        var spotContainer = spot [spots];

       }

        var updatefavouriteTitle = document.getElementsByClassName('favouriteTitle')[0];
        updatefavouriteTitle.innerHTML = `<h3>No favourite spot in your list</h3>`;

        var updateFavouriteSpotsNewIndex = document.getElementsByClassName('favouriteSpotsNewIndex')[0];
        updateFavouriteSpotsNewIndex.textContent = ``;
        updateFavouriteSpotsNewIndex.style.border = `none`;
        updateFavouriteSpotsNewIndex.style.backgroundColor = `#F5F5F5`;

        favouriteDropdown.appendChild(updatefavouriteTitle);
        favouriteDropdown.appendChild(updateFavouriteSpotsNewIndex);

    }

};

function search(){

    var input, filter, table, tr, th, i, txtValue;

    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    table = document.getElementById('table');
    tr = document.getElementsByTagName('tr');
    th = document.getElementsByTagName('th');

    for (i = 0; i < tr.length; i++){

        th = tr[i].getElementsByTagName('th')[0];
        txtValue = th.txtContent || th.innerText;

        if(txtValue.toUpperCase().indexOf(filter) > -1){

            tr[i].style.display = "";

        } else {

            tr[i].style.display = "none";
        }

    }
};