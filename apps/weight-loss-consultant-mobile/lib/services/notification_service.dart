import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:weight_loss_consultant_mobile/constants/api_constant.dart';

class NotificationService{
  NotificationService();
  Future<void> applyPackage(String toToken, String trainerEmail, int packageID, int campaignID) async {
    var url = Uri.parse(ApiConstant.firebaseMessagingApi);
    var response = await http.post(
        url,
        headers: {
          HttpHeaders.authorizationHeader: 'key=AAAA3JynyF8:APA91bGoTp1Dp9BLffDIP7aLOFEumWqtb5tDHXnStPlS5H6ELu67IuEW1vC-L44IKFXDZspMuRCfUmFs5v1jrV4C9O4pXWQ5-SWXBoeQUZQK2p_jL0xXqrLSNr5RlooOurPg_2wXNxLQ',
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode({
          "to": toToken,
          "notification": {
            "body": "A campaign has a new applied package",
            "title": "Apply campaign",
          },
          "direct_boot_ok": true,
          "data": {
            "type": "Apply Package",
            "campaignID": campaignID.toString(),
            "packageID": packageID.toString(),
          },
        }),
    );
  }

  Future<void> approvePackage(String toToken, String userEmail, int packageID) async {
    var url = Uri.parse(ApiConstant.firebaseMessagingApi);
    var response = await http.post(
      url,
      headers: {
        HttpHeaders.authorizationHeader: 'key=AAAA3JynyF8:APA91bGoTp1Dp9BLffDIP7aLOFEumWqtb5tDHXnStPlS5H6ELu67IuEW1vC-L44IKFXDZspMuRCfUmFs5v1jrV4C9O4pXWQ5-SWXBoeQUZQK2p_jL0xXqrLSNr5RlooOurPg_2wXNxLQ',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "to": toToken,
        "notification": {
          "body": "Your campaign has been approved",
          "title": "Campaign approved",
        },
        "direct_boot_ok": true,
        "data": {
          "type": "Apply Campaign",
          "packageID": packageID.toString(),
        },
      }),
    );
  }

}
