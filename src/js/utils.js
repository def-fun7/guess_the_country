// --- Utils.js ---

/**
 * Generates a random, non-white, non-black hex color string.
 * @returns {string} A hex color code (e.g., '#A3C1F5').
 */
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  // Ensure color is not too close to black or white
  while (
    color === "#FFFFFF" ||
    color === "#000000" ||
    color.match(/#F{3}|#0{3}/i)
  ) {
    color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  }
  return color;
}

/**
 * Increments the counter element specified by the ID.
 * @param {string} id - The ID of the HTML element containing the count.
 */
function countNum(id) {
  const count = document.getElementById(id);
  let currentC = parseInt(count.innerText);
  currentC++;
  count.innerText = currentC;
}

/**
 * Adds a new item to the history list.
 * @param {string} text - The text content for the new list item.
 */
function addItemToList(text) {
  const list = document.getElementById("hist");
  const li = document.createElement("li");
  const textNode = document.createTextNode(text);

  li.appendChild(textNode);
  list.appendChild(li);
}
