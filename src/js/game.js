// --- Game.js ---

// Global variables imported/referenced from main.js
/* global map, cLay, cN, addItemToList, countNum */

let ranCN; // Stores the currently selected country name to find

/**
 * Resets the map, selects a new random country, and updates the UI.
 */
function shuffle() {
  map.setView([0, 0], 1);
  map.closePopup();

  // If 'waiting' text is visible, it means the previous round was skipped/abandoned
  if (
    document.getElementById("ans").innerText === "Click on the Country" ||
    document.getElementById("ans").innerText === "Shuffle to Restart!"
  ) {
    // Only count a 'skip' if they were mid-game (i.e., ranCN was set)
    if (ranCN) {
      countNum("skip");
    }
  }

  const randomIndex = Math.floor(Math.random() * cN.length);
  const randomCountry = cN[randomIndex];

  ranCN = randomCountry; // Set the new target country
  document.getElementById("randomcN").innerText = "Find " + randomCountry;
  document.getElementById("ans").innerText = "Click on the Country";
  addItemToList("You shuffled and got " + ranCN);
}

/**
 * Shows the answer (the target country) on the map if the player gives up.
 */
function showAnswer() {
  if (!ranCN) {
    document.getElementById("ans").innerText = "You haven't shuffled yet!";
    return;
  }

  countNum("lose");
  addItemToList("You gave up looking for " + ranCN + " !!!");

  // Find the Leaflet layer object corresponding to the target country (ranCN)
  const featureToZoom = cLay.getLayers().find(function (layer) {
    return layer.feature.properties.ADMIN === ranCN;
  });

  if (featureToZoom) {
    map.fitBounds(featureToZoom.getBounds());
    // Use an unbind/rebind to ensure the popup opens cleanly
    featureToZoom
      .unbindPopup()
      .bindPopup(ranCN + " is HERE dude!")
      .openPopup();
    document.getElementById("randomcN").innerText = "Shuffle Again";
    document.getElementById("ans").innerText = "Shuffle to Restart!";
    ranCN = undefined; // Reset the target to force a shuffle
  } else {
    document.getElementById("ans").innerText =
      "Error: Could not find country layer.";
  }
}
