//Card Class
class card {
    constructor(value, suit){
        if (value < 11){
          this.rank = value//.toString() ?
        }
        else{
          let faceArray =['jack', 'queen', 'king', 'ace']
          this.rank = faceArray[value-11]
        }
        this.suit = suit
        if (suit == 'diamond' || suit == 'heart'){
            this.color = 'red'
        }
        else{
            this.color = 'black'
        }
        this.image = this.rank + suit + ".png"
    }
}
//Deck Generator
function deckGenerator(){
let suitArray = ['heart','club','diamond','spade']
let generatedDeck = []
suitArray.forEach(function(suit){
  for (i=2;i<=14;i++){
    generatedDeck.push(new card(i, suit)) 
} })
return generatedDeck
}

//Generates a random integer from 0 up to the value of randomMax.
function randomUpTo(randomMax) {
  return ((Math.floor(Math.random() * (randomMax + 1))))
}

//Fisher-Yates shuffle
function shuffle (inputArray){
    for(let j=inputArray.length-1;j>0;j--){
        let randomNum = randomUpTo(j)
        let stored = inputArray[randomNum]
        inputArray[randomNum] = inputArray[j]
        inputArray[j] = stored
    }
    return inputArray
}

//Draw randomly from deck
/*
function randomDraw (inputArray){
    randomNum = randomUpTo(inputArray.length)
    return inputArray[randomNum]
    inputArray.splice(randomNum,1)
}*/

var testArray = [1,2,3,4]

let testDeck = deckGenerator()
shuffle(testDeck)
console.log(testDeck)