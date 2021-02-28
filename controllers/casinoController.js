const express = require("express");
const orm = require("../config/orm.js");
const { card, deck, cardAgent, player, dealer } = require("../public/js/cards.js");
const router = express.Router();

// // Import the model (cat.js) to use its database functions.
// const cat = require('../models/');

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/scoreboard", (req, res) => {
  //render template through handlebars
  const scoreObject = orm.viewTopScores();

  res.render("leaderboard", scoreObject);
});

router.get("/startUp", (req, res) => {
  // generate new deck
  const generatedDeck = new deck();
  //shuffles the deck
  generatedDeck.shuffle();
  //We're arbitrarily calling 5000 the default bank for now
  const generatedPlayer = new player("defaultName", 5000);
  const generatedDealer = new dealer();
  res.json(generatedDeck, generatedPlayer, generatedDealer);
});

router.post("/scoreboard", (req, res) => {});

module.exports = router;
