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
                let trini, raton;
                if(niobe % 2 == 0) {
                    trini = checkTrinity(array,x,y,occuped)
                    if(trini) tanque[x][y] = occuped;
                } else {
                    raton = checkRaton(array,x,y,occuped)
                    if(raton) tanque[x][y] = empty;
                }
            }
        }
    }
    niobe++;
    if(JSON.stringify(tanque) == JSON.stringify(array)) return JSON.stringify(tanque).match(/#/g).length;
    return checkMorfeo(tanque,empty,occuped);
}

// THE AGENT APEARS //
function checkTrinity(array,x,y,occ) {
    if(array[x][y] == occ || 
        array[x][y - 1] == occ || 
        (array[x - 1] && array[x - 1][y - 1] == occ) || 
        (array[x - 1] && array[x - 1][y] == occ) || 
        (array[x - 1] && array[x - 1] && array[x - 1][y + 1] == occ) || 
        array[x][y + 1] == occ || 
        (array[x + 1] && array[x + 1][y + 1] == occ) || 
        (array[x + 1] && array[x + 1][y] == occ) || 
        (array[x + 1] && array[x + 1][y - 1] == occ)) return false;
    return true;
}

// THE AGENT ATTACK //
function checkRaton(array,x,y,occ) {
    let e = array[x][y],
        cifra = 0;
    if(e != occ) return false;
    if(array[x][y - 1] == occ) cifra++;
    if(array[x - 1] && array[x - 1][y - 1] == occ) cifra++;
    if(array[x - 1] && array[x - 1][y] == occ) cifra++;
    if(array[x - 1] && array[x - 1][y + 1] == occ) cifra++;
    if(array[x][y + 1] == occ) cifra++;
    if(array[x + 1] && array[x + 1][y + 1] == occ) cifra++;
    if(array[x + 1] && array[x + 1][y] == occ) cifra++;
    if(array[x + 1] && array[x + 1][y - 1] == occ) cifra++;
    if(cifra >= 4) return true
    return false;
}

// DEFEND SION //
let thekid = 0;
function checkMachines(array,empty,occuped) {
    let tanque = JSON.parse(JSON.stringify(array));
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array[x].length; y++) {
            if (array[x][y] != '.') {
                let trini, raton;
                if(thekid % 2 == 0) {
                    trini = checkArquitecto(array,x,y,occuped,empty)
                    if(trini) tanque[x][y] = occuped;
                } else {
                    raton = checkOraculo(array,x,y,occuped,empty)
                    if(raton) tanque[x][y] = empty;
                }
            }
        }
    }
    thekid++;
    if(JSON.stringify(tanque) == JSON.stringify(array)) return JSON.stringify(tanque).match(/#/g).length;
    return checkMachines(tanque,empty,occuped);
}

// NEO REBIRTH //
function checkArquitecto(array,x,y,occ,emp) {
    let merovingio = (x,y) => {
        if(array[x] && array[x][y] == occ) return [true,array[x][y]];
        return false;
    },
    leftOcc = false,leftUpOcc = false,upOcc = false,rightUpOcc = false,rightOcc = false,rightDownOcc = false,downOcc = false,leftDownOcc = false;
    if(merovingio(x,y)) return false;
    for (let left = y - 1; left >= 0; left--) {
        let check = merovingio(x,left)
        if(check[1] == emp) break;
        if(check[0]) {
            leftOcc = true;
            break;
        };
    }
    for (let left = y - 1,up = x - 1; left >= 0 || up >= 0; left--,up--) {
        let check = merovingio(up,left)
        if(check[1] == emp) break;
        if(check[0]) {
            leftUpOcc = true;
            break;
        };
    }
    for (let up = x - 1; up >= 0; up--) {
        let check = merovingio(up,y)
        if(check[1] == emp) break;
        if(check[0]) {
            upOcc = true;
            break;
        };
    }
    for (let right = y + 1,up = x  - 1; right < array[x][y].length || up >= 0; right++,up--) {
        let check = merovingio(up,right)
        if(check[1] == emp) break;
        if(check[0]) {
            rightUpOcc = true;
            break;
        };
    }
    for (let right = y + 1; right < array[x][y].length; right++) {
        let check = merovingio(x,right)
        if(check[1] == emp) break;
        if(check[0]) {
            rightOcc = true;
            break;
        };
    }
    for (let right = y + 1,down = x + 1; right < array[x][y].length || down < array[x].length; right++,down++) {
        let check = merovingio(down,right)
        if(check[1] == emp) break;
        if(check[0]) {
            rightDownOcc = true;
            break;
        };
    }
    for (let down = x + 1; down < array[x].length; down++) {
        let check = merovingio(down,y)
        if(check[1] == emp) break;
        if(check[0]) {
            downOcc = true;
            break;
        };
    }
    for (let left = y - 1,down = x + 1; left >= 0 || down < array[x].length; left--,down++) {
        let check = merovingio(down,left)
        if(check[1] == emp) break;
        if(check[0]) {
            leftDownOcc = true;
            break;
        };
    }
    if(leftOcc || leftUpOcc || upOcc || rightUpOcc || rightOcc || rightDownOcc || downOcc || leftDownOcc) return false;
    return true;
}

// NEO FIGHT //
function checkOraculo(array,x,y,occ,emp) {
    let merovingio = (x,y) => {
        if(array[x] && array[x][y] == occ) return [true,array[x][y]];
        return false;
    },
    countSionists = 0;
    if(array[x][y] != occ) return false;
    for (let left = y - 1; left >= 0; left--) {
        let check = merovingio(x,left)
        if(check[1] == emp) break;
        if(check[0]) {
            countSionists++;
            break;
        };
    }
    for (let left = y - 1,up = x - 1; left >= 0 || up >= 0; left--,up--) {
        let check = merovingio(up,left)
        if(check[1] == emp) break;
        if(check[0]) {
            countSionists++;
            break;
        };
    }
    for (let up = x - 1; up >= 0; up--) {
        let check = merovingio(up,y)
        if(check[1] == emp) break;
        if(check[0]) {
            countSionists++;
            break;
        };
    }
    for (let right = y + 1,up = x  - 1; right < array[x][y].length || up >= 0; right++,up--) {
        let check = merovingio(up,right)
        if(check[1] == emp) break;
        if(check[0]) {
            countSionists++;
            break;
        };
    }
    for (let right = y + 1; right < array[x][y].length; right++) {
        let check = merovingio(x,right)
        if(check[1] == emp) break;
        if(check[0]) {
            countSionists++;
            break;
        };
    }
    for (let right = y + 1,down = x + 1; right < array[x][y].length || down < array[x].length; right++,down++) {
        let check = merovingio(down,right)
        if(check[1] == emp) break;
        if(check[0]) {
            countSionists++;
            break;
        };
    }
    for (let down = x + 1; down < array[x].length; down++) {
        let check = merovingio(down,y)
        if(check[1] == emp) break;
        if(check[0]) {
            countSionists++;
            break;
        };
    }
    for (let left = y - 1,down = x + 1; left >= 0 || down < array[x].length; left--,down++) {
        let check = merovingio(down,left)
        if(check[1] == emp) break;
        if(check[0]) {
            countSionists++;
            break;
        };
    }
    if(countSionists >= 5) return true;
    return false;
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
