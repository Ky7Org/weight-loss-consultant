import 'dart:convert';
import 'dart:io';

import 'package:weight_loss_consultant_mobile/constants/api_constant.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:http/http.dart' as http;
import 'package:weight_loss_consultant_mobile/models/campaign_model.dart';
import 'package:weight_loss_consultant_mobile/models/package_model.dart';


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
    var url = Uri.parse(ApiConstant.getCustomerCampaignApi + "/$email");
    List<CampaignModel> models = [];
    var response = await http.get(url);
    if (response.statusCode == 200){
      Iterable list = json.decode(response.body);
      for (var item in list){
        CampaignModel model = CampaignModel.fromJson(item);
        models.add(model);
      }
    }
    return models;
  }

  Future<bool> createCampaign(
      {int targetWeight = 0,
        int currentWeight = 0,
        int spendTimeForTraining = 0,
        String description = "",
        AccountModel? user,
      }) async {
    Map<String, dynamic> data = {};
    data["customerEmail"] = user!.email ?? "";
    data["description"] = description;
    data["startDate"] = DateTime.now().millisecondsSinceEpoch.toString();
    data["endDate"] = "0";
    data["feedback"] = "";
    data["targetWeight"] = targetWeight;
    data["currentWeight"] = currentWeight;
    data["spendTimeForTraining"] = spendTimeForTraining;
    var url = Uri.parse(ApiConstant.createCampaignApi);
    var response = await http.post(
      url,
      body: json.encode(data),
      headers: {
        HttpHeaders.authorizationHeader: 'Bearer ${user.accessToken}',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );
    if (response.statusCode == 201){
      return true;
    }
    return false;
  }

  Future<bool> deleteCampaign(int campaignId, AccountModel user) async {
    var url = Uri.parse(ApiConstant.deleteCampaignApi + "/$campaignId");
    var response = await http.delete(
      url,
      headers: {
        HttpHeaders.authorizationHeader: 'Bearer ${user.accessToken}',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );
    if (response.statusCode == 200){
      return true;
    }
    return false;
  }

  Future<CampaignModel?> getCampaignById(int campaignId, AccountModel user) async{
    var url = Uri.parse(ApiConstant.deleteCampaignApi + "/$campaignId");
    var response = await http.get(
      url,
      headers: {
        HttpHeaders.authorizationHeader: 'Bearer ${user.accessToken}',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );
    if (response.statusCode == 200){
      return CampaignModel.fromJson(jsonDecode(response.body));
    }
  }

  Future<bool> updateCampaign(CampaignModel? model, AccountModel user) async {
    if (model == null){
      return false;
    }
    var url = Uri.parse(ApiConstant.updateCampaignApi + "/${model.id}");
    Map<String, dynamic> data = model.toJson();
    data["customerEmail"] = user.email;
    var response = await http.put(
      url,
      body: json.encode(data),
      headers: {
        HttpHeaders.authorizationHeader: 'Bearer ${user.accessToken}',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );
    if (response.statusCode == 200){
      return true;
    }
    return false;
  }

  Future<PackageModel?> getPackageById(int packageId, AccountModel user) async{
    var url = Uri.parse(ApiConstant.getPackageDetailApi + "/$packageId");
    var response = await http.get(
      url,
      headers: {
        HttpHeaders.authorizationHeader: 'Bearer ${user.accessToken}',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );
    if (response.statusCode == 200){
      return PackageModel.fromJson(jsonDecode(response.body));
    }
  }


}
