//  Exceeding the Entirety 2023 by Mika and Avi Milgrom
// let Fira;
let digitSize;
const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg');
const sketch = document.getElementById("sketch")
// function preload() {
//   Fira = loadFont("FiraCode-Light.ttf");
// }

// Birthdays, Month is zero-based
let startDateAvi = new Date(1978, 10, 27, 22, 10, 10);
let startDateMika = new Date(1980, 7, 31, 23, 30, 50);
let startDateAnan = new Date(2013, 2, 17, 2, 0, 0);

// Format the time with six digits for hours and two for minutes and seconds
function formatHours(n) {
  return (n % Math.pow(10, 6)).toString().padStart(6, "0");
}
function formatMinutesSeconds(n) {
  return (n % 60).toString().padStart(2, "0");
}

// Squares and digits design
function drawDigit(digit, x, y) {
  if (digit === " ") {
    return;
  }
  stroke(0);
  strokeWeight(1);
  fill(255);
  // rect(x, y, digitSize, digitSize + 7);
  rect(x, y, digitSize, digitSize * 1.1);
  noStroke();
  fill(40);
  // textFont(Fira);
  textSize(digitSize);
  textAlign(CENTER, CENTER);
  //text(digit, x + digitSize / 2, y + digitSize / 2);
  text(digit, x + digitSize/2, y + digitSize*.63);
}

// Present time on the screen
function drawTime(index, PersonDate) {
  let currentDate = new Date();
  let diff = currentDate - PersonDate;
  let hours = Math.floor(diff / (1000 * 60 * 60));
  let minutes = Math.floor((diff / (1000 * 60)) % 60);
  let seconds = Math.floor((diff / 1000) % 60);

  // Time reset
  if (hours >= 1000000) {
    hours = hours % 1000000;
    PersonDate = currentDate;
  }

  // Time format
  let formattedTime =
    formatHours(hours) +
    " " +
    formatMinutesSeconds(minutes) +
    " " +
    formatMinutesSeconds(seconds);

  // Split time into digits
  let digits = formattedTime.split("");

  // Calculate starting positions for each clock
  //let startX = width / 2 - (digits.length * digitSize + digitSize) / 2;
  let startX = width / 2 - (digits.length * digitSize) / 2;
  // let startY = height / 6 + (index * height) / 6;
  let startY = height/2 - (digitSize*1.1)*(2.5-index*2);

  // Draw each digit with a square
  for (let i = 0; i < digits.length; i++) {
    drawDigit(digits[i], startX + i * digitSize, startY);
  }
}

function setup() {
  // const myCanvas = createCanvas(windowWidth, windowHeight);
  const myCanvas = createCanvas(sketch.clientWidth, sketch.clientWidth * 5 / 12);
  myCanvas.parent("sketch");
  // digitSize = min(width, height) / 20;
  digitSize = min(width, height) / 7;
  textFont("Fira Code");
}

function draw() {
  background(bg);
  drawTime(0, startDateAvi);
  drawTime(1, startDateMika);
  drawTime(2, startDateAnan);
}

function windowResized() {
  // resizeCanvas(windowWidth, windowWidth)
  resizeCanvas(sketch.clientWidth, sketch.clientWidth * 5 / 12);
  digitSize = min(width, height) / 7;
}
