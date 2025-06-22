import { Request, Response } from 'express';
import { CrudController } from './CrudController';
import { EsportService } from '../service/EsportService';
import { Esport } from '../model/entities/Esport';
import { CreateEsportDto, ReturnEsportDto, UpdateEsportDto } from '../model/dtos';

export class EsportController extends CrudController<Esport, ReturnEsportDto, CreateEsportDto, UpdateEsportDto> {
    
    constructor(private esportService: EsportService) {
        super(esportService);
    }

    async findByName(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.params;
            const esport = await this.esportService.findByName(name);
            
            if (!esport) {
                res.status(404).json({ message: 'Esporte não encontrado' });
                return;
            }
            
            res.status(200).json(esport);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao buscar esporte' });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const esport = await this.esportService.create(req.body);
            res.status(201).json(esport);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao criar esporte' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.esportService.update(id, req.body);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao atualizar esporte' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.esportService.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao excluir esporte' });
        }
    }
} 