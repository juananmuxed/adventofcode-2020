// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const tray = string.split(/\r\n\r\n/g);

// ONE WAY //
function oneWayTicket(array) {
    let sum = 0;
    const cositas = array[0].split(/\r\n/g),
        nearbyTickets = array[2].split(/\:\r\n/g)[1].toString().replace(/\r\n/g, ',').split(','),
        tests = contructValidated(cositas);
    for (let i = 0; i < nearbyTickets.length; i++) {
        const tick = parseInt(nearbyTickets[i])
        if (!((tick >= tests.minf && tick <= tests.maxf) || (tick >= tests.mins && tick <= tests.maxs))) {
            sum += tick;
        };
    }
    return sum;
}

// VALIDITY //
function contructValidated(array) {
    let tests = {};
    for (let i = 0; i < array.length; i++) {
        const lineV = array[i].split(/: /g)[1],
            firstV = lineV.split(' or ')[0],
            secondV = lineV.split(' or ')[1];
        if (Object.keys(tests).length !== 0) {
            if (firstV.split('-')[0] < tests.minf) tests.minf = parseInt(firstV.split('-')[0]);
            if (firstV.split('-')[1] > tests.maxf) tests.maxf = parseInt(firstV.split('-')[1]);
            if (secondV.split('-')[0] < tests.mins) tests.mins = parseInt(secondV.split('-')[0]);
            if (secondV.split('-')[1] > tests.maxs) tests.maxs = parseInt(secondV.split('-')[1]);
        } else {
            tests = { minf: parseInt(firstV.split('-')[0]), maxf: parseInt(firstV.split('-')[1]), mins: parseInt(secondV.split('-')[0]), maxs: parseInt(secondV.split('-')[1]) };
        }
    }
    return tests;
}

// CONSTRUCT TEST //
function theConstructor(array) {
    let tests = {};
    for (let i = 0; i < array.length; i++) {
        let testName = array[i].split(': ')[0], testRange = array[i].split(': ')[1];
        tests[testName] = [testRange.split(' or ')[0].split('-'), testRange.split(' or ')[1].split('-')];
    }
    return tests;
}

// THE MOON //
function theMoon(array) {
    const cositas = array[0].split(/\r\n/g),
        tests = contructValidated(cositas),
        myTicket = array[1].split(/:\r\n/g)[1].split(',').map(Number),
        tickets = array[2].split(/\r\n/g);
    let validTickets = [], notVeryUtilMulti = 1;
    tickets.forEach(e => {
        let vals = e.split(',').map(Number), valid = true;
        for (let i = 0; i < vals.length; i++) {
            const tick = parseInt(vals[i]);
            if (!((tick >= tests.minf && tick <= tests.maxf) || (tick >= tests.mins && tick <= tests.maxs))) {
                valid = false;
                break;
            };
        }
        if (valid) validTickets.push(vals);
    });
    validTickets.unshift(myTicket);

    const constructRules = theConstructor(cositas),
        keysRules = Object.keys(constructRules),
        valuesRules = Object.values(constructRules);

    let maybe = new Array(validTickets[0].length);
    validTickets[0].forEach((e, i) => {
        maybe[i] = [...keysRules];
    });

    validTickets.forEach((vals) =>
        vals.forEach((val, i) => {
            maybe[i] = maybe[i].filter((name) => constructRules[name].some(([min,max]) => val >= min && val <= max));
        })
    );

    do {
        const ruleUnique = maybe.filter((rule) => rule.length == 1).map(rule => rule[0]);
        maybe = maybe.map(rule => rule.length == 1 ? rule : rule.filter(rule => !ruleUnique.includes(rule)))
        if (ruleUnique.length == keysRules.length) break;
    } while (true);

    maybe.forEach((e,i) => {
        if(e.toString().includes('departure')) notVeryUtilMulti *= myTicket[i];
    });

    return notVeryUtilMulti;
}

// LOGGING //
console.time('Duration 1');
console.log('One Way Ticket');
console.log(oneWayTicket(tray));
console.timeEnd('Duration 1');
console.log('To the mooooon');
console.time('Duration 2');
console.log(theMoon(tray));
console.timeEnd('Duration 2');