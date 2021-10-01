import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/pages/chat.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/pages/customer_main.dart';
import 'package:weight_loss_consultant_mobile/pages/customer_register.dart';
import 'package:weight_loss_consultant_mobile/pages/detail_user.dart';
import 'package:weight_loss_consultant_mobile/pages/login.dart';
import 'package:weight_loss_consultant_mobile/pages/initial_page.dart';
import 'package:weight_loss_consultant_mobile/pages/onboarding_2.dart';
import 'package:weight_loss_consultant_mobile/pages/recorver_password.dart';
import 'package:weight_loss_consultant_mobile/pages/recover_password_first.dart';
import 'package:weight_loss_consultant_mobile/pages/trainer_register.dart';
import 'package:weight_loss_consultant_mobile/pages/trainer_register_sucessful.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';


class RouteGenerator{
  static Route<dynamic> generateRoute(RouteSettings settings){
    final args = settings.arguments;
    switch (settings.name){
      case RoutePath.initialPage:
        return MaterialPageRoute(builder: (_){
          return InitialPage();
        });
      case RoutePath.getStartedPage:
        return MaterialPageRoute(builder: (_){
          return Onboarding2();
        });
      case RoutePath.trainerRegisterPage:
        return MaterialPageRoute(builder: (_){
          return TrainerRegister();
        });
      case RoutePath.trainerRegisterSuccessfullyPage :
        if (args is Map<dynamic, dynamic>){
          return MaterialPageRoute(builder: (_){
            return TrainerRegisterSuccessful(data: args,);
          });
        }
        return _errorRoute();
      case RoutePath.loginPage:
        return MaterialPageRoute(builder: (_){
          return Login();
        });
      case RoutePath.recoverPasswordPage:
        return MaterialPageRoute(builder: (_){
          return RecoverPassword();
        });
      case RoutePath.customerHomePage:
        if (args is Map<dynamic, dynamic>){
          return MaterialPageRoute(builder: (_){
            return CustomerMain(data: args,);
          });
        }
        if (args == null){
          return MaterialPageRoute(builder: (_){
            return CustomerMain();
          });
        }
        return _errorRoute();
      case RoutePath.chatPage:
        return MaterialPageRoute(builder: (_){
          return ChatPage();
        });
      case RoutePath.customerDetailPage:
        return MaterialPageRoute(builder: (_){
          return DetailUser();
        });
      case RoutePath.resetPasswordPage:
        return MaterialPageRoute(builder: (_){
          return RecoverPasswordFirst();
        });
      case RoutePath.customerRegisterPage:
        return MaterialPageRoute(builder: (_){
          return CustomerRegister();
        });
      default:
        return _errorRoute();

    }
  }

  static Route<dynamic> _errorRoute(){
    return MaterialPageRoute(builder: (_){
      return Scaffold(
        appBar: GenericAppBar.builder("Something went wrong"),
        body: Center(
          child: Text("Something went wrong"),
        ),
      );
    });
  }
}
