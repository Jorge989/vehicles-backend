import {fastify} from "fastify";
// import {DataBaseMemory} from "./database-memory.js"
import { DataBasePostgres } from "./database-postgres.js";
const server = fastify()

const database = new DataBasePostgres()

server.post("/vehicles", async (request, reply) => {
    const {placa, chassi, renavam, modelo, marca, ano} = request.body
   await database.create({
        placa: placa,
        chassi: chassi,
        renavam: renavam,
        modelo: modelo,
        marca: marca,
        ano: ano
    })
    return reply.status(201).send()
})

server.get("/vehicles", async (request, reply) => {
    const vehicles = await database.list()

    return vehicles
})

server.put("/vehicles/:id", (request, reply) => {
    const vehiclesId = request.params.id
    const {placa, chassi, renavam, modelo, marca, ano} = request.body

    database.update(vehiclesId, {
        placa: placa,
        chassi: chassi,
        renavam: renavam,
        modelo: modelo,
        marca: marca,
        ano: ano
    })

    return reply.status(204).send()
})

server.delete("/vehicles/:id", (request, reply) => {
    const vehiclesId = request.params.id

    database.delete(vehiclesId)

    return reply.status(204).send()
})

server.listen({
  port: process.env.PORT ?? 3333
});