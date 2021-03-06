const Casino = require("../models/casino.js");
// Routes
module.exports = app => {
  app.get("/api/leaderboard", (req, res) => {
    Casino.findAll({
      attributes: ["name"],
      raw: true
    }).then(results => {
      res.json(results);
    });
  });
  app.post("/api/leaderboard", (req, res) => {
    Casino.findAll({
      where: {
        name: req.body.name
      }
    }).then(results => {
      if (results.length === 0) {
        Casino.create({
          name: req.body.name,
          balance: req.body.balance
        }).then(results => res.json(results));
      } else {
        Casino.update(
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
