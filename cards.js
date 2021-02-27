//Inquirer included for testing purposes
const inquirer = require('inquirer')

//Class for inquirer questions
class question{
  constructor(...parameters){
      this.type = parameters[0]
      this.name = parameters[1]
      this.message = parameters[2]
      if(parameters[3]){
          this.choices = parameters[3]
      }
  }
}

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

//Deck Class
class deck{
  constructor(cards){
  this.cards = deckGenerator()
  }
    //Fisher-Yates shuffle
  shuffle(){
    for(let j=this.cards.length-1;j>0;j--){
        let randomNum = randomUpTo(j)
        let stored = this.cards[randomNum]
        this.cards[randomNum] = this.cards[j]
        this.cards[j] = stored
    }
  }
}

//Generates a random integer from 0 up to the value of randomMax.
function randomUpTo(randomMax) {
return ((Math.floor(Math.random() * (randomMax + 1))))
}

//Class for card agent
class cardAgent{
constructor(stand, score, bust, hand){
  this.stand = stand
  this.score = score
  this.bust = bust
  this.hand = hand
}
  //Sets this.stand to true to indicate player is satisfied with current score
  setStand(){
    this.stand = true
  }
  drawCard(deck){
      //Destroys a card in the provided deck, pushes it to hand
    this.hand.push(deck.cards.pop())
      //Rescores the player's hand
    this.scoreHand()
    }
  //Scores the player hand
  scoreHand(){
    let aceCount = 0
    let score = 0
    //Adds the score from number and face cards and counts the aces
    for(let i = 0; i<this.hand.length; i++){
      if (typeof this.hand[i].rank == 'number'){
        score += this.hand[i].rank
      }
      else if(this.hand[i].rank == 'ace'){
        aceCount += 1
      }
      else{
        score += 10
      }

  }
  //For each Ace, asks if adding 10 would cause the player to break and if so, adds 1 instead
    for(let j = 0; j < aceCount; j++){
      if((score + 11)<=21){
        score += 11
      }
      else{
        score += 1
      }
    }
    this.score = score
    //If player's score is greater than 21, player has busted
    if(score>21){
        this.bust = true
    }
    if(score == 21){
      this.setStand()
    }
  }
}

//Class for player
class player extends cardAgent{
constructor(name, bank){
  super(false, 0, false, [])
  this.name = name
  this.bank = bank
  this.currentBet = 0
}
bet(amount){
  this.bank -= amount
  this.currentBet += amount
}
}

//Class for dealer
class dealer extends cardAgent{
  constructor(){
    super(false, 0, false, [])
    this.faceDown = []
  }
  faceDownDraw(deck){
    this.faceDown.push(deck.cards.pop())
  }
  turnOver(){
    this.hand.push(this.faceDown[0])
    this.scoreHand()
  }
  dealerTurn(deck){
    //If it's the first turn, draws a card face down and card into its hand
    if(this.faceDown.length == 0){
      this.faceDownDraw(deck)
      this.drawCard(deck)
    }
    //If hand length and face down length are equal to 1, indicating dealer is on their second turn, dealer turns over face down card
    else if((this.faceDown.length == 1) && (this.hand.length == 1)){
    this.turnOver()
    }
    //If the score of cards in hand is less than 17, draws another
    else if(this.score < 17){
      this.drawCard(deck)
    }
    else{
    // Dealer stands if they're 17 or higher
      this.setStand()
    }
    }
  }

  function start(){      
  //Asks for a name to generate player
  inquirer.prompt([
    new question('input', 'nameInput', 'What is your name?')
  ]).then(answers =>{
    //Generates a player by inputted name and gives them 1000 currency in their bank to start with
    let testPlayer = new player (answers.nameInput, 1000)
    newRound(testPlayer.name, testPlayer.bank)
  })
}

  function newRound(playerName, playerBank){
    //Refreshes the player
    let testPlayer = new player(playerName, playerBank)
    //Generates a new dealer
    let testDealer = new dealer()
    //Generates deck
    let testDeck = new deck
    //Shuffles deck
    testDeck.shuffle()

  inquirer.prompt([
    //Player is prompted about how much they would like to bet on this hand
     new question('input', 'betInput', 'What would you like to bet?')
   ]).then(answers =>{
    //Sets bet from bank
    testPlayer.bet(answers.betInput)
    //Reports to player what the bet is and what remains in bank
    console.log('You have bet: ' + testPlayer.currentBet + ' You have: ' + testPlayer.bank + ' remaining in your bank!')
    //Player draws two cards
    testPlayer.drawCard(testDeck)
    testPlayer.drawCard(testDeck)
    //Dealer takes their first turn wherein they will draw a card face up and face down
    testDealer.dealerTurn(testDeck)
    //Logs current hand and dealer's card to player
    console.log('Your cards: ')
    console.log(testPlayer.hand)
    console.log('Dealer\'s card: ')
    console.log(testDealer.hand)
    playerTurn(testPlayer, testDealer, testDeck)
    })
  }
  
  function playerTurn(inputPlayer, inputDealer, inputDeck){
    let testPlayer = inputPlayer
    let testDealer = inputDealer
    let testDeck = inputDeck
    if(testPlayer.bust){
      //If the player has busted, it sends them to a new round and takes their bet from them
      console.log('You busted. You lose your bet. New round starting.')
      return newRound(testPlayer.name, testPlayer.bank)
    }
    if(testPlayer.score == 21){
      //If the player is at 21 exactly, they win 1.5 times their bet and are sent to a new round
      console.log('You hit 21! You are rewarded 1.5 times your bet!')
      let newBankTotal = testPlayer.bank + (testPlayer.currentBet*1.5)
      return newRound(testPlayer.name, newBankTotal)
    }
    inquirer.prompt([
      //Otherwise the player is asked to draw a card or stand
      new question('list','decision','What would you like to do?', ['Draw a card!', 'Stand!'])
    ]).then( answers =>{
      if(answers.decision == 'Draw a card!'){
        //Player draws a new card
        testPlayer.drawCard(testDeck)
        console.log('You draw a card!')
        console.log('New hand: ')
        //Logs player their new hand
        console.log(testPlayer.hand)
        //Starts a new playerTurn
        playerTurn(testPlayer, testDealer, testDeck)
      }
      else if(answers.decision == 'Stand!'){
        //Sets player's stand status to 'true'
        testPlayer.setStand()
        console.log('You have decided to stand!')
        //Dealer completes turns until he either busts or stands
        for(let z = 0; !testDealer.bust && !testDealer.stand; z++){
          testDealer.dealerTurn(testDeck)
        }
        if (testDealer.bust){
          console.log('Dealer has busted, you get 2 times your bet!')
          let newBankTotal = testPlayer.bank + (testPlayer.currentBet*2)
          return newRound(testPlayer.name, newBankTotal)
        }
        else{
          console.log('Dealer\'s score is ' + testDealer.score)
          console.log(testPlayer.name + '\'s score is ' + testPlayer.score)
          if (testPlayer.score == testDealer.score){
            console.log('You have tied with the dealer! You neither win or lose money')
            let newBankTotal = testPlayer.bank + testPlayer.currentBet
           return newRound(testPlayer.name, newBankTotal)
          }
          else if(testPlayer.score > testDealer.score){
            console.log('You have won the hand, you get 2 times your bet!')
            console.log(testDealer)
            let newBankTotal = testPlayer.bank + (testPlayer.currentBet*2)
           return newRound(testPlayer.name, newBankTotal)
          }
          else{
            console.log('You have lost the hand, you lose your bet.')
           return newRound(testPlayer.name, testPlayer.bank)
          }
        }
      }
    })
  }
start()