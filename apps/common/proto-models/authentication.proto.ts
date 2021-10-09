import {Observable} from "rxjs";

export type LoginRequestModel = {
  email: string;
  password: string;
}

export type LoginResponseModel = {
  accessToken: string;
  email: string;
  fullname: string;
  profileImage: string;
  role: string;
}

export type LoginResponse = {
  data: LoginResponseModel;
}

export interface AuthenticationService {
  login(data: LoginRequestModel): Observable<LoginResponse>;
};
