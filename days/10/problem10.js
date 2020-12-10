// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const tray = string.split(/\n/g);

// PREPARE LINKIN PARK //
function prepareLinkedinPark(array) {
    let copyCat = JSON.parse(JSON.stringify(array));
    copyCat.sort((a,b) => a-b);
    copyCat.push(Math.max(...copyCat) + 3);
    return copyCat;
}

// ADAPTER LINKIN PARK //
function adapterLinkedinPark(array,minPlug,maxPlug) {
    let countMin = 0,countMax = 0;
    array.unshift(0);
    for (let i = 1; i < array.length; i++) {
        let e = parseInt(array[i]) ,diff = Math.abs((array[i - 1] | 0) - e);
        if(diff == minPlug) countMin++;
        if(diff == maxPlug) countMax++;
    }
    return [countMax,countMin,countMax*countMin]
}

// ARRAGMENTS OF LINKIN PARKS //
function arragmentsLinkedinParks(array) {
    let linkinParks = array.reduce((acc,curr) => {
        let linkedins = [acc[curr - 1], acc[curr - 2], acc[curr - 3]]
        if(!linkedins[0]) linkedins[0] = 0
        if(!linkedins[1]) linkedins[1] = 0
        if(!linkedins[2]) linkedins[2] = 0
        acc[curr] = linkedins.reduce((a,b) => a+b,0);
        return acc;
    },[1]);
    return linkinParks[linkinParks.length - 1]
}

// LOGGING //
console.time('Duration 1');
console.log('Invalid sum');
console.log(adapterLinkedinPark(prepareLinkedinPark(tray),1,3)[2]);
console.timeEnd('Duration 1');
console.time('Duration 2');
console.log('Search the sums');
console.log(arragmentsLinkedinParks(prepareLinkedinPark(tray)));
console.timeEnd('Duration 2');
