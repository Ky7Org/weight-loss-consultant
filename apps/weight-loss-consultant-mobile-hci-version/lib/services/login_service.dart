import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/account_model.dart';
import 'dart:convert';

import 'package:weight_loss_consultant_mobile_hci_version/services/customer_schedule_service.dart';

class LoginService {
  String email;
  String password;

  LoginService({this.email = "", this.password = ""});

  Future<AccountModel> login() async {
    //TODO: register API
    SharedPreferences prefs = await SharedPreferences.getInstance();
    CustomerScheduleService service = CustomerScheduleService();
    DateTime now = DateTime.now();
    DateTime today = DateTime(now.year, now.month, now.day);
    List<Map<DateTime, int>> weightHistory = [
      {
        today : 80
      },
      {
        today.subtract(const Duration(days: 1)) : 82
      },
      {
        today.subtract(const Duration(days: 2)) : 85
      },
      {
        today.subtract(const Duration(days: 3)) : 83
      },
    ];
    List<Map<DateTime, int>> dietHistory = [
      {
        today : 785
      },
      {
        today.subtract(const Duration(days: 1)) : 2380
      },
      {
        today.subtract(const Duration(days: 2)) : 3943
      },
      {
        today.subtract(const Duration(days: 3)) : 2830
      },
    ];
    if (email == "banhsbao@gmail.com") {
      AccountModel model = AccountModel(email: "banhsbao@gmail.com",
          fullname: "BanhsBao",
          isFirstTime: false,
          level: 2,
          kcalNum: 10,
          workoutNum: 10,
          minute: 150,
          scheduleModel: service.generateDefaultSchedule(today, today.add(Duration(days: 3 * 30))),
          weightHistory: weightHistory,
          calHistory: dietHistory,
      );
      prefs.setString("ACCOUNT", jsonEncode(model.toJson()));
      return model;
    }
    AccountModel model = AccountModel(
        email: email, fullname: email,
        scheduleModel: service.generateDefaultSchedule(today, today.add(Duration(days: 3 * 30))),
        weightHistory: weightHistory,
        calHistory: dietHistory,
    );
    prefs.setString("ACCOUNT", jsonEncode(model.toJson()));
    return model;
  }
}
