/*----- constants -----*/
const slot123 = {
    slot1: {
        bell: 'bell.png',
        cherries: 'cherries.png',
        leslie: 'leslie.png'
    },
    slot2: {
        bell: 'bell.png',
        cherries: 'cherries.png',
        leslie: 'leslie.png'
    },
    slot3: {
        bell: 'bell.png',
        cherries: 'cherries.png',
        leslie: 'leslie.png'
    }
    
};
// var imagesArray = ['bell.png', 'cherries.png', 'leslie.png']

// console.log(imagesArray[0]);

const goAudio = new Audio('http://soundbible.com/mp3/shooting_star-Mike_Koenig-1132888100.mp3');
/*----- app's state (variables) -----*/

let isWinner = false;
let total = 0;



/*----- cached element references -----*/
// const pScoreEl = document.querySelector('#player h2');
// const cScoreEl = document.querySelector('#computer h2');
// const tScoreEl = document.querySelector('#middle h2');

// const pResultEl = document.querySelector('#player div div');
// const cResultEl = document.querySelector('#computer div div');

// const countdownEl = document.querySelector('#middle div');

// var x = document.createElement("img");
total = document.getElementById("input".value);
console.log(total);
goAudio.play();


/*----- event listeners -----*/

document.querySelector('button').addEventListener('click', init);


/*----- functions -----*/
function init () {
    render();
}

function render() {
    randomizeImg();
    renderCurrentDollars();
    renderSpin();
    if (isWinner === true)
        renderWin();

}

function randomizeImg(obj) {

    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];

}


function renderCurrentDollars() {

}

function renderSpin() {

}

function renderWin() {

}







