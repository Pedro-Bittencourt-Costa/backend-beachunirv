import { Repository } from "typeorm";
import { User } from "../model/entities/user";
import { RepositoryBase } from "./RepositoryBase";

export class UserRepository extends RepositoryBase<User> {
    
    constructor(readonly repository: Repository<User> ){
        super(repository);
    }

}