# Rubik's Cube

## 코드스쿼드 마스터즈코스 2021 테스트 문제
- 단계별로 루빅스 큐브를 구현한다.
- 할 수 있는 단계까지만 구현한다.
- 단계별로 지정된 코딩 요구사항을 적용한다.
- 단계별로 구현한 코드 동작에 대해 README.md에 정리한다.
- 특별히 명시되지 않은 부분은 자유롭게 구현한다.

## step-0
- 소스 코드 관리
    - Git과 GitHub을 이용하여 소스 코드를 관리하고 GitHub 저장소 URL을 제출 페이지를 이용해서 제출한다.
    - 각 단계별로 브랜치를 작성한다. 브랜치 이름은 각각 step-1, step-2, step-3 로 한다.
    - 아래 링크를 참고하여 커밋 시점과 단위, 그리고 커밋 메세지를 고려하여 작성한다.
        - https://meetup.toast.com/posts/106

## step-1 : 단어 밀어내기 구현하기
- 입력: 사용자로부터 단어 하나, 정수 숫자 하나( -100 <= N < 100) , L 또는 R을 입력받는다. L 또는 R은 대소문자 모두 입력 가능하다.
- 주어진 단어를 L이면 주어진 숫자 갯수만큼 왼쪽으로, R이면 오른쪽으로 밀어낸다.
- 밀려나간 단어는 반대쪽으로 채워진다.

## step-2 : 평면 큐브 구현하기
- 3 X 3의 2차원 배열이 아래처럼 있다.
```
R R W
G C W
G B B
```
- 사용자 입력을 받아서 아래의 동작을 하는 프로그램을 구현하시오
```
> U  가장 윗줄을 왼쪽으로 한 칸 밀기 RRW -> RWR
> U' 가장 윗줄을 오른쪽으로 한 칸 밀기 RRW -> WRR
> R  가장 오른쪽 줄을 위로 한 칸 밀기 WWB -> WBW
> R' 가장 오른쪽 줄을 아래로 한 칸 밀기 WWB -> BWW
> L  가장 왼쪽 줄을 아래로 한 칸 밀기 RGG -> GRG (L의 경우 R과 방향이 반대임을 주의한다.)
> L' 가장 왼쪽 줄을 위로 한 칸 밀기 RGG -> GGR
> B  가장 아랫줄을 오른쪽으로 한 칸 밀기 GBB -> BGB (B의 경우도 U와 방향이 반대임을 주의한다.)
> B' 가장 아랫줄을 왼쪽으로 한 칸 밀기 GBB -> BBG
> Q  Bye~를 출력하고 프로그램을 종료한다.
```
## step-3 : 루빅스 큐브 구현하기
- [참고 링크](https://cube3x3.com/%ED%81%90%EB%B8%8C%EB%A5%BC-%EB%A7%9E%EC%B6%94%EB%8A%94-%EB%B0%A9/#notation)를 참고해서 루빅스 큐브를 구현한다.
- 큐브는 W, B, G, Y, O, R의 6가지 색깔을 가지고 있다.
- 입력: 각 조작법을 한 줄로 입력받는다.
- 출력: 큐브의 6면을 펼친 상태로 출력한다.
- Q를 입력받으면 프로그램을 종료하고, 조작 받은 명령의 갯수를 출력시킨다.
### 큐브의 초기 상태
```
                B B B  
                B B B
                B B B

 W W W     O O O     G G G     Y Y Y 
 W W W     O O O     G G G     Y Y Y 
 W W W     O O O     G G G     Y Y Y 
 
                R R R 
                R R R 
                R R R 
```
### 프로그램 예시
```
(초기 상태 출력)

CUBE> FRR'U2R

F
(큐브상태)

R
(큐브상태)

...

R
(큐브상태)

CUBE> Q
경과시간: 00:31 //추가 구현 항목
조작갯수: 6
이용해주셔서 감사합니다. 뚜뚜뚜.
```
### 추가 구현 기능
- 프로그램 종료 시 경과 시간 출력
- 큐브의 무작위 섞기 기능
- 모든 면을 맞추면 축하 메시지와 함께 프로그램을 자동 종료
### 요구사항
- 가능한 한 커밋을 자주 하고 구현의 의미가 명확하게 전달되도록 커밋 메시지를 작성할 것
- 함수나 메소드는 한 번에 한 가지 일을 하고 가능하면 20줄이 넘지 않도록 구현한다.
- 함수나 메소드의 들여쓰기를 가능하면 적게(3단계까지만) 할 수 있도록 노력해 본다.
```
function main() {
      for() { // 들여쓰기 1단계
          if() { // 들여쓰기 2단계
              return; // 들여쓰기 3단계
          }
      }
  }
```
### 코드 동작 설명
```
class Cube {
  constructor() {
    this.startTime = this.setTime(); // 경과시간 설정
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

  command = ""; // 숫자입력시 마지막 입력 확인을 위한 입력기록
  backtick = []; // `의 인덱스를 담을 배열

  indexCount = 0; // `의 인덱스를 이용하기위한 입력의 인덱스값
  moveCount = 0; // 큐브를 돌린 횟수

  execute(input) {
    // `을 제거한 입력값 기록
    this.command = this.removeBacktick(input).split("");
    // 입력값을 순회하며 큐브 회전
    for (let type of this.command) 
      this.checkType(type);
    // 변수 초기화
    this.command = "";
    this.backtick = [];
    this.indexCount = 0;
  }

  // ` 제거 및 ` 인덱스 기록
  removeBacktick(input) {
    this.backtick.push(input.indexOf("`"));
    const removedInput = input.replace("`", "");
    // `이 남아있다면 재귀, 없다면 결과값 반환
    return removedInput.includes("`") ? this.removeBacktick(removedInput) : removedInput;
  }

  // 전개도 출력
  printCube() {
    const order = [this.cube3, this.cube1, this.cube5, this.cube6]; // 옆면에 표시될 큐브 면들
    const row = [[0, 1, 2],  [3, 4, 5],  [6, 7, 8]];

    this.printSide(this.cube2); // 윗면 출력

    // 옆면 출력
    for (let i of row) {
      for (let cube of order)
        process.stdout.write(cube[i[0]] + " " + cube[i[1]] + " " + cube[i[2]] + "   ");
      console.log("");
    }
    console.log("");

    this.printSide(this.cube4); // 밑면 출력
  }

  // 큐브의 한 면 출력
  printSide(cube) {
    const arr1 = cube.slice(0, 3);
    const arr2 = cube.slice(3, 6);
    const arr3 = cube.slice(6, 9);
    // 전개도 모양을 위한 띄어쓰기
    console.log("        " + arr1.join(" "));
    console.log("        " + arr2.join(" "));
    console.log("        " + arr3.join(" "));
    console.log("")
  }

  // 현재 인덱스의 ` 포함 여부
  isBacktick() {
    return this.backtick.includes(this.indexCount);
  }

  // 모든 면의 색이 통일되어 있는가
  isWin() {
    const allCube = [this.cube1, this.cube2, this.cube3, this.cube4, this.cube5, this.cube6];
    for (let cube of allCube) {
      const set = new Set(cube); // set을 이용한 중복 제거
      if (set.size > 1) 
        return false;
    }
    if (this.moveCount > 0) 
      return true;
  }

  // 게임 종료 메세지 출력
  endGame() {
    console.log("경과시간: " + this.getTime());
    console.log("조작갯수: " + this.moveCount);
    if (this.isWin()) 
      console.log("축하드립니다. 뚜루뚜뚜뚜");
    else 
      console.log("이용해주셔서 감사합니다. 뚜뚜뚜");
  }

  // 입력값 분석
  checkType(type) {
    if (type === "Q") 
      return this.endGame();
    else if (type === "S") 
      return this.shuffle();
    // 입력값이 숫자일 경우 마지막 명령 숫자만큼 반복
    else if (!isNaN(type)) {
      for (let i = 0; i < parseInt(type, 10) - 1; i++)
        this.moveCube(this.command[this.indexCount - 1]);
      this.indexCount++;
      return;
    }
    this.indexCount++;
    this.moveCube(type); // 큐브 회전 실행
  }

  // 무작위 섞기 기능
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

  // 큐브 회전 방향 분석 및 결과값 출력
  moveCube(type) {
    this.moveCount++;
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
    if (this.isWin()) 
      this.endGame();
  }

  // 큐브 회전
  turnCube(fromCube, fromIndex, toCube, toIndex) {
    for (let i = 0; i < 3; i++) 
      fromCube[fromIndex[i]] = toCube[toIndex[i]];
  }

  // --- 방향에 따른 큐브 회전 ---
  moveUp() {
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
    const arr = [this.cube2[6], this.cube2[7], this.cube2[8]];
    if (this.isBacktick()) {
      this.turnCube(this.cube2, [6, 7, 8], this.cube3, [8, 5, 2]);
      this.turnCube(this.cube3, [8, 5, 2], this.cube4, [2, 1, 0]);
      this.turnCube(this.cube4, [2, 1, 0], this.cube5, [0, 3, 6]);
      this.turnCube(this.cube5, [0, 3, 6], arr, [0, 1, 2]);
    } else {
      this.turnCube(this.cube2, [6, 7, 8], this.cube5, [0, 3, 6]);
      this.turnCube(this.cube5, [0, 3, 6], this.cube4, [2, 1, 0]);
      this.turnCube(this.cube4, [2, 1, 0], this.cube3, [8, 5, 2]);
      this.turnCube(this.cube3, [8, 5, 2], arr, [0, 1, 2]);
    }
  }

  moveRight() {
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

  // 시간기록
  setTime() {
    return Date.now();
  }

  // 종료까지의 시간계산
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

// 리드라인

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
  if (line.includes(`Q`) || cube.isWin()) 
    rl.close();
  rl.prompt();
}).on("close", function () {
  process.exit();
});
```