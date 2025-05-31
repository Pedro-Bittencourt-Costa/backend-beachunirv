import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Email } from "../Email";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    email!: Email;

    @Column()
    password!: string;

    @Column({name: 'profile_image_url', nullable: true })
    profileImageUrl!: string;
    
}