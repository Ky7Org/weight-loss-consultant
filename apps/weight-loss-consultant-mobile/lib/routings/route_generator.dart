import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/pages/chat_page.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/customer_home_page.dart';
import 'package:weight_loss_consultant_mobile/pages/register/customer_register_page.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/customer_detail_page.dart';
import 'package:weight_loss_consultant_mobile/pages/authentication/login_page.dart';
import 'package:weight_loss_consultant_mobile/pages/initial_page.dart';
import 'package:weight_loss_consultant_mobile/pages/get_started_page.dart';
import 'package:weight_loss_consultant_mobile/pages/authentication/recorver_password_page.dart';
import 'package:weight_loss_consultant_mobile/pages/authentication/reset_password_page.dart';
import 'package:weight_loss_consultant_mobile/pages/register/trainer_register_page.dart';
import 'package:weight_loss_consultant_mobile/pages/register/trainer_register_sucessful_page.dart';
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
          return GetStartedPage();
        });
      case RoutePath.trainerRegisterPage:
        return MaterialPageRoute(builder: (_){
          return TrainerRegisterPage();
        });
      case RoutePath.trainerRegisterSuccessfullyPage :
        if (args is Map<dynamic, dynamic>){
          return MaterialPageRoute(builder: (_){
            return TrainerRegisterSuccessfulPage(data: args,);
          });
        }
        return _errorRoute();
      case RoutePath.loginPage:
        return MaterialPageRoute(builder: (_){
          return LoginPage();
        });
      case RoutePath.recoverPasswordPage:
        return MaterialPageRoute(builder: (_){
          return RecoverPasswordPage();
        });
      case RoutePath.customerHomePage:
        if (args is Map<dynamic, dynamic>){
          return MaterialPageRoute(builder: (_){
            return CustomerHomePage(data: args,);
          });
        }
        if (args == null){
          return MaterialPageRoute(builder: (_){
            return CustomerHomePage();
          });
        }
        return _errorRoute();
      case RoutePath.chatPage:
        return MaterialPageRoute(builder: (_){
          return ChatPage();
        });
      case RoutePath.customerDetailPage:
        return MaterialPageRoute(builder: (_){
          return CustomerDetailPage();
        });
      case RoutePath.resetPasswordPage:
        return MaterialPageRoute(builder: (_){
          return ResetPasswordPage();
        });
      case RoutePath.customerRegisterPage:
        return MaterialPageRoute(builder: (_){
          return CustomerRegisterPage();
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
