import { CallAPI, CallAPIGoogle, CallAPIGoole } from './base';

import { AUTHENTICATION_PORT } from '../constants/AppPort';

export const signInAPI = (data) =>
  CallAPI(`${AUTHENTICATION_PORT}/api/v1/auth/login`, 'post', data);
export const signUpAPI = (data) =>
  CallAPI(`${AUTHENTICATION_PORT}/api/v1/authentication/login`, 'post', data);
export const signInGoogle = (token) =>
  CallAPIGoogle('api/v1/auth/login/firebase', token);
