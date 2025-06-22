import { User } from "../model/entities/user";
import { CrudServiceInterface } from "./CrudServiceInterface";
import { UserRepository } from "../repository/UserRepository";
import { 
    CreateUserDto, 
    ReturnUserDto, 
    UpdateUserDto,
    ApiResponseDto 
} from "../model/dtos";
import { Email } from "../model/value-objects/Email";
import { HashedPassword } from "../model/value-objects/HashedPassword";
import { Role } from "../model/enum/Roles";

export class UserService implements CrudServiceInterface<User, ReturnUserDto, CreateUserDto, UpdateUserDto> {
    
    constructor(private readonly userRepository: UserRepository) {}

    async findById(id: number, relations: string[] = []): Promise<ReturnUserDto> {
        if (!id || id <= 0) {
            throw new Error("ID do usuário deve ser um número positivo");
        }

        const user = await this.userRepository.findById(id, relations);
        if (!user) {
            throw new Error(`Usuário com ID ${id} não encontrado`);
        }

        return this.mapToReturnDto(user);
    }

    async delete(id: number): Promise<void> {
        if (!id || id <= 0) {
            throw new Error("ID do usuário deve ser um número positivo");
        }

        const user = await this.userRepository.findById(id, []);
        if (!user) {
            throw new Error(`Usuário com ID ${id} não encontrado`);
        }

        await this.userRepository.delete(id);
    }

    async create(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
        // Verificar se email já existe
        const existingUser = await this.userRepository.findByEmail(createUserDto.email);
        
        if (existingUser) {
            throw new Error("Email já está em uso");
        }

        // Criar value objects
        const email = Email.Create(createUserDto.email);
        const hashedPassword = await HashedPassword.create(createUserDto.password);

        // Criar entidade User
        const user = new User();
        user.name = createUserDto.name;
        user.email = email;
        user.hashedPassword = hashedPassword;
        user.role = createUserDto.role || Role.ATLETA;
        user.status = true;
        
        if (createUserDto.profileImageUrl) {
            user.profileImageUrl = createUserDto.profileImageUrl;
        }

        const createdUser = await this.userRepository.create(user);
        return this.mapToReturnDto(createdUser);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
        if (!id || id <= 0) {
            throw new Error("ID do usuário deve ser um número positivo");
        }

        // Verificar se usuário existe
        const existingUser = await this.userRepository.findById(id, []);
        if (!existingUser) {
            throw new Error(`Usuário com ID ${id} não encontrado`);
        }

        // Preparar dados para atualização
        const updateData: Partial<User> = {};

        if (updateUserDto.name) {
            updateData.name = updateUserDto.name;
        }

        if (updateUserDto.email) {
            // Verificar se novo email já existe (exceto para o usuário atual)
            const userWithEmail = await this.userRepository.findByEmail(updateUserDto.email);
            
            if (userWithEmail && userWithEmail.id !== id) {
                throw new Error("Email já está em uso por outro usuário");
            }

            updateData.email = Email.Create(updateUserDto.email);
        }

        if (updateUserDto.password) {
            updateData.hashedPassword = await HashedPassword.create(updateUserDto.password);
        }

        if (updateUserDto.profileImageUrl !== undefined) {
            updateData.profileImageUrl = updateUserDto.profileImageUrl;
        }

        if (updateUserDto.role) {
            updateData.role = updateUserDto.role;
        }

        if (updateUserDto.status !== undefined) {
            updateData.status = updateUserDto.status;
        }

        await this.userRepository.update(id, updateData as User);
    }

    async findAll(relations: string[] = []): Promise<ReturnUserDto[]> {
        const users = await this.userRepository.findAll(relations);
        return users.map(user => this.mapToReturnDto(user));
    }

    // Métodos específicos do UserService
    
    async findByEmail(email: string): Promise<User | null> {
        if (!email) {
            throw new Error("Email é obrigatório");
        }

        return await this.userRepository.findByEmail(email);
    }

    async findByRole(role: Role): Promise<User[]> {
        return await this.userRepository.findByRole(role);
    }

    async activateUser(id: number): Promise<void> {
        if (!id || id <= 0) {
            throw new Error("ID do usuário deve ser um número positivo");
        }

        const user = await this.userRepository.findById(id, []);
        if (!user) {
            throw new Error(`Usuário com ID ${id} não encontrado`);
        }

        await this.userRepository.update(id, { status: true } as User);
    }

    async deactivateUser(id: number): Promise<void> {
        if (!id || id <= 0) {
            throw new Error("ID do usuário deve ser um número positivo");
        }

        const user = await this.userRepository.findById(id, []);
        if (!user) {
            throw new Error(`Usuário com ID ${id} não encontrado`);
        }

        await this.userRepository.update(id, { status: false } as User);
    }

    async changePassword(id: number, currentPassword: string, newPassword: string): Promise<void> {
        if (!id || id <= 0) {
            throw new Error("ID do usuário deve ser um número positivo");
        }

        const user = await this.userRepository.findById(id, []);
        if (!user) {
            throw new Error(`Usuário com ID ${id} não encontrado`);
        }

        // Verificar senha atual
        const isCurrentPasswordValid = await user.hashedPassword.checkPassword(currentPassword);
        if (!isCurrentPasswordValid) {
            throw new Error("Senha atual incorreta");
        }

        // Criar nova senha hash
        const newHashedPassword = await HashedPassword.create(newPassword);
        
        await this.userRepository.update(id, { hashedPassword: newHashedPassword } as User);
    }

    // Método auxiliar para mapear User para ReturnUserDto
    private mapToReturnDto(user: User): ReturnUserDto {
        return {
            id: user.id,
            name: user.name,
            email: user.email.getEmail(),
            profileImageUrl: user.profileImageUrl,
            role: user.role,
            status: user.status
        };
    }

    // Método para criar resposta de API padronizada
    async createUserResponse(createUserDto: CreateUserDto): Promise<ApiResponseDto<ReturnUserDto>> {
        try {
            const user = await this.create(createUserDto);
            return {
                success: true,
                message: "Usuário criado com sucesso",
                data: user
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao criar usuário",
                error: error instanceof Error ? error.message : "Erro desconhecido"
            };
        }
    }

    async updateUserResponse(id: number, updateUserDto: UpdateUserDto): Promise<ApiResponseDto<ReturnUserDto>> {
        try {
            await this.update(id, updateUserDto);
            const updatedUser = await this.findById(id);
            return {
                success: true,
                message: "Usuário atualizado com sucesso",
                data: updatedUser
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao atualizar usuário",
                error: error instanceof Error ? error.message : "Erro desconhecido"
            };
        }
    }
}