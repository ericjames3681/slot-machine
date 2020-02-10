//CONSTANTS
const images = ['cherries.png', 'bell.png'] ;
const jackpot = 10;
const win = 7;
const bet = 5;

// console.log(imagesArray[0]);

const goAudio = new Audio('118239__pierrecartoons1979__slot-machine-phrygian.mp3');
const reelAudio = new Audio('415074__aghirlandaio__slot-machine-reels-sound.m4a');
// /*----- app's state (variables) -----*/
var state = {
    money: 0,
    bet: 0
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

/*----- cached element references -----*/
var totalMessage = document.getElementById('current-balance');
var dollarInput = document.getElementById('input');






/*----- event listeners -----*/

document.getElementById('spin').addEventListener('click', render);
document.getElementById('numberBtn').addEventListener('click', getDollars);


/*----- functions -----*/
function init () {
    totalMessage.innerText= 'Welcome!';
    console.log(totalMessage);
    render();
}

function render() {

    if (state.money >= 5) {
        spin();
    }
    else {
        totalMessage.innerText= 'Min bet is $5.00.';
    }
}
function spin() {
    state.bet = 0;
    state.money -= 5;
    state.bet += 5;
    reelAudio.play(3);
    renderCurrentDollars();
    goAudio.play();
    reelAudio.play();
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
    var htmlImg = document.getElementById('randomImage' + x);
    htmlImg.src = randomizeImg();
    slot123[x] = htmlImg.src;
    
}

function handleTime(time, index) {
    setTimeout(() => {
        renderRandomImage(index);
        if ( checkForWin() === true ) {
            renderWin();
        }
        totalMessage.innerText = 'SPINNING...';
        goAudio.pause();
        renderCurrentDollars();
    }, Number(time));
}

function getDollars() {
    state.money += parseInt(dollarInput.value);
    renderCurrentDollars();
    dollarInput.value = '';
}
 
function renderCurrentDollars() {
    totalMessage.innerText= '$ ' + state.money + '.00';
}

function renderWin() {
    totalMessage.innerText = 'Winner!!!!!';
    state.bet *= 20;
    state.money += state.bet;
}

function checkForWin() {
    if ((slot123[3] === slot123[2]) && (slot123[1] === slot123[2])) {
        return true;
    }
    else {
        return false;
    }

}

