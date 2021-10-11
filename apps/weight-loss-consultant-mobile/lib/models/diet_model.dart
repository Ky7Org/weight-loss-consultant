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
    return 'DietModel{name: $name, unit: $unit, videoPath: $videoPath, thumbnailPath: $thumbnailPath, details: $details, calories: $calories}';
  }
}
