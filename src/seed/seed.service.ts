import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios, { AxiosInstance } from 'axios';

import { PokemonResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemons/entities/pokemon.entity';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonsModel: Model<Pokemon>
  ) {}

  async populate() {
    const { data } = await this.axios.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];

      const pokemon = await this.pokemonsModel.create({ name, no });
    });

    return 'Seeds Populated';
  }

}
