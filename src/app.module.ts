import { join } from 'path'; // Node Package
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import EnvConfiguration from './config/app.config';
import { PokemonsModule } from './pokemons/pokemons.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [

    //? Environment Variables
    ConfigModule.forRoot({
      load: [EnvConfiguration]
    }),

    //? Static Files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),

    //? Mongoose
    MongooseModule.forRoot(process.env.MONGODB),

    //? Modules
    PokemonsModule,
    CommonModule,
    SeedModule,

  ],
})
export class AppModule {}
