import { Request, Response } from 'express';
import { CrudController } from './CrudController';
import { LoanService } from '../service/LoanService';
import { Loan } from '../model/entities/Loan';
import { CreateLoanDto, ReturnLoanDto, UpdateLoanDto } from '../model/dtos';
import { LoanStatus } from '../model/enum/Status';

export class LoanController extends CrudController<Loan, ReturnLoanDto, CreateLoanDto, UpdateLoanDto> {
    
    constructor(private loanService: LoanService) {
        super(loanService);
    }

    async findLoansByUser(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const loans = await this.loanService.findLoansByUser(Number(userId));
            res.status(200).json(loans);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao buscar empréstimos do usuário' });
        }
    }

    async findLoansByEquipment(req: Request, res: Response): Promise<void> {
        try {
            const { equipmentId } = req.params;
            const loans = await this.loanService.findLoansByEquipment(Number(equipmentId));
            res.status(200).json(loans);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao buscar empréstimos do equipamento' });
        }
    }

    async findLoansByStatus(req: Request, res: Response): Promise<void> {
        try {
            const { status } = req.params;
            
            if (!Object.values(LoanStatus).includes(status as LoanStatus)) {
                res.status(400).json({ message: 'Status inválido' });
                return;
            }
            
            const loans = await this.loanService.findLoansByStatus(status as LoanStatus);
            res.status(200).json(loans);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao buscar empréstimos por status' });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const loan = await this.loanService.create(req.body);
            res.status(201).json(loan);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao criar empréstimo' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.loanService.update(id, req.body);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao atualizar empréstimo' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.loanService.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao excluir empréstimo' });
        }
    }
} 