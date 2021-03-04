const Casino = require("../models/casino.js");

// Routes
module.exports = app => {
  app.post("/api/leaderboard", (req, res) => {
    console.log(req.body);
    Casino.findAll({
      where: {
        name: req.body.name
      }
    }).then(results => {
      console.log(results.length);
      if (results.length === 0) {
        console.log("No name found! - Creating new player");
        Casino.create({
          name: req.body.name,
          balance: req.body.balance
        }).then(results => res.json(results));
      } else {
        console.log("Player exists - Editing current player");
        Casino.update(
          { balance: req.body.balance },
          {
            where: {
              name: req.body.name
            }
          }
        ).then(results => res.json(results));
      }
      console.log(results);
    });
  });
};
