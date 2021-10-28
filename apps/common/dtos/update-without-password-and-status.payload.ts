class UpdateAdminDto {
  email: string;
  fullname?:string;
  address: string;
  phone: string;
  gender: string;
  profileImage: string;
  dob: number;
}

class UpdateCustomerDto {
  email: string;
  fullname?:string;
  address: string;
  phone: string;
  gender: string;
  profileImage: string;
  dob: number;
}

class UpdateTrainerDto {
  email: string;
  fullname?:string;
  address: string;
  phone: string;
  gender: string;
  profileImage: string;
  dob: number;
  yearOfExp: number;
  rating: number;
}

export type UpdateAdminPayload = {
  email : string;
  fullname?:string;
  address: string;
  phone: string;
  gender: string;
  profileImage: string;
  dob: number;
}

export type UpdateCustomerPayloadd = {
  email : string;
  fullname?:string;
  address: string;
  phone: string;
  gender: string;
  profileImage: string;
  dob: number;
}

export type UpdateTrainerPayload = {
  email : string;
  fullname?:string;
  address: string;
  phone: string;
  gender: string;
  profileImage: string;
  dob: number;
  yearOfExp: number;
  rating: number;
}

export type UpdatePasswordPayload = {
  email: string;
  oldPassword: string;
  newPassword: string;
  retypePassword: string;
  role: string;
}

export type ResponseUpdatePassword = {
  newPassword: string;
  email: string;
}

export type UpdateStatusPayload = {
  email: string;
  status: number;
  role: string;
}

export type ResponseUpdateStatus = {
  email: string;
  status: number;
}
