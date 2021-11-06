import {UpdateContractDto} from "../../weight-loss-consultant-contract-mgnt-api/src/app/dtos/contract/update-health-info.dto";

export const FIND_ALL_CONTRACT = 'find-all-contract';
export const FIND_CONTRACT_BY_ID = 'find-contract-by-id';
export const UPDATE_CONTRACT_BY_ID = 'update-contract-by-id';
export const DELETE_CONTRACT_BY_ID = 'delete-contract-by-id';
export const CREATE_CONTRACT = 'create-contract';
export const GET_CONTRACT_BY_CAMPAIGN_ID_OR_PACKAGE_ID = 'get-contract-by-package-id-or-campaign-id';
export const EXPIRE_CONTRACT = 'expire-contract';
export const GET_ANOTHER_IN_THE_SAME_CONTRACT = 'get-another';
export const CUSTOMER_CANCEL_ONGOING_CONTRACT = 'customer-cancel-contract';
export const TRAINER_CANCEL_ONGOING_CONTRACT = 'trainer-cancel-contract';
export const UNDO_CANCEL_ONGOING_CONTRACT = 'undo-cancel-contract';
export const PROCEED_TO_CANCEL = 'proceed-to-cancel';

export type UpdateContractPayloadType = {
  dto : UpdateContractDto;
  id: number;
}
