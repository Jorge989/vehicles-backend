import {randomUUID} from "node:crypto"
import sql from "./db.js"

export class DataBasePostgres {
    async list() {
        return await sql`SELECT * FROM vehicles`
    }

    async create(vehicle) {
        const vehicleId = randomUUID()
        const {placa, chassi, renavam, modelo, marca, ano} = vehicle

        await sql`
            INSERT INTO vehicles (id, placa, chassi, renavam, modelo, marca, ano)
            VALUES (${vehicleId}, ${placa}, ${chassi}, ${renavam}, ${modelo}, ${marca}, ${ano})
        `
    }

    async update(id, vehicle) {
        const {placa, chassi, renavam, modelo, marca, ano} = vehicle

        await sql`
            UPDATE vehicles
            SET placa = ${placa}, chassi = ${chassi}, renavam = ${renavam}, modelo = ${modelo}, marca = ${marca}, ano = ${ano}
            WHERE id = ${id}
        `
    }

    async delete(id) {
        await sql`
            DELETE FROM vehicles WHERE id = ${id}
        `
    }

}