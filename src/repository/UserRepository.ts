import { Repository } from "typeorm";
import { User } from "../model/entities/user";
import { RepositoryBase } from "./RepositoryBase";
import { Role } from "../model/enum/Roles";

export class UserRepository extends RepositoryBase<User> {
  
    
    constructor(readonly repository: Repository<User> ){
        super(repository);
    }

    findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({ where: { email: { email: email } } as any });
    }

    findByRole(role: Role): Promise<User[]> {
        return this.repository.find({ where: { role: { role: role } } as any });
    }

}