import "reflect-metadata";
import { DataSource } from "typeorm";
import { Paciente } from "../entities/Patient";
import config from "../config";

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: config.db.filename,
    synchronize: true,
    logging: !isProduction,
    entities: [Paciente],
    migrations: [],
    subscribers: [],
});