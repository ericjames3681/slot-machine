//CONSTANTS
const images = ['cherries.png', 'bell.png', 'leslie.png'];
const jackpot = 10;
const win = 7;
const bet = 5;

// console.log(imagesArray[0]);

const goAudio = new Audio('118239__pierrecartoons1979__slot-machine-phrygian.mp3');
// /*----- app's state (variables) -----*/
var state = {
    money: 40
};
var slot123 = {
    '1': {
        imgUrl: 'leslie.png'
    },
    '2': {
        imgUrl: 'cherries.png'
    },
    '3': {
        imgUrl: 'bell.png'
    }
};

let total = 440;



/*----- cached element references -----*/
var totalMessage = document.getElementById('input');
console.log(totalMessage);
// const pScreen1 = document.querySelector('#player h2');
// const cScoreEl = document.querySelector('#computer h2');
// const tScoreEl = document.querySelector('#middle h2');

// const pResultEl = document.querySelector('#player div div');
// const cResultEl = document.querySelector('#computer div div');

// const countdownEl = document.querySelector('#middle div');

// var x = document.createElement("img");




/*----- event listeners -----*/

document.querySelector('button').addEventListener('click', spin);
// document.querySelector('submit').addEventListener('click', getDollars);


/*----- functions -----*/
function init () {
    totalMessage.innerText= 'Welcome!';
    // render();
    state[money] = totalMessage;    

    return;
}

function render() {
    getDollars();
    spin();
    state[money] -= 5;
    renderCurrentDollars();
    if (total >= 5) {
        spin();
        if (checkForWin() === true) {
            renderWin();
            renderCurrentDollars(); 
        };
    };
}
function spin() {
    goAudio.play();
    renderSlots();
    renderCurrentDollars();
}
function renderSlots () {
    for (let i = 1; i <= 3; i++){
        //two args time/index
        handleTime('2,000', i);
    }
}
function randomizeImg() {
    var image = images[Math.floor(Math.random()*images.length)];
    return image;
}
function renderRandomImage(x){
    var htmlImg = document.getElementById('randomImage' + x);
    htmlImg.src = randomizeImg();
    slot123[x]= htmlImg.src;

}
//independent function that handleTimefunction handleTime(time) {
function handleTime(time, index) {
    setTimeout(() => {
        renderRandomImage(index);
    }, Number(time));
}

function getDollars() {
    state.money += document.getElementById('input').value;
    totalMessage.innerHTML = '$ ' + state.money;
}

function renderCurrentDollars() {
    totalMessage.innerHTML = '$' + state.money;
}

function renderWin() {
    totalMessage.innerText = 'Winner!!!!!';
    return console.log('yep! renderWin WORKS!!!!')
}

function checkForWin() {
    if ((slot123[3] === slot123[2]) && (slot123[1] === slot123[2])) {
       return true;
    }
}

