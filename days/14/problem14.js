// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const tray = string.split(/\n/g);

// HACKING MASKING //
function hackingFraking(array) {
    let mask = '',memory = [];
    array.forEach(e => {
        const type = e.split(' = ')[0], number = e.split(' = ')[1]
        if(type == 'mask') mask = number;
        else {
            const memNum = type.split(/[\[\]]/)[1];
            let bitNumber = passToBit(number,36).split('');
            for (let i = 0; i < mask.length; i++) {
                if(mask[i] != 'X' && mask[i] != bitNumber[i]) bitNumber[i] = mask[i];
            }
            memory[memNum] = parseInt(bitNumber.join(''),2);
        }
    });
    return memory.reduce((a, b) => a + b, 0);
}

// FLUX CAPACITOR //
function fluxCapacitor(array) {
    let mask = '',memory = {}, min = 0;
    array.forEach(e => {
        const type = e.split(' = ')[0], number = e.split(' = ')[1];
        let addresses = []
        if(type == 'mask') mask = number;
        else {
            const memNum = type.split(/[\[\]]/)[1];
            let bitNumber = passToBit(memNum,36);
            for (let i = 0; i < mask.length; i++) {
                if(mask[i] == '1') bitNumber = bitNumber.substring(0, i) + '1' + bitNumber.substring(i + 1);
                if(mask[i] == 'X') bitNumber = bitNumber.substring(0, i) + 'X' + bitNumber.substring(i + 1);
            }
            let length2 = Math.pow(2,bitNumber.split('').filter(e=>e=="X").length)
            addresses = returnToFuture(bitNumber,[],length2);
            addresses.forEach(e => {
                memory[parseInt(e,2)] = parseInt(number);
            });
        }
    });
    return Object.values(memory).reduce((a, b) => a + b, 0);
}

// RETURN TO FUTURE //
function returnToFuture(address,array,length) {
    if(address.split('').indexOf('X')==-1) array.indexOf(address)==-1 ? array.push(address):'';
    else {
        for(let i=0;i<address.length;i++){
            if(address[i]=="X"){
                let add01 = address, add02 = address
                if(add01.split('').indexOf("X")===i){             
                    add01 = add01.substring(0, i) + '1' + add01.substring(i + 1);
                    add02 = add02.substring(0, i) + '0' + add02.substring(i + 1);
                    returnToFuture(add01,array,length);
                    returnToFuture(add02,array,length) ;
                }
            }
        }
    }
    if(array.length==length) return array.filter(x => x !== undefined);
}

// BIT HACK //
function passToBit(string,bits) {
    let bin = parseInt(string).toString(2);
    for (let i = bin.length; i < bits; i++) {
        bin = '0' +  bin;
    }
    return bin;
}

// LOGGING //
console.time('Duration 1');
console.log('The Mask');
console.log(hackingFraking(tray));
console.timeEnd('Duration 1');
console.log('Flux Capacitor');
console.time('Duration 2');
console.log(fluxCapacitor(tray));
console.timeEnd('Duration 2');