class UpdateCampaignDto{
  id?: number;
  customerEmail?:string;
  description?: string;
  status?:number;
  startDate?: number;
  endDate?: number;
  feedback?: string;
}

export type UpdateCampaignPayloadType = {
  dto: UpdateCampaignDto;
  id: number;
}
