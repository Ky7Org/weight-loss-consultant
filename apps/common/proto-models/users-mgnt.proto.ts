import {Observable} from "rxjs";
import {ApiProperty} from "@nestjs/swagger";

export class AdminEntity {
  email?: string;
  password?: string;
  fullname?: string;
  address?: string;
  phone?: string;
  gender?: string;
  status?: number;
  profileImage?: string;
  dob?: number;
}

export type EmptyBody = {};

export type EmailBody = {
  email: string;
}

export interface AdminService {
  findAll(data: object): Observable<AdminEntitiesResponse>;

  viewDetail(data: EmailBody): Observable<AdminEntityResponse>;

  delete(data: EmailBody): Observable<any>;

  update(data: UpdateAdminEntityRequest): Observable<AdminEntityResponse>;
  create(data : CreateAdminEntity): Observable<AdminEntityResponse>;
}

export interface CustomerService {
  findAll(data: object): Observable<CustomerEntitiesResponse>;
  viewDetail(data: EmailBody): Observable<CustomerEntityResponse>;
  delete(data: EmailBody): Observable<any>;
  create(data): Observable<any>;
}

export interface TrainerService {
  findAll(data): Observable<TrainerEntitiesResponse>;

  viewDetail(data: TrainerEntityViewDetailRequest): Observable<TrainerEntityResponse>;
  delete(data: EmailBody): Observable<any>;
  create(data): Observable<any>;
}

export interface CustomerService {
  findAll(data): Observable<CustomerEntitiesResponse>;
  viewDetail(data: CustomerEntityViewDetailRequest): Observable<CustomerEntityResponse>;
  update(data): Observable<any>;
  delete(data): Observable<any>;
}

export type CreateAdminEntity = {
  email: string;
  password: string;
  retypePassword: string;
}


export type UpdateAdminEntityRequest = { email: string, payload: UpdateAdminEntity };

export type UpdateAdminEntity = {
  email?: string;
  password?: string;
  fullname?: string;
  address?: string;
  phone?: string;
  gender?: string;
  profileImage?: string;
  status?: number;
  dob?: number;
}

export type AdminEntityViewDetailRequest = {
  email: string;
}

export type TrainerEntityViewDetailRequest = {
  email: string;
}

export type CustomerEntityViewDetailRequest = {
  email: string;
}

export type AdminEntityResponse = {
  data: AdminEntity;
}

export type AdminEntitiesResponse = {
  data: AdminEntity[];
}

export type TrainerEntityResponse = {
  data: TrainerEntity;
}

export type TrainerEntitiesResponse = {
  data: TrainerEntity[];
}


export type CustomerEntityResponse = {
  data: CustomerEntity;
}

export type CustomerEntitiesResponse = {
  data: CustomerEntity[];
}

export type CustomerEntity = {
  email: string;
  password: string;
  fullname: string;
  address: string;
  phone: string;
  gender: string;
  status: number;
  profileImage: string;
  dob: number;
  campaigns: CampaignEntity[];
}

export type TrainerEntity = {
  email: string;
  password: string;
  fullname: string;
  address: string;
  phone: string;
  gender: string;
  status: number;
  profileImage: string;
  dob: number;
  yearOfExp: number;
  rating: number;
  packages: PackageEntity[];
}

export type CampaignEntity = {
  id: number;
  description: string;
  status: number;
  startDate: number;
  endDate: number;
  feedback: string;
  customer: CustomerEntity;
}

export type PackageEntity = {
  id: number;
  exercisePlan: string;
  schedule: string;
  price: number;
  status: number;
  dietPlan: string;
  trainer: TrainerEntity;
}
