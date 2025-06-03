import { Repository } from "typeorm";
import { RepositoryBase } from "./RepositoryBase";
import { Loan } from "../model/entities/Loan";

export class LoanRepository extends RepositoryBase<Loan> {
    
    constructor(readonly repository: Repository<Loan> ){
        super(repository);
    }

}