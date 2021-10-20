import {UpdateContractDto} from "../../weight-loss-consultant-contract-mgnt-api/src/app/dtos/contract/update-health-info.dto";

export const FIND_ALL_CONTRACT = 'find-all-contract';
export const FIND_CONTRACT_BY_ID = 'find-contract-by-id';
export const UPDATE_CONTRACT_BY_ID = 'update-contract-by-id';
export const DELETE_CONTRACT_BY_ID = 'delete-contract-by-id';
export const CREATE_CONTRACT = 'create-contract';


export type UpdateContractPayloadType = {
  dto : UpdateContractDto;
  id: number;
}
