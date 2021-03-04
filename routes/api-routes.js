const Casino = require("../models/casino.js");

// Routes
module.exports = app => {
  // Get all scores - ordered by balance
  app.get("/api/leaderboard", (req, res) => {
    // Finding all scores, and then returning them to the user as JSON.
    // Sequelize queries are asynchronous and results are available to us inside the .then
    Casino.findAll({
      attributes: ["id", "name", "balance"],
      order: [["balance", "DESC"]]
    }).then(results => {
      res.json(results);
    });
  });

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
