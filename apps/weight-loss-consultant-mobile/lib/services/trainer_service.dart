import 'dart:convert';
import 'dart:io';

import 'package:weight_loss_consultant_mobile/constants/api_constant.dart';
import 'package:weight_loss_consultant_mobile/constants/enums.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:http/http.dart' as http;
import 'package:weight_loss_consultant_mobile/models/campaign_model.dart';
import 'package:weight_loss_consultant_mobile/models/customer_campaign_model.dart';


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

  Future<List<CustomerCampaignModel>> getAvailableCampaign(AccountModel user) async {
    var url = Uri.parse(ApiConstant.getAllCampaignApi);
    List<CustomerCampaignModel> models = [];
    var response = await http.get(
      url,
      headers: {
        HttpHeaders.authorizationHeader: 'Bearer ${user.accessToken}',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );
    if (response.statusCode == 200){
      Iterable list = json.decode(response.body);
      print(list.length);
      for (var item in list){
        CustomerCampaignModel model = CustomerCampaignModel.fromJson(item);
        print(model);
        models.add(model);
      }
    }
    print(models);
    return models;
  }

}
