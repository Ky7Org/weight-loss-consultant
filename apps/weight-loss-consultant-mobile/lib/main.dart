import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/routings/route_generator.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';

void main() {
  runApp(const MaterialApp(
    initialRoute: RoutePath.initialPage,
    onGenerateRoute: RouteGenerator.generateRoute,
  ));
}


