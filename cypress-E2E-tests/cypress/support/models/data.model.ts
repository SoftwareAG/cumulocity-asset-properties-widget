import { IUserInventoryRole } from '@c8y/client';

export type UrlParams = {
  pageSize?: number;
  onlyRoots?: boolean;
  withChildren?: boolean;
};

export type InventoryRolePermission = {
  scope: string;
  permission: string;
  type: string;
};

export type InventoryAssignment = {
  id: string;
  managedObject: string;
  roles: IUserInventoryRole[];
  self: string;
};
