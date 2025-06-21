import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IRole } from '../interfaces/role.interface';

export type RoleDocument = Role & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Role extends Document implements IRole {
  @Prop({ required: true })
  roleId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: true })
  isActive: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role); 