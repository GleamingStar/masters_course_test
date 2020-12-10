class Cube{

    cube = [ ['R','R','W'], ['G','C','W'], ['G','B','B'] ];

    backtick = [];
    
    count = 0;

    execute(input){
        const arr = this.removeBacktick(input).split('');
        for(let type of arr)
            this.moveCube(type)
    }

    removeBacktick(input) {
        this.backtick.push(input.indexOf('`'));
        const removedInput = input.replace('`','');
        return removedInput.includes('`') ? this.removeBacktick(removedInput) : removedInput;
    }

    printCube() {
        console.log(this.cube[0].join(' '))
        console.log(this.cube[1].join(' '))
        console.log(this.cube[2].join(' '))
    }

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
        const arr = [...this.cube[0]];
        this.backtick.includes(this.count) ? arr.unshift(arr.pop()) : arr.push(arr.shift());
        this.cube[0][0] = arr[0];
        this.cube[0][1] = arr[1];
        this.cube[0][2] = arr[2];
    }

    moveRight() {
        const arr = [this.cube[0][2], this.cube[1][2], this.cube[2][2]];
        this.backtick.includes(this.count) ? arr.unshift(arr.pop()) : arr.push(arr.shift());
        this.cube[0][2] = arr[0];
        this.cube[1][2] = arr[1];
        this.cube[2][2] = arr[2];
    }

    moveLeft() {
        const arr = [this.cube[0][0], this.cube[1][0], this.cube[2][0]];
        this.backtick.includes(this.count) ? arr.push(arr.shift()) : arr.unshift(arr.pop());
        this.cube[0][0] = arr[0];
        this.cube[1][0] = arr[1];
        this.cube[2][0] = arr[2];
    }

    moveBottom() {
        const arr = [...this.cube[2]];
        this.backtick.includes(this.count) ? arr.push(arr.shift()) : arr.unshift(arr.pop());
        this.cube[2][0] = arr[0];
        this.cube[2][1] = arr[1];
        this.cube[2][2] = arr[2];
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
    if(line.includes(`Q`))
        rl.close();
    rl.prompt();
}).on("close", function () {
    process.exit();
});
