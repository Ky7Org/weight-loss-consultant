import { CallAPI } from './base';
export const getUserAPI = (data) =>
  CallAPI(`/api/v1/admins/filter`, 'POST', data);
export const getTrainerByEmaile = () => CallAPI(`/api/v1/trainers/`);
