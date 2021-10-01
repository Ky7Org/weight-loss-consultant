import axios from 'axios';
import * as cookie from 'js-cookie';
import { TOKEN_KEY } from '../constants/AppConstants';
import { REACT_APP_API_URL, CITY_URL_PUBLIC } from '../constants/AppPort';
export const CallAPI = (
  endpoint,
  method = 'GET',
  body,
  configHeaders = null,
  responseType = null
) => {
  let token = null;
  var headers = configHeaders
    ? configHeaders
    : {
        'content-type': 'application/json',
      };

  token = cookie.get(TOKEN_KEY);

  if (token && token !== 'undefined') {
    headers.Authorization = `Bearer ${token}`;
  }
  return axios({
    method: method,
    url: `${REACT_APP_API_URL}${endpoint}`,
    headers: headers,
    data: body,
    responseType: responseType,
  });
};

export const CallAPIOutsite = (endpoint, method = 'GET', body) => {
  var headers = {
    'content-type': 'application/json',
  };

  return axios({
    method: method,
    url: `${CITY_URL_PUBLIC}${endpoint}`,
    headers: headers,
    data: body,
  });
};
