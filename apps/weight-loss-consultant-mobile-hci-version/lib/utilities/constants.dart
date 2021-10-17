import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/app_color.dart';
import 'package:flutter/material.dart';


const kHintTextStyle = TextStyle(
  color: Colors.white54,
  fontFamily: 'OpenSans',
);

const blackLabelStyle = TextStyle(
  color: Colors.black,
  fontWeight: FontWeight.bold,
  fontFamily: 'OpenSans',
  fontSize: 16,
);

const kLabelStyle = TextStyle(
  color: Colors.white,
  fontWeight: FontWeight.bold,
  fontFamily: 'OpenSans',
  fontSize: 16,
);

final kBoxDecorationStyle = BoxDecoration(
  color: Color(0xFF6CA8F1),
  borderRadius: BorderRadius.circular(15.0),
  boxShadow: const [
    BoxShadow(
      color: Colors.black12,
      blurRadius: 6.0,
      offset: Offset(0, 2),
    ),
  ],
);

enum UserMethodChoice{
  exercise,
  diet,
  both
}

enum DailyExerciseIntensity{
  intense,
  medium,
  light,
  rest
}

enum UserAbilityChoice{
  beginner,
  intermediate,
  advanced
}

final Map<String, dynamic> bmiData = {
  "Severely underweight" : {
    "color": Colors.blueGrey,
    "start": 15,
    "end": 16
  },
  "Underweight": {
    "color": Colors.indigo.shade400,
    "start": 16,
    "end": 18
  },
  "Healthy weight": {
    "color": Colors.green,
    "start": 18,
    "end": 25
  },
  "Overweight": {
    "color": Colors.yellowAccent.shade400,
    "start": 25,
    "end": 30
  },
  "Moderately obese": {
    "color": Colors.orange.shade400,
    "start": 30,
    "end": 35
  },
  "Severely obese": {
    "color": Colors.red.shade400,
    "start": 35,
    "end": 40
  },
};
