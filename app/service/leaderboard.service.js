const dbFile = "./db/leaderboard.csv";
const resolve = require('path').resolve;
const fs = require("fs");

exports.getLeaderboard = (result) => {
  try {
    let data = fs.readFileSync(resolve(dbFile)).toString().trim();
    
    if (data === "") {
      data = [];
    } else {
      data = data.split("\n");
    }

    result(null, 
      data.map((row) => {
        return {
          username: row.split(",")[0],
          score: row.split(",")[1]
        };
      }).sort((a,b) => {
        return b.score - a.score;
      }).slice(0, 10)
    );
  } catch (err) {
    console.error(err);
  }
}

exports.postScore = (username, score, result) => {
  try {
    const data = fs.readFileSync(resolve(dbFile)).toString().concat(`${username},${score}\n`);
    fs.writeFileSync(resolve(dbFile), data);
  } catch (err) {
    console.error(err);
  }
}
