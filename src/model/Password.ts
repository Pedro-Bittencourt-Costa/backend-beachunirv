import { Column } from "typeorm";

export class Password {

    @Column()
    private password: string;

    constructor(password: string) {
        this.password = password;
    }

    // adicionar os metodos para fazer o hash e verificar a senha;
}
