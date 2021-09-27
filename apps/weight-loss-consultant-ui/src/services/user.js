import { CallAPI } from './base';

export const signInAPI = (data) =>
  CallAPI(`api/v1/authentication/login`, 'post', data);
export const signUpAPI = (data) => CallAPI(``, 'post', data);
export const sendOTP = (data) => CallAPI(``, 'post', data);
export const confirmEmailAPI = (data) => CallAPI(`api/v1/`, 'post', data);
