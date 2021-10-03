import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/customer_main_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/login_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/recover_password.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/report_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/reset_password.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/sign_up_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/today_diet_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/today_exercise_screen.dart';

class RouteGenerator{
  static Route<dynamic> generateRoute(RouteSettings settings){
    final args = settings.arguments;
    switch (settings.name){
      case RoutePath.loginScreen:
        return MaterialPageRoute(builder: (_){
          return LoginScreen();
        });
      case RoutePath.recoverPasswordScreen:
        return MaterialPageRoute(builder: (_){
          return RecoverScreen();
        });
      case RoutePath.signUpScreen:
        return MaterialPageRoute(builder: (_){
          return SignUpScreen();
        });
      case RoutePath.resetPasswordScreen:
        if (args is String){
          return MaterialPageRoute(builder: (_){
            return ResetPasswordScreen(email: args,);
          });
        }
        return _errorRoute();
      case RoutePath.customerMainScreen:
        return MaterialPageRoute(builder: (_){
          return CustomerMainScreen();
        });
      case RoutePath.todayExerciseScreen:
        return MaterialPageRoute(builder: (_){
          return TodayExerciseScreen();
        });
      case RoutePath.todayDietScreen:
        return MaterialPageRoute(builder: (_){
          return TodayDietScreen();
        });
      case RoutePath.customerReportScreen:
        return MaterialPageRoute(builder: (_){
          return ReportScreen();
        });
      default:
       return _errorRoute();
    }
  }

  static Route<dynamic> _errorRoute(){
    return MaterialPageRoute(builder: (_){
      return Scaffold(
        body: Center(
          child: Text("Something went wrong"),
        ),
      );
    });
  }
}
