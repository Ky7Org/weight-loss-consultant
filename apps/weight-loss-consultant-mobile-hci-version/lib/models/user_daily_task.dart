import 'package:weight_loss_consultant_mobile_hci_version/models/daily_diet_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/daily_exercise_model.dart';
import 'package:json_annotation/json_annotation.dart';


part "user_daily_task.g.dart";

@JsonSerializable()
class UserDailyTask{
  late DailyExerciseModel dailyExerciseModel;
  late DailyDietModel dailyDietModel;
  UserDailyTask(this.dailyExerciseModel, this.dailyDietModel);

  factory UserDailyTask.fromJson(Map<String,dynamic> data) => _$UserDailyTaskFromJson(data);

  Map<String,dynamic> toJson() => _$UserDailyTaskToJson(this);

}
