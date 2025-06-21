import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IPermissionGroup } from '../../../common/interfaces/permissiongroup.interface';
import { UserType } from "src/common/interfaces/user.interface";
import { generateUniqueId } from '../../../common/utils/nanoid.util';
export type PermissionGroupDocument = PermissionGroup & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class PermissionGroup extends Document implements IPermissionGroup {
  @Prop({ required: true, default: () => generateUniqueId() })
  permissionGroupId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [String], required: true })
  permissions: string[];

  @Prop({ type: String, required: false })
  roleId: string;

  @Prop({ required: true, enum: UserType })
  userType: UserType;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isDeleted: boolean;
}

export const PermissionGroupSchema = SchemaFactory.createForClass(PermissionGroup);
