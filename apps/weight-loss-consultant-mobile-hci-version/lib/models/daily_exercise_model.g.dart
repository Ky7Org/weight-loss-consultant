// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'daily_exercise_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

DailyExerciseModel _$DailyExerciseModelFromJson(Map<String, dynamic> json) =>
    DailyExerciseModel()
      ..exerciseList = (json['exerciseList'] as List<dynamic>)
          .map((e) => ExerciseModel.fromJson(e as Map<String, dynamic>))
          .toList();

Map<String, dynamic> _$DailyExerciseModelToJson(DailyExerciseModel instance) =>
    <String, dynamic>{
      'exerciseList': instance.exerciseList,
    };
