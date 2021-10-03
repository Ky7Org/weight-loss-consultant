import 'package:weight_loss_consultant_mobile_hci_version/models/diet_model.dart';

class DietService{
  Map<String, List<DietModel>> getTodayDiet(){
    //TODO: call API
    Map<String, List<DietModel>> diets = {};
    //initialize breakfast
    List<DietModel> breakfastDiets = List.empty(growable: true);
    breakfastDiets.add(
        DietModel(name: "BANANA",
            unit: "00:30",
            videoPath: "",
            thumbnailPath: "",
            details: "Nice")
    );
    breakfastDiets.add(
        DietModel(name: "BANANA",
            unit: "00:30",
            videoPath: "",
            thumbnailPath: "",
            details: "Nice")
    );
    diets["breakfast"] = breakfastDiets;
    //initialize lunch
    List<DietModel> lunchDiets = List.empty(growable: true);
    lunchDiets.add(
        DietModel(name: "BANANA",
            unit: "00:30",
            videoPath: "",
            thumbnailPath: "",
            details: "Nice")
    );
    lunchDiets.add(
        DietModel(name: "BANANA",
            unit: "00:30",
            videoPath: "",
            thumbnailPath: "",
            details: "Nice")
    );
    diets["lunch"] = lunchDiets;
    //initialize dinner
    List<DietModel> dinnerDiets = List.empty(growable: true);
    dinnerDiets.add(
        DietModel(name: "BANANA",
            unit: "00:30",
            videoPath: "",
            thumbnailPath: "",
            details: "Nice")
    );
    dinnerDiets.add(
        DietModel(name: "BANANA",
            unit: "00:30",
            videoPath: "",
            thumbnailPath: "",
            details: "Nice")
    );
    diets["dinner"] = dinnerDiets;

    return diets;
  }
}
