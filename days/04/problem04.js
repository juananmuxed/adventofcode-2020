// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const tray = string.split(/\n\n/);

// VALIDATIONS  //
const validations = [
    {name:'byr',validation:/^(19[2-8][0-9]|199[0-9]|200[0-2])$/},
    {name:'iyr',validation:/^(201[0-9]|2020)$/},
    {name:'eyr',validation:/^(202[0-9]|2030)$/},
    {name:'hgt',validation:/^(59|6[0-9]|7[0-6]){1,}(in)$|^(1[5-8][0-9]|19[0-3]){1,}(cm)$/},
    {name:'hcl',validation:/^#[0-9a-f]{6}$/},
    {name:'ecl',validation:/^(amb|blu|brn|gry|grn|hzl|oth)$/},
    {name:'pid',validation:/^[0-9]{9}$/}
];

// CREATING A VALID REGEX  //
function convertToReg(array) {
    let r = [];
    for (let i = 0; i < array.length; i++) {
        r.push('(' +  array[i].name + ')');
    }
    return new RegExp(r.join('|'),'g');
}

// CHECK ALL PASSPORTS //
function validatePassports(array,validation) {
    const regexEscape = /\n/gm;
    const regexValidation = convertToReg(validation);
    let validPassports = 0, validAndValidated = 0;
    array.forEach(element => {
        if (validation.length == element.match(regexValidation).length) {
            validPassports++
            if(validateAll(element.replace(regexEscape,' ').split(' '),validation)) validAndValidated++;
        };
    });
    return [validPassports,validAndValidated];
}

// VALIDATE EACH VALIDATION INDIVIDUALLY  //
function validateAll(array,validation) {
    let valid = true;
    array.forEach(el => {
        validation.forEach(elval => {
            if(elval.name == el.split(':')[0] && el.split(':')[1].match(elval.validation) == null){
                valid = false
            };
        });
    });
    return valid;
}

// LOGGING  //
const ret = validatePassports(tray,validations);
console.log("All passwords with inputs required")
console.log(ret[0])
console.log("All valid password")
console.log(ret[1])
