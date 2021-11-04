import {UpdateAppliedDto} from "../../weight-loss-consultant-applied-mgnt-api/src/app/dtos/applied/update_applied_dto";

export const FIND_ALL_APPLIES = 'find-all-applies';
export const FIND_APPLY_BY_ID = 'find-apply-by-id';
export const UPDATE_APPLY_BY_ID = 'update-apply-by-id';
export const DELETE_APPLY_BY_ID = 'delete-apply-by-id';
export const CREATE_APPLY = 'create-apply';
export const GET_APPLIED_PACKAGES_BY_CAMPAIGN_ID = 'get-applied-packages-by-campaign-id'
export const APPROVED_PACKAGE = 'approve-package';
export const DELETE_APPLY_BY_PACKAGE_ID = 'delete-by-package-id';
export const DELETE_APPLY_BY_CAMPAIGN_ID = 'delete-by-campaign-id';

export type UpdateApplyPayloadType = {
  dto : UpdateAppliedDto;
  id : number;
}
