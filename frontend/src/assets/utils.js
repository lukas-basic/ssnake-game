export const utils = {
  nextPosition({ x, y }, direction, invisible, { width, height, gridSize }) {
    if (invisible) {
      let position = this.nextPosition({x, y}, direction, false, { width, height, gridSize });
      
      if (this.borderCollision(position, { width, height, gridSize })) {
        if (position.x < 0) {
          x = Math.round(width / gridSize);
        } else if (position.x > Math.round(width / gridSize) - 1) {
          x = -1;
        } else if (position.y < 0) {
          y = Math.round(height / gridSize);
        } else if (position.y > Math.round(height / gridSize) - 1)  {
          y = -1;
        }
      }         
    }

    if (direction === "left") {
      x -= 1;
    } else if (direction === "right") {
      x += 1;
    } else if (direction === "up" ) {
      y -= 1;
    } else if (direction === "down") {
      y += 1;
    }

    return {x,y};
  },
  randomPosition({ width, height, gridSize }) {
    let x = Math.abs(
              Math.round(
                (Math.random() * width) / gridSize
              ) - 1
            );

    let y = Math.abs(
              Math.round(
                (Math.random() * height) / gridSize
              ) - 1
            );

    return { x, y };
  },
  positionEq(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  },
  borderCollision({ x, y }, { width, height, gridSize }) {
    return x < 0 ||
            y < 0 ||
            x > Math.round(width / gridSize) - 1 ||
            y > Math.round(height / gridSize) - 1;
  },
  arrayCollision(position, array) {
    let result = false;

    array.forEach((aPosition) => {
      if (this.positionEq(position, aPosition)) {
        result = true;
      }
    });

    return result;
  },
  oppositeDirection(direction) {
    if (direction === "left") { return "right"; }
    if (direction === "right") { return "left"; }
    if (direction === "up") { return "down"; }
    return "up";
  },
  elapsedTime(start, end) {
    let seconds = Math.round((end - start)/1000);
    let minutes = Math.floor(seconds/60);

    if (minutes < 10 && seconds%60 < 10)
      return `0${minutes}:0${seconds%60}`;
    else if (minutes < 10) 
      return `0${minutes}:${seconds%60}`;
    else if (seconds%60 < 10)
      return `${minutes}:0${seconds%60}`;
    else
      return `${minutes}:${seconds%60}`;
  },
  randomObjectKey(object) {
    let keyArray = Object.keys(object);
    
    return keyArray[Math.floor(Math.random() * keyArray.length)];
  }
};
