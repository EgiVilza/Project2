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
        res.json(results);
      });
  });
  app.post("/api/leaderboard", (req, res) => {
    db.players
      .findAll({
        where: {
          name: req.body.name
        },
        raw: true
      })
      .then(results => {
        if (results.length === 0) {
          db.players
            .create({
              name: req.body.name,
              balance: req.body.balance
            })
            .then(results => res.json(results));
        } else {
          db.players
            .update(
              { balance: req.body.balance },
              {
                where: {
                  name: req.body.name
                }
              }
            )
            .then(results => res.json(results));
        }
      });
  });
};
