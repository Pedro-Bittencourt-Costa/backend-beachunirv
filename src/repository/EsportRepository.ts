import { Repository } from "typeorm";
import { RepositoryBase } from "./RepositoryBase";
import { Esport } from "../model/entities/Esport";

export class EsportRepository extends RepositoryBase<Esport> {
    
    constructor(readonly repository: Repository<Esport> ){
        super(repository);
    }

    findByName(name: string): Promise<Esport | null> {
        return this.repository.findOne({ where: { name: name } });
    }

    findByEquipmentId(equipmentId: number): Promise<Esport | null> {
        return this.repository.findOne({ where: { equipments: { id: equipmentId } } });
    }   
}