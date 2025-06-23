import { Repository } from "typeorm";
import { RepositoryBase } from "./RepositoryBase";
import { Loan } from "../model/entities/Loan";
import { AppDataSource } from "../data_source";

export class LoanRepository extends RepositoryBase<Loan> {
    
    public readonly repository: Repository<Loan>;

    constructor(){
        super(AppDataSource.getRepository(Loan));
        this.repository = AppDataSource.getRepository(Loan);
    }

}