let playerChoice = 0;
let computerChoice;
let playerScore = 0;
let computerScore = 0;

const options = ["Rock", "Paper", "Scissors", "Laser"];

const rockBtn = document.getElementById("rock-button");
const paperBtn = document.getElementById("paper-button");
const scissorsBtn = document.getElementById("scissors-button");
const laserBtn = document.getElementById("laser-button");
const computerBtn = document.getElementById("computer");

const winnerDisplay = document.getElementById("winner");
const choiceDisplay = document.getElementById("choice");

const playerScoreDisplay = document.getElementById("playerscore");
const computerScoreDisplay = document.getElementById("computerscore");

choiceDisplay.innerText = " None";

rockBtn.addEventListener("click", function () {
    winnerDisplay.innerText = "";
    playerChoice = 1;
    choiceDisplay.innerText = " Rock";
});

paperBtn.addEventListener("click", function () {
    winnerDisplay.innerText = "";
    playerChoice = 2;
    choiceDisplay.innerText = " Paper";
});

scissorsBtn.addEventListener("click", function () {
    winnerDisplay.innerText = "";
    playerChoice = 3;
    choiceDisplay.innerText = " Scissors";
});

laserBtn.addEventListener("click", function () {
    winnerDisplay.innerText = "";
    playerChoice = 4;
    choiceDisplay.innerText = " Laser";
});

computerBtn.addEventListener("click", function () {
    winnerDisplay.innerText = "";
    computerChoice = Math.floor(Math.random() * 4) + 1;
    console.log(playerChoice);

    let playerWin = "You Win: " + options[playerChoice - 1] + " beats " + options[computerChoice - 1] + "!";
    let computerWin = "Computer Wins: " + options[computerChoice - 1] + " beats " + options[playerChoice - 1] + "!";

    if(playerChoice === 0){
        winnerDisplay.innerText = "Please select an option";
    }else if (playerChoice === computerChoice) {
        winnerDisplay.innerText = "It's a draw! You both chose " + options[playerChoice - 1] + "!";
    } else if (playerChoice === 1 && computerChoice === 2) { //rock vs paper
        winnerDisplay.innerText = computerWin;
        computerScore++;
    } else if (playerChoice === 1 && computerChoice === 3) { //rock vs scissors
        winnerDisplay.innerText = playerWin;
        playerScore++;
    } else if (playerChoice === 1 && computerChoice === 4) { //rock vs laser
        winnerDisplay.innerText = playerWin;
        playerScore++;
    } else if (playerChoice === 2 && computerChoice === 1) { //paper vs rock
        winnerDisplay.innerText = playerWin;
        playerScore++;
    } else if (playerChoice === 2 && computerChoice === 3) { //paper vs scissors
        winnerDisplay.innerText = computerWin;
        computerScore++;
    } else if (playerChoice === 2 && computerChoice === 4) { //paper vs laser
        winnerDisplay.innerText = computerWin;
        computerScore++;
    } else if (playerChoice === 3 && computerChoice === 1) { //scissors vs rock
        winnerDisplay.innerText = computerWin;
        computerScore++;
    } else if (playerChoice === 3 && computerChoice === 2) { //scissors vs paper
        winnerDisplay.innerText = playerWin;
        playerScore++;
    } else if (playerChoice === 3 && computerChoice === 4) { //scissors vs laser
        winnerDisplay.innerText = computerWin;
        computerScore++;
    } else if (playerChoice === 4 && computerChoice === 1) { //laser vs rock
        winnerDisplay.innerText = computerWin;
        computerScore++;
    } else if (playerChoice === 4 && computerChoice === 2) { //laser vs paper
        winnerDisplay.innerText = playerWin;
        playerScore++;
    } else if (playerChoice === 4 && computerChoice === 3) { //laser vs scissor
        winnerDisplay.innerText = playerWin;
        playerScore++;
    }

    playerScoreDisplay.innerText = "" + playerScore;
    computerScoreDisplay.innerText = "" + computerScore;

});
