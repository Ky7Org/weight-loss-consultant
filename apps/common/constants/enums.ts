export const JWT_CONFIG = {
  expireTime: "6000s"
}

export enum Role {
  Trainer = 'trainer',
  Customer = 'customer',
  Admin = 'admin'
}

export const RESET_PASSWORD_TOKEN_EXPIRED_TIME = {
  MILLISECOND: 5 * 60 * 1000,
  SECOND: 5 * 60,
  MINUTE: 5,
}

export const ENV_FILE_PATH = (() : string => {
  if (process.cwd().includes("dist")){
    return "./assets/.env"
  }
  return "./.env"
})();

export enum AccountStatus {
  ACTIVE = 1,
  INACTIVE = 0,
  PENDING = 2
}

export enum CampaignStatus {
  ACTIVE = 1,
  INACTIVE = 0,
  PENDING = 2
}

export enum PackageStatus {
  ACTIVE = 1,
  INACTIVE = 0,
  PENDING = 2
}

export enum RoleEnum {
  Customer = 'customer',
  Trainer = 'trainer',
  Admin = 'admin'
}

export enum Order {
  Ascending = "ASC",
  Descending = "DESC"
}

export enum Gender {
  MALE = 1,
  FEMALE = 2
}
