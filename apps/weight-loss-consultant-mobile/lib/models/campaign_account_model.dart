import 'package:weight_loss_consultant_mobile/constants/enums.dart';
import 'package:json_annotation/json_annotation.dart';


part "campaign_account_model.g.dart";

@JsonSerializable()
class CampaignAccountModel{
  late String? email;
  late String? password;
  late String? fullname;
  late String? address;
  late String? phone;
  late String? gender;
  late int? status;
  late String? profileImage;
  late String? dob;


  CampaignAccountModel(this.email, this.password, this.fullname, this.address,
      this.phone, this.gender, this.status, this.profileImage, this.dob);

  factory CampaignAccountModel.fromJson(Map<String,dynamic> data) => _$CampaignAccountModelFromJson(data);

  Map<String,dynamic> toJson() => _$CampaignAccountModelToJson(this);

  @override
  String toString() {
    return 'CampaignAccountModel{email: $email, fullname: $fullname, address: $address, phone: $phone, gender: $gender, status: $status, profileImage: $profileImage, dob: $dob, password: $password}';
  }
}
