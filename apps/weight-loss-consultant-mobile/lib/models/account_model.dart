import 'package:weight_loss_consultant_mobile/constants/enums.dart';
import 'package:json_annotation/json_annotation.dart';


part "account_model.g.dart";

@JsonSerializable()
class AccountModel{
  String? email;
  String? fullname;
  String? role;
  String? address;
  String? phone;
  String? gender;
  int? status;
  String? profileImage;
  String? dob;
  String? accessToken;
  String? password;
  String? deviceID;


  AccountModel({this.email = "", this.fullname = ""});

  factory AccountModel.fromJson(Map<String,dynamic> data) => _$AccountModelFromJson(data);

  Map<String,dynamic> toJson() => _$AccountModelToJson(this);

  @override
  String toString() {
    return 'AccountModel{email: $email, fullname: $fullname, role: $role, address: $address, phone: $phone, gender: $gender, status: $status, profileImage: $profileImage, dob: $dob, accessToken: $accessToken, password: $password, deviceID: $deviceID}';
  }
}
