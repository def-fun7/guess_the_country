  var map = L.map('map', {
  center: [0, 0],
  zoom: 2,
  minZoom: 2,
  maxZoom: 6,
  maxBounds: [[-90, -180], [90, 180]],
  maxBoundsViscosity: 1.0
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri',
  noWrap: true
});
Esri_WorldImagery.addTo(map);

var countries;
var ranCN;
var correctLayer;
var timerInterval;
var timerValue = 60;
var timerElement = document.getElementById('timer');
var winCounter = 0;
var loseCounter = 0;

// Fetching country data
fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
  .then(response => response.json())
  .then(data => {
    countries = data;
    addCountriesToMap();
    document.querySelector('.circular-button').disabled = false;
  })
  .catch(err => alert("Failed to load GeoJSON data. Please try again later."));

// Adding countries to the map
function addCountriesToMap() {
  L.geoJSON(countries, {
    style: function() {
      return {
        fillColor: getRandomColor(),
        weight: 2,
        color: 'white',
        fillOpacity: 0.6
      };
    },
    onEachFeature: function(feature, layer) {
      layer.on('click', function() {
        var popupContent = `
          <p><b>IS THIS IT?</b></p>
          <button id="chooseButton">Choose</button>
        `;
        layer.bindPopup(popupContent).openPopup();

        document.getElementById('chooseButton').addEventListener('click', function() {
          checkAnswer(feature.properties.name);
          layer.closePopup();
        });
      });
    }
  }).addTo(map);
}

// Shuffle to choose a random country
function shuffle() {
  // Reset history
  document.getElementById('hist').innerHTML = "";
  var randomIndex = Math.floor(Math.random() * countries.features.length);
  ranCN = countries.features[randomIndex].properties.name;
  document.getElementById('randomcN').innerText = "Find " + ranCN;
  resetTimer(); 
}

// Timer functions
function resetTimer() {
  timerValue = 60;
  timerElement.innerText = `Time: 01:00`;
  timerElement.classList.remove('low', 'countdown');
  clearInterval(timerInterval);
  startTimer();
}

function startTimer() {
  timerInterval = setInterval(function() {
    timerValue--;

    if (timerValue <= 10) {
      timerElement.classList.add('low');
    }

    if (timerValue === 0) {
      stopTimer();
      document.getElementById('ans').innerText = "Time's up!";
      incrementCounter('lose');
      addHistory(ranCN, "Time's Up!");
      zoomToCorrectCountry();
    }

    timerElement.innerText = `Time: 00:${timerValue < 10 ? '0' : ''}${timerValue}`;

    if (timerValue <= 10) {
      timerElement.classList.add('countdown');
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerElement.classList.remove('countdown');
}

// Check if selected country is correct
function checkAnswer(selectedCountry) {
  if (selectedCountry === ranCN) {
    document.getElementById('ans').innerText = "Correct!";
    incrementCounter('win');
    addHistory(selectedCountry, "Correct");
    stopTimer();
  } else {
    document.getElementById('ans').innerText = "Wrong!";
    incrementCounter('lose');
    addHistory(selectedCountry, "Wrong");
  }
}

// Increment win/lose counters
function incrementCounter(id) {
  if (id === 'win') {
    winCounter++;
  } else if (id === 'lose') {
    loseCounter++;
  }
  
  document.getElementById('winCounter').innerText = `Wins: ${winCounter}`;
  document.getElementById('loseCounter').innerText = `Losses: ${loseCounter}`;
}

// Add to history of answers
function addHistory(country, status) {
  const history = document.getElementById('hist');
  history.innerHTML += `<li>${country} - ${status}</li>`;
}

// Generate random color for country
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Reveal the answer
function showAnswer() {
  const correctCountry = countries.features.find(feature => feature.properties.name === ranCN);
  if (correctCountry) {
    const layer = L.geoJSON(correctCountry).addTo(map);
    map.fitBounds(layer.getBounds());
    layer.setStyle({ fillColor: 'red', fillOpacity: 0.8 });
    document.getElementById('ans').innerText = "Answer revealed!";
    stopTimer();
    addHistory(ranCN, "Revealed");
  }
}

// Zoom into the correct country when time's up
function zoomToCorrectCountry() {
  const correctCountry = countries.features.find(feature => feature.properties.name === ranCN);
  if (correctCountry) {
    const layer = L.geoJSON(correctCountry).addTo(map);
    map.fitBounds(layer.getBounds());
    layer.setStyle({ fillColor: 'red', fillOpacity: 0.8 });
  }
}
