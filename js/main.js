
const lookupPics = [ 0, 1, 2, 3, 4, 5, 6, 7]

const IMAGES = {
    '0': 'images/7.png',
    '1': 'images/bell.png',
    '2': 'images/bell.png',
    '3': 'images/lemon.jpg',
    '4': 'images/lemon.jpg',
    '5': 'images/leslie.png',
    '6': 'images/leslie.png',
    '7': 'images/leslie.png',
}

const goAudio = new Audio('one_beep.wav');
goAudio.loop = true;
const coinAudio = new Audio('coinInput.wav');
const winAudio = new Audio('win.wav');

var state = {
    money: '',
    bet: '',
    betMax: ''
};
var slot123 = {
    '1': {
        imgUrl: ''
    },
    '2': {
        imgUrl: ''
    },
    '3': {
        imgUrl: ''
    }
};
var jackpot = 0;
var bell = 0;


var totalMessageEl = document.getElementById('current-balance');
var dollarInputEl = document.getElementById('input');
var slot1 = document.getElementById('randomImage1');
var slot2 = document.getElementById('randomImage2');
var slot3 = document.getElementById('randomImage3');

document.getElementById('spin').addEventListener('click', render);
document.getElementById('spinMax').addEventListener('click', renderMax);
document.getElementById('numberBtn').addEventListener('click', getDollars);
document.getElementById('cashout').addEventListener('click', init);

init();

function init () {
    totalMessageEl.innerText= 'Welcome! Add funds below...';
    state = {
        money: 0,
        bet: 0,
        betMax: 0
    };
    clearSlotData();
}

function render() {
    nan();
    if (state.money >= 5) {
        spin();
    }
    else {
        totalMessageEl.innerText= 'Add $5.00...';
    }    
    
}
function renderMax() {
    nan();
    if (state.money >= 20) {
        spinMax();
    }
    else {
        totalMessageEl.innerText= 'Add $20.00...';
    }   
}
function spin() {
    state.bet = 0;
    state.money -= 5;
    state.bet = 5;
    preSpin();
}
function spinMax() {
    state.betMax = 0;
    state.money -= 20;
    state.betMax = 20;
    preSpin();
}
function preSpin() {
    jackpot = 0;
    bell = 0;
    nan();
    totalMessageEl.innerText = "Spinning...";
    soundOn();
    preSpinDisplay();
    renderSlots();   
}
function preSpinDisplay() {
    slot1.src = "https://media1.tenor.com/images/a8937d9bc6ddda79dc00e86f10cca1b8/tenor.gif";
    slot2.src = "https://media1.tenor.com/images/a8937d9bc6ddda79dc00e86f10cca1b8/tenor.gif";
    slot3.src = "https://media1.tenor.com/images/a8937d9bc6ddda79dc00e86f10cca1b8/tenor.gif";
}
function renderSlots () {
    for (let i = 1; i <= 3; i++){
        handleTime(`${i}000`, i);
    }  
}
function randomizeImg() {
    var newRand = getRandomIdx();
    if (lookupPics[newRand]=== 0){
        jackpot++;
    }
    else if (lookupPics[newRand]=== 1 || lookupPics[newRand]=== 2 )
    {
        bell++;
    }
    return IMAGES[newRand];
}
function renderRandomImage(x){
    var htmlImgEl = document.getElementById('randomImage' + x);
    htmlImgEl.src = randomizeImg();
    slot123[x] = htmlImgEl.src;
}
function getRandomIdx() {
    return Math.floor(Math.random() * 7);
  }
function handleTime(time, index) {
    setTimeout(checkForWin, 3500);
    setTimeout(() => {
    renderRandomImage(index);
    }, Number(time));
}
    
function getDollars() {
    nan();
    state.money += parseInt(dollarInputEl.value);
    renderCurrentDollars();
    dollarInputEl.value = '';
    coinAudio.play();
}

function renderCurrentDollars() {
    nan();
    totalMessageEl.innerText= '$ ' + state.money + '.00';
}

function renderWin() {
    state.bet *= 10;
    state.betMax *= 10;
    state.money += state.bet;
    state.money += state.betMax;
    state.bet = 0;
    state.betMax = 0;
    winDisplay();
    totalMessageEl.innerText= 'Not bad, for a human...';
    totalMessageEl.style.color = "white";
    setTimeout(renderCurrentDollars, 1000);
    setTimeout(normalTextColor, 1000);
}
function renderLoss() {
    totalMessageEl.innerText= 'Sorry! Spin again!'
    totalMessageEl.style.color = "red";
    setTimeout(renderCurrentDollars, 1000);
    setTimeout(normalTextColor, 1000);
}

function checkForWin() {
    if ((slot123[3] === slot123[2]) && (slot123[1] === slot123[2])) {
        checkForJackpot();
        winAudio.play();
    }
    else {
        renderLoss();
    }
    
}

function checkForJackpot() {
    if (jackpot === 3) {
        renderJackpot();
    }
    else if(bell === 3) {
        renderBells();
    }
    else {
        renderWin();
    }
}
function nan() {
    if (isNaN(state.money) === true) {
        state.money = 0;
        totalMessageEl.innerText = 'Please add funds...';
    }
}
function renderBells() {
    totalMessageEl.style.color = "white";
    totalMessageEl.innerText= 'BOOM! 30X WINNER!';
    state.bet *= 3;
    state.betMax *= 3;
    setTimeout(renderWin, 3000);
}

function renderJackpot() {
    winDisplay();
    state.bet *= 50;
    state.betMax *= 50;
    state.money += state.bet;
    state.money += state.betMax;
    state.bet = 0;
    state.betMax = 0;
    setTimeout(renderCurrentDollars, 10500);
    for (var i = 0; i <=8; i++) {
        if (i%2 === 0) {
            totalMessageEl.style.color = "red";
            setTimeout(function jp1() {totalMessageEl.innerText = 'JACKPOT!!! 50X WINNER!!!';}, `${i}000`);
        }
        else {
            setTimeout(function jp2() {totalMessageEl.innerText = 'YES!!! MONEY MONEY MONEY...';}, `${i}000`);
        }
    }

}

function winDisplay() {
    slot1.src="https://kidfromthe6ix.files.wordpress.com/2014/09/630827963.gif?w=468&h=257&crop=1&zoom=2";
    slot2.src="https://kidfromthe6ix.files.wordpress.com/2014/09/630827963.gif?w=468&h=257&crop=1&zoom=2";
    slot3.src="https://kidfromthe6ix.files.wordpress.com/2014/09/630827963.gif?w=468&h=257&crop=1&zoom=2";
    setTimeout(preSpinDisplay, 3000);
}

function normalTextColor() {
    totalMessageEl.style.color = "black";
}

function clearSlotData() {
    slot123 = {
        '1': {
            imgUrl: ''
        },
        '2': {
            imgUrl: ''
        },
        '3': {
            imgUrl: ''
        }
    };
}
function soundOn() {
    goAudio.play();
    setTimeout(soundOff, 3200);
}
function soundOff() {
    goAudio.pause();
}

function cashout() {
    init();
}
