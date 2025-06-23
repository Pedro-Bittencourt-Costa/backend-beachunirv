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
        const { email } = req.params;
        const user = await this.userService.findByEmail(email);        
        res.status(200).json(user);
    }

    async changePassword(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;
        
        await this.userService.changePassword(Number(id), currentPassword, newPassword);
        res.status(200).json({ message: 'Senha alterada com sucesso' });
    }

    async activateUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await this.userService.activateUser(Number(id));
        res.status(200).json({ message: 'Usuário ativado com sucesso' });
    }

    async deactivateUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await this.userService.deactivateUser(Number(id));
        res.status(200).json({ message: 'Usuário desativado com sucesso' });
    }

    async create(req: Request, res: Response): Promise<void> {
        const user = await this.userService.create(req.body);
        res.status(201).json(user);
    }

    async update(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        await this.userService.update(id, req.body);
        res.status(204).send();
    }

    async delete(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        await this.userService.delete(id);
        res.status(204).send();
    }
} 