import 'package:weight_loss_consultant_mobile_hci_version/models/diet_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/exercise_model.dart';
import 'package:json_annotation/json_annotation.dart';


part "customer_history_model.g.dart";

@JsonSerializable()
class CustomerHistoryModel{
  DateTime dateTime = DateTime.now();
  List<ExerciseModel> userExerciseList = [];
  List<DietModel> userDietList= [];

  CustomerHistoryModel({
    required this.dateTime,
    required this.userExerciseList,
    required this.userDietList,
});

  factory CustomerHistoryModel.fromJson(Map<String,dynamic> data) => _$CustomerHistoryModelFromJson(data);

  Map<String,dynamic> toJson() => _$CustomerHistoryModelToJson(this);

  @override
  bool operator ==(other) {
    return (other is CustomerHistoryModel)
        && other.dateTime.compareTo(other.dateTime) == 0;
  }

  int getAllKcal(){
    int dietCalorie = 0;
    int exerciseCalorie = 0;
    if (userDietList.isNotEmpty){
      dietCalorie = userDietList.map((e) => e.calories).toList().reduce((a,b) => a+b);
    }
    if (userExerciseList.isNotEmpty){
      exerciseCalorie = userExerciseList.map((e) => e.calories).toList().reduce((a,b) => a+b);
    }
    return dietCalorie - exerciseCalorie;
  }

  int getDietKcal(){
    int dietCalorie = 0;
    if (userDietList.isNotEmpty){
      dietCalorie = userDietList.map((e) => e.calories).toList().reduce((a,b) => a+b);
    }
    return dietCalorie;
  }

  int getExerciseKcal(){
    int exerciseCalorie = 0;
    if (userExerciseList.isNotEmpty){
      exerciseCalorie = userExerciseList.map((e) => e.calories).toList().reduce((a,b) => a+b);
    }
    return exerciseCalorie;
  }

}
