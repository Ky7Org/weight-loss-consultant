import 'package:weight_loss_consultant_mobile_hci_version/models/diet_model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'daily_diet_model.g.dart';

@JsonSerializable()
class DailyDietModel {


  Map<String, List<DietModel>> dietMap = {};

  DailyDietModel(){}

  factory DailyDietModel.fromJson(Map<String,dynamic> data) => _$DailyDietModelFromJson(data);

  Map<String,dynamic> toJson() => _$DailyDietModelToJson(this);


}
