import { CallAPI } from './base';

import { AUTHENTICATION_PORT } from '../constants/AppPort';

export const signInAPI = (data) =>
  CallAPI(`${AUTHENTICATION_PORT}/api/v1/auth/login`, 'post', data);
export const signUpAPI = (data) =>
  CallAPI(`${AUTHENTICATION_PORT}/api/v1/authentication/login`, 'post', data);
