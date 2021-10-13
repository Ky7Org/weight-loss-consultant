import 'package:weight_loss_consultant_mobile_hci_version/models/exercise_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/constants.dart';
import 'package:json_annotation/json_annotation.dart';

part "daily_exercise_model.g.dart";

@JsonSerializable()
class DailyExerciseModel{
  late List<ExerciseModel> exerciseList;

  DailyExerciseModel(){}

  DailyExerciseIntensity get intensity{
    if (exerciseList.isEmpty){
      return DailyExerciseIntensity.rest;
    }
    if (exerciseList.length <=5 ) {
      return DailyExerciseIntensity.light;
    }
    if (exerciseList.length <= 10){
      return DailyExerciseIntensity.medium;
    }
    return DailyExerciseIntensity.intense;
  }

  factory DailyExerciseModel.fromJson(Map<String,dynamic> data) => _$DailyExerciseModelFromJson(data);

  Map<String,dynamic> toJson() => _$DailyExerciseModelToJson(this);
}
