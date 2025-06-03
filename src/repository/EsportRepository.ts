import { Repository } from "typeorm";
import { RepositoryBase } from "./RepositoryBase";
import { Esport } from "../model/entities/Esport";

export class EsportRepository extends RepositoryBase<Esport> {
    
    constructor(readonly repository: Repository<Esport> ){
        super(repository);
    }

}