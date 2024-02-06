class Paddle {
    constructor(x, isPlayer) {
        this.x = x;
        this.y = height / 2;
        this.w = 10;
        this.h = 60;
        this.isPlayer = isPlayer;
        this.intelligence = 1;
    }

    update() {
        if (this.isPlayer) {
            this.y = mouseY;
            this.y = constrain(this.y, 0, height - this.h);
        } else {
            const targetY = ball.y;
            const speed = 5 * this.intelligence;
            if (this.y < targetY) {
                this.y += speed;
            } else if (this.y > targetY) {
                this.y -= speed;
            }
            this.y = constrain(this.y, 0, height - this.h);
        }
    }

    draw() {
        fill(255);
        rect(this.x, this.y, this.w, this.h);
    }
}

class Ball {
    constructor() {
        this.radius = 25;
        this.reset();
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        let maxSpeed = 5;
        this.speedX = Math.random() * maxSpeed * 2 - maxSpeed;
        this.speedY = Math.random() * maxSpeed * 2 - maxSpeed;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < this.radius || this.x > width - this.radius) {
            this.reset();
        }
        if (this.y < this.radius || this.y > height - this.radius) {
            this.speedY *= -1;
        }

        if (collideRectangleCircle(this.x, this.y, this.radius, player.x, player.y, player.w, player.h) ||
            collideRectangleCircle(this.x, this.y, this.radius, computer.x, computer.y, computer.w, computer.h)) {
            this.speedX *= -1;
            this.speedX *= 1.1;
            this.speedY *= 1.1;
        }
    }

    draw() {
        fill(255);
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }
}

function collideRectangleCircle(cx, cy, radius, x, y, width, height) {
    if (cx + radius < x || cx - radius > x + width) {
        return false;
    }
    if (cy + radius < y || cy - radius > y + height) {
        return false;
    }
    return true;
}

function collideRectangleCircle(cx, cy, radius, x, y, w, h) {
    if (cx + radius < x || cx - radius > x + w) {
        return false;
    }
    if (cy + radius < y || cy - radius > y + h) {
        return false;
    }
    return true;
}

let ball, player, computer;

function setup() {
    createCanvas(800, 400);
    ball = new Ball();
    player = new Paddle(30, true);
    computer = new Paddle(width - 40, false);
}

function draw() {
    background(0);
    ball.update();
    ball.draw();
    player.update();
    player.draw();
    computer.update();
    computer.draw();
}