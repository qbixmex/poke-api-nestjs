import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePokemonsDto } from './dto/create-pokemons.dto';
import { UpdatePokemonDto } from './dto/update-pokemons.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonsService {  

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  async create(createPokemonDto: CreatePokemonsDto) {

    const pokemon = await this.pokemonModel.create({
      no: createPokemonDto.no,
      name: createPokemonDto.name.toLocaleLowerCase()
    });

    return pokemon;

  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }

}
