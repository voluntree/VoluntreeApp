import {getAllActivities, getActivityById} from "../service/service"
import {expect, jest, test} from "@jest/globals"

test('obtiene todas la actividades de la base de datos',async () => {  
    expect((await getAllActivities()).length).toBeGreaterThan(2)
})

test('obtiene una actividad con el id', async () => { 
    expect((await getActivityById("Apoyo Escolar a Jovenes de ESO")).titulo).toBe("Apoyo Escolar a Jovenes de ESO")
})
