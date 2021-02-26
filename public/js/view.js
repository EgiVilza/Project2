//click on the buttons to perform the actions
//Place Bet - Add to the bet amount, subtract amount left
//Hit - Add another card
//Stay - End Hitting
//Finish - Prompt for username and post to scoreboard

//If won
//Add to amount left

//If lost
//Subtract to amount left
//Check if amount left is 0, if so, end game and say try again?

//Things to display
//House's cards
//Player's cards

var betAmount = 0

const bet = (e) => {
    e.preventDefault();
    const bet = parseInt($("#bet").val());
    betAmount = betAmount + bet;
    $("#betAmount").val(betAmount);
}

const hit = (e) => {
    e.preventDefault();
}

const stay = (e) => {
    e.preventDefault();
}
const finish = (e) => {
    e.preventDefault();
}

//Button "click" Event Listeners
$("#placeBet").on("click", bet);
$(".hitButton").on("click", hit);
$(".stayButton").on("click", stay);
$(".finishButton").on("click", finish);
