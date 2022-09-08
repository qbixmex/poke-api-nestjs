import {
  Controller, Param, Get, Post, Body, Patch, Delete, HttpCode, HttpStatus, Query
} from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonsDto } from './dto/create-pokemons.dto';
import { UpdatePokemonDto } from './dto/update-pokemons.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import PaginationDto from '../common/dto/pagination.dto';

@Controller('pokemons')
export class PokemonsController {

  constructor(private readonly pokemonService: PokemonsService) {}

  @Get()
  findAll( @Query() paginationDto: PaginationDto ) {

    console.log({ params: paginationDto });

    return this.pokemonService.findAll(paginationDto);
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

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updatePokemonDto: UpdatePokemonDto
  ) {
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
