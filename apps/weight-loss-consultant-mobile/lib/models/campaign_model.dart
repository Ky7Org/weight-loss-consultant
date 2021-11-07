import 'package:json_annotation/json_annotation.dart';

part "campaign_model.g.dart";

@JsonSerializable()
class CampaignModel{
  int? id;
  String? description;
  int? status;
  String? startDate;
  String? endDate;
  String? feedback;
  int? targetWeight;
  int? currentWeight;
  int? spendTimeForTraining;
  int? createDate;
  int? sessionLength;

  CampaignModel(this.id,
      this.description,
      this.status,
      this.startDate,
      this.endDate,
      this.feedback,
      this.targetWeight,
      this.currentWeight,
      this.spendTimeForTraining,
      this.sessionLength);

  factory CampaignModel.fromJson(Map<String,dynamic> data) => _$CampaignModelFromJson(data);

  Map<String,dynamic> toJson() => _$CampaignModelToJson(this);

  @override
  String toString() {
    return 'CampaignModel{id: $id, description: $description, status: $status, startDate: $startDate, endDate: $endDate, feedback: $feedback, targetWeight: $targetWeight, currentWeight: $currentWeight, spendTimeForTraining: $spendTimeForTraining, createDate: $createDate}';
  }
}
