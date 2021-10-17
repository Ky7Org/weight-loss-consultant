// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'exercise_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ExerciseModel _$ExerciseModelFromJson(Map<String, dynamic> json) =>
    ExerciseModel(
      json['name'] as String,
      json['unit'] as String,
      json['videoPath'] as String,
      json['thumbnailPath'] as String,
      json['details'] as String,
    );

Map<String, dynamic> _$ExerciseModelToJson(ExerciseModel instance) =>
    <String, dynamic>{
      'name': instance.name,
      'unit': instance.unit,
      'videoPath': instance.videoPath,
      'thumbnailPath': instance.thumbnailPath,
      'details': instance.details,
    };
