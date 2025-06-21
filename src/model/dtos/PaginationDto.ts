import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
    @IsOptional()
    @IsNumber({}, { message: "Página deve ser um número" })
    @IsPositive({ message: "Página deve ser positiva" })
    page?: number = 1;

    @IsOptional()
    @IsNumber({}, { message: "Limite deve ser um número" })
    @IsPositive({ message: "Limite deve ser positivo" })
    limit?: number = 10;
}

export class PaginatedResponseDto<T> {
    data!: T[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
    hasNext!: boolean;
    hasPrev!: boolean;
}

export class ApiResponseDto<T> {
    success!: boolean;
    message!: string;
    data?: T;
    error?: string;
} 