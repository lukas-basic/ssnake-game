import { utils } from "./utils";
import { sfx } from './sfx';

// defined various types of collectable items
const collectableTypes = {
  "regular": {
    name: "regular",
    score: 1,
    speed: 0,
    color: "#00008B",
    desc: "",
    img: new Image(),
    imgSrc: "/images/collectables/regular.png"
  },
  "speedy": {
    name: "speedy",
    score: 1,
    speed: 2,
    color: "#FF0800",
    desc: "SPEEDING UP!",
    img: new Image(),
    imgSrc: "/images/collectables/speedy.png"
  },
  "bonus": {
    name: "bonus",
    score: 2,
    speed: 1,
    color: "#FFCC00",
    desc: "BONUS +2",
    img: new Image(),
    imgSrc: "/images/collectables/bonus.png"
  },
  "invisible": {
    name: "invisible",
    score: 1,
    speed: 1,
    color: "#800080",
    desc: "10s INVISIBILITY",
    imgHead: new Image(),
    imgBody: new Image(),
    img: new Image(),
    imgSrc: "/images/collectables/invisible.png"
  },
  "reverse": {
    name: "reverse",
    score: 1,
    speed: 1,
    color: "#ADD8E6",
    desc: "REVERSE COMMANDS",
    imgHead: new Image(),
    imgBody: new Image(),
    img: new Image(),
    imgSrc: "/images/collectables/reverse.png"
  },
  "earthquake": {
    name: "earthquake",
    score: 1,
    speed: 1,
    color: "#FF6600",
    desc: "EARTHQUAKE!!!",
    img: new Image(),
    imgSrc: "/images/collectables/earthquake.png"
  }
};

// defined indexes of different directions of an object, used for rendering images
const animationFrame = {
  "": 1,
  "up": 0,
  "right": 1,
  "down": 2,
  "left": 3,
}

export default class GameLogic {
  constructor(config) {
    this.postScore = config.postScore;

    this.canvas = config.canvas;
    this.gameLoop = null;
    this.keyPressed = false;
    this.ready = false;

    this.game = {
      ctx: null,
      width: 800,
      height: 500,
      gridSize: 20
    };
  }

  init() {
    this.initComponents();

    this.game.ctx = this.canvas.getContext("2d");

    // loading images
    Object.keys(collectableTypes).forEach((key) => {
      collectableTypes[key].img.src = collectableTypes[key].imgSrc;
    });

    this.snake.imgHead.src = "/images/snake/snake-head.png";
    this.snake.imgBody.src = "/images/snake/snake-body.png";

    collectableTypes["invisible"].imgHead.src = "/images/snake/invisible/snake-head.png";
    collectableTypes["invisible"].imgBody.src = "/images/snake/invisible/snake-body.png";

    collectableTypes["reverse"].imgHead.src = "/images/snake/reverse/snake-head.png";
    collectableTypes["reverse"].imgBody.src = "/images/snake/reverse/snake-body.png";

    // defining starting positions
    this.snake.headPosition = {
      x: Math.round(this.game.width / this.game.gridSize / 4),
      y: Math.round(this.game.height / this.game.gridSize / 2)
    }

    this.collectable.position = {
      x: Math.round(this.game.width / this.game.gridSize / 4) * 3,
      y: Math.round(this.game.height / this.game.gridSize / 2)
    }

    document.addEventListener("keydown", this.keyPress.bind(this));

    this.gameLoop = setInterval(this.loop.bind(this), 1000/this.speed);
  }

  initComponents() {
    this.started = false;
    this.gameOver = false;
    this.score = 0;
    this.speed = 10;

    this.startedAt = null;
    this.elapsed = "00:00";
    
    this.direction = "";

    this.snake = {
      headPosition: {
        x: 0,
        y: 0
      },
      body: [],
      size: 2,
      invisible: false,
      invisibilityEnding: null,
      enableReversed: false,
      reversed: false,
      imgHead: new Image(),
      imgBody: new Image()
    };

    this.collectable = {
      position: {
        x: 0,
        y: 0
      },
      type: collectableTypes["regular"]
    };

    this.obstacles = [];
  }

  loop() {
    this.keyPressed = false;
    this.update();
    this.draw();
  }

  update() {
    // calculate new position based on moving direction and invisiblity
    this.snake.headPosition = utils.nextPosition(this.snake.headPosition, this.direction, this.snake.invisible, this.game);

    // game over checker
    if (this.isGameOver()) {

      Object.keys(sfx).forEach((key) => {
        sfx[key].stop();
      })

      sfx["gameOver"].play();

      clearInterval(this.gameLoop);
      this.gameOver = true;
      this.postScore();
    }

    // calculate elapsed time
    if (this.started && !this.gameOver) {
      this.elapsed = utils.elapsedTime(this.startedAt, new Date());
    }

    // add new position to the snake's body...
    this.snake.body.push(this.snake.headPosition);

    // ...and remove the old one
    while (this.snake.body.length > this.snake.size) {
      this.snake.body.shift();
    }

    // check if invisibility is over
    if (this.snake.invisible && Math.round((this.snake.invisibilityEnding - new Date())/1000) <= 0) {
      this.snake.invisible = false;
    }

    // handle collecting collectables
    if (utils.positionEq(this.snake.headPosition, this.collectable.position)) {
      this.collect();
    }
  }

  // handle collecting collectables
  collect() {
    sfx[this.collectable.type.name].play();

    this.snake.size++;
    this.score += this.collectable.type.score;
    this.speed += this.collectable.type.speed;

    // adding an obstacle after eating every 5th collecable starting from score 10
    if (this.snake.size >= 10 && this.snake.size % 5 === 0) {
      this.addObstacle();
    }

    // disable reverse commands if enabled after eating next collectable
    this.snake.reversed = false;

    // enable reverse commands in next iteration
    if (this.collectable.type.name === "reverse") {
      this.snake.reversed = true;
    }

    // create earthquake
    if (this.collectable.type.name === "earthquake") {
      gsap.fromTo('.game-container', 0.1, {x:-20}, { x: 20, 
                                                      repeat: 10, 
                                                      yoyo: true, 
                                                      ease: Sine.easeInOut, 
                                                      onComplete: function() { gsap.to('.game-container', 1.5, { x: 0, ease: Elastic.easeOut }) }
                                                    });
    }

    // add inivisibility power
    if (this.collectable.type.name === "invisible") {
      if (!this.snake.invisible) {
        this.snake.invisible = true;
        this.snake.invisibilityEnding = new Date();
      }
      this.snake.invisibilityEnding.setSeconds(this.snake.invisibilityEnding.getSeconds() + 10);
    }
    
    // find new location for collectable
    do {
      this.collectable.position = utils.randomPosition(this.game);
    } while (utils.arrayCollision(this.collectable.position, this.snake.body)
            && utils.arrayCollision(this.collectable.position, this.obstacles));

    // if score over 5 start introducing new collectables
    if (this.score > 5)
      this.collectable.type = collectableTypes[utils.randomObjectKey(collectableTypes)];
  }

  addObstacle() {
    let position = utils.randomPosition(this.game);

    while (utils.arrayCollision(position, this.snake.body)) {
      position = utils.randomPosition(this.game);
    }

    this.obstacles.push(position);
  }

  isGameOver() {
    return this.started &&                                                      // if game started AND (
          (utils.borderCollision(this.snake.headPosition, this.game) ||         // if there's collision with border of the canvas OR
            utils.arrayCollision(this.snake.headPosition, this.snake.body) ||   // if there's collision with rest of the body OR
            utils.arrayCollision(this.snake.headPosition, this.obstacles) &&    // if there's collision with obstacle BUT
            !this.snake.invisible                                               // ignore obstacles if snake's invisible
          );                                                                    // )
  }

  draw() {
    // drawing background
    this.game.ctx.fillStyle = "#F6E4AD";
    this.game.ctx.fillRect(0, 0, this.game.width, this.game.height);

    // printing collectable description
    if (!this.gameOver) {
      this.game.ctx.fillStyle = this.collectable.type.color;
      this.game.ctx.font = this.game.width / 20 + "px monospace";
      this.game.ctx.fillText(
        this.collectable.type.desc,
        10,
        50
      );
    }

    // drawing collectable with image
    this.game.ctx.drawImage(this.collectable.type.img,
      0, 0,
      32, 32,
      this.game.gridSize * this.collectable.position.x, this.game.gridSize * this.collectable.position.y,
      this.game.gridSize, this.game.gridSize  
    );

    // drawing snake with images
    this.snake.body.forEach((element, index) => { 
      let image = this.snake.reversed 
                  ? collectableTypes["reverse"].imgBody
                  : this.snake.invisible
                    ? collectableTypes["invisible"].imgBody
                    : this.snake.imgBody;

      if (index === this.snake.body.length - 1)
        image = this.snake.reversed 
                ? collectableTypes["reverse"].imgHead
                : this.snake.invisible
                  ? collectableTypes["invisible"].imgHead
                  : this.snake.imgHead;

      this.game.ctx.drawImage(image,
        32 * animationFrame[this.direction], 0,
        32, 32,
        this.game.gridSize * element.x, this.game.gridSize * element.y,
        this.game.gridSize, this.game.gridSize  
      );
    });

    // drawing obstacles
    this.game.ctx.fillStyle = "#282828";
    this.obstacles.forEach((element, index) => { 
      this.game.ctx.fillRect(
        element.x * this.game.gridSize,
        element.y * this.game.gridSize,
        this.game.gridSize,
        this.game.gridSize
      );
    });

    // printing GAME OVER
    if (this.gameOver) {
      this.game.ctx.fillStyle = "#000000";
      this.game.ctx.font = this.game.width / 10 + "px monospace";
      this.game.ctx.fillText(
        "GAME OVER",
        this.game.width / 5,
        this.game.height / 3
      );
    }
  }

  keyPress(e) {
    let map = {
      "ArrowUp": "up",
      "KeyW": "up",
      "ArrowDown": "down",
      "KeyS": "down",
      "ArrowLeft": "left",
      "KeyA": "left",
      "ArrowRight": "right",
      "KeyD": "right"
    }

    let reverseMap = {
      "ArrowUp": "down",
      "KeyW": "down",
      "ArrowDown": "up",
      "KeyS": "up",
      "ArrowLeft": "right",
      "KeyA": "right",
      "ArrowRight": "left",
      "KeyD": "left"
    }

    // restart handling
    if (this.gameOver && 
        (e.code === 'Space' ||
        e.code === 'Enter')) {
      sfx["click"].play();
      this.init();
    }

    const dir = (!this.snake.reversed ? map[e.code] : reverseMap[e.code]) || this.direction;

    // start handling
    if (!this.started && dir !== "" && this.ready) {
      this.started = true;
      this.startedAt = new Date();
      sfx["background"].play();
    }

    // direction change handling
    if (this.started && 
        (this.direction === "" ||
          dir !== utils.oppositeDirection(this.direction)) &&
        !this.keyPressed) {
      this.keyPressed = true;
      this.direction = dir;
    }
  }
};
