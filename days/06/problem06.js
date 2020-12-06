// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const tray = string.split(/\r\n\r\n/g);

// SEARCH COUNT OF ANYONE //
function searchCountQuestion(array) {
    let count = 0;
    array.forEach(e => {count += new Set(e.replace(/\r\n/g,'').split('')).size;});
    return count;
}

// SEARCH COUNT OF EVERYONE //
function searchCountQuestionAll(array) {
    let count = 0;
    array.forEach(e => {
        const freq = getFrequency(e.replace(/\r\n/g,''));
        for (const rep in freq) {
            if(freq[rep] === e.split(/\r\n/g).filter(e => e).length) count++;
        }
    });
    return count
}

// GET FREQUENCY OF LETTERS //
function getFrequency(string) {
    let freq = {};
    for (let i = 0; i < string.length; i++) {
        const char = string.charAt(i);
        freq[char] ? freq[char]++ : freq[char] = 1;
    }
    return freq;
};

// LOGGING //
console.log("Search Anyone Yes");
console.log(searchCountQuestion(tray));
console.log("Search Everyone Yes");
console.log(searchCountQuestionAll(tray));
