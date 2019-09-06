const startBtn = document.getElementById("run");
const resetBtn = document.getElementById("reset");
disableButton(resetBtn);

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let running;

let blocks = {};
let blocksIndex = 0;
let fallSpeed = 1;
let blockGenerateSpeed = 100;

const scoreDisplay = document.getElementById("score");
let score = 0;

const highscoreDisplay = document.getElementById("highscore");
let highscore = 0;
highscore = localStorage.getItem("highscore");
highscoreDisplay.innerText = highscore;


ctx.font = "78px Comic Sans MS";
ctx.fillStyle = "crimson";
ctx.textAlign = "center";
ctx.fillText("Blox™", canvas.width / 2, canvas.height / 2 + 20);

document.addEventListener("keydown", function (event) {
    if (event.which === 37) { //left
        player.Velocity.X = -5;
    } else if (event.which === 38) { //up
        player.Velocity.Y = -5;
    } else if (event.which === 39) { //right
        player.Velocity.X = 5;
    } else if (event.which === 40) { //down
        player.Velocity.Y = 5;
    }
});

document.addEventListener("keyup", function () {
    player.Velocity.X = 0;
    player.Velocity.Y = 0;
});

function Block(posX, width, height) {
    this.Width = width;
    this.Height = height;
    this.Color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    this.Position = {
        X: posX,
        Y: -this.Height
    };
    this.Velocity = Math.floor(Math.random() * fallSpeed) + 5;
    this.Index = blocksIndex;

    blocks[blocksIndex] = this;
    blocksIndex++;

    this.checkCollisions = function () {
        if (this.Position.Y >= canvas.height) {
            delete blocks[this.Index];
        }
    };
    this.updatePosition = function () {
        this.Position.Y += this.Velocity;
    };
    this.Draw = function () {
        ctx.beginPath();
        ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height);
        ctx.fillStyle = this.Color;
        ctx.fill();
    };
    this.update = function () {
        this.checkCollisions();
        this.updatePosition();
        this.Draw();
    }
}

function Player(posX, width, height) {
    this.Width = width;
    this.Height = height;
    this.Position = {X: posX, Y: canvas.height - this.Height};
    this.Velocity = {X: 0, Y: 0};

    this.checkCollisions = function () {
        function collision(a, b) {
            if (
                a.Position.X <= b.Position.X + b.Width &&
                a.Position.X + a.Width >= b.Position.X &&
                a.Position.Y + a.Height >= b.Position.Y &&
                a.Position.Y <= b.Position.Y + b.Height) {
                return true
            }
        }

        for (let y in blocks) {
            if (collision(this, blocks[y])) {
                running = false;
                console.log("ouch, you died, your score was: " + score);

                if (score > highscore){
                    window.localStorage.setItem("highscore", score);
                    highscoreDisplay.innerText = highscore;
                }
                
                startBtn.addEventListener("click", function () {
                    newGame();
                });

            }
        }
    };

    this.Draw = function () {
        ctx.beginPath();
        ctx.strokeRect(this.Position.X, this.Position.Y, this.Width, this.Height);
        ctx.strokeStyle = "crimson";
        ctx.fill();
    };

    this.updatePosition = function () {
        this.Position.X += this.Velocity.X;
        this.Position.Y += this.Velocity.Y;
    };

    this.update = function () {
        this.checkCollisions();
        this.updatePosition();
        this.Draw();
    }
}

let player = new Player(canvas.width / 2, 30, 30);

function newGame() {
    player = new Player(canvas.width / 2, 30, 30);
    blocks = {};
    score = 0;
    scoreDisplay.innerText = score;
}

function blockGenerate() {
    if (running) {
        new Block(Math.random() * canvas.width, 25, 25);
        score++;
        scoreDisplay.innerText = "" + score;
    }
}

function Updater() {
    if (running) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i in blocks) {
            blocks[i].update();
        }
        player.update();
    }
}

function startGame() {

    setInterval(Updater, 10);
    setInterval(blockGenerate, blockGenerateSpeed);

}

function disableButton(btn) {
    document.getElementById(btn.id).disabled = true;
}

function enableButton(btn) {
    document.getElementById(btn.id).disabled = false;
}

startBtn.addEventListener("click", function () {
    disableButton(startBtn);
    enableButton(resetBtn);
    running = true;
    startGame();
});

resetBtn.addEventListener("click", function () {
    location.reload();
});