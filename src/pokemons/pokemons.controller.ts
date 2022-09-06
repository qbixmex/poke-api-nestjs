import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonsDto } from './dto/create-pokemons.dto';
import { UpdatePokemonDto } from './dto/update-pokemons.dto';

@Controller('pokemons')
export class PokemonsController {

  constructor(private readonly pokemonService: PokemonsService) {}

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne(term);
  }

  @Post()
  @HttpCode( HttpStatus.CREATED )
  create(@Body() createPokemonDto: CreatePokemonsDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id);
  }
}
