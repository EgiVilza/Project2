const db = require("../models");

// Routes
module.exports = app => {
  app.get("/api/leaderboard", (req, res) => {
    db.Casino.findAll({
      attributes: ["name"],
      raw: true
    }).then(results => res.json(results));
  });
  app.post("/api/leaderboard", (req, res) => {
    db.Casino.findAll({
      where: {
        name: req.body.name
      },
      raw: true
    }).then(results => {
      if (results.length === 0) {
        db.Casino.create({
          name: req.body.name,
          balance: req.body.balance
        }).then(results => res.json(results));
      } else {
        db.Casino.update(
          { balance: req.body.balance },
          {
            where: {
              name: req.body.name
            }
          }
        ).then(results => res.json(results));
      }
    });
  });
};
