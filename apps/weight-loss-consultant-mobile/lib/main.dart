import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/routings/route_generator.dart';

void main() {
  runApp(const MaterialApp(
    initialRoute: "/",
    onGenerateRoute: RouteGenerator.generateRoute,

  ));
}


