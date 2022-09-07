import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios, { AxiosInstance } from 'axios';

import { PokemonResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemons/entities/pokemon.entity';
import { Poke } from './interfaces/poke.interfaces';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonsModel: Model<Pokemon>
  ) {}

  async populate() {

    await this.pokemonsModel.deleteMany({});

    const { data } = await this.axios.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const insertPromisesArray = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      insertPromisesArray.push( this.pokemonsModel.create({ name, no }) );
    });

    await Promise.all(insertPromisesArray);

    return 'Seeds Populated';

  }

  async populateAlternative() {

    await this.pokemonsModel.deleteMany({});

    const { data } = await this.axios.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert: Poke[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      pokemonToInsert.push({ name, no });
    });

    await this.pokemonsModel.insertMany(pokemonToInsert);

    return 'Seeds Populated';

  }

}
