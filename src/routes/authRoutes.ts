import { Router } from 'express';
import { AuthController } from '../controller/AuthController';
import { validateDto } from '../middleware/validateDto';
import { LoginDto } from '../model/dtos';
import { asyncWrapper } from '../middleware/asyncWrapper';

const authRouter = Router();
const authController = new AuthController();

// Rotas de autenticação
authRouter.post('/signin', validateDto(LoginDto), asyncWrapper(authController.signin.bind(authController)));

export { authRouter }; 