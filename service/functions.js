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

export function stringToHash(string) {
  const md5 = require('md5')
  return md5(string).substring(0,8).toLocaleUpperCase();
}
