class RecipeModel {
  String name;
  int unit;
  String videoPath;
  String thumbnailPath;
  String details;

  RecipeModel(
      this.name, this.unit, this.videoPath, this.thumbnailPath, this.details);

  @override
  String toString() {
    return 'RecipeModel{name: $name, unit: $unit, videoPath: $videoPath, thumbnailPath: $thumbnailPath, details: $details}';
  }
}
