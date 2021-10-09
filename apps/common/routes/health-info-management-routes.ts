import {UpdateHealthInfoDto} from "../../weight-loss-consultant-gateway/src/app/dtos/heath-info/update-health-info.dto";

export const FIND_ALL_HEALTH_INFO = 'find-all-health-info';
export const FIND_HEALTH_INFO_BY_ID = 'find-health-info-by-id';
export const UPDATE_HEALTH_INFO_BY_ID = 'update-health-info-by-id';
export const DELETE_HEALTH_INFO_BY_ID = 'delete-health-info-by-id';
export const CREATE_HEALTH_INFO = 'create-health-info';


export type UpdateHealthInfoPayloadType = {
  dto : UpdateHealthInfoDto;
  id: number;
}
