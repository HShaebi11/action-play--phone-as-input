const dial = document.getElementById("dial");
const valueDisplay = document.getElementById("value");

let isDragging = false;
let centerX, centerY;
let lastAngle = 0;
let currentRotation = 0;

const stepSize = 15; // degrees per snap step

function getAngle(x, y) {
  const dx = x - centerX;
  const dy = y - centerY;
  return Math.atan2(dy, dx) * (180 / Math.PI);
}

function normalize(deg) {
  return ((deg % 360) + 360) % 360;
}

function snap(deg, step) {
  return Math.round(deg / step) * step;
}

function startDrag(x, y) {
  const rect = dial.getBoundingClientRect();
  centerX = rect.left + rect.width / 2;
  centerY = rect.top + rect.height / 2;
  lastAngle = getAngle(x, y);
  isDragging = true;
}

function updateDrag(x, y) {
  if (!isDragging) return;

  const angle = getAngle(x, y);
  let delta = angle - lastAngle;

  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;

  currentRotation += delta;
  currentRotation = normalize(currentRotation);
  const snapped = snap(currentRotation, stepSize);

  dial.style.transform = `rotate(${snapped}deg)`;
  valueDisplay.textContent = `Rotation: ${snapped}°`;

  lastAngle = angle;
}

// MOUSE EVENTS
dial.addEventListener("mousedown", (e) => {
  startDrag(e.clientX, e.clientY);
});

window.addEventListener("mousemove", (e) => {
  updateDrag(e.clientX, e.clientY);
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

// TOUCH EVENTS
dial.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  startDrag(touch.clientX, touch.clientY);
});

window.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const touch = e.touches[0];
  updateDrag(touch.clientX, touch.clientY);
}, { passive: false });

window.addEventListener("touchend", () => {
  isDragging = false;
});

// Replace with your own unique ID for the input device
const peer = new Peer('iphone');
let conn;

// Connect to the render device when ready
function connectToRender() {
  conn = peer.connect('macbook');
  conn.on('open', function () {
    // Send initial dial value
    sendDialValue();
  });
}

// Listen for dial input changes
document.getElementById('value').addEventListener('input', sendDialValue);

// Send dial value to render device
function sendDialValue() {
  if (!conn || conn.open === false) return;
  const dialValue = parseFloat(document.getElementById('value').value) || 0;
  conn.send({ dial: dialValue });
}

peer.on('open', connectToRender);