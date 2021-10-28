// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'package_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PackageModel _$PackageModelFromJson(Map<String, dynamic> json) => PackageModel()
  ..id = json['id'] as int?
  ..exercisePlan = json['exercisePlan'] as String?
  ..schedule = json['schedule'] as String?
  ..price = (json['price'] as num?)?.toDouble()
  ..status = json['status'] as int?
  ..dietPlan = json['dietPlan'] as String?
  ..spendTimeToTraining = json['spendTimeToTraining'] as int?
  ..trainer = json['trainer'] == null
      ? null
      : TrainerModel.fromJson(json['trainer'] as Map<String, dynamic>)
  ..name = json['name'] as String?;

Map<String, dynamic> _$PackageModelToJson(PackageModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'exercisePlan': instance.exercisePlan,
      'schedule': instance.schedule,
      'price': instance.price,
      'status': instance.status,
      'dietPlan': instance.dietPlan,
      'spendTimeToTraining': instance.spendTimeToTraining,
      'trainer': instance.trainer,
      'name': instance.name,
    };
