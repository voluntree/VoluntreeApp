import { getAsociacionByEmail, getVoluntarioByID } from "./service";

let data = {};

function setData(userData) {
  data = userData;
  setToUniqueSchema();
  console.log(data);
}

function setToUniqueSchema() {
  data.dni != undefined
    ? (data["type"] = "user")
    : (data["type"] = "association");

  data.type == "association" ? (data["id"] = data.CIF) : (data["id"] = data.dni);
}

export function getUserInstance() {
  return data;
}

export function setUserAsAssociation(email) {
  getAsociacionByEmail(email)
    .then((asoc) => setData(asoc))
    .catch();
}

export function setUserAsVolunteer(id) {
  getVoluntarioByID(id)
    .then((vol) => setData(vol))
    .catch();
}
