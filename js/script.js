//Challenge 1  Your age in Days
function ageinDays() {
    var birthyear = prompt("Whay year were you born?");
    var result = (2020 - birthyear) * 356;
    var h1 = document.createElement('h1');
    var text = document.createTextNode('You are ' + result + ' days old.');
    h1.setAttribute('id', 'ageinDays');
    h1.appendChild(text);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageinDays').remove();
}

//Challenge 2  Cat Generator
function generateCat() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "https://api.thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

//Challenge 3  Rock, Paper, Scissors
function rpsGame(yourChoise) {
    console.log(yourChoise);
    var humanChoice, bootChoice;
    humanChoice = yourChoise.id;
    bootChoice = randombot();
    result = decideWinner(humanChoice, bootChoice);
    message = finalMessage(result);
    rpsFrontEnd(yourChoise.id, bootChoice, message);
}

function randombot() {
    number = Math.floor(Math.random() * 3);
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(humanChoice, bootChoice) {
    var aux = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'scissors': 0, 'rock': 1, 'paper': 0.5 },
        'scissors': { 'scissors': 0.5, 'rock': 0, 'paper': 1 }

    };
    var yourScore = aux[humanChoice][bootChoice];
    var computerScore = aux[bootChoice][humanChoice];
    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return { 'message': 'You Lost!', 'color': 'red' };
    } else if (yourScore === 0.5) {
        return { 'message': 'You Tied!', 'color': 'yellow' };
    } else if (yourScore === 1) {
        return { 'message': 'You Won!', 'color': 'green' };
    }
}
var humanDiv = document.createElement('div');
var bootDiv = document.createElement('div');
var messageDiv = document.createElement('div');

function rpsFrontEnd(humanImageChoise, bootImageChoice, finalMessage) {
    var images = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,

    };
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();




    humanDiv.innerHTML = "<img src='" + images[humanImageChoise] + "' height=190 width=230 style ='filter: drop-shadow(0px 0px 30px purple); '>";
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + finalMessage['message'] + "</h1>";
    bootDiv.innerHTML = "<img src='" + images[bootImageChoice] + "' height=190 width=230 style ='filter: drop-shadow(0px 0px 30px black); '>";

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(bootDiv);


}

function again() {
    //humanDiv.remove();
    //bootDiv.remove();
    //messageDiv.remove();
    //rockk = document.getElementById('rock');
    //document.getElementById('flex-box-rps-div').appendChild(rock);
    location.reload();
}

//Challenge 4  Change the Color of all Buttons
var all_buttons = document.getElementsByTagName('button');
console.log(all_buttons);
var all_buttonscopy = [];
for (let i = 0; i < all_buttons.length; i++) {
    all_buttonscopy.push(all_buttons[i].classList[1]);
}

function colorbutton(button) {
    if (button.value == 'red') {
        redbuttons();
    } else if (button.value == 'green') {
        greenbuttons();
    } else if (button.value == 'reset') {
        resetbuttons();
    } else if (button.value == 'random') {
        randombuttons();
    }
}

function redbuttons() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function greenbuttons() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function resetbuttons() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(all_buttonscopy[i]);
    }
}

function randombuttons() {
    var choices = ['btn-primary', 'btn-success', 'btn-info', 'btn-warning', 'btn-danger'];
    for (let i = 0; i < all_buttons.length; i++) {
        var randomnr = Math.floor(Math.random() * choices.length);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomnr]);
    }
}

//Challenge 5  Blackjack
let blackjackgame = {
    'you': { 'scorespan': '#your-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scorespan': '#dealer-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'Q', 'K'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};
const YOU = blackjackgame['you']
const DEALER = blackjackgame['dealer']

const hitsound = new Audio('music/swish.m4a')
const bjclick = new Audio('music/click_s7.mp3')
const winsound = new Audio('music/cash.mp3')
const losssound = new Audio('music/aww.mp3')



document.querySelector('#hit-button').addEventListener('click', blackjackhit);
document.querySelector('#stand-button').addEventListener('click', dealerlogic);
document.querySelector('#deal-button').addEventListener('click', blackjackdeal);


function blackjackhit() {
    if (blackjackgame['isStand'] === false) {

        bjclick.play();
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }


}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackgame['cards'][randomIndex];
}

function showCard(card, activeplayer) {


    if (activeplayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `extra/${card}2.png`;
        document.querySelector(activeplayer['div']).appendChild(cardImage);
        hitsound.play();
    }
}

function blackjackdeal() {
    if (blackjackgame['turnsOver'] === true) {
        bjclick.play();
        blackjackgame['isStand'] = false;
        let yourimages = document.querySelector('#your-box').querySelectorAll('img');
        for (let i = 0; i < yourimages.length; i++) {
            yourimages[i].remove();

        }
        let dealerimages = document.querySelector('#dealer-box').querySelectorAll('img');
        for (let i = 0; i < dealerimages.length; i++) {
            dealerimages[i].remove();

        }
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-result').textContent = 0;
        document.querySelector('#dealer-result').textContent = 0;
        document.querySelector(YOU['scorespan']).style.color = 'black';
        document.querySelector(DEALER['scorespan']).style.color = 'black';
        document.querySelector('#jack-result').textContent = "Let's play!";
        document.querySelector('#jack-result').style.color = 'black';

        blackjackgame['turnsOver'] = true;
    }
}

function updateScore(card, player) {
    if (card === 'A') {
        if (player['score'] + blackjackgame['cardsMap'][card][1] <= 21) {
            player['score'] += blackjackgame['cardsMap'][card][1];
        } else {
            player['score'] += blackjackgame['cardsMap'][card][0];
        }
    } else {
        player['score'] += blackjackgame['cardsMap'][card];
    }
}

function showScore(player) {
    if (player['score'] > 21) {
        document.querySelector(player['scorespan']).textContent = 'BUST!';
        document.querySelector(player['scorespan']).style.color = 'red';
    } else {
        document.querySelector(player['scorespan']).textContent = player['score'];
        document.querySelector(player['scorespan']).style.color = 'black';

    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function dealerlogic() {
    blackjackgame['isStand'] = true;
    while (DEALER['score'] < 16 && blackjackgame['isStand'] === true) {
        bjclick.play();
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }


    blackjackgame['turnsOver'] = true;
    showResult(computeWinner());

}

function computeWinner() {
    let winner;
    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackgame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackjackgame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackjackgame['draws']++;

        }

    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackgame['losses']++;
        winner = DEALER;
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackgame['draws']++;
    }
    console.log('Winner is ', winner);
    return winner;
}

function showResult(winner) {

    let message, messagecolor;

    if (blackjackgame['turnsOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackgame['wins'];
            message = 'You won!';
            messagecolor = 'green';
            winsound.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackgame['losses'];
            message = 'You lost!';
            messagecolor = 'red';
            losssound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackgame['draws'];
            message = 'You drew!';
            messagecolor = 'black';
        }
        document.querySelector('#jack-result').textContent = message;
        document.querySelector('#jack-result').style.color = messagecolor;
    }
}