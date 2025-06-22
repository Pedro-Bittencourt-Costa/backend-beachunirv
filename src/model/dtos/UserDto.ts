import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "../enum/Roles";

export class CreateUserDto {
    @IsNotEmpty({ message: "Nome é obrigatório" })
    @IsString({ message: "Nome deve ser uma string" })
    name!: string;

    @IsNotEmpty({ message: "Email é obrigatório" })
    @IsEmail({}, { message: "Email deve ser válido" })
    email!: string;

    @IsNotEmpty({ message: "Senha é obrigatória" })
    @IsString({ message: "Senha deve ser uma string" })
    @MinLength(6, { message: "Senha deve ter pelo menos 6 caracteres" })
    password!: string;

    @IsOptional()
    @IsString({ message: "URL da imagem de perfil deve ser uma string" })
    profileImageUrl?: string;

    @IsOptional()
    @IsEnum(Role, { message: "Role deve ser ADM ou ATLETA" })
    role?: Role;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString({ message: "Nome deve ser uma string" })
    name?: string;

    @IsOptional()
    @IsEmail({}, { message: "Email deve ser válido" })
    email?: string;

    @IsOptional()
    @IsString({ message: "Senha deve ser uma string" })
    @MinLength(6, { message: "Senha deve ter pelo menos 6 caracteres" })
    password?: string;

    @IsOptional()
    @IsString({ message: "URL da imagem de perfil deve ser uma string" })
    profileImageUrl?: string;

    @IsOptional()
    @IsEnum(Role, { message: "Role deve ser ADM ou ATLETA" })
    role?: Role;

    @IsOptional()
    status?: boolean;
}

export class ReturnUserDto {
    id!: number;
    name!: string;
    email!: string;
    profileImageUrl?: string;
    role!: Role;
    status!: boolean;
    createdAt?: Date;
    updatedAt?: Date;
} 