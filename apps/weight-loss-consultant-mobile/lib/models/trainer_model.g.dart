// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'trainer_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

TrainerModel _$TrainerModelFromJson(Map<String, dynamic> json) => TrainerModel()
  ..email = json['email'] as String?
  ..password = json['password'] as String?
  ..fullname = json['fullname'] as String?
  ..address = json['address'] as String?
  ..phone = json['phone'] as String?
  ..gender = json['gender'] as String?
  ..status = json['status'] as int?
  ..profileImage = json['profileImage'] as String?
  ..dob = json['dob'] as String?
  ..yearOfExp = (json['yearOfExp'] as num?)?.toDouble()
  ..rating = (json['rating'] as num?)?.toDouble();

Map<String, dynamic> _$TrainerModelToJson(TrainerModel instance) =>
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
      'yearOfExp': instance.yearOfExp,
      'rating': instance.rating,
    };
