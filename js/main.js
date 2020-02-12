//CONSTANTS
const images = [ 'images/7.png' ]


const goAudio = new Audio('118239__pierrecartoons1979__slot-machine-phrygian.mp3');
const reelAudio = new Audio('337079__tieswijnen__bicycle-spokes.aiff');
reelAudio.loop = true;
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
    var image = images[Math.floor(Math.random()*images.length)];
    return image;
}
function renderRandomImage(x){
    var htmlImgEl = document.getElementById('randomImage' + x);
    htmlImgEl.src = randomizeImg();
    slot123[x] = htmlImgEl.src;
    
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
    setTimeout(function win() {totalMessageEl.innerText= 'Not bad, for a human...';}, 500);
    setTimeout(renderCurrentDollars, 1000);

}
function renderLoss() {
    setTimeout(function loss() {totalMessageEl.innerText= 'Sorry! Spin again!';}, 600);
    setTimeout(renderCurrentDollars, 1000);

}

function checkForWin() {
    if ((slot123[3] === slot123[2]) && (slot123[1] === slot123[2])) {
        checkForJackpot();
        renderWin();
    }
    else {
        renderLoss();
    }
 
}
function checkForJackpot() {
    if (slot123[1] === "images/7.png") {
        renderJackpot();
    }
}
function nan() {
    if (isNaN(state.money) === true) {
        state.money = 0;
        totalMessageEl.innerText = 'Please add funds...';
    }
}

function renderJackpot() {
    winDisplay();
    state.bet *= 50;
    state.betMax *= 50;
    state.money += state.bet;
    state.money += state.betMax;
    state.bet = 0;
    state.betMax = 0;
    setTimeout(renderCurrentDollars, 13500);
    for (var i = 0; i <=13; i++) {
        if (i%2 === 0) {
            setTimeout(function jp1() {totalMessageEl.innerText = 'JACKPOT!!!';}, `${i}000`);
        }
        else {
            setTimeout(function jp2() {totalMessageEl.innerText = 'YES!!!';}, `${i}000`);
            totalMessageEl.style.color = "black";
        }
    }

}
function winDisplay() {
    slot1.src="https://media2.giphy.com/media/12Eo7WogCAoj84/giphy.gif?cid=790b76113dbd472eb32e7e8357c7f176ea0ec4dc3f7830a6&rid=giphy.gif"
    slot2.src="https://media2.giphy.com/media/12Eo7WogCAoj84/giphy.gif?cid=790b76113dbd472eb32e7e8357c7f176ea0ec4dc3f7830a6&rid=giphy.gif"
    slot3.src="https://media2.giphy.com/media/12Eo7WogCAoj84/giphy.gif?cid=790b76113dbd472eb32e7e8357c7f176ea0ec4dc3f7830a6&rid=giphy.gif"
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
    setTimeout(soundOff, 4000);
}
function soundOff() {
    goAudio.pause();
}

function cashout() {
    init();
}
