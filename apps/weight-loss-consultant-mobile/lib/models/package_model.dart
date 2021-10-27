import 'package:weight_loss_consultant_mobile/constants/enums.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:weight_loss_consultant_mobile/models/trainer_model.dart';


part "package_model.g.dart";

@JsonSerializable()
class PackageModel{
  int? id;
  String? exercisePlan;
  String? schedule;
  double? price;
  int? status;
  String? dietPlan;
  int? spendTimeToTraining;
  TrainerModel? trainer;

  PackageModel();

  factory PackageModel.fromJson(Map<String,dynamic> data) => _$PackageModelFromJson(data);

  Map<String,dynamic> toJson() => _$PackageModelToJson(this);

}

