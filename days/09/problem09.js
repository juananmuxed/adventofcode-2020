// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const tray = string.split(/\n/g);

// SEARCH THE INVALID SUM //
function searchInvalidSumatory(array,pre) {
    let sum = 0;
    for (let i = pre; i < array.length; i++) {
        let equal = true;
        for (let y = i - pre; y < i; y++) {
            for (let x = i - pre; x < i; x++) {
                if(y != x && equal) sum = parseInt(array[x]) + parseInt(array[y]);
                if(sum == parseInt(array[i])) equal = false;     
            }
        }
        if(sum != array[i] && equal) return [parseInt(array[i]),i];
    }
}

const error = searchInvalidSumatory(tray,25)

// SEARCH CONTIGUOUS SUM //
function searchContiguousSum(array,err) {
    let testArray = [];
    for (let i = 0; i < array.length; i++) {
        if(parseInt(array[i]) < err[0]) {
            let sum = 0;
            let index = 0;
            for (let x = i; x < array.length; x++) {
                sum += parseInt(array[x]);
                testArray[index] = parseInt(array[x]);
                if(testArray.length > 1 && sum == err[0]) return [Math.min(...testArray),Math.max(...testArray),Math.min(...testArray) + Math.max(...testArray)];
                index++;
            }
            sum = 0;
            testArray = [];
        };
    }
}

// SEARCH CONTIGUOUS SUM NOT OPTIMICED //
function searchContiguousSumNot(array,err) {
    let testArray = [];
    for (let i = 0; i < array.length; i++) {
        if(parseInt(array[i]) < err[0]) {
            for (let x = i; x < array.length; x++) {
                if(testArray.push(parseInt(array[x])) > 1 && testArray.reduce((a, b) => a + b, 0) == err[0]) return [Math.min(...testArray),Math.max(...testArray),Math.min(...testArray) + Math.max(...testArray)];
            }
            testArray = []
        };
    }
}

// LOGGING //
console.time('Duration 1');
console.log('Invalid sum');
console.log(searchInvalidSumatory(tray,25)[0]);
console.timeEnd('Duration 1');
console.time('Duration 2');
console.log('Search the sums');
console.log(searchContiguousSum(tray,error)[2]);
console.timeEnd('Duration 2');
// TESTING PERFORMANCE //
console.time('Duration 3');
console.log('Search the sums');
console.log(searchContiguousSumNot(tray,error)[2]);
console.timeEnd('Duration 3');
