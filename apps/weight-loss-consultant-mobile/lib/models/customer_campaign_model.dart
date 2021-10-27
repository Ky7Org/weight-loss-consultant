import 'package:json_annotation/json_annotation.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/models/campaign_account_model.dart';

part "customer_campaign_model.g.dart";

@JsonSerializable()
class CustomerCampaignModel{
  late int? id;
  late String? description;
  late int? status;
  late String? startDate;
  late String? endDate;
  late String? feedback;
  late int? targetWeight;
  late int? currentWeight;
  late int? spendTimeForTraining;
  late CampaignAccountModel? customer;

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
