// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const numbersString = string.split(/\n/);

// CHECK REPETITIONS 2 TIMES //
function mult2sum(array,sumObj) {
    let error = '';
    let number01, number02;
    let result = [];

    // Checking errors
    if(typeof array === 'undefined' || array.length == 0) error = 'Empty array';
    if(!sumObj) error = 'No sum objective';
    // Fast spagueti for's to extract the 2 numbers
    for (let i = 0; i < array.length; i++) {
        number01 = parseInt(array[i]);
        for (let x = 0; x < array.length; x++) {
            number02 = parseInt(array[x]);
            if(x != i) {
                if (number01 + number02 == sumObj) {
                    result = [number01,number02]
                }
            }
        }
    }

    // Checking errors
    if(result == []) error = 'No match number';

    if(error != '') {
        return error;
    }
    else {
        return result;
    }
}

// CHECK REPETITIONS 3 TIMES //
function mult3sum(array,sumObj) {
    let error = '';
    let number01, number02, number03;
    let result = [];
    
    // Checking errors
    if(typeof array === 'undefined' || array.length == 0) error = 'Empty array';
    if(!sumObj) error = 'No sum objective';

    // Fast spagueti for's to extract the 3 numbers, more long
    for (let i = 0; i < array.length; i++) {
        number01 = parseInt(array[i]);
        for (let x = 0; x < array.length; x++) {
            number02 = parseInt(array[x]);
            for (let y = 0; y < array.length; y++) {
                number03 = parseInt(array[y]);
                if(x != i || y != i) {
                    if (number01 + number02 + number03 == sumObj) {
                        result = [number01,number02,number03]
                    }
                }
            }
        }
    }

    // Checking more errors
    if(result == []) error = 'No match number';

    if(error != '') {
        return error;
    }
    else {
        return result;
    }
}

// MULTIPLICATION => BEST INSIDE THE FUNCTION //
let res01 = mult2sum(numbersString,2020);
let res02 = mult3sum(numbersString,2020);

// LOGGING //
console.log("Array of results 1:");
console.log(res01);
console.log("Result 1");
console.log(res01[0]*res01[1]);
console.log("Array of results 2:");
console.log(res02);
console.log("Result 2");
console.log(res02[0]*res02[1]*res02[2]);