//const  = prompt("What is your name");

//Classes
const ddeck = new deck(); //generatedDeck from the api
const dplayer = new player("Egi", 5000); //generatedPlayer from the api
const ddealer = new dealer(); //generatedDealer from the api

//Default Bet Amount
var defaultBetAmount = 0;
// dplayer.currentBet, if we want
//Default Amount Left
var defaultAmountLeft = dplayer.bank;

//Place bet, Just needs "start game" function
const bet = e => {
  e.preventDefault();

  //If bet amount is greater than amount left, alert user
  if (bet > defaultAmountLeft) {
    alert("Bet is higher than the amount left");
    return;
  }

  //Bet Amount
  const bet = parseInt($("#bet").val());
  dplayer.currentBet = bet;
  console.log(dplayer.currentBet);

  //Updates amount left after bet has been placed
  defaultAmountLeft = defaultAmountLeft - bet;
  $("#amountLeft").val(defaultAmountLeft);

  //Updates bet amount
  defaultBetAmount = defaultBetAmount + bet;
  $("#betAmount").val(defaultBetAmount);

  //Start Game
  //Player draws two cards to hand
  dplayer.drawCard(ddeck);
  dplayer.drawCard(ddeck);
  //Dealer completes first turn
  ddealer.dealerTurn(ddeck);
};

//Hit: Take another card and place it on the table
const hit = e => {
  e.preventDefault();
  dplayer.drawCard(ddeck);
  if (dplayer.bust) {
    //Player's hand busted, player loses bet
  }
  if (dplayer.score === 21) {
    //Player wins, gets 1.5 times bet
  }
  //Hit another card
};

//Stay: Play with the cards you have
const stay = e => {
  e.preventDefault();
  dplayer.setStand();
  //Completes every dealer turn until dealer busts or decides to stand
  for (let z = 0; !ddealer.bust && !ddealer.stand; z++) {
    ddealer.dealerTurn(ddeck);
  }
  if (ddealer.bust) {
    //Player wins 2x bet
  } else if (dplayer.score > ddealer.score) {
    //Player wins 2x bet
  } else if (dplayer.score === ddealer.score) {
    //Nobody wins, player gets bet back
  } else {
    //Player loses because dealer has a higher score, player loses the bet
  }
};

//Finish: End the game and post the Amount Left to the scoreboard
const finish = e => {
  e.preventDefault();
  const amountLeft = $("#amountLeft").val();
  const name = dplayer.name;
  const score = { Name: name, Score: amountLeft };

  //Add score to database
  return score;
};

//Button "click" Event Listeners
$("#placeBet").on("click", bet);
$(".hitButton").on("click", hit);
$(".stayButton").on("click", stay);
$(".finishButton").on("click", finish);

//If won
//Add to amount left

//If lost
//Check if amount left is 0, if so, end game and add an option to try again

//Things to display
//House's cards
//Player's cards

// const insertPlayerAmount = e => {
//   e.preventDefault();
//   const playerAmount = $("#amountLeft").val();
//   const dplayer = {};
//   if (dplayer.bank) {
//     fetch("/startUp", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(amountTest)
//     })
//       .then(results => results.json())
//       .then(getPlayer());
//   }
// };

// const getPlayer = () => {
//   fetch("/startUp", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })
//     .then(response => response.json())
//     .then(data => {
//       defaultAmountLeft = data;
//       console.log(de);
//     });
// };
