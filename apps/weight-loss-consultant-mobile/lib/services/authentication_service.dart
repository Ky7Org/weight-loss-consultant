import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/api_constant.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;


import 'package:weight_loss_consultant_mobile/models/account_model.dart';

class AuthenticationService {

  AuthenticationService();

  Future<AccountModel?> login(String email, String password) async {
    var url = Uri.parse(ApiConstant.loginApi);
    var response = await http.post(url, body: {'email': email, 'password': password});
    if (response.statusCode == 200){
      AccountModel accountModel = AccountModel.fromJson(jsonDecode(response.body));
      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString("ACCOUNT", jsonEncode(accountModel.toJson()));
      return accountModel;
    }

  }
}
