export interface IRole {
  roleId: string;
  name: string;
  description?: string;
  permissions: string[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
} 