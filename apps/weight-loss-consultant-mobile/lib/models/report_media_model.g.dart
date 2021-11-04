// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'report_media_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ReportMediaModel _$ReportMediaModelFromJson(Map<String, dynamic> json) =>
    ReportMediaModel()
      ..id = json['id'] as int?
      ..url = json['url'] as String?
      ..type = json['type'] as int?
      ..createDate = json['createDate'] as String?
      ..report = json['report'] == null
          ? null
          : ReportModel.fromJson(json['report'] as Map<String, dynamic>);

Map<String, dynamic> _$ReportMediaModelToJson(ReportMediaModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'url': instance.url,
      'type': instance.type,
      'createDate': instance.createDate,
      'report': instance.report,
    };
