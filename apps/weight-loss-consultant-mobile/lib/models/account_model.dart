import 'package:weight_loss_consultant_mobile/constants/role_enum.dart';
import 'package:json_annotation/json_annotation.dart';


@JsonSerializable()
class AccountModel{
  late String email;
  late String fullname;
  late Role role;

  AccountModel({required this.email, required this.fullname, required this.role});

  factory AccountModel.fromJson(Map<String, dynamic> parsedJson) {
    return AccountModel(
      email: parsedJson['email'] ?? "",
      fullname: parsedJson['fullname'] ?? "",
      role: Role.values.elementAt(parsedJson['role']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "email": email,
      "fullname": fullname,
      "role": role.index,
    };
  }
}
