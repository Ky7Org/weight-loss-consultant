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
