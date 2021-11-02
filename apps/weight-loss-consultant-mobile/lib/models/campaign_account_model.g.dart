// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'campaign_account_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CampaignAccountModel _$CampaignAccountModelFromJson(
        Map<String, dynamic> json) =>
    CampaignAccountModel(
      json['email'] as String?,
      json['password'] as String?,
      json['fullname'] as String?,
      json['address'] as String?,
      json['phone'] as String?,
      json['gender'] as String?,
      json['status'] as int?,
      json['profileImage'] as String?,
      json['dob'] as String?,
    )..deviceID = json['deviceID'] as String?;

Map<String, dynamic> _$CampaignAccountModelToJson(
        CampaignAccountModel instance) =>
    <String, dynamic>{
      'email': instance.email,
      'password': instance.password,
      'fullname': instance.fullname,
      'address': instance.address,
      'phone': instance.phone,
      'gender': instance.gender,
      'status': instance.status,
      'profileImage': instance.profileImage,
      'dob': instance.dob,
      'deviceID': instance.deviceID,
    };
