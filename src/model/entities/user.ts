import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Email } from "../Email";
import { HashedPassword } from "../HashedPassword";
import { Role } from "../Roles";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column(() => Email, { prefix: false })
    email!: Email;

    @Column(() => HashedPassword, { prefix: false })
    hashedPassword!: HashedPassword;

    @Column({name: 'profile_image_url', nullable: true })
    profileImageUrl!: string;

    @Column({
        type: "varchar", 
        enum: Role,      
        default: Role.ATLETA
    })
    role!: Role;

    @Column({default: true})
    status!: boolean;
    
}