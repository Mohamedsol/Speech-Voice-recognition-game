const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:', randomNum)

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// start regcognition and game
recognition.start();

// generate random number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
}

// Capture user speak


function onSpeak(e){
    let msg = e.results[0][0].transcript;
    console.log(msg)
    writeMessage(msg);
    checkNumber(msg);
}

// Check msg against number 

function checkNumber(msg){
    const num = +msg;

    // Check if valid number 
    if(Number.isNaN(num)){
        msgEl.innerHTML += `<div>That is not a vaid number</div>`
        return;
    }

    // check in range 
    if(num > 100 || num < 1){
        msgEl.innerHTML = `<div>Number must be between 1 and 100 </div>`
        return;
    }

    // check number
    if(num === randomNum){
        document.body.innerHTML = `
        <h2>Congrats! You have guessed the number!<br><br>
        It was ${num}</h2>
        <button class="play-again" id="play-again">Play again</button>
        `;
    }else if (num > randomNum){
        msgEl.innerHTML += `<div> GO LOWER </div>`
    } else {
        msgEl.innerHTML += `<div> GO HIGHER </div>`
    }
}

// Write what user speaks
function writeMessage(msg){
    msgEl.innerHTML = `
    <div>You said: </div>
    <span class='box'>${msg}</span>
    `;
}

// speak result 
recognition.addEventListener('result', onSpeak);

// end SR service

recognition.addEventListener('end', () => {
    return recognition.start();
})

document.body.addEventListener('click', (e) => {
    if(e.target.id == 'play-again') {
        window.location.reload();
    }
})


