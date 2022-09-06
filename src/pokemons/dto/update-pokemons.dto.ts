import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonsDto } from './create-pokemons.dto';

export class UpdatePokemonDto extends PartialType(CreatePokemonsDto) {}
