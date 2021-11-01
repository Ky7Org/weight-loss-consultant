import {UpdateContractDto} from "../../weight-loss-consultant-contract-mgnt-api/src/app/dtos/contract/update-health-info.dto";

export const FIND_ALL_CONTRACT = 'find-all-contract';
export const FIND_CONTRACT_BY_ID = 'find-contract-by-id';
export const UPDATE_CONTRACT_BY_ID = 'update-contract-by-id';
export const DELETE_CONTRACT_BY_ID = 'delete-contract-by-id';
export const CREATE_CONTRACT = 'create-contract';
export const GET_CONTRACT_BY_CAMPAIGN_ID_OR_PACKAGE_ID = 'get-contract-by-package-id-or-campaign-id';
export const EXPIRE_CONTRACT = 'expire-contract';


export type UpdateContractPayloadType = {
  dto : UpdateContractDto;
  id: number;
}
