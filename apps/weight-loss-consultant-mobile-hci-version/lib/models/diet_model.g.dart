// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'diet_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

DietModel _$DietModelFromJson(Map<String, dynamic> json) => DietModel(
      json['name'] as String,
      json['unit'] as String,
      json['videoPath'] as String,
      json['thumbnailPath'] as String,
      json['details'] as String,
      json['calories'] as int,
    );

Map<String, dynamic> _$DietModelToJson(DietModel instance) => <String, dynamic>{
      'name': instance.name,
      'unit': instance.unit,
      'videoPath': instance.videoPath,
      'thumbnailPath': instance.thumbnailPath,
      'details': instance.details,
      'calories': instance.calories,
    };
