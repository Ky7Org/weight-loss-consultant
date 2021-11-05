import 'package:json_annotation/json_annotation.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/models/campaign_account_model.dart';

part "customer_campaign_model.g.dart";

@JsonSerializable()
class CustomerCampaignModel{
   int? id;
   String? description;
   int? status;
   String? startDate;
   String? endDate;
   String? feedback;
   int? targetWeight;
   int? currentWeight;
   int? spendTimeForTraining;
   CampaignAccountModel? customer;
   int? sessionLength;


  CustomerCampaignModel(this.id,
      this.description,
      this.status,
      this.startDate,
      this.endDate,
      this.feedback,
      this.targetWeight,
      this.currentWeight,
      this.spendTimeForTraining,
      this.customer);

  factory CustomerCampaignModel.fromJson(Map<String,dynamic> data) => _$CustomerCampaignModelFromJson(data);

  Map<String,dynamic> toJson() => _$CustomerCampaignModelToJson(this);

  @override
  String toString() {
    return 'CampaignModel{id: $id, description: $description, status: $status, startDate: $startDate, endDate: $endDate, feedback: $feedback, customer: ${customer.toString()}}';
  }


}
