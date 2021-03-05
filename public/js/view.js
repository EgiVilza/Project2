//let name = prompt("Please enter your name");

//Classes
let ddeck = new deck(); //generatedDeck from the api
const dplayer = new player("Egi", 5000); //generatedPlayer from the api
let ddealer = new dealer(); //generatedDealer from the api

//Shuffle Deck
ddeck.shuffle();

//Place bet, Just needs "start game" function
const bet = e => {
  e.preventDefault();

  //Remove Rules
  $(".displayToggle").css({ display: "none" });

  //Bet Amount from the front end
  const betAmount = parseInt($("#bet").val());

  //If bet amount is greater than amount left, alert user
  if (betAmount > dplayer.bank) {
    alert("Bet is higher than the amount left");
    return;
  } else if ($("#bet").val() === "" || $("#bet").val() === 0) {
    alert("Must add bet");
    return;
  }
  //Hide Submit Score button
  if (!$(".finishButton")[0].classList.contains("disabled")) {
    $(".finishButton")[0].classList.add("disabled");
  }

  // if ($(".finishButton").classList.contains("disabled")) {
  //   console.log("Removing Button");
  //   $(".finishButton").classList.add("disabled");
  // }

  //Update Current Bet
  dplayer.currentBet = betAmount;

  //Updates amount left after bet has been placed
  dplayer.bank = dplayer.bank - betAmount;
  $("#amountLeft").text(dplayer.bank);

  //Updates bet amount on the front end
  $("#betAmount").val(dplayer.currentBet);

  //Start Game
  //Player draws two cards to hand
  dplayer.drawCard(ddeck);
  dplayer.drawCard(ddeck);

  //Render Player's Cards
  renderPlayersCards();

  //Dealer completes first turn
  ddealer.dealerTurn(ddeck);

  //Render Dealer's Cards
  renderDealersCards();

  //Score results are checked if bust or blackjack
  checkResults();
};

//Hit: Take another card and place it on the table
const hit = e => {
  e.preventDefault();

  //Player draws card
  dplayer.drawCard(ddeck);

  //Card is rendered
  renderPlayersCards();

  //Score results is checked if bust or blackjack
  checkResults();
};

//Stay: Play with the cards you have
const stay = e => {
  e.preventDefault();

  //Update player stand to true
  dplayer.setStand();

  //Check Results
  checkResults();
};

//Finish: End the game and post the Amount Left to the scoreboard
const finish = e => {
  e.preventDefault();
  //Records name and bank for leaderboard
<<<<<<< HEAD
  const score = { Name: name, Score: dplayer.bank };

  alert("Score is added to leaderboard");
  //Return score to be added onto the leaderboard and the database
=======
  const score = {
    name: dplayer.name,
    balance: dplayer.bank
  };

  fetch("/api/leaderboard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(score)
  })
    .then(response => {
      response.json();
      window.location.href = "./leaderboard";
    })
    .catch(error => {
      console.error("Error:", error);
    });
>>>>>>> 8aa0966d38b61206dbcfcb174d0db2e4acb66a34
  return score;
};

//Render Player's Cards
const renderPlayersCards = () => {
  const playersHand = $(".playersHand");
  //Empties current hand to re-display hand
  playersHand.empty();

  //For each card in hand, create an image element and add the image source attribute
  dplayer.hand.forEach(element => {
    const cardImage = $("<img>");
    const imgSrc = "/Public/Images/CardFaces/" + element.image;

    cardImage.attr({
      src: imgSrc,
      class: "cards"
    });

    //Append card image to the frontend
    playersHand.append(cardImage);
  });
};

//Render Dealer's Cards
const renderDealersCards = () => {
  const dealersHand = $(".dealersHand");
  //Empties current hand to re-display hand
  dealersHand.empty();

  //For each card in hand, create an image element and add the image source attribute
  ddealer.hand.forEach(element => {
    const cardImage = $("<img>");
    const imgSrc = "/Public/Images/CardFaces/" + element.image;

    cardImage.attr({
      src: imgSrc,
      class: "cards"
    });

    //Append card image to the frontend
    dealersHand.append(cardImage);
  });
};

//Check if player/dealer busted/won/tie
const checkResults = () => {
  //If player stand is true
  if (dplayer.stand) {
    //Completes every dealer turn until dealer busts or decides to stand
    for (let z = 0; !ddealer.bust && !ddealer.stand; z++) {
      ddealer.dealerTurn(ddeck);
      renderDealersCards();
    }

    //Result Conditions
    if (ddealer.bust) {
      //Player wins 2x bet
      dplayer.bank = dplayer.bank + dplayer.currentBet * 2;
      gameText("Dealer Busted!!! Gain 2x the bet");
    } else if (dplayer.score > ddealer.score) {
      //Player wins 2x bet
      dplayer.bank = dplayer.bank + dplayer.currentBet * 2;
      gameText("Player wins! Gain 2x the bet");
    } else if (dplayer.score === ddealer.score) {
      //Nobody wins, player gets bet back
      dplayer.bank = dplayer.bank + dplayer.currentBet;
      gameText("Tie. Player keeps the bet");
    } else {
      //Player loses because dealer has a higher score, player loses the bet
      gameText("Dealer Scored Higher :(. Player loses the bet");
    }
  } else {
    if (dplayer.bust) {
      //Player's hand busted, player loses bet, round is over
      gameText("Busted!");
    } else if (dplayer.score === 21) {
      const hand = dplayer.hand;

      //Multiplier variable
      let betMultiplier = 1.5;

      //If player gets BlackJack with 2 cards in hand, get 1.5x the bet, else 2x the bet
      if (hand.length === 2) {
        betMultiplier = 1.5;
      } else {
        betMultiplier = 2;
      }

      //Update player bank
      dplayer.bank = dplayer.bank + dplayer.currentBet * betMultiplier;
      //Display text
      gameText("BlackJack!!!");
    }
  }
};

//Refreshes the player's and dealer's stats and refreshes the game board
const nextRound = () => {
  //Refresh the front end values
  $(".playersHand").empty();
  $(".dealersHand").empty();
  $("#bet").val(0);
  $("#betAmount").val(0);

  //Display Rules
  $(".displayToggle").css({ display: "" });

  //Update amount left
  $("#amountLeft").text(dplayer.bank);

  //Reset player's current bet
  dplayer.currentBet = 0;

  //Reset player's stand to false
  dplayer.stand = false;

  //Reset bust property
  dplayer.bust = false;

  //Empties player's hand
  dplayer.hand = [];

  //Refresh game text
  gameText("");

  //New Deck
  ddeck = new deck();

  //Shuffle Deck
  ddeck.shuffle();

  //New Dealer (This is to refresh the dealer's hand)
  ddealer = new dealer();

  //Add id attribute to remove button
  $(".resetButton").attr("id", "resetBtn");
  // Show submit button
  $(".finishButton")[0].classList.remove("disabled");
};

//Function to change the game text based on the result of the game
const gameText = text => {
  $(".gameText").text(text);
  $("#resetBtn").removeAttr("id");
};

//Button "click" Event Listeners
$("#placeBet").on("click", bet);
$(".hitButton").on("click", hit);
$(".stayButton").on("click", stay);
$(".finishButton").on("click", finish);
$(".resetButton").on("click", nextRound);
