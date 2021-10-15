import 'package:weight_loss_consultant_mobile/constants/enums.dart';
import 'package:json_annotation/json_annotation.dart';


part "account_model.g.dart";

@JsonSerializable()
class AccountModel{
  late String email;
  late String fullname;
  late String role;
  late String address;
  late String phone;
  late String gender;
  late int status;
  late String profileImage;
  late String dob;
  late String accessToken;


  AccountModel({this.email = "", this.fullname = ""});

  factory AccountModel.fromJson(Map<String,dynamic> data) => _$AccountModelFromJson(data);

  Map<String,dynamic> toJson() => _$AccountModelToJson(this);

  @override
  String toString() {
    return 'AccountModel{email: $email, fullname: $fullname, role: $role, address: $address, phone: $phone, gender: $gender, status: $status, profileImage: $profileImage, dob: $dob}';
  }
}
