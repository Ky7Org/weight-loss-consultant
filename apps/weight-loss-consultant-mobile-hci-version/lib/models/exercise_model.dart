import 'package:json_annotation/json_annotation.dart';

part 'exercise_model.g.dart';

@JsonSerializable()
class ExerciseModel{
  String name;
  String unit;
  String videoPath;
  String thumbnailPath;
  String details;
  int calories;


  ExerciseModel(
      this.name, this.unit, this.videoPath, this.thumbnailPath, this.details, this.calories);

  @override
  String toString() {
    return "{name: $name; unit: $unit; videoPath: $videoPath; thumbnailPath: $thumbnailPath; details: $details; calories: $calories}";
  }

  factory ExerciseModel.fromJson(Map<String,dynamic> data) => _$ExerciseModelFromJson(data);

  Map<String,dynamic> toJson() => _$ExerciseModelToJson(this);

  @override
  bool operator ==(other) {
    return (other is ExerciseModel)
        && other.name == name;
  }
}
