import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/routings/route_generator.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';

Future<void> main()  async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const MaterialApp(
    initialRoute: RoutePath.initialPage,
    onGenerateRoute: RouteGenerator.generateRoute,
  ));
}


