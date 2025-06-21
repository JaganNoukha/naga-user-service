export interface IPermission {
  permissionId: string;
  name: string;
  description?: string;
  module: string;
  action: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
} 