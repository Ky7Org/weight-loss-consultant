import {UpdateAppliedDto} from "../../weight-loss-consultant-applied-mgnt-api/src/app/dtos/applied/update_applied_dto";

export const FIND_ALL_APPLIES = 'find-all-applies';
export const FIND_APPLY_BY_ID = 'find-apply-by-id';
export const UPDATE_APPLY_BY_ID = 'update-apply-by-id';
export const DELETE_APPLY_BY_ID = 'delete-apply-by-id';
export const CREATE_APPLY = 'create-apply';


export type UpdateApplyPayloadType = {
  dto : UpdateAppliedDto;
  id : number;
}
