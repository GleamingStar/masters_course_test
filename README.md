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
### 요구사항
- 처음 시작하면 초기 상태를 출력한다.
- 간단한 프롬프트 (CLI에서 키보드 입력받기 전에 표시해주는 간단한 글자들 - 예: CUBE> )를 표시해 준다.
- 한 번에 여러 문자를 입력받은 경우 순서대로 처리해서 매 과정을 화면에 출력한다.

### 동작 예시
```
R R W
G C W
G B B

CUBE> UUR

U
W R R 
G C W
G B B

U
R W R  
G C W
G B B

R
R W W 
G C B
G B R

CUBE> Q
Bye~
```
### 코드 동작 설명
```
class Cube{

    cube = ['R','R','W','G','C','W','G','B','B']; // 평면 큐브의 초기값

    backtick = []; // `의 인덱스를 담을 배열
    
    count = 0; //`의 인덱스를 이용하기위해 move할때마다 올라갈 count

    // 실행 함수
    execute(input){
        const arr = this.removeBacktick(input).split('');
        for(let type of arr)
            this.moveCube(type)
    }

    // `제거 및 `인덱스 기록
    removeBacktick(input) {
        this.backtick.push(input.indexOf('`'));
        const removedInput = input.replace('`','');
        // `이 남아있다면 재귀, 없다면 결과값 반환
        return removedInput.includes('`') ? this.removeBacktick(removedInput) : removedInput;
    }

    // cube 배열을 3등분하여 출력
    printCube() {
        const arr1 = this.cube.slice(0,3);
        const arr2 = this.cube.slice(3,6);
        const arr3 = this.cube.slice(6,9);
        console.log(arr1.join(' '))
        console.log(arr2.join(' '))
        console.log(arr3.join(' '))
    }

    // 반복문으로 해당 type에 맞는 메서드 실행 및 출력
    moveCube(type){
        this.count++
        if(type === "U") {
            this.moveUp()
        } else if (type === "R") {
            this.moveRight()
        } else if (type === "L") {
            this.moveLeft()
        } else if (type === "B") {
            this.moveBottom()
        } else if (type === "Q") {
            return console.log('Bye~')
        }

        this.backtick.includes(this.count) ? console.log(type+'`') : console.log(type);
        this.printCube();
        console.log('');
    }

    moveUp() { 
        // 해당 type에 맞는 값을 가져온다
        const arr = [this.cube[0], this.cube[1], this.cube[2]];
        // 해당 차례에 `가 있었는지 체크
        this.backtick.includes(this.count) ? arr.unshift(arr.pop()) : arr.push(arr.shift());
        // cube의 내용을 바꿔준다
        this.cube[0] = arr[0];
        this.cube[1] = arr[1];
        this.cube[2] = arr[2];
    }

    moveRight() {
        const arr = [this.cube[2], this.cube[5], this.cube[8]];
        this.backtick.includes(this.count) ? arr.unshift(arr.pop()) : arr.push(arr.shift());
        this.cube[2] = arr[0];
        this.cube[5] = arr[1];
        this.cube[8] = arr[2];
    }

    moveLeft() {
        const arr = [this.cube[0], this.cube[3], this.cube[6]];
        this.backtick.includes(this.count) ? arr.push(arr.shift()) : arr.unshift(arr.pop());
        this.cube[0] = arr[0];
        this.cube[3] = arr[1];
        this.cube[6] = arr[2];
    }

    moveBottom() {
        const arr = [this.cube[6], this.cube[7], this.cube[8]];
        this.backtick.includes(this.count) ? arr.push(arr.shift()) : arr.unshift(arr.pop());
        this.cube[6] = arr[0];
        this.cube[7] = arr[1];
        this.cube[8] = arr[2];
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

console.log(cube.printCube());
rl.prompt();
rl.on("line", function (line) {
    cube.execute(line);
    // 입력값에 Q가 포함되어 있다면 종료
    if(line.includes(`Q`))
        rl.close();
    rl.prompt();
}).on("close", function () {
    process.exit();
});
```