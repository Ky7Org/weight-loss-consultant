import 'dart:convert';
import 'dart:io';

import 'package:weight_loss_consultant_mobile/constants/api_constant.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:http/http.dart' as http;
import 'package:weight_loss_consultant_mobile/models/campaign_model.dart';


class CustomerService{
  CustomerService();
  Future<bool> updateCustomerProfile(AccountModel model) async{
    var url = Uri.parse(ApiConstant.updateCustomerApi + "/${model.email}");
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

  Future<List<CampaignModel>> getCustomerCampaign(String email) async {
    /*var url = Uri.parse(ApiConstant.getCustomerCampaignApi + "/$email");
    List<CampaignModel> models = [];
    var response = await http.get(url);
    if (response.statusCode == 200){
      models = (json.decode(response.body) as List).map((i) =>
          CampaignModel.fromJson(i)).toList();
    }
    return models;*/
    List<CampaignModel> models = [];
    models.add(CampaignModel("123", "Tien dep trai", 1, "1635265120677", "1640883600000", "I want to meet female trainer", 60, 45, 3));
    models.add(CampaignModel("123", "Tien dep trai", 1, "1635265120677", "1640883600000", "I want to meet female trainer", 60, 45, 3));
    models.add(CampaignModel("123", "Tien dep trai", 1, "1635265120677", "1640883600000", "I want to meet female trainer", 60, 45, 3));
    models.add(CampaignModel("123", "Tien dep trai", 1, "1635265120677", "1640883600000", "I want to meet female trainer", 60, 45, 3));
    models.add(CampaignModel("123", "Tien dep trai", 1, "1635265120677", "1640883600000", "I want to meet female trainer", 60, 45, 3));
    models.add(CampaignModel("123", "Tien dep trai", 1, "1635265120677", "1640883600000", "I want to meet female trainer", 60, 45, 3));
    models.add(CampaignModel("123", "Tien dep trai", 1, "1635265120677", "1640883600000", "I want to meet female trainer", 60, 45, 3));
    return models;
  }

  Future<bool> createCampaign(
      {int targetWeight = 0,
        int currentWeight = 0,
        int spendTimeForTraining = 0,
        String description = "",
      }) async {
    Map<String, dynamic> data = {};



      return false;
  }


}
