//CONSTANTS
const images = [ '7.png']
const jackpot = 10;
const win = 7;
const bet = 5;

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
var totalMessage = document.getElementById('current-balance');
var dollarInput = document.getElementById('input');







/*----- event listeners -----*/

document.getElementById('spin').addEventListener('click', render);
document.getElementById('spinMax').addEventListener('click', renderMax);
document.getElementById('numberBtn').addEventListener('click', getDollars);



/*----- functions -----*/
init();

function init () {
    totalMessage.innerText= 'Welcome!';
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
        totalMessage.innerText= 'Min bet is $5.00.';
    }    
}
function renderMax() {
    nan();
    if (state.money >= 20) {
        spinMax();
    }
    else {
        totalMessage.innerText= 'Max bet is $20.00.';
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
}
function spinMax() {
    state.betMax = 0;
    state.money -= 20;
    state.betMax = 20;
    nan();
    goAudio.play();
    renderSlots();
    clearSlotData();
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
    var htmlImg = document.getElementById('randomImage' + x);
    htmlImg.src = randomizeImg();
    slot123[x] = htmlImg.src;
    
}

function handleTime(time, index) {
    setTimeout(() => {
        renderRandomImage(index);
        // goAudio.pause();
        totalMessage.innerText = 'SPINNING...';
        if (checkForWin() === true) {
            if (checkForJackpot() === true) {
                renderJackpot();
            }
            else {
                renderWin();
            }
        }
    }, Number(time));
 
}

function getDollars() {
    nan();
    state.money += parseInt(dollarInput.value);
    renderCurrentDollars();
    dollarInput.value = '';
}
 
function renderCurrentDollars() {
    nan();
    totalMessage.innerText= '$ ' + state.money + '.00';
}

function renderWin() {
    totalMessage.innerText = 'Winner!!!!!';
    state.bet *= 10;
    state.betMax *= 10;
    state.money += state.bet;
    state.money += state.betMax;
    state.bet = 0;
    state.betMax = 0;
    renderCurrentDollars();

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
        totalMessage.innerText = 'Please add more funds...';
    }
}

function renderJackpot() {
    totalMessage.innerText = 'JACKPOT!!!';
    state.bet *= 50;
    state.betMax *= 50;
    state.money += state.bet;
    state.money += state.betMax;
    state.bet = 0;
    state.betMax = 0;
    renderCurrentDollars();
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
