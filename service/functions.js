export function compareAlfabeticamenteAscendente(a, b) {
  if (a.titulo < b.titulo) {
    return -1;
  }
  if (a.titulo > b.titulo) {
    return 1;
  }
  return 0;
}

export function compareAlfabeticamenteDescendente(a, b) {
  if (a.titulo < b.titulo) {
    return 1;
  }
  if (a.titulo > b.titulo) {
    return -1;
  }
  return 0;
}

export function compareFechaMasReciente(a, b) {
  if (a.fecha.toDate() < b.fecha.toDate()) {
    return -1;
  }
  if (a.fecha.toDate() > b.fecha.toDate()) {
    return 1;
  }
  return 0;
}

export function compareFechaMasAntigua(a, b) {
  if (a.fecha.toDate() < b.fecha.toDate()) {
    return 1;
  }
  if (a.fecha.toDate() > b.fecha.toDate()) {
    return -1;
  }
  return 0;
}

export function ValidateEmail(input) {
  let str = "" + input;
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (str.match(validRegex)) return true;
  else return false;
}
