// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'customer_schedule_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CustomerScheduleModel _$CustomerScheduleModelFromJson(
        Map<String, dynamic> json) =>
    CustomerScheduleModel()
      ..data = (json['data'] as Map<String, dynamic>).map(
        (k, e) => MapEntry(DateTime.parse(k),
            UserDailyTask.fromJson(e as Map<String, dynamic>)),
      );

Map<String, dynamic> _$CustomerScheduleModelToJson(
        CustomerScheduleModel instance) =>
    <String, dynamic>{
      'data': instance.data.map((k, e) => MapEntry(k.toIso8601String(), e)),
    };
