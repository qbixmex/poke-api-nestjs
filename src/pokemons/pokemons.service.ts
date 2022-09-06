import { Injectable } from '@nestjs/common';
import { CreatePokemonsDto } from './dto/create-pokemons.dto';
import { UpdatePokemonDto } from './dto/update-pokemons.dto';

@Injectable()
export class PokemonsService {  

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  create(createPokemonDto: CreatePokemonsDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    return createPokemonDto;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }

}
