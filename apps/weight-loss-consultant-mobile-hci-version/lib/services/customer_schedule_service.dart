import 'package:weight_loss_consultant_mobile_hci_version/models/customer_schedule_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/daily_diet_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/daily_exercise_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/services/diet_service.dart';
import 'package:weight_loss_consultant_mobile_hci_version/services/exercise_service.dart';

class CustomerScheduleService{
  CustomerScheduleModel generateDefaultSchedule(DateTime beginDate, DateTime endDate){
    beginDate = DateTime(beginDate.year, beginDate.month, beginDate.day);
    endDate = DateTime(endDate.year, endDate.month, endDate.day);
    CustomerScheduleModel model = CustomerScheduleModel();
    ExerciseService exerciseService = ExerciseService();
    DietService dietService = DietService();
    for(DateTime dateTime = beginDate; dateTime.compareTo(endDate) < 0 ; dateTime = dateTime.add(const Duration(days: 1)))
    {
      DailyExerciseModel dailyExerciseModel = DailyExerciseModel();
      DailyDietModel dailyDietModel = DailyDietModel();
      switch (dateTime.weekday){
        case DateTime.monday:
        case DateTime.friday:
          dailyExerciseModel.exerciseList = exerciseService.getTodayExercise(1);
          dailyDietModel.dietMap = dietService.getTodayDiet(1);
          break;
        case DateTime.wednesday:
          dailyExerciseModel.exerciseList = exerciseService.getTodayExercise(3);
          dailyDietModel.dietMap = dietService.getTodayDiet(3);
          break;
        case DateTime.tuesday:
        case DateTime.thursday:
        case DateTime.saturday:
          dailyExerciseModel.exerciseList = exerciseService.getTodayExercise(2);
          dailyDietModel.dietMap = dietService.getTodayDiet(2);
          break;
        case DateTime.sunday:
          dailyExerciseModel.exerciseList = List.empty(growable: true);
          dailyDietModel.dietMap = dietService.getTodayDiet(1);
          break;
      }
      model.add(dateTime, dailyExerciseModel, dailyDietModel);
    }
    return model;
  }


}
