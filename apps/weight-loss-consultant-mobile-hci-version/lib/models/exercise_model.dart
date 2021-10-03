class ExerciseModel{
  String name;
  String unit;
  String videoPath;
  String thumbnailPath;
  String details;

  ExerciseModel({required this.name,
    required this.unit,
    required this.videoPath,
    required this.thumbnailPath, required this.details});

  @override
  String toString() {
    return "{name: $name; unit: $unit; videoPath: $videoPath; thumbnailPath: $thumbnailPath; details: $details}";
  }
}
