import 'package:weight_loss_consultant_mobile/models/report_model.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:weight_loss_consultant_mobile/models/trainer_model.dart';


part "report_media_model.g.dart";

@JsonSerializable()
class ReportMediaModel{
  int? id;
  String? url;
  int? type;
  String? createDate;
  ReportModel? report;

  ReportMediaModel();

  factory ReportMediaModel.fromJson(Map<String,dynamic> data) => _$ReportMediaModelFromJson(data);

  Map<String,dynamic> toJson() => _$ReportMediaModelToJson(this);

  @override
  String toString() {
    return 'ReportMediaModel{id: $id, url: $url, type: $type, createDate: $createDate, report: $report}';
  }
}
