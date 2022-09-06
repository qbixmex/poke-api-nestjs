import { IsString, IsInt, IsPositive, Min, MinLength } from 'class-validator'

export class CreatePokemonsDto {

  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;

  @IsString()
  @MinLength(3)
  name: string;

}
