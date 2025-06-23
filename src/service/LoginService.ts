import { compare } from "bcrypt";

import { createToken } from "../auth/auth";
import { LoginDto, ReturnUserDto } from "../model/dtos";
import { BadRequestError } from "../model/exceptions/BadRequestError";
import { UserRepository } from "../repository/UserRepository";

export class LoginService {
    userRepository: UserRepository

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    async signin(data: LoginDto): Promise<string> {

        const userExist = await this.userRepository.findByEmail(data.email)

         if(!userExist) throw new BadRequestError('Email invalido');

        const passwordConfirmed = userExist.hashedPassword.checkPassword(data.password);

        if(!passwordConfirmed) throw new BadRequestError('Senha invalido');
        
        const accessToken = createToken(
            {
                usuario: new ReturnUserDto(userExist)       
            }
        )

        return accessToken;
    }
}