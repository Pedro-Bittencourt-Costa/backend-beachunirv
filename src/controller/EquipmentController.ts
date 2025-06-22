import { Request, Response } from 'express';
import { CrudController } from './CrudController';
import { EquipmentService } from '../service/EquipmentService';
import { Equipment } from '../model/entities/Equipment';
import { CreateEquipmentDto, ReturnEquipmentDto, UpdateEquipmentDto } from '../model/dtos';

export class EquipmentController extends CrudController<Equipment, ReturnEquipmentDto, CreateEquipmentDto, UpdateEquipmentDto> {
    
    constructor(private equipmentService: EquipmentService) {
        super(equipmentService);
    }

    async findByName(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.params;
            const equipment = await this.equipmentService.findByName(name);
            
            if (!equipment) {
                res.status(404).json({ message: 'Equipamento não encontrado' });
                return;
            }
            
            res.status(200).json(equipment);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao buscar equipamento' });
        }
    }

    async findEquipmentsByEsport(req: Request, res: Response): Promise<void> {
        try {
            const { esportId } = req.params;
            const equipments = await this.equipmentService.findEquipmentsByEsport(Number(esportId));
            res.status(200).json(equipments);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao buscar equipamentos por esporte' });
        }
    }

    async addEsportToEquipment(req: Request, res: Response): Promise<void> {
        try {
            const { equipmentId, esportId } = req.params;
            await this.equipmentService.addEsportToEquipment(Number(equipmentId), Number(esportId));
            res.status(200).json({ message: 'Esporte adicionado ao equipamento com sucesso' });
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao adicionar esporte ao equipamento' });
        }
    }

    async removeEsportFromEquipment(req: Request, res: Response): Promise<void> {
        try {
            const { equipmentId, esportId } = req.params;
            await this.equipmentService.removeEsportFromEquipment(Number(equipmentId), Number(esportId));
            res.status(200).json({ message: 'Esporte removido do equipamento com sucesso' });
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao remover esporte do equipamento' });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const equipment = await this.equipmentService.create(req.body);
            res.status(201).json(equipment);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao criar equipamento' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.equipmentService.update(id, req.body);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao atualizar equipamento' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.equipmentService.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao excluir equipamento' });
        }
    }
} 