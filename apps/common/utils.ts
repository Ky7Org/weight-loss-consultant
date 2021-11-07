export const BCRYPT_CONFIG = {
  rounds: 10,
}

export enum CAMPAIGN_STATUS {
  ACTIVE = 0,
  ON_GOING = 1,
  CLOSED = 2,
}

export enum PACKAGE_STATUS  {
  ACTIVE = 0,
  APPLIED = 1,
  APPROVED = 2,
  DECLINED = 3
}

export enum CONTRACT_STATUS {
  ONGOING = 0,
  EXPIRED = 1,
  CANCEL = 2
}

export enum TRAINER_APPROVAL {
  APPROVED = 1,
  DECLINED = 2,
}
