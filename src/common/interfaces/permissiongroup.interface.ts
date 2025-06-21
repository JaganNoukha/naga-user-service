export interface IPermissionGroup {
  permissionGroupId: string;
  name: string;
  description?: string;
  permissions: string[];
  isActive: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
} 