import { CallAPI } from './base';
export const getUserAPI = (data) => CallAPI(`/api/v1/admins`, 'POST', data);
