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

            marker.bindPopup(`<div id='marker'>
                <div id='placesName'>${places.name}</div>
                <div id='placesCountry'>${places.country}</div>
                <br><br>
                <div id='placesProbability'>WIND PROBABILITY
                    <br>
                    <span id='probability'>${places.probability}%</span>
                </div>
                <br>
                <div id='placesLatitude'>LATITUDE
                    <br>
                    <span id='latitude'>${places.lat}&#176 N</span>
                </div>
                <br>
                <div id='placesLongitude'>LONGITUDE
                    <br>
                    <span id='longitude'>${places.long}&#176 W</span>
                </div>
                <br>
                <div id='placesMonth'>WHEN TO GO
                    <br>
                    <span id='month'>${places.month}</span>
                </div>
                <br>
            </div>
                <div>
                    <button id="addRemoveButton" onclick="addToFavourite()">+ ADD TO FAVOURITES</button>
                </div>`);

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

/*function addToFavourite(){

    var title = document.getElementById('title');
    title.innerHTML=`<h3>Your favourite spot</h3>
        <br>
        <table>
            <thead>
                <tr id='trFavourites'>
                    <th>
                        <div>Name</div>
                    </th>
                    <th>
                        <div>Country</div>
                    </th>
                    <th>
                        <div>Wind Prob</div>
                    </th>
                    <th>
                        <div>Latitude</div>
                    </th>
                    <th>
                        <div>Longitude</div>
                    </th>
                    <th>
                        <div>When to go</div>
                    </th>
                </tr>
            </thead>
        </table>`;

    var clonedSpots = document.getElementsByClassName('clonedSpots')[0];

        const tableTbody= document.createElement('tbody');
        tableTbody.setAttribute('id', 'tableTbody')

        const tr = document.createElement('tr');

        const tdNameElement = document.createElement('td');

        const nameElement = document.createElement('div');
        nameElement.setAttribute('id', 'nameElement');

        const tdCountryElement = document.createElement('td');

        const countryElement = document.createElement('div');
        countryElement.setAttribute('id', 'countryElement');

        const tdProbabilityElement = document.createElement('td');

        const probabilityElement = document.createElement('div');
        probabilityElement.setAttribute('id', 'probabilityElement');

        const tdLatitudeElement = document.createElement('td');

        const latitudeElement = document.createElement('div');
        latitudeElement.setAttribute('id', 'latitudeElement');

        const tdLongitudeElement = document.createElement('td');

        const longitudeElement = document.createElement('div');
        longitudeElement.setAttribute('id', 'longitudeElement');

        const tdMonthElement = document.createElement('td');

        const monthElement = document.createElement('div');
        monthElement.setAttribute('id', 'monthElement');

    clonedSpots.appendChild(tableTbody);
    tableTbody.appendChild(tr);
    tr.appendChild(tdNameElement);
    tdNameElement.appendChild(nameElement);
    tr.appendChild(tdCountryElement);
    tdCountryElement.appendChild(countryElement);
    tr.appendChild(tdProbabilityElement);
    tdProbabilityElement.appendChild(probabilityElement);
    tr.appendChild(tdLatitudeElement);
    tdLatitudeElement.appendChild(latitudeElement);
    tr.appendChild(tdLongitudeElement);
    tdLongitudeElement.appendChild(longitudeElement);
    tr.appendChild(tdMonthElement);
    tdMonthElement.appendChild(monthElement);

    $('#placesName').clone().appendTo('#nameElement');
    $('#placesCountry').clone().appendTo('#countryElement');
    $('#probability').clone().appendTo('#probabilityElement');
    $('#latitude').clone().appendTo('#latitudeElement');
    $('#longitude').clone().appendTo('#longitudeElement');
    $('#month').clone().appendTo('#monthElement');

    var addFavourites = document.getElementById('addRemoveButton');
    addFavourites.innerHTML = `- REMOVE FROM FAVOURITES`;
    addFavourites.style.backgroundColor = 'rgba(255, 4, 0, 0.925)';

}*/

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
}