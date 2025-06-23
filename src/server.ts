import { AppDataSource } from "./data_source";
import  express  from "express";
import cors from 'cors';
import { equipmentRouter } from "./routes/equipmentRoutes";
import { loanRouter } from "./routes/loanRoutes";
import { useRouter } from "./routes/userRoutes";
import { esportRouter } from "./routes/esportRoutes";
import { authRouter } from "./routes/authRoutes";
        
const app = express();

const PORT = 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
       
        app.use(cors());
        app.use(express.json());
        app.use('/api/users', useRouter);
        app.use('/api/loans', loanRouter);
        app.use('/api/equipments', equipmentRouter); 
        app.use('/api/esports', esportRouter);

        app.use('/api/auth', authRouter);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })