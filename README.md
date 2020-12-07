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

### 입력 및 출력 예시
- 홀수 줄은 입력, 짝수 줄은 출력이다.
```
> apple 3 L 
leapp

> banana 6 R
banana

> carrot -1 r
arrotc

> cat -4 R
atc
```
### 코드 동작 설명
```
pushString = ([string, number, direction]) => {
  const arr = string.split("");
  let dir = direction.toLowerCase(); // 방향을 소문자로 통일
  if (number < 0) { // 음수를 절대값으로 변환시키며 방향을 바꿔준다
    number = 0 - number;
    dir === "l" ? (dir = "r") : (dir = "l");
  }
  for (let i = 0; i < number; i++) // 밀어내기를 주어진 number만큼 반복
    dir === "l" ? arr.push(arr.shift()) : arr.unshift(arr.pop());
  return arr.join(""); // 쪼갰던 문자열을 합쳐준 후 반환
};

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on("line", function (line) {
  const input = line.split(" ");
  console.log(pushString(input));
}).on("close", function () {
  process.exit();
});
```