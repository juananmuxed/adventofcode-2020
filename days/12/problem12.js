// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const tray = string.split(/\r\n/g);

// DRUNKEN SAILOR //
function drunkenSailor(array,point,start) {
    let drunkMoves = {n:0,s:0,e:0,w:0},
    rosaVientos = ['n','e','s','w'], finalBoss = {n:0,s:0,e:0,w:0}, fronce = {n:0,s:0,e:0,w:0};
    if(start) {
        finalBoss = {n:start.n|0,s:start.s|0,e:start.e|0,w:start.w|0}
    }
    array.forEach(e => {
        const action = e.substring(0,1), number = parseInt(e.substring(1)),
        spinMyHead = (a,n) => {
            const turns = n/90;
            let direction = 1;
            if(a == 'L') direction = -1
            let newIndex = rosaVientos.indexOf(point.toLowerCase()) + turns*direction
            if(newIndex >= rosaVientos.length) newIndex = newIndex - rosaVientos.length;
            if(newIndex < 0) newIndex = rosaVientos.length + newIndex;
            return rosaVientos[newIndex]
        },
        multiMyHead = (n) => {
            fronce.n = finalBoss.n*n + fronce.n
            fronce.e = finalBoss.e*n + fronce.e
            fronce.s = finalBoss.s*n + fronce.s
            fronce.w = finalBoss.w*n + fronce.w
        }
        turnWay = (a,n,obj) => {
            const turns = n/90;
            let direction = 1,newObj = {};
            if(a == 'L') direction = -1
            for (let i = 0; i < rosaVientos.length; i++) {
                let newIndex = i + turns*direction;
                if(newIndex >= rosaVientos.length) newIndex = newIndex - rosaVientos.length;
                if(newIndex < 0) newIndex = rosaVientos.length + newIndex;
                newObj[rosaVientos[newIndex]] = obj[rosaVientos[i]];
            }
            return newObj;
        };
        switch (action) {
            case 'N':
                drunkMoves.n += number;
                drunkMoves.s -= number;
                finalBoss.n += number;
                finalBoss.s -= number;
                break;
            case 'S':
                drunkMoves.s += number;
                drunkMoves.n -= number;
                finalBoss.s += number;
                finalBoss.n -= number;
                break;
            case 'E':
                drunkMoves.e += number;
                drunkMoves.w -= number;
                finalBoss.e += number;
                finalBoss.w -= number;
                break;
            case 'W':
                drunkMoves.w += number;
                drunkMoves.e -= number;
                finalBoss.w += number;
                finalBoss.e -= number;
                break;
            case 'L':
                point = spinMyHead(action,number);
                finalBoss = turnWay(action,number,finalBoss)
                break;
            case 'R':
                point = spinMyHead(action,number);
                finalBoss = turnWay(action,number,finalBoss);
                break;
            case 'F':
                drunkMoves[point.toLowerCase()] += number;
                drunkMoves[spinMyHead('R',180)] -= number;
                multiMyHead(number);
                break;
            default:
                break;
        }
    });
    if(start) return Math.max(fronce.e,fronce.w) + Math.max(fronce.n,fronce.s);
    return Math.max(drunkMoves.e,drunkMoves.w) + Math.max(drunkMoves.n,drunkMoves.s);
}

// LOGGING //
console.time('Duration 1');
console.log('Perfect storm');
console.log(drunkenSailor(tray,'e'));
console.timeEnd('Duration 1');
console.log('The real Drunken Sailor');
console.time('Duration 2');
console.log(drunkenSailor(tray,'e',{e:10,n:1,w:-10,s:-1}));
console.timeEnd('Duration 2');