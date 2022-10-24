let BMOSelection;
let playerSelection;
let BMOScore = 5;
let playerScore = 5;

let delay = 2000;

let buttons = document.querySelectorAll('.button');
let startButtons = document.querySelectorAll('button');
let body = document.querySelector('body');
const startContainer = document.querySelector('.start-container');
const gameContainer = document.querySelector('.game-container');
const screen = document.querySelector('.screen');
const screenText = document.querySelector('.screen-text');
const playerLives = document.querySelector('.player-score');
const BMOLives = document.querySelector('.BMO-score');
const questionBox = document.querySelector('.question-box');

const myArray = ['rock','paper','scissors'];
function BMOPlay(){
    return myArray[~~(Math.random() * myArray.length)];
};

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
};

reset();
startButtons.forEach((start) => {
    start.addEventListener('click', () => {
        if (start.textContent.includes('Yes')){
            game();
        } else{
            reset();
        }
    })
});

function game(){
    body.removeAttribute('class');
    body.classList.add('gamebg');
    screen.classList.add('offscreen');
    startContainer.classList.add('offscreen');
    gameContainer.classList.remove('offscreen');
    generateHearts();
    setTimeout( () => {
        screen.classList.remove('offscreen');
    }, delay);
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            playerSelection = button.alt;
            playRound(playerSelection, BMOSelection);
            if (playerScore==0||BMOScore==0){
                setTimeout( () => {
                    declareWinner();
                }, delay);
                setTimeout( () => {
                    gameEnd();
                }, delay*2);
            }
        })
    })
};

function playRound(playerSelection, BMOSelection){
    BMOSelection = BMOPlay();
    if (BMOSelection == playerSelection){
        keepPlayerScore();
        keepBMOScore();
        displayResults(
            `Tie ! You and BMO picked the same weapon ! \n 
            ${capitalize(BMOSelection)} and ${capitalize(playerSelection)} !`
        );
    } else if (
        (BMOSelection == 'rock' && playerSelection == 'scissors') ||
        (BMOSelection == 'scissors' && playerSelection == 'paper') ||
        (BMOSelection == 'paper' && playerSelection == 'rock')
    ) {
        keepPlayerScore();
        displayResults(
            `BMO won this round ! \n 
            ${capitalize(BMOSelection)} beats ${capitalize(playerSelection)} !`
        );
    } else {
        keepBMOScore();
        displayResults(
            `You won this round ! \n 
            ${capitalize(playerSelection)} beats ${capitalize(BMOSelection)} !`
        );
    }
};

function generateHearts() {
    for(i=0; i<playerScore; i++){
        let heart = document.createElement('img');
        heart.src = 'pixelheart.png';
        playerLives.appendChild(heart);
    } for (i=0; i<BMOScore; i++){
        let heart = document.createElement('img');
        heart.src = 'pixelheart.png';
        BMOLives.appendChild(heart);
    }
};

function keepPlayerScore() {
    playerScore = --playerScore;
    playerLives.removeChild(playerLives.lastChild);
};
function keepBMOScore() {
    BMOScore = --BMOScore;
    BMOLives.removeChild(BMOLives.lastChild);
};

function displayResults(str){
    screen.classList.add('offscreen');
    screenText.classList.remove('offscreen');

    screenText.textContent = str;
    setTimeout( () => {
        screenText.classList.add('offscreen');
        screen.classList.remove('offscreen');
    }, delay);
};
function declareWinner() {
    screen.classList.add('offscreen');
    screenText.classList.remove('offscreen');
    if(playerScore<BMOScore){
        screenText.textContent = 'BMO Wins !'
    } else if (BMOScore<playerScore){
        screenText.textContent = 'You Win !'
    } else{
        screenText.textContent = 'It\'s a Tie !'
    }
};

function reset() {
    questionBox.classList.add('offscreen');
    body.removeAttribute('class');
    body.classList.add('startbg');
    startContainer.classList.remove('offscreen');
    gameContainer.classList.add('offscreen');
    setTimeout( () => {
        questionBox.classList.remove('offscreen');
    }, delay);
};

function removeAllChildNodes(parent){
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
};

function gameEnd() {
    questionBox.classList.add('offscreen');
    body.removeAttribute('class');
    body.classList.add('startbg');
    startContainer.classList.remove('offscreen');
    gameContainer.classList.add('offscreen');
    removeAllChildNodes(questionBox);
    questionBox.textContent = 'Thanks for playing !';
    setTimeout( () => {
        questionBox.classList.remove('offscreen');
    }, delay/2);
};