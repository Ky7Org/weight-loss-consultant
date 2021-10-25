// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'customer_history_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CustomerHistoryModel _$CustomerHistoryModelFromJson(
        Map<String, dynamic> json) =>
    CustomerHistoryModel(
      dateTime: DateTime.parse(json['dateTime'] as String),
      userExerciseList: (json['userExerciseList'] as List<dynamic>)
          .map((e) => ExerciseModel.fromJson(e as Map<String, dynamic>))
          .toList(),
      userDietList: (json['userDietList'] as List<dynamic>)
          .map((e) => DietModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$CustomerHistoryModelToJson(
        CustomerHistoryModel instance) =>
    <String, dynamic>{
      'dateTime': instance.dateTime.toIso8601String(),
      'userExerciseList': instance.userExerciseList,
      'userDietList': instance.userDietList,
    };
