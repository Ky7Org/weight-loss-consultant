// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'account_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AccountModel _$AccountModelFromJson(Map<String, dynamic> json) => AccountModel(
      email: json['email'] as String? ?? "",
      fullname: json['fullname'] as String? ?? "",
    )
      ..role = json['role'] as String?
      ..address = json['address'] as String?
      ..phone = json['phone'] as String?
      ..gender = json['gender'] as String?
      ..status = json['status'] as int?
      ..profileImage = json['profileImage'] as String?
      ..dob = json['dob'] as String?
      ..accessToken = json['accessToken'] as String?
      ..password = json['password'] as String?;

Map<String, dynamic> _$AccountModelToJson(AccountModel instance) =>
    <String, dynamic>{
      'email': instance.email,
      'fullname': instance.fullname,
      'role': instance.role,
      'address': instance.address,
      'phone': instance.phone,
      'gender': instance.gender,
      'status': instance.status,
      'profileImage': instance.profileImage,
      'dob': instance.dob,
      'accessToken': instance.accessToken,
      'password': instance.password,
    };
