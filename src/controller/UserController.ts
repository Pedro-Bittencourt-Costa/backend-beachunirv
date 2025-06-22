import { Request, Response } from 'express';
import { CrudController } from './CrudController';
import { UserService } from '../service/UserService';
import { User } from '../model/entities/user';
import { CreateUserDto, ReturnUserDto, UpdateUserDto } from '../model/dtos';

export class UserController extends CrudController<User, ReturnUserDto, CreateUserDto, UpdateUserDto> {
    
    constructor(private userService: UserService) {
        super(userService);
    }

    async findByEmail(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.params;
            const user = await this.userService.findByEmail(email);
            
            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado' });
                return;
            }
            
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao buscar usuário' });
        }
    }

    async changePassword(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { currentPassword, newPassword } = req.body;
            
            await this.userService.changePassword(Number(id), currentPassword, newPassword);
            res.status(200).json({ message: 'Senha alterada com sucesso' });
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao alterar senha' });
        }
    }

    async activateUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.userService.activateUser(Number(id));
            res.status(200).json({ message: 'Usuário ativado com sucesso' });
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao ativar usuário' });
        }
    }

    async deactivateUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.userService.deactivateUser(Number(id));
            res.status(200).json({ message: 'Usuário desativado com sucesso' });
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao desativar usuário' });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao criar usuário' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.userService.update(id, req.body);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao atualizar usuário' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.userService.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao excluir usuário' });
        }
    }
} 