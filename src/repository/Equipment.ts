import { Repository } from "typeorm";
import { RepositoryBase } from "./RepositoryBase";
import { Equipment } from "../model/entities/Equipment";

export class EquipmentRepository extends RepositoryBase<Equipment> {
    
    constructor(readonly repository: Repository<Equipment> ){
        super(repository);
    }

    findByName(name: string): Promise<Equipment | null> {
        return this.repository.findOne({ where: { name } });
    }

    findByEsportId(esportId: number): Promise<Equipment[]> {
        return this.repository.find({ where: { esports: { id: esportId } } });
    }

}