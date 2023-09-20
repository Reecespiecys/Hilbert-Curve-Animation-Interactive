let order = 4; // Order of the Hilbert curve
let totalPoints;
let path = [];
let speed = 10; // Speed of animation
let isAnimating = true; // Variable to control animation

function setup() {
  createCanvas(800, 800);

  // Calculate the total number of points in the Hilbert curve for the given order
  totalPoints = Math.pow(4, order);

  // Calculate the length based on the canvas size and the order of the curve
  let length = min(width, height) * 0.8;

  // Generate the Hilbert curve points
  for (let i = 0; i < totalPoints; i++) {
    path[i] = hilbert(i);
    path[i].mult(length / (pow(2, order) - 1));
    path[i].add(createVector(width * 0.1, height * 0.1));
  }

  // Create a toggle button for animation
  let toggleButton = createButton("Toggle Animation");
  toggleButton.position(10, height + 10);
  toggleButton.mousePressed(toggleAnimation);
}

function draw() {
  background(255);
  stroke(0);
  noFill();

  if (isAnimating) {
    // Calculate animation progress based on sine wave and speed
    let animationProgress = abs(sin((frameCount * speed) / 10000)); // Smoothly oscillates between 0 and 1
    let endPos = animationProgress * totalPoints;

    // Draw the animated part of the Hilbert curve
    beginShape();
    for (let i = 1; i < endPos; i++) {
      line(path[i - 1].x, path[i - 1].y, path[i].x, path[i].y);
    }
    endShape();
  } else {
    // Draw the entire Hilbert curve
    beginShape();
    for (let i = 0; i < totalPoints; i++) {
      vertex(path[i].x, path[i].y);
    }
    endShape();
  }
}

function hilbert(i) {
  // Define the initial points of the Hilbert curve
  const points = [
    createVector(0, 0),
    createVector(0, 1),
    createVector(1, 1),
    createVector(1, 0),
  ];

  let index = i & 3; // Calculate the index based on the bitwise AND operation with 3
  let point = points[index]; // Get the corresponding initial point for the current index

  // Generate the Hilbert curve for the given order
  for (let j = 1; j < order; j++) {
    i = i >>> 2; // Bitwise right shift to divide by 4
    index = i & 3; // Calculate the new index based on the bitwise AND operation with 3
    let len = pow(2, j); // Calculate the length of the current step
    let temp;

    // Update the point based on the Hilbert curve construction rules
    if (index === 0) {
      temp = point.x;
      point.x = point.y;
      point.y = temp;
    } else if (index === 1) {
      point.y += len;
    } else if (index === 2) {
      point.x += len;
      point.y += len;
    } else if (index === 3) {
      temp = len - 1 - point.x;
      point.x = len - 1 - point.y;
      point.y = temp;
      point.x += len;
    }
  }

  return point; // Return the calculated point for the Hilbert curve
}

function toggleAnimation() {
  isAnimating = !isAnimating; // Toggle animation on button click
}
