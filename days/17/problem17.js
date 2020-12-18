// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const tray = string.split(/\n/g);

// MAIN ENERGY RELEASED //
function energyReleased(array, aaah, trys) {
  const startingMap = array.map((x) => [...x]);
  let activeSet = new Set(
    startingMap
      .map((e, x) =>
        e.map((v, y) => {
          if(v === "#") return `${x},${y},${Array.from({ length: aaah - 2 }, () => 0).join(",")}`
          else {return null}
        })
      )
      .flat()
      .filter(Boolean)
  );
  const jumps = [[-1, startingMap.length], [-1, startingMap[0].length], ...Array.from({ length: aaah - 2 }, () => [-1, 1])];
  while (trys > 0) {
    const n = new Set();
    nestedIter(jumps, 0, [], activeSet, n);
    jumps.forEach((b) => {
      b[0]--;
      b[1]++;
    });
    activeSet = n;
    trys--;
  }

  return activeSet.size;
}

// NESTING ITERATOR //
function nestedIter(jumps, level, coors, init, res) {
  if (level < jumps.length) {
    for (const i of arrayTheRange(...jumps[level])) {
      nestedIter(jumps, level + 1, [...coors, i], init, res);
    }
  } else {
    const active = init.has(coors.join(","));
    const neighbors = nested(0, coors, [], init);
    if (neighbors === 3 || (neighbors === 2 && init.has(coors.join(",")))) {
      res.add(coors.join(","));
    }
  }
}

// NESTED //
function nested(level, coors, base, init) {
  if (level === coors.length) {
    return !base.every((x) => x === 0) && init.has(coors.map((v, i) => v + base[i]).join(",")) ? 1 : 0;
  } else {
    return arrayTheRange(-1, 1).reduce((a, i) => a + nested(level + 1, coors, [...base, i], init), 0);
  }
}

// MAPING THE RANGE //
function arrayTheRange(first, last) {
  return Array.from({ length: last - first + 1 }, (_, i) => first + i);
}

// LOGGING //
console.time('Duration 1');
console.log('Energy unreleased');
console.log(energyReleased(tray, 3, 6));
console.timeEnd('Duration 1');
console.log('The energy');
console.time('Duration 2');
console.log(energyReleased(tray, 4, 6));
console.timeEnd('Duration 2');