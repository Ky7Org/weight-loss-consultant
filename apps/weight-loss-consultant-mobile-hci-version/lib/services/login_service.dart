import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile_hci_version/example_data/exercise_data.dart';
import 'package:weight_loss_consultant_mobile_hci_version/example_data/food_data.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/account_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/customer_history_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/customer_schedule_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/diet_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/exercise_model.dart';
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



    if (email == "tien@gmail.com") {
      List<CustomerHistoryModel> userHistory = [];
      CustomerScheduleModel scheduleModel = service.generateDefaultSchedule(today.subtract(Duration(days: 3)), today.add(Duration(days: 3 * 30)));

      List<DietModel> listDiet = [];
      List<ExerciseModel> listExercise = [];
      CustomerHistoryModel historyModel;
      scheduleModel.data[today.subtract(Duration(days: 3))]!.dailyDietModel.dietMap.forEach((key, value) {
        listDiet.addAll(value);
      });
      listExercise = List<ExerciseModel>.from(scheduleModel.data[today.subtract(Duration(days: 3))]!.dailyExerciseModel.exerciseList);
      historyModel = CustomerHistoryModel(
          dateTime: today.subtract(Duration(days: 3)),
          userExerciseList: listExercise,
          userDietList: listDiet);
      userHistory.add(historyModel);

      listDiet = [];
      listExercise = [];
      historyModel;
      scheduleModel.data[today.subtract(Duration(days: 2))]!.dailyDietModel.dietMap.forEach((key, value) {
        listDiet.addAll(value);
      });
      listExercise = List<ExerciseModel>.from(scheduleModel.data[today.subtract(Duration(days: 2))]!.dailyExerciseModel.exerciseList);
      listExercise.removeAt(1);
      listExercise.removeAt(1);
      historyModel = CustomerHistoryModel(
          dateTime: today.subtract(Duration(days: 2)),
          userExerciseList: listExercise,
          userDietList: listDiet);
      userHistory.add(historyModel);

      listDiet = [];
      listExercise = [];
      historyModel;
      scheduleModel.data[today.subtract(Duration(days: 1))]!.dailyDietModel.dietMap.forEach((key, value) {
        listDiet.addAll(value);
      });
      listExercise = List<ExerciseModel>.from(scheduleModel.data[today.subtract(Duration(days: 1))]!.dailyExerciseModel.exerciseList);
      listExercise.add(ExerciseList.sumoSquatCalfRaisesWithWall);
      listExercise.add(ExerciseList.wideArmPushUps);
      historyModel = CustomerHistoryModel(
          dateTime: today.subtract(Duration(days: 1)),
          userExerciseList: listExercise,
          userDietList: listDiet);
      userHistory.add(historyModel);




        AccountModel model = AccountModel(email: "tien@gmail.com",
          fullname: "Natton",
          isFirstTime: false,
          level: 2,
          kcalNum: 10,
          workoutNum: 10,
          minute: 150,
          scheduleModel: scheduleModel,
          weightHistory: weightHistory,
          calHistory: dietHistory,
          userTodayDiet: [],
          userTodayExercise: [],
          userHistory: userHistory,
          startDate: today.subtract(Duration(days: 3)),
          endDate: today.add(Duration(days: 3 * 30)),
          weight: 80,
          height: 170,
      );
      prefs.setString("ACCOUNT", jsonEncode(model.toJson()));
      return model;
    }
    AccountModel model = AccountModel(
        email: email, fullname: email,
        scheduleModel: service.generateDefaultSchedule(today, today.add(Duration(days: 3 * 30))),
        weightHistory: weightHistory,
        calHistory: dietHistory,
        userTodayDiet: [],
        userTodayExercise: [],
      weight: 80,
      height: 170,
    );
    prefs.setString("ACCOUNT", jsonEncode(model.toJson()));
    return model;
  }
}
