//If won
//Add to amount left

//If lost
//Check if amount left is 0, if so, end game and say try again?

//Things to display
//House's cards
//Player's cards

var defaultBetAmount = 0;
var defaultAmountLeft = 5000;
$("#amountLeft").val(defaultAmountLeft);

//Place bet
const bet = (e) => {
    e.preventDefault();

    const bet = parseInt($("#bet").val());

    if (bet > defaultAmountLeft){
        alert("Bet is higher than the amount left");
        return;
    }

    defaultAmountLeft = defaultAmountLeft - bet;
    $("#amountLeft").val(defaultAmountLeft)

    defaultBetAmount = defaultBetAmount + bet;
    $("#betAmount").val(defaultBetAmount);

    //Start Game
}

//Hit: Take another card and place it on the table
const hit = (e) => {
    e.preventDefault();

    //Hit another card
}

//Stay: Play with the cards you have
const stay = (e) => {
    e.preventDefault();

    //Let the dealer finish
}

//Finish: End the game and post the Amount Left to the scoreboard
const finish = (e) => {
    e.preventDefault();
    const amountLeft = $("#amountLeft").val();
    const name = prompt('Please enter your name');
    const score = {Name: name,Score: amountLeft};

    return score
}

//Button "click" Event Listeners
$("#placeBet").on("click", bet);
$(".hitButton").on("click", hit);
$(".stayButton").on("click", stay);
$(".finishButton").on("click", finish);
