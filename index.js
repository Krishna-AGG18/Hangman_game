import { wordList } from "./word-list.js";
let wordDisplay = document.querySelector(".word-display");
let guessText = document.querySelector(".guess-text b");
let hangMan = document.querySelector(".hangman-box img");
let gameModal = document.querySelector(".game-modal")
let currentWord, maxGuess = 6, guessMade = 0, wordGuessed = [];
let playAgain = document.querySelector(".game-modal button")
//getting word and hint
const getWordHint = ()=>{
    const {word,hint} = wordList[Math.floor(Math.random()*wordList.length)]
    console.log("Hint : ",hint);        
    let hintDiv = document.querySelector(".hint-text b");
    hintDiv.textContent = hint;
    currentWord = word;
    let wordListArr = word.split("").map(()=> `<li class="letter"></li>`).join("");
    wordDisplay.innerHTML = wordListArr;
}

const gameResult = (isVictory)=>{
    setTimeout(()=>{
        gameModal.classList.add("show")
        gameModal.querySelector("img").src = `images/${isVictory? 'victory' : 'lost'}.gif`
        const modalText = isVictory ? "You guessed the word " : "The correct word was ";
        gameModal.querySelector("h4").innerText = (isVictory)? "You won!" : "Game over!";
        gameModal.querySelector("p").innerHTML = `${modalText}: ${currentWord}`;

    },100)
}
const initGame = (btn,clickedChar)=>{
    if(currentWord.includes(clickedChar)){
        Array.from(currentWord).forEach((letter,index)=>{
            if(letter === clickedChar){
                wordGuessed.push(clickedChar);
                wordDisplay.querySelectorAll(".letter")[index].innerHTML = clickedChar;
                wordDisplay.querySelectorAll(".letter")[index].classList.add("guessed");
            }
        })
        btn.disabled = true;
    }else{
        console.log("Word does not include",clickedChar)
        guessMade++;
        hangMan.src = `images/hangman-${guessMade}.svg`
        guessText.innerHTML = `${guessMade} / 6`;
    }
    
    if(guessMade === maxGuess){ return gameResult(false)}
    if(wordGuessed.length == currentWord.length) { return gameResult(true)}
}
//keyboard button
let keyboardBtnCont = document.querySelector(".keyboard");
for (let i = 65; i < 91; i++) {
    let btn = document.createElement("button");
    btn.textContent = String.fromCharCode(i);
    keyboardBtnCont.appendChild(btn);

    btn.addEventListener("click",(e)=>{
        initGame(e.target,String.fromCharCode(i+32));
    })
}

document.addEventListener("DOMContentLoaded", () => {
    getWordHint();
})

playAgain.addEventListener("click",()=>{
    location.reload();
})
