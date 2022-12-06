import {getAllActivities, 
        getActivityById, 
        getActivityByTitle, 
        inscribirUsuarioEnActividad,
        desapuntarseDeActividad,
        createActivity,
        deleteActivity,
        updateActivity
} from "../service/service"
import {expect, jest, test} from "@jest/globals"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

test('obtiene todas la actividades de la base de datos',async () => {  
    expect((await getAllActivities()).length).toBeGreaterThan(2)
})

test('obtiene una actividad con el id', async () => { 
    expect((await getActivityById("Pasear perros por la huerta")).titulo).toBe("Pasear perros por la huerta")
})

test('obtiene una actividad con el titulo', async () => { 
    expect((await getActivityByTitle("Pasear perros por la huerta")).titulo).toBe("Pasear perros por la huerta")
})

test('inscribe al usuario en una actividad', async () => {  
    await inscribirUsuarioEnActividad("Pasear perros por la huerta","OBTudS6aiuSPW2EiwIOLZFtYxFp2")
    const actividad = await getActivityById("Pasear perros por la huerta")
    expect(actividad.participantes.includes("OBTudS6aiuSPW2EiwIOLZFtYxFp2")).toBe(true)
})

test('borra al usuario en una actividad', async () => {  
    await desapuntarseDeActividad("Pasear perros por la huerta","OBTudS6aiuSPW2EiwIOLZFtYxFp2")
    const actividad = await getActivityById("Pasear perros por la huerta")
    expect(actividad.participantes.includes("OBTudS6aiuSPW2EiwIOLZFtYxFp2")).toBe(false)
})

test('añade una actividad a la base de datos', async () =>{
    const actividad = {asociacion: "Green Peace",
                     confirmados: [],
                     descripcion: "Descripcion",
                     duracion: "2h",
                     favoritos: [],
                     fecha: Date.now(),
                     imagen: "niñosEstudiando.jpg",
                     max_participantes: 10,
                     num_participantes: 0,
                     participantes: [],
                     puntos: 20,
                     reclamados: [],
                     tipo: "educación",
                     titulo: "Actividad lectura de libros a niños",
                     ubicacion: {longitude: 0.4, latitude: 39}}
    await createActivity(actividad)
    await sleep(1000)
    const actividadBD = await getActivityById("Actividad lectura de libros a niños")
    expect(actividadBD).toStrictEqual(actividad)
})

test('modifica una actividad a la base de datos', async () =>{
    const actividad = {asociacion: "Green Peace",
                     confirmados: [],
                     descripcion: "Descripcion",
                     duracion: "4h",
                     favoritos: [],
                     fecha: Date.now(),
                     imagen: "niñosEstudiando.jpg",
                     max_participantes: 10,
                     num_participantes: 0,
                     participantes: [],
                     puntos: 20,
                     reclamados: [],
                     tipo: "educación",
                     titulo: "Actividad lectura de libros a niños",
                     ubicacion: {longitude: 0.4, latitude: 39}}
    await updateActivity(actividad)
    await sleep(1000)
    const actividadBD = await getActivityById("Actividad lectura de libros a niños")
    expect(actividadBD.duracion).toStrictEqual(actividad.duracion)
})

test('elimina una actividad de la base de datos', async () =>{
    await deleteActivity("Actividad lectura de libros a niños")
    expect(await getActivityById("Actividad lectura de libros a niños")).toBe(null)
})

