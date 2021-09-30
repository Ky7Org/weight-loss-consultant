import { CallAPI } from './base';
import { USER_MANAGER_PORT } from '../constants/AppPort';
export const getAllUser = () =>
  CallAPI(`${USER_MANAGER_PORT}/api/v1/admins`, 'get', null);
