const startBtn = document.getElementById("run");
const resetBtn = document.getElementById("reset");

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let shapes = {};
let shapeIndex = 0;
let fallSpeed = 4;
let shapeGenerateSpeed = 100;

ctx.font = "78px Comic Sans MS";
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.fillText("Blox™", canvas.width / 2, canvas.height / 2 + 20);

function Shape(posX, width, height) {
    this.Width = width;
    this.Height = height;
    this.Color = "#FFFFFF";
    this.Position = {
        X: posX,
        Y: -this.Height
    };
    this.Velocity = Math.random() * fallSpeed + 5;
    this.Index = shapeIndex;

    shapes[shapeIndex] = this;
    shapeIndex++;

    this.checkCollisions = function () {
        if (this.Position.Y >= canvas.height) {
            delete shapes[this.Index];
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

function shapeGenerate() {
    new Shape(Math.random() * canvas.width, 20, 20);
}

function Updater() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i in shapes) {
        shapes[i].update();
    }
}

function init(){
    setInterval(Updater, 10);
    setInterval(shapeGenerate, shapeGenerateSpeed);
}

function disableButton(btn){
    document.getElementById(btn.id).disabled = true;
}

startBtn.addEventListener("click", function () {
    console.log("run");
    disableButton(startBtn);
    init();
});

resetBtn.addEventListener("click", function () {
   location.reload();
});

