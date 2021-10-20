import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/customer_add_custom_activity_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/customer_add_custom_diet_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/customer_add_diet_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/customer_add_workout_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/customer_calendar_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/customer_main_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/customer_today_done_diet_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/customer_today_done_exercise_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/customer_todo_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/login_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/onboarding/your_ability_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/onboarding/your_daily_diet_goal_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/onboarding/your_goal_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/onboarding/your_information_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/onboarding/your_method_screen.dart';
import 'package:weight_loss_consultant_mobile_hci_version/screens/onboarding/your_workout_routine_screen.dart';
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
          return const RecoverScreen();
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
          return const CustomerMainScreen();
        });
      case RoutePath.todayExerciseScreen:
        return MaterialPageRoute(builder: (_){
          return const TodayExerciseScreen();
        });
      case RoutePath.todayDietScreen:
        return MaterialPageRoute(builder: (_){
          return const TodayDietScreen();
        });
      case RoutePath.customerReportScreen:
        return MaterialPageRoute(builder: (_){
          return const ReportScreen();
        });
      case RoutePath.yourInformationScreen:
        return MaterialPageRoute(builder: (_){
          return const YourInformationScreen();
        });
      case RoutePath.yourGoalScreen:
        return MaterialPageRoute(builder: (_){
          return const YourGoalScreen();
        });
      case RoutePath.yourMethodScreen:
        return MaterialPageRoute(builder: (_){
          return const YourMethodScreen();
        });
      case RoutePath.customerCalendar:
        return MaterialPageRoute(builder: (_){
          return const CustomerCalendarScreen();
        });
      case RoutePath.customerTodoPage:
        if (args is DateTime){
          return MaterialPageRoute(builder: (_){
            return CustomerTodoPage(date: args,);
          });
        }
        return _errorRoute();
      case RoutePath.yourAbilityPage:
        return MaterialPageRoute(builder: (_){
          return const YourAbilityScreen();
        });
      case RoutePath.yourDailyDietGoalScreen:
        return MaterialPageRoute(builder: (_){
          return const YourDailyDietGoalScreen();
        });
      case RoutePath.yourWorkoutRoutineScreen:
        return MaterialPageRoute(builder: (_){
          return const YourWorkoutRoutineScreen();
        });
      case RoutePath.customerAddWorkoutScreen:
        return MaterialPageRoute(builder: (_){
          return const CustomerAddWorkoutScreen();
        });
      case RoutePath.customerAddDietScreen:
        return MaterialPageRoute(builder: (_){
          return const CustomerAddDietScreen();
        });
      case RoutePath.customerAddCustomActivity:
        return MaterialPageRoute(builder: (_){
          return const CustomerAddCustomActivityScreen();
        });
      case RoutePath.customerAddCustomFood:
        return MaterialPageRoute(builder: (_){
          return const CustomerAddCustomDietScreen();
        });
      case RoutePath.customerTodayDoneExerciseScreen:
        return MaterialPageRoute(builder: (_){
          return const CustomerTodayDoneExercise();
        });
      case RoutePath.customerTodayDoneDietScreen:
        return MaterialPageRoute(builder: (_){
          return const CustomerTodayDoneDietScreen();
        });
      default:
       return _errorRoute();
    }
  }

  static Route<dynamic> _errorRoute(){
    return MaterialPageRoute(builder: (_){
      return const Scaffold(
        body: Center(
          child: Text("Something went wrong"),
        ),
      );
    });
  }
}
