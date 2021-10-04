import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/account_model.dart';
import 'dart:convert';

class LoginService {
  String email;
  String password;

  LoginService({this.email = "", this.password = ""});

  Future<AccountModel> login() async {
    //TODO: register API
    SharedPreferences prefs = await SharedPreferences.getInstance();
    if (email == "banhsbao@gmail.com") {
      AccountModel model = AccountModel(email: "banhsbao@gmail.com",
          fullname: "BanhsBao",
          isFirstTime: true,
          level: 2,
          kcalNum: 10,
          workoutNum: 10,
          minute: 150,
      );
      prefs.setString("ACCOUNT", jsonEncode(model.toJson()));
      return model;
    }
    AccountModel model = AccountModel(email: email, fullname: email);
    prefs.setString("ACCOUNT", jsonEncode(model.toJson()));
    return model;
  }
}
