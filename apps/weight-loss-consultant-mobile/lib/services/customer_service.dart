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

  Future<CampaignModel?> getCustomerCampaign(String email) async {

  }


}
