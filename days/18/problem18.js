// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const tray = string.split(/\r\n/g);

// LE TONGUE //
function leTongue(array) {
  const regEx = /\([^()]+\)/;
  let totalRecal = 0;

  for (let i = 0; i < array.length; i++) {
    let elSumatorio, elElemento = array[i];
    while (elSumatorio = regEx.exec(elElemento)) {
      const elSubstrin = elSumatorio[0].substr(1,elSumatorio[0].length - 2);
      let laCalculasion = laFuncionDeSumarYMultiplicar(elSubstrin);
      elElemento = elElemento.substr(0, elSumatorio.index) + laCalculasion + elElemento.substr(elSumatorio.index + elSumatorio[0].length);
    }
    totalRecal += laFuncionDeSumarYMultiplicar(elElemento);
  }
  return totalRecal;
}

// LA CALCULASION //
function laFuncionDeSumarYMultiplicar(elDato) {
  if(!elDato) return 0;
  const numOper = elDato.split(' ')
  let laSuma = +numOper[0];
  for (let i = 1; i < numOper.length; i+=2) {
    if (numOper[i] == '+') laSuma += +numOper[i+1];
    if (numOper[i] == '*') laSuma *= +numOper[i+1];
  }
  return laSuma;
}

// LA PRECALCULASION //
function laFuncionDeSumarYMultiplicarAvanzada(elDato) {
  let elSumatorio;
  const regEx = /\d+\s\+\s\d+/;
  console.log(elDato)
  while (elSumatorio = regEx.exec(elDato)) {
    const elSubstrin = elSumatorio[0].substr(0,elSumatorio[0].length);
    let laCalculasion = laFuncionDeSumarYMultiplicar(elSubstrin);
    elDato = elDato.substr(0, elSumatorio.index) + laCalculasion + elDato.substr(elSumatorio.index + elSumatorio[0].length);
  }
  return laFuncionDeSumarYMultiplicar(elDato)
}

// LA SEGUNDA VENIDA //
function segundaVenida(array) {
  const regEx = /\([^()]+\)/;
  let totalRecal = 0;
  for (let i = 0; i < array.length; i++) {
    let elSumatorio, elElemento = array[i];
    while (elSumatorio = regEx.exec(elElemento)) {
      const elSubstrin = elSumatorio[0].substr(1,elSumatorio[0].length - 2);
      let laCalculasion = laFuncionDeSumarYMultiplicarAvanzada(elSubstrin);
      elElemento = elElemento.substr(0, elSumatorio.index) + laCalculasion + elElemento.substr(elSumatorio.index + elSumatorio[0].length);
    }
    totalRecal += laFuncionDeSumarYMultiplicarAvanzada(elElemento);
  }
  return totalRecal;
}

// LOGGING //
console.time('Duration 1');
console.log('Le Tongue');
console.log(leTongue(tray));
console.timeEnd('Duration 1');
console.log('Segunda Venida');
console.time('Duration 2');
console.log(segundaVenida(tray));
console.timeEnd('Duration 2');