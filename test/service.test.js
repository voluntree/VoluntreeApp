import {
  getAllActivities,
  getActivityById,
  followAsociation,
  getImageDownloadURL,
  deleteUserData,
  getAsociationByID,
} from "../service/service";
import {
  compareFechaMasReciente,
  compareFechaMasAntigua,
} from "../service/functions";
import { expect, jest, test } from "@jest/globals";
import { text } from "stream/consumers";
import { Timestamp } from "@firebase/firestore";
import { async } from "q";

test("obtiene todas la actividades de la base de datos", async () => {
  expect((await getAllActivities()).length).toBeGreaterThan(2);
});

test("obtiene una actividad con el id", async () => {
  expect((await getActivityById("Apoyo Escolar a Jovenes de ESO")).titulo).toBe(
    "Apoyo Escolar a Jovenes de ESO"
  );
});

const urls = [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/voluntreepin.appspot.com/o/productos%2FcantimploraEco.png?alt=media&token=8e67418a-2e75-4ad5-87d4-7da0667fecf5",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/voluntreepin.appspot.com/o/productos%2FcantimploraEco2.png?alt=media&token=c66feab4-777b-4ea9-8429-763f93830282",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/voluntreepin.appspot.com/o/productos%2Fecobag.png?alt=media&token=b8d82ac5-6bfd-4a14-97dd-6a50491bc2c3",
  },
];

test("descarga de las imagenes correctamente", async () => {
  expect(
    urls.forEach((imagen) => {
      getImageDownloadURL(imagen.url);
    })
  ).not.toBe(null);
});

test("compara fecha mas", async () => {
  const act1 = await getActivityById("Apoyo Escolar a Jovenes de ESO");
  const act2 = await getActivityById("Pasear perros por la huerta");
  expect(compareFechaMasAntigua(act1, act2)).toBe(1) &&
    expect(compareFechaMasReciente(act1, act2)).toBe(2);
});

test("seguir a una asociacion", async () => {
  const user = {
    actividades: ["Apoyo Escolar a Jovenes de ESO", "Plantación en la Vallesa"],
    apellidos: "Cortés Reverón",
    correo: "sancore17@gmail.com",
    descripcion: "Voluntario con ganas de plantar arboles!!  🌱",
    dni: "50329384W",
    fechaDeNacimiento: "",
    fotoPerfil: "ad9fbcf3-f56c-4dba-9bdb-36b269b8e2ab.jpeg",
    nombre: "Santiago",
    siguiendo: [],
    telefono: "640524839",
    puntos: 0,
  };
  const asociacion = await getAsociationByID("Modepran");
  expect(await followAsociation(user, "Modepran")).toBe(
    asociacion.seguidores.includes(user.nombre + " " + user.apellidos)
  );
});
