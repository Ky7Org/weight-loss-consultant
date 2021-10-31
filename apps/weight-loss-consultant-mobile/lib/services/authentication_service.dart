import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/api_constant.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'dart:io';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';

class AuthenticationService {

  AuthenticationService();

  Future<AccountModel?> login(String email, String password) async {


    var url = Uri.parse(ApiConstant.loginApi);
    var response = await http.post(url, body: {'email': email, 'password': password});
    if (response.statusCode == 200){
      AccountModel accountModel = AccountModel.fromJson(jsonDecode(response.body));
      accountModel.password = password;

      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString("ACCOUNT", jsonEncode(accountModel.toJson()));
      return accountModel;
    }
  }

  Future<AccountModel?> signInWithGoogle() async {
    //Trigger the authentication flow
    final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();

    //Obtain the auth details from the request
    final GoogleSignInAuthentication? googleAuth =
    await googleUser?.authentication;

    //Create a new credential
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth?.accessToken,
      idToken: googleAuth?.idToken,
    );

    final userCredential = await FirebaseAuth.instance.signInWithCredential(credential);
    //for fuck sake do not print token here
    //https://github.com/flutter/flutter/issues/31635
    final userToken = await userCredential.user!.getIdToken();
    var url = Uri.parse(ApiConstant.loginWithFirebaseApi);
    var response = await http.post(url, headers: {
      HttpHeaders.authorizationHeader: "Bearer $userToken"
    });
    if (response.statusCode == 200){
      AccountModel accountModel = AccountModel.fromJson(jsonDecode(response.body));
      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString("ACCOUNT", jsonEncode(accountModel.toJson()));
      return accountModel;
    }
  }
}
