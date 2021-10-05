class DietModel {
  String name;
  String unit;
  String videoPath;
  String thumbnailPath;
  String details;

  DietModel(
      this.name, this.unit, this.videoPath, this.thumbnailPath, this.details);

  @override
  String toString() {
    return "{name: $name; unit: $unit; videoPath: $videoPath; thumbnailPath: $thumbnailPath; details: $details}";
  }
}
