import {UpdatePackageDto} from "../../weight-loss-consultant-gateway/src/app/dtos/package/update-package";

export const DELETE_PACKAGE_BY_ID = 'delete-package-by-id';
export const FIND_ALL_PACKAGES = 'find-all-packages';
export const FIND_PACKAGE_BY_ID = 'find-package-by-id';
export const UPDATE_PACKAGE_BY_ID = 'update-package-by-id';
export const CREATE_PACKAGE = 'create-package';
export const UPDATE_STATUS_PACKAGE = 'update-status-package';

export type UpdatePackagePayloadType = {
  dto: UpdatePackageDto;
  id: number;
}
