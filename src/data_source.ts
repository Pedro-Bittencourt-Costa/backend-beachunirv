import { DataSource } from "typeorm"
import 'dotenv/config'
import { User } from "./model/entities/user"
import { Equipment } from "./model/entities/Equipment"
import { Esport } from "./model/entities/Esport"
import { Loan } from "./model/entities/Loan"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [User, Equipment, Esport, Loan],
    subscribers: [],
    migrations: [],
})

