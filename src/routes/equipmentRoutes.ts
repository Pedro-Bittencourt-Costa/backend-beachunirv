import { Router } from 'express';
import { EquipmentController } from '../controller/EquipmentController';
import { EquipmentService } from '../service/EquipmentService';
import { authenticateJWT } from '../auth/middlawareValidateJWT';
import { authorizeRoles } from '../auth/authorizeRole';
import { Role } from '../model/enum/Roles';
import { validateDto } from '../middleware/validateDto';
import { CreateEquipmentDto, UpdateEquipmentDto } from '../model/dtos';
import { asyncWrapper } from '../middleware/asyncWrapper';
import { EquipmentRepository } from '../repository/Equipment';
import { EsportRepository } from '../repository/EsportRepository';

const equipmentRouter = Router();
const equipmentService = new EquipmentService(
    new EquipmentRepository(),
    new EsportRepository()
);
const equipmentController = new EquipmentController(equipmentService);

// Rotas personalizadas
equipmentRouter.get('/name/:name', authenticateJWT, authorizeRoles(Role.ADM, Role.ATLETA)as any, asyncWrapper(equipmentController.findByName.bind(equipmentController)));
equipmentRouter.get('/esport/:esportId', authenticateJWT, authorizeRoles(Role.ADM, Role.ATLETA)as any, asyncWrapper(equipmentController.findEquipmentsByEsport.bind(equipmentController)));

// Rotas de relacionamento com esporte
equipmentRouter.post('/:equipmentId/esport/:esportId', authenticateJWT, authorizeRoles(Role.ADM) as any, asyncWrapper(equipmentController.addEsportToEquipment.bind(equipmentController)));
equipmentRouter.delete('/:equipmentId/esport/:esportId', authenticateJWT, authorizeRoles(Role.ADM) as any, asyncWrapper(equipmentController.removeEsportFromEquipment.bind(equipmentController)));

// Rotas CRUD básicas
equipmentRouter.get('/', authenticateJWT, authorizeRoles(Role.ADM, Role.ATLETA)as any, asyncWrapper(equipmentController.findAll.bind(equipmentController)));
equipmentRouter.get('/:id', authenticateJWT, authorizeRoles(Role.ADM, Role.ATLETA)as any, asyncWrapper(equipmentController.findById.bind(equipmentController)));
equipmentRouter.post('/', authenticateJWT, authorizeRoles(Role.ADM) as any, validateDto(CreateEquipmentDto), asyncWrapper(equipmentController.create.bind(equipmentController)));
equipmentRouter.put('/:id', authenticateJWT, authorizeRoles(Role.ADM) as any, validateDto(UpdateEquipmentDto), asyncWrapper(equipmentController.update.bind(equipmentController)));
equipmentRouter.delete('/:id', authenticateJWT, authorizeRoles(Role.ADM) as any, asyncWrapper(equipmentController.delete.bind(equipmentController)));

export { equipmentRouter }; 