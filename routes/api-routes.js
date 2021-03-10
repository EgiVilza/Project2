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
    const newScore = req.body.balance;
    const playerName = req.body.name;
    db.players
      .findAll({
        where: {
          name: playerName
        },
        raw: true
      })
      .then(results => {
        console.log(results);
        if (results.length === 0) {
          db.players
            .create({
              name: playerName,
              balance: newScore
            })
            .then(results => res.json(results));
        } else {
          db.players
            .update(
              { balance: newScore },
              {
                where: {
                  name: playerName
                }
              }
            )
            .then(results => res.json(results));
        }
      });
  });
};
