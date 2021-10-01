import { authenticationActions } from './authentication-slice';
import * as cookie from 'js-cookie';
import { TOKEN_KEY, USER_STORAGE } from '../../constants/AppConstants';

export const SigninHandler = (data) => {
  return (dispatch) => {
    cookie.set(TOKEN_KEY, data.accessToken);
    localStorage.setItem(USER_STORAGE, JSON.stringify(data));
    dispatch(authenticationActions.fetchingLoginSuccess(data));
  };
};

export const logoutHandler = () => {
  return (dispatch) => {
    cookie.remove(TOKEN_KEY);
    localStorage.removeItem(USER_STORAGE);
    dispatch(authenticationActions.logout());
  };
};
