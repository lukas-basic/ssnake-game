const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", serveStatic(path.join(__dirname, '/frontend/dist')));

require("./app/routes/leaderboard.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
