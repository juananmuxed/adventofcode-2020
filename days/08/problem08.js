// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const tray = string.split(/\r\n/g);

// SEARCH LOOP ACCUMULATOR //
function searchLoopAcc(array) {
    let auxArr = [] , acumulator = 0, i;
    array.forEach(e => {
        let item = e.split(' ');
        item.push('O');
        auxArr.push(item);
    });
    for (i = 0; i < auxArr.length;) {
        if (auxArr[i][2] == 'X') {break;}
        auxArr[i][2] = 'X';
        if(auxArr[i][0] == 'acc') acumulator += parseInt(auxArr[i][1]);
        auxArr[i][0] == 'jmp' ? i = i + parseInt(auxArr[i][1]) : i++;
    }
    return [acumulator,i];
}

// SEARCH THE BUG //
function searchBug(array) {
    let tests = [];
    let acumulator = 0;
    array.forEach((e,i,arr) => {
        let arrayTest = JSON.parse(JSON.stringify(arr));
        if(e.substring(0,3) == 'jmp') {
            arrayTest[i] = e.replace('jmp','nop');
            tests.push(arrayTest);
        }
        if(e.substring(0,3) == 'nop') {
            arrayTest[i] = e.replace('nop','jmp');
            tests.push(arrayTest);
        }
    });
    for (let i = 0; i < tests.length; i++) {
        let res = searchLoopAcc(tests[i]);
        if(res[1] >= tray.length) {
            acumulator = res[0];
            break;
        };
    }
    return acumulator;
}

// LOGGING //
console.time('Duration1');
console.log('Search of Accummulator Bug');
console.log(searchLoopAcc(tray)[0]);
console.timeEnd('Duration1');
console.time('Duration2');
console.log('Search the bug');
console.log(searchBug(tray));
console.timeEnd('Duration2');
