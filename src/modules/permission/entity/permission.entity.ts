import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IPermission } from '../interfaces/permission.interface';

export type PermissionDocument = Permission & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Permission extends Document implements IPermission {
  @Prop({ required: true })
  permissionId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isDeleted: boolean;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission); 