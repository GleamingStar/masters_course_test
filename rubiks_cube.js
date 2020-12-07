pushString = ([string, number, direction]) => {
  const arr = string.split("");
  let dir = direction.toLowerCase();
  if (number < 0) {
    number = 0 - number;
    dir === "l" ? (dir = "r") : (dir = "l");
  }
  for (let i = 0; i < number; i++)
    dir === "l" ? arr.push(arr.shift()) : arr.unshift(arr.pop());
  return arr.join("");
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
