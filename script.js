var map = L.map('map').setView([0, 0], 1);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
Esri_WorldImagery.addTo(map);

var cN = []
for (const feature of countries.features) {
  cN.push(feature.properties.ADMIN);
}

var cLay = L.geoJSON(countries, {
  style: function(feature) {
    return {
      fillColor: getRandomColor(), 
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.6
    };
  },
  onEachFeature: function(feature, layer) {
    layer.on({
      click: function(e) {
        const previousZoom = map.getZoom(); 

        map.fitBounds(e.target.getBounds());

        // Create a popup with buttons
        const popupContent = `
          <p><b>IS THIS IT?</b></p> 
          <button id="chooseButton">Choose</button> 
          <button id="goBackButton">Go Back</button>
        `;

        layer.bindPopup(popupContent).openPopup();

        const chooseButton = document.getElementById('chooseButton');
        const goBackButton = document.getElementById('goBackButton');

        chooseButton.onclick = function() {
          
          if (ranCN === feature.properties.ADMIN) {
                message = "Yes";
                countNum('win')
                var gifUrl = 'https://bestanimations.com/media/fireworks2/367172827red-green-firework-explosions.gif'; 

                showTemporaryGIF(gifUrl, 7)
          } else if (typeof ranCN === "undefined") {
            message = "At least Shuffle first, idiot!!!";
            var gifUrl = 'https://c.tenor.com/-isbpihSHoQAAAAd/idiot-stupid.gif'; 

            showTemporaryGIF(gifUrl, 7)
          
          } else {
            message = "No";
            countNum('lose')
            var gifUrl = 'https://gifdb.com/images/high/tongue-out-teasing-playful-goofy-bear-fart-hjx2tcoixrtq09vi.gif'; 

            showTemporaryGIF(gifUrl, 4.8)
          }

          // Append the h3 element to the map container (assuming you have a container element with an ID)
          document.getElementById("ans").innerText = message;
        
          // Close any existing popups (optional)
          layer.closePopup();
        };
        
        goBackButton.onclick = function() {
          map.setZoom(1); 
          layer.closePopup(); 
        };
      }
    });
  }
}
).addTo(map)

let ranCN;
function generateRandomcN() {
  map.setView([0, 0], 1);
  map.closePopup();
  addItemToList('you shuff');
  if (document.getElementById('ans').innerText = "waiting") {
      countNum('skip')
  }
    const randomIndex = Math.floor(Math.random() * cN.length);
    const randomcN= cN[randomIndex];
    ranCN = randomcN
    document.getElementById('randomcN').innerText = "Find "+ randomcN;
    document.getElementById('ans').innerText = "waiting"
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  while (color === '#FFFFFF' || color === '#000000') {
    color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  }
  return color;
}

function showTemporaryGIF(gifUrl, time) {
  // Calculate bounds for the entire map
  var southWest = map.getBounds().getSouthWest();
  var northEast = map.getBounds().getNorthEast();
  var bounds = L.latLngBounds(southWest, northEast);

  // Create an ImageOverlay to display the GIF
  var gifOverlay = L.imageOverlay(gifUrl, bounds).addTo(map);

  setTimeout(function() {
    map.removeLayer(Stadia_StamenTonerBackground);
    map.removeLayer(gifOverlay);
    map.addLayer(Stadia_StamenTonerBackground);
  }, time*1000);
}  

function countNum(id){
  var count = document.getElementById(id);
  var currentC = parseInt(count.innerText);

  currentC ++;

  count.innerText = currentC
}

function showAnswer(){
  countNum('lose')
  var featureToZoom = cLay.getLayers().find(function(layer) {
    return layer.feature.properties.ADMIN === ranCN; // Replace with the desired feature name
  });
  map.fitBounds(featureToZoom.getBounds());
  featureToZoom.bindPopup(ranCN + 'is HERE dude').openPopup()
  
}

function addItemToList(text) {
  // Get the existing list
  var list = document.getElementById("myList");

  // Create a new list item
  var li = document.createElement("li");

  // Create a text node with the new item
  var textNode = document.createTextNode(text); 

  // Append the text node to the list item
  li.appendChild(textNode);

  // Append the list item to the list
  list.appendChild(li);
}

//* Set the width of the sidebar to 250px (show it) */
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

function openNav2() {
  document.getElementById("mySidepanel").style.width = "250px";
  // document.getElementById("mySidepanel").style.marginLeft = "250px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}