// --- Main.js ---

// Global variables used by other scripts
/* global getRandomColor, onEachFeature, shuffle, showAnswer */

// Assumed global variable from a separate file (e.g., countries.js)
/* global countries */

// 1. Initialize Map
const map = L.map("map").setView([0, 0], 1);

// 2. Tile Layer (The Satellite Map)
const Esri_WorldImagery = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  }
);
Esri_WorldImagery.addTo(map);

// 3. Prepare Country Names List
const cN = [];
for (const feature of countries.features) {
  cN.push(feature.properties.ADMIN);
}

// 4. GeoJSON Layer (The Colored Country Polygons)
const cLay = L.geoJSON(countries, {
  style: function (feature) {
    return {
      fillColor: getRandomColor(),
      weight: 2,
      opacity: 1,
      color: "white",
      fillOpacity: 0.6,
    };
  },
  // The key change: The click logic is now in the separate function from effects.js
  onEachFeature: onEachFeature,
}).addTo(map);

// 5. Expose variables globally so they can be accessed by other script files
// This is necessary because in a simple project, these files are not true modules
window.map = map;
window.Esri_WorldImagery = Esri_WorldImagery;
window.cLay = cLay;
window.cN = cN;
window.shuffle = shuffle;
window.showAnswer = showAnswer;

// For the utility functions, we rely on them being defined globally in utils.js
// For the game functions, we rely on them being defined globally in game.js
