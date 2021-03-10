const db = require("../models");

// Routes
module.exports = app => {
  app.get("/api/leaderboard/:name", (req, res) => {
    db.players
      .findAll({
        attributes: ["name"],
        where: {
          name: req.params.name
        },
        raw: true
      })
      .then(results => {
        if (results.length === 0) {
          res.json(false);
        } else {
          res.json(true);
        }
      });
  });
  app.post("/api/leaderboard", (req, res) => {
    console.log(req.body);
    db.players
      .findAll({
        where: {
          name: req.body.name
        },
        raw: true
      })
      .then(results => {
        console.log(results);
        if (results.length === 0) {
          db.players
            .create(req.body)
            .then(results => res.json(results))
            .catch(err => handleError(err));
        } else {
          const playerName = {};
          playerName.name = req.body.name;
          const whereClause = {};
          whereClause.where = playerName;

          const newScore = {};
          newScore.balance = req.body.balance;

          console.log(newScore);
          console.log(whereClause);

          db.players
            .update(newScore, whereClause)
            .then(results => res.json(results))
            .catch(err => handleError(err));
        }
      });
  });
};
