// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'contract_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ContractModel _$ContractModelFromJson(Map<String, dynamic> json) =>
    ContractModel()
      ..id = json['id'] as int?
      ..totalPrice = (json['totalPrice'] as num?)?.toDouble()
      ..timeOfExpired = json['timeOfExpired'] as int?
      ..timeOfCreate = json['timeOfCreate'] as int?
      ..status = json['status'] as int?;

Map<String, dynamic> _$ContractModelToJson(ContractModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'totalPrice': instance.totalPrice,
      'timeOfExpired': instance.timeOfExpired,
      'timeOfCreate': instance.timeOfCreate,
      'status': instance.status,
    };
