// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const tray = string.split(/\r\n/);

// CHECK THE BOARDINGS  //
function checkBoards(array) {
    let returnedArray = [];
    array.forEach(e => {
        returnedArray.push(checkBinary(e.substring(0,7),'F','B') * 8 + checkBinary(e.substring(7,10),'L','R'));
    });
    return returnedArray;
}

// CHECK THE BINARY ALT //
function checkBinary(number,zero,one) {
    return parseInt(number.replace(new RegExp(zero,'g'),0).replace(new RegExp(one,'g'),1),2);
}

// CHECK LARGEST //
function checkLargest(array) {
    let largest = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i]>largest) largest=array[i];
    }
    return largest;
}

// CHECK YOUR ID //
function searchLastID(array) {
    array = checkBoards(array).sort((a,b) => {return a-b});
    let ret = []
    for (let i = 0; i < array.length; i++) {
        if((array[i+1] - array[i]) != 1) return array[i] + 1;
    }
    return ret;
}

// LOGGING //
console.log('Largest ID');
console.log(checkLargest(checkBoards(tray)));
console.log('Your boarding ID');
console.log(searchLastID(tray));