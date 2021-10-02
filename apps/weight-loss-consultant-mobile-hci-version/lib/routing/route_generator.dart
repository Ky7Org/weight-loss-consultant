import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/login_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/recover_password.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/reset_password.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/sign_up_screen.dart';

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
