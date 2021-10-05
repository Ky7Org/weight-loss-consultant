import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/role_enum.dart';
import 'dart:convert';

import 'package:weight_loss_consultant_mobile/models/account_model.dart';

class LoginService {
  String email;
  String password;

  LoginService({this.email = "", this.password = ""});

  Future<AccountModel> login() async {
    //TODO: register API
    SharedPreferences prefs = await SharedPreferences.getInstance();
    if (email == "banhsbao@gmail.com") {
      AccountModel model = AccountModel(
        email: "banhsbao@gmail.com",
        fullname: "BanhsBao",
        role: Role.customer
      );
      prefs.setString("ACCOUNT", jsonEncode(model.toJson()));
      return model;
    }
    AccountModel model = AccountModel(email: email, fullname: email, role: Role.undecided);
    prefs.setString("ACCOUNT", jsonEncode(model.toJson()));
    return model;
  }
}
