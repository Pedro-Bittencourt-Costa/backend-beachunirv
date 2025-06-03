import { DeleteResult, FindManyOptions, ObjectLiteral, Repository, UpdateResult } from "typeorm";

export abstract class RepositoryBase<T extends ObjectLiteral> {

    protected readonly repository: Repository<T>;

    constructor(repository: Repository<T>){
        this.repository = repository;
    }

    public findAll(relations?: string[]): Promise<T[]> {
        const options: FindManyOptions<T> = {};
        options.relations = relations;
        return this.repository.find(options);
    }

    public findById(id: number): Promise<T | null> {
        return this.repository.findOne(id as any);
    }

    public delete(id: number): Promise<DeleteResult>{
        return this.repository.delete(id);
    }

    public create(data: T): Promise<T> {
        return this.repository.save(data);
    }

    public update(id: number, data: T): Promise<UpdateResult> {
        return this.repository.update(id, data);
    }


}