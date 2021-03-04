const Casino = require("../models/casino.js");
const {
  // card,
  deck,
  // cardAgent,
  player,
  dealer
} = require("../public/js/cards.js");

// Routes
module.exports = app => {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/leaderboard", (req, res) => {
    //render template through handlebars
    Casino.findAll({
      attributes: ["name", "balance"],
      order: [["balance", "DESC"]]
    }).then(results => {
      console.log(results);
      const scoreObject = results;
      res.render("leaderboard", scoreObject);
    });
  });

  app.get("/startUp", (req, res) => {
    // generate new deck
    const generatedDeck = new deck();
    //shuffles the deck
    generatedDeck.shuffle();
    //We're arbitrarily calling 5000 the default bank for now
    const generatedPlayer = new player("defaultName", 5000);
    const generatedDealer = new dealer();
    res.json(generatedDeck, generatedPlayer, generatedDealer);
  });
};
