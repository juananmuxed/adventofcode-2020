// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const passwords = string.split(/\n/);

// TEST NUMBER OF VALID PASSWORDS => BY NUMBER OF OCCURRENCES //
function testPasswords(array) {
    let validPasswords = 0;
    for (let x = 0; x < array.length; x++) {
        const min = parseInt(array[x].split(' ')[0].split('-')[0]);
        const max = parseInt(array[x].split(' ')[0].split('-')[1]);
        const search = array[x].split(' ')[1][0];
        const pass = array[x].split(' ')[2];
        const count = countOccurrences(pass,search);
        if(count >= min && count <=max ) validPasswords++;
    }
    return validPasswords;
}

// COUNT OCCURRENCES FOR testPasswords() //
function countOccurrences(string,search) {
    const reg = new RegExp(search, "g");
    return (string.match(reg) || []).length;
}

// CHECK NUMBER OF VALID PASSWORDS => BY POSITION //
function checkPasswords(array) {
    let validPasswords = 0;
    for (let x = 0; x < array.length; x++) {
        const first = parseInt(array[x].split(' ')[0].split('-')[0]);
        const second = parseInt(array[x].split(' ')[0].split('-')[1]);
        const search = array[x].split(' ')[1][0];
        const pass = array[x].split(' ')[2];
        let valid1 = pass[first-1] == search;
        let valid2 = pass[second-1] == search ;
        if(!(valid1 && valid2) && (valid1 || valid2) ) validPasswords++;
    }
    return validPasswords;
}

// LOGGING //
console.log("Number of passwords by number of occurrences");
console.log(testPasswords(passwords));
console.log("Number of passwords by position");
console.log(checkPasswords(passwords));