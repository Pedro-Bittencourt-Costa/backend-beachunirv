import { Router } from 'express';
import { LoanController } from '../controller/LoanController';
import { LoanService } from '../service/LoanService';
import { authenticateJWT } from '../auth/middlawareValidateJWT';
import { authorizeRoles } from '../auth/authorizeRole';
import { Role } from '../model/enum/Roles';
import { validateDto } from '../middleware/validateDto';
import { CreateLoanDto, UpdateLoanDto } from '../model/dtos';
import { asyncWrapper } from '../middleware/asyncWrapper';
import { LoanRepository } from '../repository/LoanRepository';
import { UserRepository } from '../repository/UserRepository';
import { EquipmentRepository } from '../repository/Equipment';

const loanRouter = Router();
const loanService = new LoanService(
    new LoanRepository(),
    new UserRepository(),
    new EquipmentRepository()
);
const loanController = new LoanController(loanService);

// Rotas personalizadas
loanRouter.get('/user/:userId', authenticateJWT, authorizeRoles(Role.ADM, Role.ATLETA)as any, asyncWrapper(loanController.findLoansByUser.bind(loanController)));
loanRouter.get('/equipment/:equipmentId', authenticateJWT, authorizeRoles(Role.ADM, Role.ATLETA)as any, asyncWrapper(loanController.findLoansByEquipment.bind(loanController)));
loanRouter.get('/status/:status', authenticateJWT, authorizeRoles(Role.ADM, Role.ATLETA)as any, asyncWrapper(loanController.findLoansByStatus.bind(loanController)));

// Rotas CRUD básicas
loanRouter.get('/', authenticateJWT, authorizeRoles(Role.ADM, Role.ATLETA)as any, asyncWrapper(loanController.findAll.bind(loanController)));
loanRouter.get('/:id', authenticateJWT, authorizeRoles(Role.ADM, Role.ATLETA)as any, asyncWrapper(loanController.findById.bind(loanController)));
loanRouter.post('/', authenticateJWT, authorizeRoles(Role.ADM, Role.ATLETA) as any, validateDto(CreateLoanDto), asyncWrapper(loanController.create.bind(loanController)));
loanRouter.put('/:id', authenticateJWT, authorizeRoles(Role.ADM) as any, validateDto(UpdateLoanDto), asyncWrapper(loanController.update.bind(loanController)));
loanRouter.delete('/:id', authenticateJWT, authorizeRoles(Role.ADM) as any, asyncWrapper(loanController.delete.bind(loanController)));

export { loanRouter }; 