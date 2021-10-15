// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'daily_diet_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

DailyDietModel _$DailyDietModelFromJson(Map<String, dynamic> json) =>
    DailyDietModel()
      ..dietMap = (json['dietMap'] as Map<String, dynamic>).map(
        (k, e) => MapEntry(
            k,
            (e as List<dynamic>)
                .map((e) => DietModel.fromJson(e as Map<String, dynamic>))
                .toList()),
      );

Map<String, dynamic> _$DailyDietModelToJson(DailyDietModel instance) =>
    <String, dynamic>{
      'dietMap': instance.dietMap,
    };
