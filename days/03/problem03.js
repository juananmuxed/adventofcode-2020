// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const tray = string.split(/\n/);

// COUNT TREES IN SLOOP FUNCTION //
function countTree(tray,tree,starting,sloop,speed,countTree) {
    for (let y = 0; y < tray.length; y = y + speed) {
        if(y!=0) {
            starting = nonDecimalSystemSumLast(tray[y].length,starting,sloop)
            if(tray[y].charAt(starting) == tree) {
                countTree++
            };
        }
    }
    return countTree;
}

// NON DECIMAL LAST DECIMAL SUM //
function nonDecimalSystemSumLast(system,number,plus) {
    let sum = number + plus;
    if ( sum >= system ) sum = sum - system;
    return sum;
}
// EXTRA: NON DECIMAL LAST DECIMAL SUS //
function nonDecimalSystemSusLast(system,number,minus) {
    let sus = number - minus;
    if ( sus < 0 ) sus = system + sus;
    return sus;
}

// FIRST PART //
console.log('First part solution')
console.log(countTree(tray,'#',0,3,1,0));

// DIFERENT COMBINATIONS //
console.log('Combinations of Sloops')
console.log(countTree(tray,'#',0,1,1,0));
console.log(countTree(tray,'#',0,3,1,0)); // FIRST PART SOLUTION
console.log(countTree(tray,'#',0,5,1,0));
console.log(countTree(tray,'#',0,7,1,0));
console.log(countTree(tray,'#',0,1,2,0));

// MULTIPLY //
console.log('Multiply of Combinations')
console.log(
(countTree(tray,'#',0,1,1,0)*
countTree(tray,'#',0,3,1,0)*
countTree(tray,'#',0,5,1,0)*
countTree(tray,'#',0,7,1,0)*
countTree(tray,'#',0,1,2,0)));