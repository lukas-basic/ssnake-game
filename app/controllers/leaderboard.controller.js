const Leaderboard = require("../service/leaderboard.service.js");

exports.getLeaderboard = (req, res) => {
  Leaderboard.getLeaderboard((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving leaderboard."
      });
    else res.send(data);
  });
};

exports.postScore = (req, res) => {
  const username = req.body.username;
  const score = req.body.score;

  Leaderboard.postScore(username, score, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while saving new score."
      });
    else res.send(data);
  });
};
