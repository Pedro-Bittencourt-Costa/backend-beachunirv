import { AppDataSource } from "./data_source";
import  express  from "express";
import cors from 'cors';

const app = express();

const PORT = 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
       
        app.use(cors());
        app.use(express.json());
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })