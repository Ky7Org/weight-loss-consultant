import 'dart:math';
import 'package:weight_loss_consultant_mobile/example_data/exercise_data.dart';
import 'package:weight_loss_consultant_mobile/models/exercise_model.dart';

class ExerciseService{
  List<ExerciseModel> getBeginnerExercise(){
    List<ExerciseModel> models = List.empty(growable: true);
    final _random = Random();
    int i = 0;
    while (i < 5){
      var element = ExerciseList.listExercise[_random.nextInt(ExerciseList.listExercise.length)];
      if (models.contains(element)) continue;
      models.add(element);
      i++;
    }

    return models;
  }
  List<ExerciseModel> getIntermediateExercise(){
    List<ExerciseModel> models = List.empty(growable: true);
    final _random = Random();
    int i = 0;
    while (i < 10){
      var element = ExerciseList.listExercise[_random.nextInt(ExerciseList.listExercise.length)];
      if (models.contains(element)) continue;
      models.add(element);
      i++;
    }

    return models;
  }
  List<ExerciseModel> getAdvanceExercise(){
    List<ExerciseModel> models = List.empty(growable: true);
    final _random = Random();
    int i = 0;
    while (i < 15){
      var element = ExerciseList.listExercise[_random.nextInt(ExerciseList.listExercise.length)];
      if (models.contains(element)) continue;
      models.add(element);
      i++;
    }

    return models;
  }

  List<ExerciseModel> getTodayExercise(){
    return getAdvanceExercise();
  }
}
