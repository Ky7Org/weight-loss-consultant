import 'dart:math';

import 'package:weight_loss_consultant_mobile_hci_version/models/customer_schedule_model.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/diet_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/exercise_model.dart';

part "account_model.g.dart";



@JsonSerializable()
class AccountModel {
  late String email;
  late String fullname;
  int level = -1;
  int workoutNum = 0;
  int kcalNum = 0;
  int minute = 0;
  bool isFirstTime = true;
  CustomerScheduleModel? scheduleModel = CustomerScheduleModel();
  int height = 0;
  int weight = 0;
  late DateTime? startDate = DateTime.now();
  late DateTime? endDate = DateTime.now();
  int weightGoal = 0;
  List<Map<DateTime, int>> weightHistory = [];
  List<Map<DateTime, int>> calHistory = [];
  List<DietModel> userCustomDietModelList = [];
  List<ExerciseModel> userCustomExerciseModelList = [];

  AccountModel(
      {required this.email,
      required this.fullname,
      this.level = -1,
      this.workoutNum = 0,
      this.kcalNum = 0,
      this.minute = 0,
      this.isFirstTime = true,
      this.scheduleModel,
      this.weight = 0,
      this.height = 0,
      this.startDate,
      this.endDate,
      this.weightGoal = 0,
      this.weightHistory = const [],
      this.calHistory = const [],
      });

  factory AccountModel.fromJson(Map<String,dynamic> data) => _$AccountModelFromJson(data);

  Map<String,dynamic> toJson() => _$AccountModelToJson(this);

  int getMaxWeight(){
    if (weightHistory.isEmpty) return 0;
    return weightHistory.map((history) => history.values.first).reduce(max);
  }

  int getMinWeight(){
    if (weightHistory.isEmpty) return 0;
    return weightHistory.map((history) => history.values.first).reduce(min);
  }

  int getAverageCal(){
    if (calHistory.isEmpty) return 0;
    return (calHistory.map((history) => history.values.first).reduce((a, b) => a + b) / calHistory.length).round();
  }
}
