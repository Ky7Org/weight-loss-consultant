import 'dart:convert';

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';

class LocalNotificationService {
  static final FlutterLocalNotificationsPlugin _notificationsPlugin =
      FlutterLocalNotificationsPlugin();

  static var _navKey = GlobalKey<NavigatorState>();

  static void initialize(GlobalKey<NavigatorState> _navKey) {
    LocalNotificationService._navKey = _navKey;
    const InitializationSettings initializationSettings =
        InitializationSettings(
            android: AndroidInitializationSettings("@mipmap/ic_launcher"));

    _notificationsPlugin.initialize(initializationSettings,
        onSelectNotification: (String? data) async {
      Map<String, dynamic> myDataFromMessage = jsonDecode(data!);

      final typeOfMessage = myDataFromMessage['type'];

      if (typeOfMessage == 'Apply Package') {
        final packageID = myDataFromMessage["packageID"];
        final campaignID = myDataFromMessage["campaignID"];
        Map<String, dynamic> mapData = {};
        mapData["packageID"] = int.parse(packageID);
        mapData["campaignID"] = int.parse(campaignID);
        _navKey.currentState!.pushNamed(RoutePath.customerPackageDetailPage,
            arguments: mapData);
      } else if (typeOfMessage == 'Apply Campaign') {
        final packageID = myDataFromMessage['packageID'];
        LocalNotificationService._navKey.currentState!.pushNamed(
            RoutePath.trainerOnGoingPackageDetailPage,
            arguments: int.parse(packageID));
      } else if (typeOfMessage == "Update Campaign"){
        print("Update Campaign");
      }
    });
  }

  static void display(RemoteMessage message) async {
    try {
      final id = DateTime.now().millisecondsSinceEpoch ~/ 1000;

      const NotificationDetails notificationDetails = NotificationDetails(
          android: AndroidNotificationDetails(
        "default_id",
        "default_id_channel",
        importance: Importance.max,
        priority: Priority.high,
      ));

      Map<String, dynamic> myDataFromMessage = {};

      myDataFromMessage['type'] = message.data["type"];
      myDataFromMessage['campaignID'] = message.data["campaignID"];
      myDataFromMessage['packageID'] = message.data["packageID"];
      await _notificationsPlugin.show(
        id,
        message.notification!.title,
        message.notification!.body,
        notificationDetails,
        payload: jsonEncode(myDataFromMessage),
      );
    } on Exception catch (e) {
      print(e);
    }
  }
}
