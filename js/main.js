//CONSTANTS
const lookupPics = [ 0, 1, 2, 3, 4, 5, 6, 7]

const IMAGES = {
    '0': 'images/7.png',
    '1' : 'images/bell.png',
    '2': 'images/bell.png',
    '3': 'images/lemon.jpg',
    '4': 'images/lemon.jpg',
    '5': 'images/leslie.png',
    '6': 'images/leslie.png',
    '7': 'images/leslie.png',
    
}

const goAudio = new Audio('118239__pierrecartoons1979__slot-machine-phrygian.mp3');
goAudio.loop = true;
// /*----- app's state (variables) -----*/
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

/*----- cached element references -----*/
var totalMessageEl = document.getElementById('current-balance');
var dollarInputEl = document.getElementById('input');
var slot1 = document.getElementById('randomImage1');
var slot2 = document.getElementById('randomImage2');
var slot3 = document.getElementById('randomImage3');


/*----- event listeners -----*/

document.getElementById('spin').addEventListener('click', render);
document.getElementById('spinMax').addEventListener('click', renderMax);
document.getElementById('numberBtn').addEventListener('click', getDollars);
document.getElementById('cashout').addEventListener('click', init);



/*----- functions -----*/
init();

function init () {
    totalMessageEl.innerText= 'Welcome!';
    state = {
        money: 0,
        bet: 0,
        betMax: 0
    };
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
    jackpot = 0;
    bell = 0;
    state.bet = 0;
    state.money -= 5;
    state.bet = 5;
    nan();
    soundOn();
    totalMessageEl.innerText = "Spinning...";
    slot1.src = "https://media2.giphy.com/media/26BRFrAgGF6wtebio/giphy.gif?cid=790b761125b6a53b5d2aaef2ae7c6198050d926de8652f49&rid=giphy.gif";
    slot2.src = "https://media2.giphy.com/media/26BRFrAgGF6wtebio/giphy.gif?cid=790b761125b6a53b5d2aaef2ae7c6198050d926de8652f49&rid=giphy.gif";
    slot3.src = "https://media2.giphy.com/media/26BRFrAgGF6wtebio/giphy.gif?cid=790b761125b6a53b5d2aaef2ae7c6198050d926de8652f49&rid=giphy.gif";
    renderSlots();
    
    
}
function spinMax() {
    jackpot = 0;
    bell = 0;
    state.betMax = 0;
    state.money -= 20;
    state.betMax = 20;
    nan();
    soundOn();
    totalMessageEl.innerText = "Spinning...";
    slot1.src = "https://media2.giphy.com/media/26BRFrAgGF6wtebio/giphy.gif?cid=790b761125b6a53b5d2aaef2ae7c6198050d926de8652f49&rid=giphy.gif";
    slot2.src = "https://media2.giphy.com/media/26BRFrAgGF6wtebio/giphy.gif?cid=790b761125b6a53b5d2aaef2ae7c6198050d926de8652f49&rid=giphy.gif";
    slot3.src = "https://media2.giphy.com/media/26BRFrAgGF6wtebio/giphy.gif?cid=790b761125b6a53b5d2aaef2ae7c6198050d926de8652f49&rid=giphy.gif";
    renderSlots();
    
}
function renderSlots () {
    for (let i = 1; i <= 3; i++){
        //two args time/index
        handleTime(`${i}000`, i);
    }  
}
function randomizeImg() {
    var newRand = getRandomIdx();
    //newRand = 0; if you want to check JACKPOT, newRand = 1 if you want to check BELLS
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
    totalMessageEl.innerText= 'BOOM!';
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
            setTimeout(function jp1() {totalMessageEl.innerText = 'JACKPOT!!!';}, `${i}000`);
        }
        else {
            setTimeout(function jp2() {totalMessageEl.innerText = 'YES!!!';}, `${i}000`);
        }
    }

}

function winDisplay() {
    slot1.src="https://media1.giphy.com/media/ADgfsbHcS62Jy/giphy.gif?cid=790b7611901ebc98ceaffef26d291e775b0d62c9b86c72ef&rid=giphy.gif"
    slot2.src="https://media1.giphy.com/media/ADgfsbHcS62Jy/giphy.gif?cid=790b7611901ebc98ceaffef26d291e775b0d62c9b86c72ef&rid=giphy.gif"
    slot3.src="https://media1.giphy.com/media/ADgfsbHcS62Jy/giphy.gif?cid=790b7611901ebc98ceaffef26d291e775b0d62c9b86c72ef&rid=giphy.gif"
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
    setTimeout(soundOff, 3700);
}
function soundOff() {
    goAudio.pause();
}

function cashout() {
    init();
}
