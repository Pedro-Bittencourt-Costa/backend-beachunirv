import { Repository } from "typeorm";
import { RepositoryBase } from "./RepositoryBase";
import { Equipment } from "../model/entities/Equipment";

export class EquipmentRepository extends RepositoryBase<Equipment> {
    
    constructor(readonly repository: Repository<Equipment> ){
        super(repository);
    }

}