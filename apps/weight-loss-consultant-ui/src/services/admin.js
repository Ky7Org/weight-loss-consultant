import { CallAPI } from './base';
export const getUserAPI = (data) =>
  CallAPI(`/api/v1/admins/filter`, 'POST', data);
export const getContract = () =>
  CallAPI(`/api/v1/contracts/fe/getAllContracts`);
export const getTrainerByEmail = (email) =>
  CallAPI(`/api/v1/trainers/${email}`, 'GET');
export const getUserByEmail = (email) =>
  CallAPI(`api/v1/customers/${email}`, 'GET');
export const getAdminByEmail = (email) =>
  CallAPI(`api/v1/admins/${email}`, 'GET');
