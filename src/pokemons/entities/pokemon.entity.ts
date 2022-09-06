import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class Pokemon extends Document {

  @Prop({ unique: true, index: true })
  name: string;

  @Prop({ unique: true, index: true })
  no: number;

}

const PokemonSchema = SchemaFactory.createForClass(Pokemon);

export {
  Pokemon,
  PokemonSchema
}
