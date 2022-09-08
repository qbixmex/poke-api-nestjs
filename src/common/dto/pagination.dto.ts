import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Min(1)
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    offset?: number;
}

export default PaginationDto;