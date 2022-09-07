import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonsModule } from '../pokemons/pokemons.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [PokemonsModule, CommonModule],
  controllers: [SeedController],
  providers: [SeedService]
})
export class SeedModule {}
