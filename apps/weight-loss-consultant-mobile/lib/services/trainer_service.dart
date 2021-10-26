import 'dart:convert';
import 'dart:io';

import 'package:weight_loss_consultant_mobile/constants/api_constant.dart';
import 'package:weight_loss_consultant_mobile/constants/enums.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:http/http.dart' as http;


class TrainerService{
  TrainerService();

  Future<bool> updateTrainerProfile(AccountModel model) async{
    var url = Uri.parse(ApiConstant.updateTrainerApi + "/${model.email}");
    var response = await http.put(
        url,
        body: json.encode(model.toJson()),
        headers: {
          HttpHeaders.authorizationHeader: 'Bearer ${model.accessToken}',
          'Content-Type': 'application/json; charset=UTF-8',
        },
    );
    if (response.statusCode == 200){
      return true;
    }
    return false;
  }
}