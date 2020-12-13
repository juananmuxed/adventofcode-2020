// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const tray = string.split(/\n/g);

// THE BUS PARADE //
function theBigRedBus(array,ignored) {
    const buses = array[1].split(',');
    let rests = [];
    buses.forEach((e,i) => {
        (e != ignored) ? rests[i] = (e - parseInt(array[0])%parseInt(e)) : rests[i] = e;
    });
    return buses[rests.indexOf(Math.min(...rests.filter((e) => e != ignored)))] * Math.min(...rests.filter((e) => e != ignored))
}

// INCOMING BUSES //
function incomingBuses(array) {
    let buses = array[1].split(',');
    buses = buses.reduce((prev,curr) => {
        if(curr=='x') return prev;
        while((prev[0] + 1) % curr) {
            prev[0] += prev[1];
        }
        prev[1] = curr * prev[1];
        return prev;
    },[0,1])
    return buses[0];
}

// LOGGING //
console.time('Duration 1');
console.log('First Shuttle Bus');
console.log(theBigRedBus(tray,'x'));
console.timeEnd('Duration 1');
console.log('Chimichangas');
console.time('Duration 2');
console.log(incomingBuses(tray));
console.timeEnd('Duration 2');