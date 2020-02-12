//CONSTANTS
const images = [ '7.png', 'cherries.png', 'lemon.jpg', 'leslie.png']


// console.log(imagesArray[0]);

const goAudio = new Audio('118239__pierrecartoons1979__slot-machine-phrygian.mp3');
const reelAudio = new Audio('337079__tieswijnen__bicycle-spokes.aiff');
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
var simpsonsGifEl = document.getElementById('gif');








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
    goAudio.play();
    renderSlots();
    clearSlotData();
    renderCurrentDollars();
    goAudio.pause();
}
function spinMax() {
    state.betMax = 0;
    state.money -= 20;
    state.betMax = 20;
    nan();
    goAudio.play();
    renderSlots();
    renderCurrentDollars();
    clearSlotData();
    goAudio.pause();
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
    setTimeout(() => {
        renderRandomImage(index);
        totalMessageEl.innerText = "Spinning...";
        if (checkForWin() === true) {
            if (checkForJackpot() === true) {
                renderJackpot();
            }
            else {
                renderWin();
            }
        }
        else {
            renderLoss();
        }

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
    renderCurrentDollars();
    clearSlotData();
}
function renderLoss() {
    renderCurrentDollars();
    clearSlotData();
}

function checkForWin() {
    if ((slot123[3] === slot123[2]) && (slot123[1] === slot123[2])) {
        return true;
    }
    else {
        return false;
    }
}
function checkForJackpot() {
    if (slot123[1] === "file:///Users/apple/code/slot-machine/7.png") {
        return true;
    }
    else {
        return false;
    }
}
function nan() {
    if (isNaN(state.money) === true) {
        state.money = 0;
        totalMessageEl.innerText = 'Please add funds...';
    }
}

function renderJackpot() {
    totalMessageEl.innerText = 'JACKPOT!!!';
    state.bet *= 50;
    state.betMax *= 50;
    state.money += state.bet;
    state.money += state.betMax;
    state.bet = 0;
    state.betMax = 0;
    renderCurrentDollars();
    clearSlotData();
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
function cashout() {
    init();
}
