// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const tray = string.split(/\n/g);

// SEARCH BAG OPTIONS //
function searchBag(array,bag) {
    let blankList = [];
    array.forEach(e => {if(e.split(' contain ')[1].match(bag)) blankList.push(e.split(' contain ')[0].replace(' bags',''))});
    if(blankList.length != 0) blankList.forEach(e => searchBag(array,e,blankList)[0].forEach(e => {blankList.push(e)}));
    return [blankList,blankList.length];
}

// SEARCH BAG COUNT CHILDS //
let count = 0;
function searchContentBags(array,bag,multi) {
    array.forEach(e => {
        if(e.split(' contain ')[0].match(bag) && e.split(' contain ')[1].split(' ')[0] != 'no') {
            e.split(' contain ')[1].split(', ').forEach(x => {
                count += x.split(' ')[0]*multi;
                searchContentBags(array,x.split(' ')[1] + ' ' +  x.split(' ')[2],x.split(' ')[0]);
            });
        }
    });
    return count;
}

// LOGGING //
console.time('Duration1')
console.log('Searched bags options');
console.log(searchBag(tray,'shiny gold')[0].filter((v, i, s) => s.indexOf(v) === i).length);
console.timeEnd('Duration1')
console.time('Duration2')
console.log('Count bag childs');
console.log(searchContentBags(tray,'shiny gold',1));
console.timeEnd('Duration2')
