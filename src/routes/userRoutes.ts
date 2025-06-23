import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { UserService } from '../service/UserService';
import { authenticateJWT } from '../auth/middlawareValidateJWT';
import { authorizeRoles } from '../auth/authorizeRole';
import { Role } from '../model/enum/Roles';
import { validateDto } from '../middleware/validateDto';
import { CreateUserDto, UpdateUserDto } from '../model/dtos';
import { asyncWrapper } from '../middleware/asyncWrapper';
import { UserRepository } from '../repository/UserRepository';

const useRouter = Router();
const userService = new UserService(new UserRepository());
const userController = new UserController(userService);

// Rotas personalizadas
useRouter.get('/email/:email', authenticateJWT, asyncWrapper(userController.findByEmail.bind(userController)));

useRouter.get('/', authenticateJWT, authorizeRoles(Role.ADM, Role.ATLETA) as any, asyncWrapper(userController.findAll.bind(userController)));
useRouter.get('/:id', authenticateJWT, authorizeRoles(Role.ADM, Role.ATLETA) as any, asyncWrapper(userController.findById.bind(userController)));
useRouter.post('/', validateDto(CreateUserDto), asyncWrapper(userController.create.bind(userController)));
useRouter.put('/:id', authenticateJWT,authorizeRoles(Role.ADM, Role.ATLETA) as any, validateDto(UpdateUserDto), asyncWrapper(userController.update.bind(userController)));

export { useRouter };