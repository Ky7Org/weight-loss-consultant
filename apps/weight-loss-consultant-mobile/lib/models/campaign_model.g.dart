// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'campaign_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CampaignModel _$CampaignModelFromJson(Map<String, dynamic> json) =>
    CampaignModel(
      json['id'] as int?,
      json['description'] as String?,
      json['status'] as int?,
      json['startDate'] as String?,
      json['endDate'] as String?,
      json['feedback'] as String?,
      json['targetWeight'] as int?,
      json['currentWeight'] as int?,
      json['spendTimeForTraining'] as int?,
    )..createDate = json['createDate'] as int?;

Map<String, dynamic> _$CampaignModelToJson(CampaignModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'description': instance.description,
      'status': instance.status,
      'startDate': instance.startDate,
      'endDate': instance.endDate,
      'feedback': instance.feedback,
      'targetWeight': instance.targetWeight,
      'currentWeight': instance.currentWeight,
      'spendTimeForTraining': instance.spendTimeForTraining,
      'createDate': instance.createDate,
    };
