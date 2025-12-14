// --- Effects.js ---

// Global variables imported/referenced from main.js or game.js
/* global map, Esri_WorldImagery, ranCN, addItemToList, countNum */

/**
 * Handles the click event on a GeoJSON feature (country).
 * Sets up the popup with Choose/Go Back buttons and game logic.
 * @param {object} feature - The GeoJSON feature data.
 * @param {object} layer - The Leaflet layer object for the feature.
 */
function onEachFeature(feature, layer) {
  layer.on({
    click: function (e) {
      // Zoom to the bounds of the clicked country
      map.fitBounds(e.target.getBounds());

      // Create a popup with buttons
      const popupContent = `
                <p class="leaflet-popup-content p"><b>IS THIS IT?</b></p>
                <div class="leaflet-popup-buttons">
                    <button id="chooseButton">Choose</button>
                    <button id="goBackButton">Go Back</button>
                </div>
            `;

      layer.bindPopup(popupContent).openPopup();

      // Setup button click handlers
      const chooseButton = document.getElementById("chooseButton");
      const goBackButton = document.getElementById("goBackButton");

      if (chooseButton) {
        chooseButton.onclick = function () {
          handleChooseAction(feature, layer);
        };
      }

      if (goBackButton) {
        goBackButton.onclick = function () {
          map.setView([0, 0], 1);
          layer.closePopup();
        };
      }
    },
  });
}

/**
 * Handles the logic when the 'Choose' button is clicked inside the popup.
 * @param {object} feature - The GeoJSON feature data of the chosen country.
 * @param {object} layer - The Leaflet layer object.
 */
function handleChooseAction(feature, layer) {
  let message;
  let gifUrl;
  let gifTime;

  if (typeof ranCN === "undefined") {
    message = "At least Shuffle first, IDIOT!!!";
    addItemToList("You chose before shuffling.");
    gifUrl = "https://c.tenor.com/-isbpihSHoQAAAAd/idiot-stupid.gif";
    gifTime = 7;
  } else if (ranCN === feature.properties.ADMIN) {
    message = "WOW, You Found " + ranCN;
    addItemToList(message);
    countNum("win");
    gifUrl =
      "https://bestanimations.com/media/fireworks2/367172827red-green-firework-explosions.gif";
    gifTime = 7;
  } else {
    message = "You picked the Wrong Country...";
    addItemToList("You picked " + feature.properties.ADMIN + " as " + ranCN);
    countNum("lose");
    gifUrl =
      "https://gifdb.com/images/high/tongue-out-teasing-playful-goofy-bear-fart-hjx2tcoixrtq09vi.gif";
    gifTime = 4.8;
  }

  document.getElementById("ans").innerText = message;
  layer.closePopup();
  showTemporaryGIF(gifUrl, gifTime);
}

/**
 * Temporarily displays a GIF overlay on the map.
 * @param {string} gifUrl - URL of the GIF image.
 * @param {number} time - Duration in seconds to display the GIF.
 */
function showTemporaryGIF(gifUrl, time) {
  // Calculate bounds for the entire map
  const bounds = map.getBounds();

  // Create an ImageOverlay to display the GIF
  const gifOverlay = L.imageOverlay(gifUrl, bounds).addTo(map);

  // Hide the original tile layer behind the GIF for maximum effect
  map.removeLayer(Esri_WorldImagery);

  setTimeout(function () {
    map.removeLayer(gifOverlay);
    map.addLayer(Esri_WorldImagery); // Re-add the map tiles
  }, time * 1000);
}
