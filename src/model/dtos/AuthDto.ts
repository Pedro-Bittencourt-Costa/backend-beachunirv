import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: "Email é obrigatório" })
    @IsEmail({}, { message: "Email deve ser válido" })
    email!: string;

    @IsNotEmpty({ message: "Senha é obrigatória" })
    @IsString({ message: "Senha deve ser uma string" })
    @MinLength(6, { message: "Senha deve ter pelo menos 6 caracteres" })
    password!: string;
}

export class ChangePasswordDto {
    @IsNotEmpty({ message: "Senha atual é obrigatória" })
    @IsString({ message: "Senha atual deve ser uma string" })
    currentPassword!: string;

    @IsNotEmpty({ message: "Nova senha é obrigatória" })
    @IsString({ message: "Nova senha deve ser uma string" })
    @MinLength(6, { message: "Nova senha deve ter pelo menos 6 caracteres" })
    newPassword!: string;
} 