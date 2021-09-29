import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/pages/customer_register.dart';
import 'package:weight_loss_consultant_mobile/pages/login.dart';
import 'package:weight_loss_consultant_mobile/pages/onboarding_1.dart';
import 'package:weight_loss_consultant_mobile/pages/onboarding_2.dart';
import 'package:weight_loss_consultant_mobile/pages/recorver_password.dart';
import 'package:weight_loss_consultant_mobile/pages/trainer_register.dart';
import 'package:weight_loss_consultant_mobile/pages/trainer_register_sucessful.dart';

void main() {
  runApp(MaterialApp(
    initialRoute: "/",
    routes: {
      "/" : (context) => Onboarding1(),
      "/onboarding2": (context) => Onboarding2(),
      "/trainerRegister": (context) => TrainerRegister(),
      "/customerRegister": (context) => CustomerRegister(),
      "/trainerRegisterSuccessful": (context) => TrainerRegisterSuccessful(),
      "/login": (context) => Login(),
      "/recoverPassword": (context) => RecoverPassword(),
    },
  ));
}


