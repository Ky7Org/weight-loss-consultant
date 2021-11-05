// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'customer_campaign_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CustomerCampaignModel _$CustomerCampaignModelFromJson(
        Map<String, dynamic> json) =>
    CustomerCampaignModel(
      json['id'] as int?,
      json['description'] as String?,
      json['status'] as int?,
      json['startDate'] as String?,
      json['endDate'] as String?,
      json['feedback'] as String?,
      json['targetWeight'] as int?,
      json['currentWeight'] as int?,
      json['spendTimeForTraining'] as int?,
      json['customer'] == null
          ? null
          : CampaignAccountModel.fromJson(
              json['customer'] as Map<String, dynamic>),
    )..sessionLength = json['sessionLength'] as int?;

Map<String, dynamic> _$CustomerCampaignModelToJson(
        CustomerCampaignModel instance) =>
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
      'customer': instance.customer,
      'sessionLength': instance.sessionLength,
    };
