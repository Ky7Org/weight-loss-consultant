import { CallAPI, CallAPIGoogle, CallAPIGoole } from './base';


export const signInAPI = (data) =>
  CallAPI(`api/v1/auth/login`, 'post', data);
export const signUpAPI = (data) =>
  CallAPI(`api/v1/authentication/login`, 'post', data);
export const signInGoogle = (token) =>
  CallAPIGoogle('api/v1/auth/login/firebase', token);
