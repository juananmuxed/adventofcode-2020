// INPUT //
const { ok } = require('assert');
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const tray = string.split(/\n/g);

// SET THE MATRIX //
function createNeo(array) {
    let ret = [];
    array.forEach((e,i) => {
        ret[i] = e.split('');
    });
    return ret;
}

// GO TO SION //
let niobe = 0;
function checkMorfeo(array,empty,occuped) {
    let tanque = JSON.parse(JSON.stringify(array));
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array[x].length; y++) {
            if (array[x][y] != '.') {
                if(niobe % 2 == 0) {
                    if(checkTrinity(array,x,y,occuped,false)) tanque[x][y] = occuped;
                } else {
                    if(checkTrinity(array,x,y,occuped,true)) tanque[x][y] = empty;
                }
            }
        }
    }
    niobe++;
    if(JSON.stringify(tanque) == JSON.stringify(array)) return JSON.stringify(tanque).match(/#/g).length;
    return checkMorfeo(tanque,empty,occuped);
}

// DEFEND SION //
let thekid = 0;
function checkMachines(array,empty,occuped) {
    let tanque = JSON.parse(JSON.stringify(array));
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array[x].length; y++) {
            if (array[x][y] != '.') {
                if(thekid % 2 == 0) {
                    if(checkArquitecto(array,x,y,occuped,empty,false)) tanque[x][y] = occuped;
                } else {
                    if(checkArquitecto(array,x,y,occuped,empty,true)) tanque[x][y] = empty;
                }
            }
        }
    }
    thekid++;
    if(JSON.stringify(tanque) == JSON.stringify(array)) return JSON.stringify(tanque).match(/#/g).length;
    return checkMachines(tanque,empty,occuped);
}

// THE AGENT ATTACK //
function checkTrinity(array,x,y,occ,sitDown) {
    let cifra = 0
    sion = false;
    if(!sitDown && array[x][y] == occ) return false;
    if(sitDown && array[x][y] != occ) return false;
    if(array[x][y - 1] == occ) cifra++ , sion = true;
    if(array[x - 1] && array[x - 1][y - 1] == occ) cifra++, sion = true;
    if(array[x - 1] && array[x - 1][y] == occ) cifra++, sion = true;
    if(array[x - 1] && array[x - 1][y + 1] == occ) cifra++, sion = true;
    if(array[x][y + 1] == occ) cifra++, sion = true;
    if(array[x + 1] && array[x + 1][y + 1] == occ) cifra++, sion = true;
    if(array[x + 1] && array[x + 1][y] == occ) cifra++, sion = true;
    if(array[x + 1] && array[x + 1][y - 1] == occ) cifra++, sion = true;
    if(sitDown) {
        if(cifra >= 4) return true;
        return false;
    } else {
        if(sion) return false;
        return true;
    }
}

// NEO REBIRTH //
function checkArquitecto(array,x,y,occ,emp,sitDown) {
    let limits = {l:0,u:0,r:array[x].length,d:array.length},
    merovingio = (x,y) => {
        if(array[x] && array[x][y] == occ) return [true,array[x][y]];
        return [false,array[x][y]];
    },
    sion = false,
    countSionists = 0;
    if(!sitDown && array[x][y] == occ) return false;
    if(sitDown && array[x][y] != occ) return false;
    for (let left = y - 1; left >= limits.l; left--) {
        let check = merovingio(x,left)
        if(check[1] == emp) break;
        if(check[0]) {
            sion = true;
            countSionists++;
            break;
        };
    }
    for (let left = y - 1,up = x - 1; (left >= limits.l && up >= limits.u); left--,up--) {
        let check = merovingio(up,left)
        if(check[1] == emp) break;
        if(check[0]) {
            sion = true;
            countSionists++;
            break;
        };
    }
    for (let up = x - 1; up >= limits.u; up--) {
        let check = merovingio(up,y)
        if(check[1] == emp) break;
        if(check[0]) {
            sion = true;
            countSionists++;
            break;
        };
    }
    for (let right = y + 1,up = x  - 1; (right < limits.r && up >= limits.u); right++,up--) {
        let check = merovingio(up,right)
        if(check[1] == emp) break;
        if(check[0]) {
            sion = true;
            countSionists++;
            break;
        };
    }
    for (let right = y + 1; right < limits.r; right++) {
        let check = merovingio(x,right)
        if(check[1] == emp) break;
        if(check[0]) {
            sion = true;
            countSionists++;
            break;
        };
    }
    for (let right = y + 1,down = x + 1; (right < limits.r && down < limits.d); right++,down++) {
        let check = merovingio(down,right)
        if(check[1] == emp) break;
        if(check[0]) {
            sion = true;
            countSionists++;
            break;
        };
    }
    for (let down = x + 1; down < limits.d; down++) {
        let check = merovingio(down,y)
        if(check[1] == emp) break;
        if(check[0]) {
            sion = true;
            countSionists++;
            break;
        };
    }
    for (let left = y - 1,down = x + 1; (left >= limits.l && down < limits.d); left--,down++) {
        let check = merovingio(down,left)
        if(check[1] == emp) break;
        if(check[0]) {
            sion = true;
            countSionists++;
            break;
        };
    }
    if(sitDown) {
        if(countSionists >= 5) return true;
        return false;
    } else {
        if(sion) return false;
        return true;
    }
}

// LOGGING //
console.time('Duration 1');
console.log('Wachosky Matrix Seats');
console.log(checkMorfeo(createNeo(tray),'L','#'));
console.timeEnd('Duration 1');
console.time('Duration 2');
console.log('Sionists');
console.log(checkMachines(createNeo(tray),'L','#'));
console.timeEnd('Duration 2');