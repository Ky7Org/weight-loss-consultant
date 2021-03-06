import 'package:weight_loss_consultant_mobile/constants/enums.dart';
import 'package:json_annotation/json_annotation.dart';


part "trainer_model.g.dart";

@JsonSerializable()
class TrainerModel{
  String? email;
  String? password;
  String? fullname;
  String? address;
  String? phone;
  String? gender;
  int? status;
  String? profileImage;
  String? dob;
  double? yearOfExp;
  double? rating;
  String? deviceID;

  TrainerModel();

  factory TrainerModel.fromJson(Map<String,dynamic> data) => _$TrainerModelFromJson(data);

  Map<String,dynamic> toJson() => _$TrainerModelToJson(this);

  @override
  String toString() {
    return 'TrainerModel{email: $email, password: $password, fullname: $fullname, address: $address, phone: $phone, gender: $gender, status: $status, profileImage: $profileImage, dob: $dob, yearOfExp: $yearOfExp, rating: $rating, device: $deviceID}';
  }
}
