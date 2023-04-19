let cars = [];
let lanes = [];
let sprite;
let spriteSize = 20;
let laneHeight = 60;
let numLanes = 5;

class Lane {
  constructor(y) {
    this.y = y;
    //this.speed = random(1, 3);
    this.color = color(random(255), random(255), random(255));
  }

  show() {
    fill(this.color);
    rect(0, this.y, width, laneHeight);
  }

  //move() {
  //this.y += this.speed;
  //if (this.y > height) {
  //this.y = -laneHeight;
  //this.speed = random(1, 3);
  //this.color = color(random(255), random(255), random(255));
  //}
  //}
}
class Car {
  constructor(laneY) {
    this.x = random(width);
    this.y = laneY + laneHeight / 2;
    this.speed = random(2, 6);
    this.color = color(random(255), random(255), random(255));
    this.width = random(30, 50);
  }
  show() {
    fill(this.color);
    rect(this.x, this.y - 10, this.width, 20);
  }
  move() {
    this.x += this.speed;
    if (this.x > width) {
      this.x = -this.width;
      this.speed = random(2, 6);
      this.color = color(random(255), random(255), random(255));
      this.width = random(30, 50);
    }
  }
  checkCollision() {
    if (
      this.x < sprite.x + spriteSize / 2 &&
      this.x + this.width > sprite.x - spriteSize / 2 &&
      this.y < sprite.y + spriteSize / 2 &&
      this.y > sprite.y - spriteSize / 2
    ) {
      return true;
    }
    return false;
  }
}
class Sprite {
  constructor() {
    this.x = width / 2;
    this.y = height - spriteSize / 2;
  }
  show() {
    fill(0, 255, 0);
    ellipse(this.x, this.y, spriteSize);
  }
  move(direction) {
    if (direction === "left") {
      this.x -= laneHeight;
    } else if (direction === "right") {
      this.x += laneHeight;
    } else if (direction === "up") {
      this.y -= laneHeight;
    } else if (direction === "down") {
      this.y += laneHeight;
    }
  }
  checkBoundary() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      return true;
    }
    return false;
  }
}

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < numLanes; i++) {
    let laneY = i * laneHeight;
    lanes.push(new Lane(laneY));
  }
  for (let i = 0; i < numLanes; i++) {
    let laneY = i * laneHeight + laneHeight / 2;
    cars.push(new Car(laneY));
  }
  sprite = new Sprite();
}

function draw() {
  background(220);
  for (let lane of lanes) {
    lane.show();
    //lane.move();
  }
  for (let car of cars) {
    car.show();
    car.move();
    if (car.checkCollision()) {
    }
    sprite.show();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    sprite.move("left");
  } else if (keyCode === RIGHT_ARROW) {
    sprite.move("right");
  } else if (keyCode === UP_ARROW) {
    sprite.move("up");
  } else if (keyCode === DOWN_ARROW) {
    sprite.move("down");
  }
}
