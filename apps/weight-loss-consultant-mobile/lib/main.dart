import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:weight_loss_consultant_mobile/routings/route_generator.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:weight_loss_consultant_mobile/services/local_notification_service.dart';

//Receive message when app is in background solution for on message
Future<void> backgroundHandler(RemoteMessage message) async {
  print(message.notification!.title);
  print(message.notification!.body);
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);
  await Firebase.initializeApp();
  FirebaseMessaging.onBackgroundMessage(backgroundHandler);
  runApp(const App());
}

class App extends StatefulWidget {
  const App({Key? key}) : super(key: key);

  @override
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  /// The future is part of the state of our widget. We should not call `initializeApp`
  /// directly inside [build].
  final Future<FirebaseApp> _initialization = Firebase.initializeApp();
  final _navKey = GlobalKey<NavigatorState>();


  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      // Initialize FlutterFire:
      future: _initialization,
      builder: (context, snapshot) {
        LocalNotificationService.initialize(_navKey);

        ///gives you the message on which user taps
        ///and it opened the app from terminated state


        FirebaseMessaging.instance.getInitialMessage().then((message) {
          if (message != null) {
            final typeOfMessage = message.data["type"];
            if (typeOfMessage == 'Apply Package') {
              final packageID = message.data["packageID"];
              final campaignID = message.data["campaignID"];
              Map<String, dynamic> mapData = {};
              mapData["packageID"] = int.parse(packageID);
              mapData["campaignID"] = int.parse(campaignID);
              _navKey.currentState!.pushNamed(RoutePath.customerPackageDetailPage,
                  arguments: mapData);
            } else if (typeOfMessage == 'Apply Campaign') {
              final campaignID = message.data['campaignID'];
              _navKey.currentState!.pushNamed(
                  RoutePath.trainerViewCampaignDetailPage,
                  arguments: int.parse(campaignID));
            }
          }
        });
        //Foreground message
        FirebaseMessaging.onMessage.listen((message) {
          LocalNotificationService.display(message);
        });

        //When the app is in background but opened and user taps on message
        FirebaseMessaging.onMessageOpenedApp.listen((message) {
          final typeOfMessage = message.data["type"];
          if (typeOfMessage == 'Apply Package') {
            final packageID = message.data["packageID"];
            final campaignID = message.data["campaignID"];
            Map<String, dynamic> mapData = {};
            mapData["packageID"] = packageID;
            mapData["campaignID"] = campaignID;
            _navKey.currentState!.pushNamed(RoutePath.customerPackageDetailPage,
                arguments: mapData);
          } else if (typeOfMessage == 'Apply Campaign') {
            final campaignID = message.data['campaignID'];
            _navKey.currentState!.pushNamed(
                RoutePath.trainerViewCampaignDetailPage,
                arguments: int.parse(campaignID));
          }
        });

        // Check for errors
        if (snapshot.hasError) {
          return const Text('Something went wrong!');
        }

        // Once complete, show your application
        if (snapshot.connectionState == ConnectionState.done) {
          return MaterialApp(
            initialRoute: RoutePath.initialPage,
            onGenerateRoute: RouteGenerator.generateRoute,
            navigatorKey: _navKey,
          );
        }

        // Otherwise, show something whilst waiting for initialization to complete
        return const CircularProgressIndicator();
      },
    );
  }
}
