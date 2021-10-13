// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_daily_task.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserDailyTask _$UserDailyTaskFromJson(Map<String, dynamic> json) =>
    UserDailyTask(
      DailyExerciseModel.fromJson(
          json['dailyExerciseModel'] as Map<String, dynamic>),
      DailyDietModel.fromJson(json['dailyDietModel'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$UserDailyTaskToJson(UserDailyTask instance) =>
    <String, dynamic>{
      'dailyExerciseModel': instance.dailyExerciseModel,
      'dailyDietModel': instance.dailyDietModel,
    };
