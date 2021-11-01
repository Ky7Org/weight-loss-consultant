import 'package:weight_loss_consultant_mobile/models/contract_model.dart';
import 'package:json_annotation/json_annotation.dart';

part "report_model.g.dart";

@JsonSerializable()
class ReportModel{
  int? id;
  String? exerciseDescription;
  String? dietDescription;
  String? trainerFeedback;
  int? trainerApproval;
  int? weight;
  int? createDate;
  ContractModel? contract;

  ReportModel();

  factory ReportModel.fromJson(Map<String,dynamic> data) => _$ReportModelFromJson(data);

  Map<String,dynamic> toJson() => _$ReportModelToJson(this);

  @override
  String toString() {
    return 'ReportModel{id: $id, exerciseDescription: $exerciseDescription, dietDescription: $dietDescription, trainerFeedback: $trainerFeedback, trainerApproval: $trainerApproval, weight: $weight, createDate: $createDate, contract: $contract}';
  }
}
