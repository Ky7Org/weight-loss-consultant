class UpdateTrainerDto {
  email: string;
  password: string;
  fullname: string;
  address: string;
  phone: string;
  gender: string;
  profileImage: string;
  status: number;
  dob: number;
  yearOfExp: number;
  rating: number;
}

export type UpdateTrainerPayloadType = {
  email: string;
  dto: UpdateTrainerDto;
}

class UpdateReportDto {
  id: number;
  contractID: number;
  date: number;
  exerciseDescription?: string;
  dietDescription?: string;
  trainerFeedback?: string;
  trainerApproval?: number;
  weight: number;
  createDate?: number;
}

export type UpdateReportPayload = {
  dto: UpdateReportDto,
  id: number
}

class UpdateReportMediaDto {
  id: number;
  reportID: number;
  url?: string;
  type?: number;
  createDate?: number;
}

export type UpdateReportMediaPayload = {
  dto: UpdateReportMediaDto,
  id: number
}

export type UpdateDeviceIDPayload = {
  email : string,
  deviceID: string,
  role: string
}
