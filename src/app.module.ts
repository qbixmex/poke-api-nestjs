import { join } from 'path'; // Node Package
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PokemonsModule } from './pokemons/pokemons.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    PokemonsModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {
  constructor() {
    console.log({
      PORT: process.env.PORT,
      MONGODB: process.env.MONGODB,
    });
  }
}
