// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'report_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ReportModel _$ReportModelFromJson(Map<String, dynamic> json) => ReportModel()
  ..id = json['id'] as int?
  ..exerciseDescription = json['exerciseDescription'] as String?
  ..dietDescription = json['dietDescription'] as String?
  ..trainerFeedback = json['trainerFeedback'] as String?
  ..trainerApproval = json['trainerApproval'] as int?
  ..weight = json['weight'] as int?
  ..createDate = json['createDate'] as String?
  ..contract = json['contract'] == null
      ? null
      : ContractModel.fromJson(json['contract'] as Map<String, dynamic>);

Map<String, dynamic> _$ReportModelToJson(ReportModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'exerciseDescription': instance.exerciseDescription,
      'dietDescription': instance.dietDescription,
      'trainerFeedback': instance.trainerFeedback,
      'trainerApproval': instance.trainerApproval,
      'weight': instance.weight,
      'createDate': instance.createDate,
      'contract': instance.contract,
    };
