// /*----- constants -----*/
const state = {
	money: {
		player: 0,
		bet: 0,
		win: 0
	}
}
const slot123 = {
    1: {
      imgUrl: 'leslie.png'
    },
    2: {
      imgUrl: 'cherries.png'
    },
    3: {
        imgUrl: 'bell.png'
    }
};
// var imagesArray = ['bell.png', 'cherries.png', 'leslie.png']

// console.log(imagesArray[0]);

// const goAudio = new Audio('http://soundbible.com/mp3/shooting_star-Mike_Koenig-1132888100.mp3');
// /*----- app's state (variables) -----*/

var images = ['cherries.png', 'bell.png', 'leslie.png'];
// let isWinner, total, betMinus, betPlus;



/*----- cached element references -----*/
// const pScreen1 = document.querySelector('#player h2');
// const cScoreEl = document.querySelector('#computer h2');
// const tScoreEl = document.querySelector('#middle h2');

// const pResultEl = document.querySelector('#player div div');
// const cResultEl = document.querySelector('#computer div div');

// const countdownEl = document.querySelector('#middle div');

// var x = document.createElement("img");




/*----- event listeners -----*/

document.querySelector('button').addEventListener('click', spin);


/*----- functions -----*/
function init () {
    render();
    return;
}

function render() {
    spin();
    if (isWinner === true)
        renderWin();
        renderCurrentDollars();
    return;
}
function renderSlots () {
    for (let i = 1; i <= 3; i++){
        renderRandomImage(i);

    }
}
function randomizeImg() {
    var image = images[Math.floor(Math.random()*images.length)];
    return image;
}
function renderRandomImage(x){
    var htmlImg = document.getElementById('randomImage' + x);
    htmlImg.src = randomizeImg();
}

function spin() {
    renderSlots();
    renderCurrentDollars();
}

function renderCurrentDollars() {
    return;
}

function renderSpin() {
    return;
}

function renderWin() {
    return;
}

