class Cube {

  constructor() {
    this.startTime = this.setTime();
  }

  // 큐브 전개도
  //    2
  // 3  1  5  6
  //    4
  cube1 = ["B", "B", "B", "B", "B", "B", "B", "B", "B"];
  cube2 = ["W", "W", "W", "W", "W", "W", "W", "W", "W"];
  cube3 = ["O", "O", "O", "O", "O", "O", "O", "O", "O"];
  cube4 = ["G", "G", "G", "G", "G", "G", "G", "G", "G"];
  cube5 = ["Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y"];
  cube6 = ["R", "R", "R", "R", "R", "R", "R", "R", "R"];

  command = "";
  backtick = [];

  indexCount = 0;
  moveCount = 0;

  execute(input) {
    this.command = this.removeBacktick(input).split("");

    for (let type of this.command) 
      this.checkType(type);

    this.command = "";
    this.backtick = [];
    this.indexCount = 0;
  }

  removeBacktick(input) {
    this.backtick.push(input.indexOf("`"));
    const removedInput = input.replace("`", "");
    return removedInput.includes("`") ? this.removeBacktick(removedInput) : removedInput;
  }

  printCube() {
    const order = [this.cube3, this.cube1, this.cube5, this.cube6];
    const row = [[0, 1, 2],  [3, 4, 5],  [6, 7, 8]];

    this.printSide(this.cube2);

    for (let i of row) {
      for (let cube of order)
        process.stdout.write(cube[i[0]] + " " + cube[i[1]] + " " + cube[i[2]] + "   ");
      console.log("");
    }
    
    console.log("");

    this.printSide(this.cube4);
  }

  printSide(cube) {
    const arr1 = cube.slice(0, 3);
    const arr2 = cube.slice(3, 6);
    const arr3 = cube.slice(6, 9);
    console.log("        " + arr1.join(" "));
    console.log("        " + arr2.join(" "));
    console.log("        " + arr3.join(" "));
    console.log("")
  }
  
  isBacktick() {
    return this.backtick.includes(this.indexCount);
  }

  isWin() {
    const allCube = [this.cube1, this.cube2, this.cube3, this.cube4, this.cube5, this.cube6];
    for (let cube of allCube) {
      const set = new Set(cube);
      if (set.size > 1) 
        return false;
    }
    if (this.moveCount > 0) 
      return true;
  }

  endGame() {
    console.log("경과시간: " + this.getTime());
    console.log("조작갯수: " + this.moveCount);
    if (this.isWin()) 
      console.log("축하드립니다. 뚜루뚜뚜뚜");
    else 
      console.log("이용해주셔서 감사합니다. 뚜뚜뚜");
  }
  
  checkType(type) {
    if (type === "Q") 
      return;
    else if (type === "S") 
      return this.shuffle();
    else if (!isNaN(type)) {
      for (let i = 0; i < parseInt(type, 10) - 1; i++)
        this.moveCube(this.command[this.indexCount - 1]);
      this.indexCount++;
      return;
    }
    this.indexCount++;
    this.moveCube(type);
  }

  shuffle(count = 10) {
    for (let i = 0; i < count; i++) {
      const randomInt = Math.random();
      if (randomInt > 5 / 6) 
        this.moveFront();
      else if (randomInt > 4 / 6) 
        this.moveRight();
      else if (randomInt > 3 / 6) 
        this.moveUp();
      else if (randomInt > 2 / 6) 
        this.moveBack();
      else if (randomInt > 1 / 6) 
        this.moveLeft();
      else 
        this.moveDown();
    }
    console.log("S");
    this.printCube();
  }

  moveCube(type) {
    if (type === "F") 
      this.moveFront();
    else if (type === "R") 
      this.moveRight();
    else if (type === "U") 
      this.moveUp();
    else if (type === "B") 
      this.moveBack();
    else if (type === "L") 
      this.moveLeft();
    else if (type === "D") 
      this.moveDown();
    this.backtick.includes(this.indexCount) ? console.log(type + "`") : console.log(type);
    this.printCube();
  }

  turnCube(fromCube, fromIndex, toCube, toIndex) {
    for (let i = 0; i < fromIndex.length; i++) 
      fromCube[fromIndex[i]] = toCube[toIndex[i]];
  }

  turnQuarter(cube, isReverse) {
    const arr = [...cube];
    const cubeOrder = [0,1,2,3,4,5,6,7,8];
    const turnedOrder = [6,3,0,7,4,1,8,5,2];
    const reversedOrder = [2,5,8,1,4,7,0,3,6];
    isReverse ? this.turnCube(cube, cubeOrder, arr, reversedOrder) : this.turnCube(cube, cubeOrder, arr, turnedOrder)
  }

  moveUp() {
    this.moveCount++;
    this.turnQuarter(this.cube2, this.isBacktick());
    const arr = [this.cube1[0], this.cube1[1], this.cube1[2]];
    if (this.isBacktick()) {
      this.turnCube(this.cube1, [0, 1, 2], this.cube3, [0, 1, 2]);
      this.turnCube(this.cube3, [0, 1, 2], this.cube6, [0, 1, 2]);
      this.turnCube(this.cube6, [0, 1, 2], this.cube5, [0, 1, 2]);
      this.turnCube(this.cube5, [0, 1, 2], arr, [0, 1, 2]);
    } else {
      this.turnCube(this.cube1, [0, 1, 2], this.cube5, [0, 1, 2]);
      this.turnCube(this.cube5, [0, 1, 2], this.cube6, [0, 1, 2]);
      this.turnCube(this.cube6, [0, 1, 2], this.cube3, [0, 1, 2]);
      this.turnCube(this.cube3, [0, 1, 2], arr, [0, 1, 2]);
    }
  }

  moveFront() {
    this.moveCount++;
    this.turnQuarter(this.cube1, this.isBacktick());
    const arr = [this.cube2[6], this.cube2[7], this.cube2[8]];
    if (this.isBacktick()) {
      this.turnCube(this.cube2, [6, 7, 8], this.cube5, [0, 3, 6]);
      this.turnCube(this.cube5, [0, 3, 6], this.cube4, [2, 1, 0]);
      this.turnCube(this.cube4, [2, 1, 0], this.cube3, [8, 5, 2]);
      this.turnCube(this.cube3, [8, 5, 2], arr, [0, 1, 2]);
    } else {
      this.turnCube(this.cube2, [6, 7, 8], this.cube3, [8, 5, 2]);
      this.turnCube(this.cube3, [8, 5, 2], this.cube4, [2, 1, 0]);
      this.turnCube(this.cube4, [2, 1, 0], this.cube5, [0, 3, 6]);
      this.turnCube(this.cube5, [0, 3, 6], arr, [0, 1, 2]);
    }
  }

  moveRight() {
    this.moveCount++;
    this.turnQuarter(this.cube5, this.isBacktick());
    const arr = [this.cube1[2], this.cube1[5], this.cube1[8]];
    if (this.isBacktick()) {
      this.turnCube(this.cube1, [2, 5, 8], this.cube2, [2, 5, 8]);
      this.turnCube(this.cube2, [2, 5, 8], this.cube6, [6, 3, 0]);
      this.turnCube(this.cube6, [6, 3, 0], this.cube4, [2, 5, 8]);
      this.turnCube(this.cube4, [2, 5, 8], arr, [0, 1, 2]);
    } else {
      this.turnCube(this.cube1, [2, 5, 8], this.cube4, [2, 5, 8]);
      this.turnCube(this.cube4, [2, 5, 8], this.cube6, [6, 3, 0]);
      this.turnCube(this.cube6, [6, 3, 0], this.cube2, [2, 5, 8]);
      this.turnCube(this.cube2, [2, 5, 8], arr, [0, 1, 2]);
    }
  }

  moveLeft() {
    this.moveCount++;
    this.turnQuarter(this.cube3, this.isBacktick());
    const arr = [this.cube1[0], this.cube1[3], this.cube1[6]];
    if (this.isBacktick()) {
      this.turnCube(this.cube1, [0, 3, 6], this.cube4, [0, 3, 6]);
      this.turnCube(this.cube4, [0, 3, 6], this.cube6, [8, 5, 2]);
      this.turnCube(this.cube6, [8, 5, 2], this.cube2, [0, 3, 6]);
      this.turnCube(this.cube2, [0, 3, 6], arr, [0, 1, 2]);
    } else {
      this.turnCube(this.cube1, [0, 3, 6], this.cube2, [0, 3, 6]);
      this.turnCube(this.cube2, [0, 3, 6], this.cube6, [8, 5, 2]);
      this.turnCube(this.cube6, [8, 5, 2], this.cube4, [0, 3, 6]);
      this.turnCube(this.cube4, [0, 3, 6], arr, [0, 1, 2]);
    }
  }

  moveBack() {
    this.moveCount++;
    this.turnQuarter(this.cube6, this.isBacktick());
    const arr = [this.cube2[0], this.cube2[1], this.cube2[2]];
    if (this.isBacktick()) {
      this.turnCube(this.cube2, [0, 1, 2], this.cube3, [6, 3, 0]);
      this.turnCube(this.cube3, [6, 3, 0], this.cube4, [8, 7, 6]);
      this.turnCube(this.cube4, [8, 7, 6], this.cube5, [2, 5, 8]);
      this.turnCube(this.cube5, [2, 5, 8], arr, [0, 1, 2]);
    } else {
      this.turnCube(this.cube2, [0, 1, 2], this.cube5, [2, 5, 8]);
      this.turnCube(this.cube5, [2, 5, 8], this.cube4, [8, 7, 6]);
      this.turnCube(this.cube4, [8, 7, 6], this.cube3, [6, 3, 0]);
      this.turnCube(this.cube3, [6, 3, 0], arr, [0, 1, 2]);
    }
  }

  moveDown() {
    this.moveCount++;
    this.turnQuarter(this.cube4, this.isBacktick());
    const arr = [this.cube1[6], this.cube1[7], this.cube1[8]];
    if (this.isBacktick()) {
      this.turnCube(this.cube1, [6, 7, 8], this.cube5, [6, 7, 8]);
      this.turnCube(this.cube5, [6, 7, 8], this.cube6, [6, 7, 8]);
      this.turnCube(this.cube6, [6, 7, 8], this.cube3, [6, 7, 8]);
      this.turnCube(this.cube3, [6, 7, 8], arr, [0, 1, 2]);
    } else {
      this.turnCube(this.cube1, [6, 7, 8], this.cube3, [6, 7, 8]);
      this.turnCube(this.cube3, [6, 7, 8], this.cube6, [6, 7, 8]);
      this.turnCube(this.cube6, [6, 7, 8], this.cube5, [6, 7, 8]);
      this.turnCube(this.cube5, [6, 7, 8], arr, [0, 1, 2]);
    }
  }

  setTime() {
    return Date.now();
  }

  getTime() {
    const time = (Date.now() - this.startTime) / 1000;
    let minute = Math.floor(time / 60);
    let second = Math.floor((time / 60 - minute) * 60);
    minute = minute.toString().length === 1 ? "0" + minute : minute;
    second = second.toString().length === 1 ? "0" + second : second;
    return `${minute}:${second}`;
  }
}

const cube = new Cube();

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "CUBE>",
});

cube.printCube();
rl.prompt();
rl.on("line", function (line) {
  cube.execute(line);
  if (line.includes(`Q`) || cube.isWin()) {
    cube.endGame();
    rl.close();
  }
  rl.prompt();
}).on("close", function () {
  process.exit();
});
