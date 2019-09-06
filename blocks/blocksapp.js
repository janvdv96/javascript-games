const startBtn = document.getElementById("run");
const resetBtn = document.getElementById("reset");

disableButton(resetBtn);

const scoreDisplay = document.getElementById("score");

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let running;

let blocks = {};
let blocksIndex = 0;
let fallSpeed = 5;
let score = 0;
let blockGenerateSpeed = 100;

ctx.font = "78px Comic Sans MS";
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.fillText("Blox™", canvas.width / 2, canvas.height / 2 + 20);

function Block(posX, width, height) {
    this.Width = width;
    this.Height = height;
    this.Color = "#FFFFFF";
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
    this.Color = "Crimson";
    this.Position = {X: posX, Y: canvas.height - this.Height};
    this.Velocity = {X: 0, Y: 0,};

    this.Draw = function () {
        ctx.beginPath();
        ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height);
        ctx.fillStyle = this.Color;
        ctx.fill();
    };

    this.update = function(){
        this.Draw();
    }
}

let player = new Player(canvas.width/2, 20, 20);

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
    running = false;
    enableButton(startBtn);
});





