import 'dart:math';

import 'package:weight_loss_consultant_mobile_hci_version/example_data/food_data.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/diet_model.dart';

class DietService{
  Map<String, List<DietModel>> _getBeginnerDiets(){
    final _random = Random();

    Map<String, List<DietModel>> diets = {};
    //initialize breakfast
    List<DietModel> breakfastDiets = List.empty(growable: true);
    int i = 0;
    while (i < 3){
      var element = FoodList.listFood[_random.nextInt(FoodList.listFood.length)];
      if (breakfastDiets.contains(element)) continue;
      breakfastDiets.add(element);
      i++;
    }
    diets["BREAKFAST"] = breakfastDiets;
    //initialize lunch
    List<DietModel> lunchDiets = List.empty(growable: true);
    i = 0;
    while (i < 5){
      var element = FoodList.listFood[_random.nextInt(FoodList.listFood.length)];
      if (lunchDiets.contains(element)) continue;
      lunchDiets.add(element);
      i++;
    }
    diets["LUNCH"] = lunchDiets;
    //initialize dinner
    List<DietModel> dinnerDiets = List.empty(growable: true);
    i = 0;
    while (i < 5){
      var element = FoodList.listFood[_random.nextInt(FoodList.listFood.length)];
      if (dinnerDiets.contains(element)) continue;
      dinnerDiets.add(element);
      i++;
    }
    diets["DINNER"] = dinnerDiets;
    return diets;
  }

  Map<String, List<DietModel>> getTodayDiet(int level){
    //TODO: call API

    return _getBeginnerDiets();
  }
}
