import { Column } from "typeorm";

export class Email {

    @Column({unique: true, name: 'email'})
    private email: string;

    constructor(email: string) {
        this.isValidEmail(email);
        this.email = email;
    }

    private isValidEmail(email: string): void {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(email)) throw new Error('Email invalido');
    }

    public getEmail(): string {
        return this.email;
    }
}