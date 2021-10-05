import { CallAPI } from './base';
import { USER_MANAGER_PORT } from '../constants/AppPort';
export const getAllUser = () =>
  CallAPI(`${USER_MANAGER_PORT}/api/v1/admins`, 'GET', null);
export const searchUser = (data) =>
  CallAPI(`${USER_MANAGER_PORT}/api/v1/admins`, 'POST', data);
export const UserFilter = (data) =>
  CallAPI(`${USER_MANAGER_PORT}/api/v1/sortingAndFiltering`, 'POST', data);
