import 'package:json_annotation/json_annotation.dart';

part "campaign_model.g.dart";

@JsonSerializable()
class CampaignModel{
  late String? id;
  late String? description;
  late int? status;
  late String? startDate;
  late String? endDate;
  late String? feedback;

  CampaignModel(this.id, this.description, this.status, this.startDate, this.endDate, this.feedback);

  factory CampaignModel.fromJson(Map<String,dynamic> data) => _$CampaignModelFromJson(data);

  Map<String,dynamic> toJson() => _$CampaignModelToJson(this);

  @override
  String toString() {
    return 'CampaignModel{id: $id, description: $description, status: $status, startDate: $startDate, endDate: $endDate, feedback: $feedback}';
  }


}
