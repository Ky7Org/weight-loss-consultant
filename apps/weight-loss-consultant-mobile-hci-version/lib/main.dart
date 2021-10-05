import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_generator.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';

void main(){
  runApp(const MaterialApp(
    initialRoute: RoutePath.loginScreen,
    onGenerateRoute: RouteGenerator.generateRoute,
  ));
}
