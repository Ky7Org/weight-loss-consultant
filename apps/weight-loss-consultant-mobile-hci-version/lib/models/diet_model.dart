import 'package:json_annotation/json_annotation.dart';

part 'diet_model.g.dart';

@JsonSerializable()
class DietModel {
  String name;
  String unit;
  String videoPath;
  String thumbnailPath;
  String details;
  int calories;

  DietModel(
      this.name, this.unit, this.videoPath, this.thumbnailPath, this.details, this.calories);

  @override
  String toString() {
    return "{name: $name; unit: $unit; videoPath: $videoPath; thumbnailPath: $thumbnailPath; details: $details;  calories: $calories}";
  }

  factory DietModel.fromJson(Map<String,dynamic> data) => _$DietModelFromJson(data);

  Map<String,dynamic> toJson() => _$DietModelToJson(this);
}
