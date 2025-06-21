export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  TERMINATED = 'terminated',
}

export enum UserType {
  PERMANENT = 'permanent',
  TEMPORARY = 'temporary',
}

export interface ILocation {
  type: 'Point';
  coordinates: [number, number];
}

export interface IUserAddress {
  streetAddress: string;
  location: ILocation;
}

export interface IWarehouse {
  warehouseId: string;
} 

export interface IUser {
  userId?: string;
  name: string;
  phoneNumber: string;
  email?: string;
  employeeCode?: string;
  imeiNo?: string;
  gradeId?: string;
  userType: UserType;
  roleId?: string;
  reportingTo?: string;
  userAddress: IUserAddress;
  status: UserStatus;
  doj?: Date;
  permissionGroup: string[];
  warehouse: IWarehouse[];
  userName?: string;
  password?: string;
  isDeleted?: boolean;
} 