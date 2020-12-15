// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const tray = string.split(',');

// BOARDGAME //
function theGame(array,max) {
    const nums = array.map(Number);
    let ult = nums[nums.length - 1];

    const emptyArray = Array(max);
    nums.forEach((e,i) => emptyArray[e] = i + 1);

    for (let i = nums.length; i < max; i++) {
        let next = 0;
        if(emptyArray[ult]) next = i - emptyArray[ult];
        emptyArray[ult] = i;
        ult = next;
    }
    return ult;
}

// LOGGING //
console.time('Duration 1');
console.log('Board Game Elves');
console.log(theGame(tray,2020));
console.timeEnd('Duration 1');
console.log('Catán');
console.time('Duration 2');
console.log(theGame(tray,30000000));
console.timeEnd('Duration 2');