import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

import PaginationDto from '../common/dto/pagination.dto';
import { CreatePokemonsDto } from './dto/create-pokemons.dto';
import { UpdatePokemonDto } from './dto/update-pokemons.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonsService {  

  private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit')
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    const pokemons = await this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');

    return pokemons;

  }

  async findOne(term: string) {

    let pokemon: Pokemon | null = null;

    if ( !isNaN(+term) ) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    if ( !pokemon && isValidObjectId(term) ) {
      pokemon = await this.pokemonModel.findById( term );
    }

    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    }

    if ( !pokemon ) {
      console.log(pokemon);
      throw new NotFoundException(`Pokemon with search term "${ term }" not found in DB!`);
    }

    return pokemon;

  }

  async create(createPokemonDto: CreatePokemonsDto) {

    try {

      const pokemon = await this.pokemonModel.create({
        no: createPokemonDto.no,
        name: createPokemonDto.name.toLocaleLowerCase()
      });

      return pokemon;

    } catch (error) {

      this.handleExceptions(error);

    }

  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);

    if ( updatePokemonDto.name ) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    }

    try {

      await pokemon.updateOne(updatePokemonDto);

      return {
        ...pokemon.toJSON(),
        ...updatePokemonDto
      };

    } catch (error) {

      this.handleExceptions(error);

    }

  }

  async remove(id: string) {

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if ( deletedCount === 0 ) {
      throw new NotFoundException(`Pokemon with id "${ id }" not found in DB!`);
    }

  }

  private handleExceptions( error: any ) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db: "${ JSON.stringify(error.keyValue) }"`);
    }

    console.log(error);
    throw new InternalServerErrorException('Cannot update pokemon, check server logs!');
  }

}
