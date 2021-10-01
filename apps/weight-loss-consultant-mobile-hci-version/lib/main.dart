import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/login_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/recover_password.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/sign_up_screen.dart';

void main(){
  runApp(MaterialApp(
    initialRoute: "/",
    routes: {
      "/": (context) => RecoverScreen(),
    },
  ));
}
