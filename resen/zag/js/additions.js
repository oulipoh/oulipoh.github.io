function fullScreen() {
  const body = document.getElementById("gameBody"); // Replace 'canvas' with your canvas element's ID

  if (body) {
    body.classList.add("fullscreen"); // Replace 'your-class-name' with the class you want to add
  }
}

// Function to remove a class from the canvas element when the "Esc" key is pressed
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const body = document.getElementById("gameBody"); // Replace 'canvas' with your canvas element's ID

    if (body) {
      body.classList.remove("fullscreen"); // Replace 'your-class-name' with the class you want to remove
    }
  }
});
