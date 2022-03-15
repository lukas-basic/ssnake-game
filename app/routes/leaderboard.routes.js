module.exports = app => {
  const leaderboard = require("../controllers/leaderboard.controller.js");
  var router = require("express").Router();
  
  // Retrieve leaderboard
  router.get("/", leaderboard.getLeaderboard);
  router.post("/", leaderboard.postScore);

  app.use('/api/leaderboard', router);
};
