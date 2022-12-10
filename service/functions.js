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
  const md5 = require("md5");
  return md5(string).substring(0, 8).toLocaleUpperCase();
}

export function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 1) + "... ";
  } else {
    return text;
  }
}

export function adaptAssociationToUser(association) {
  let user = {};
  user["nombre"] = association.nombre;
  user["apellidos"] = "";
  user["dni"] = association.id;
  return user;
}

export function adaptVolunteerToUser(usr) {
  let user = {};
  user["nombre"] = usr.nombre;
  user["apellidos"] = usr.apellidos;
  user["dni"] = usr.id;
  console.log("mostrando apdaptacion: ", user);
  return user;
}
