import 'package:json_annotation/json_annotation.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/user_daily_task.dart';
import 'dart:convert';
import 'daily_diet_model.dart';
import 'daily_exercise_model.dart';

part "customer_schedule_model.g.dart";

@JsonSerializable()
class CustomerScheduleModel {
  Map<DateTime, UserDailyTask> data = {};

  CustomerScheduleModel();

  void add(DateTime dateTime, DailyExerciseModel dailyExerciseModel, DailyDietModel dailyDietModel){
    data[dateTime] = UserDailyTask(dailyExerciseModel, dailyDietModel);
  }

  factory CustomerScheduleModel.fromJson(Map<String,dynamic> data) => _$CustomerScheduleModelFromJson(data);

  Map<String,dynamic> toJson() => _$CustomerScheduleModelToJson(this);

}

