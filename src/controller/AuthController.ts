import { Request, Response } from 'express';
import { LoginService } from '../service/LoginService';
import { UserRepository } from '../repository/UserRepository';

export class AuthController {
    
    private loginService: LoginService;

    constructor() {
        const userRepository = new UserRepository();
        this.loginService = new LoginService(userRepository);
    }

    async signin(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        
        const accessToken = await this.loginService.signin({ email, password });
        
        res.status(200).json({ 
            message: 'Login realizado com sucesso',
            accessToken 
        });
    }
} 