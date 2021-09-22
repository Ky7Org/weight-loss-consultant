export const JWT_CONFIG = {
  expireTime: "60s"
}

export enum Role {
  trainer = 0,
  customer = 1,
  admin = 2
}

export const RESET_PASSWORD_TOKEN_EXPIRED_TIME = {
  MILLISECOND: 5 * 60 * 1000,
  SECOND: 5 * 60,
  MINUTE: 5,
}
