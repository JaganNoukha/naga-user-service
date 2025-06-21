import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser, UserStatus, UserType, ILocation, IUserAddress } from '../../../common/interfaces/user.interface';
import { IWarehouse } from '../../../common/interfaces/user.interface';
import { generateUniqueId } from '../../../common/utils/nanoid.util';

export type UserDocument = User & Document;

export class Location {
  @Prop()
  type: 'Point';
  @Prop({
    type: [Number, Number],
  })
  coordinates: [number, number];
}

export class UserAddress {
  @Prop({ required: true })
  streetAddress: string;

  @Prop({ type: Location, required: true })
  location: Location;
}

@Schema({ timestamps: true })
export class User extends Document implements IUser {

  @Prop({
    required: true,
    default: () => generateUniqueId()
    
  })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop()
  employeeCode: string;

  @Prop()
  imeiNo: string;

  @Prop()
  gradeId: string;

  @Prop({ required: true, enum: UserType })
  userType: UserType;

  @Prop()
  roleId: string;

  @Prop()
  reportingTo: string;

  @Prop({ type: UserAddress, required: true })
  userAddress: UserAddress;

  @Prop({ required: true, enum: UserStatus })
  status: UserStatus;

  @Prop()
  doj: Date;

  @Prop({ type: [String], default: [] })
  permissionGroup: string[];

  @Prop({ required: true, type: [{ warehouseId: String }], _id: false })
  warehouse: IWarehouse[];

  @Prop()
  userName: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User); 