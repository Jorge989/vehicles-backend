import Fastify from "fastify";
import cors from "@fastify/cors";
import { DataBasePostgres } from "./database-postgres.js";

// Inicializa o servidor Fastify
const server = Fastify({ logger: true });

// Habilita o CORS para permitir requisições do frontend
server.register(cors, {
  origin: "*", // Em produção, substitua pelo domínio do frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

const database = new DataBasePostgres();

// Rota para criar um veículo
server.post("/vehicles", async (request, reply) => {
  const { placa, chassi, renavam, modelo, marca, ano } = request.body;
  await database.create({ placa, chassi, renavam, modelo, marca, ano });
  return reply.status(201).send();
});

// Rota para listar todos os veículos
server.get("/vehicles", async (request, reply) => {
  const vehicles = await database.list();
  return vehicles;
});

// Rota para atualizar um veículo pelo ID
server.put("/vehicles/:id", async (request, reply) => {
  const vehiclesId = request.params.id;
  const { placa, chassi, renavam, modelo, marca, ano } = request.body;

  await database.update(vehiclesId, { placa, chassi, renavam, modelo, marca, ano });

  return reply.status(204).send();
});

// Rota para deletar um veículo pelo ID
server.delete("/vehicles/:id", async (request, reply) => {
  const vehiclesId = request.params.id;
  await database.delete(vehiclesId);

  return reply.status(204).send();
});

// Inicia o servidor
const start = async () => {
  try {
    await server.listen({ host: "0.0.0.0", port: process.env.PORT || 3333 });
    console.log(`🚀 Servidor rodando em http://localhost:${process.env.PORT || 3333}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
