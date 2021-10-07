import { CallAPI } from './base';
import { USER_MANAGER_PORT } from '../constants/AppPort';
export const getAllUser = () =>
  CallAPI(`api/v1/admins`, 'GET', null);
export const searchUser = (data) =>
  CallAPI(`api/v1/admins`, 'POST', data);
export const UserFilter = (data) =>
  CallAPI(`api/v1/sortingAndFiltering`, 'POST', data);
