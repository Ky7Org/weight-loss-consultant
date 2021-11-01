import 'package:json_annotation/json_annotation.dart';

part "contract_model.g.dart";

@JsonSerializable()
class ContractModel{

  int? id;
  double? totalPrice;
  int? timeOfExpired;
  int? timeOfCreate;
  int? status;

  ContractModel();

  factory ContractModel.fromJson(Map<String,dynamic> data) => _$ContractModelFromJson(data);

  Map<String,dynamic> toJson() => _$ContractModelToJson(this);

  @override
  String toString() {
    return 'ContractModel{id: $id, totalPrice: $totalPrice, timeOfExpired: $timeOfExpired, timeOfCreate: $timeOfCreate, status: $status}';
  }
}
