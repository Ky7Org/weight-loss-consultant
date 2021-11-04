import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/customer_applied_package_page.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/customer_campaign_page.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/customer_create_campaign.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/customer_ongoing_campaign_page.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/customer_overall_report_calendar_view_page.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/customer_overall_report_page.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/customer_package_detail.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/customer_make_report_page.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/customer_report_detail_page.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/customer_report_history_page.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/customer_todo_screen.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/customer_update_campaign_page.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/edit_profile_page.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/upcoming_training_page.dart';
import 'package:weight_loss_consultant_mobile/pages/others/chat_page.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/customer_home_page.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/my_message_page.dart';
import 'package:weight_loss_consultant_mobile/pages/others/ending_phone.dart';
import 'package:weight_loss_consultant_mobile/pages/others/initial_page.dart';
import 'package:weight_loss_consultant_mobile/pages/others/setting_screen_page.dart';
import 'package:weight_loss_consultant_mobile/pages/others/video_call_page.dart';
import 'package:weight_loss_consultant_mobile/pages/register/register_page.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/customer_detail_page.dart';
import 'package:weight_loss_consultant_mobile/pages/authentication/login_page.dart';
import 'package:weight_loss_consultant_mobile/pages/others/get_started_page.dart';
import 'package:weight_loss_consultant_mobile/pages/authentication/recorver_password_page.dart';
import 'package:weight_loss_consultant_mobile/pages/authentication/reset_password_page.dart';
import 'package:weight_loss_consultant_mobile/pages/register/trainer_register_page.dart';
import 'package:weight_loss_consultant_mobile/pages/register/register_sucessful_page.dart';
import 'package:weight_loss_consultant_mobile/pages/trainer/create_packages_page.dart';
import 'package:weight_loss_consultant_mobile/pages/trainer/no_packages_page.dart';
import 'package:weight_loss_consultant_mobile/pages/trainer/trainer_feedback_report_page.dart';
import 'package:weight_loss_consultant_mobile/pages/trainer/trainer_home_page.dart';
import 'package:weight_loss_consultant_mobile/pages/trainer/trainer_on_going_package_detail_page.dart';
import 'package:weight_loss_consultant_mobile/pages/trainer/trainer_package_page.dart';
import 'package:weight_loss_consultant_mobile/pages/trainer/trainer_report_detail_page.dart';
import 'package:weight_loss_consultant_mobile/pages/trainer/trainer_report_history_page.dart';
import 'package:weight_loss_consultant_mobile/pages/trainer/trainer_update_package_page.dart';
import 'package:weight_loss_consultant_mobile/pages/trainer/trainer_view_campaign_detail_page.dart';
import 'package:weight_loss_consultant_mobile/pages/trainer/trainer_available_campaign_page.dart';
import 'package:weight_loss_consultant_mobile/pages/trainer/trainer_view_list_package_page.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';


class RouteGenerator{
  static Route<dynamic> generateRoute(RouteSettings settings){
    final args = settings.arguments;
    switch (settings.name){
      case RoutePath.initialPage:
        return MaterialPageRoute(builder: (_){
          return const InitialPage();
        });
      case RoutePath.getStartedPage:
        return MaterialPageRoute(builder: (_){
          return const GetStartedPage();
        });
      case RoutePath.trainerRegisterPage:
        return MaterialPageRoute(builder: (_){
          return const TrainerRegisterPage();
        });
      case RoutePath.trainerRegisterSuccessfullyPage :
        if (args is Map<dynamic, dynamic>){
          return MaterialPageRoute(builder: (_){
            return RegisterSuccessfulPage(data: args,);
          });
        }
        return _errorRoute();
      case RoutePath.loginPage:
        return MaterialPageRoute(builder: (_){
          return const LoginPage();
        });
      case RoutePath.recoverPasswordPage:
        return MaterialPageRoute(builder: (_){
          return const RecoverPasswordPage();
        });
      case RoutePath.customerHomePage:
          return MaterialPageRoute(builder: (_){
            return const CustomerHomePage();
        });
      case RoutePath.chatPage:
        return MaterialPageRoute(builder: (_){
          return const ChatPage();
        });
      case RoutePath.customerDetailPage:
        return MaterialPageRoute(builder: (_){
          return const CustomerDetailPage();
        });
      case RoutePath.resetPasswordPage:
        if (args is Map<dynamic, dynamic>){
          return MaterialPageRoute(builder: (_){
            return ResetPasswordPage(data: args,);
          });
        }
        return _errorRoute();
      case RoutePath.registerPage:
        return MaterialPageRoute(builder: (_){
          return const RegisterPage();
        });
      case RoutePath.myMessagePage:
        return MaterialPageRoute(builder: (_){
          return const MyMessagesPage();
        });
      case RoutePath.settingPage:
        return MaterialPageRoute(builder: (_){
          return const SettingScreen();
        });
      case RoutePath.customerTodoPage:
        return MaterialPageRoute(builder: (_){
          return const CustomerTodoPage();
        });
      case RoutePath.trainerHomePage:
        return MaterialPageRoute(builder: (_){
          return const TrainerHomePage();
        });
      case RoutePath.upcomingTrainingPage:
        return MaterialPageRoute(builder: (_){
          return const UpcomingTrainingPage();
        });
      case RoutePath.videoCallPage:
        return MaterialPageRoute(builder: (_){
          return const VideoCallPage();
        });
      case RoutePath.endCallPage:
        return MaterialPageRoute(builder: (_){
          return const EndingCallPage();
        });
      case RoutePath.createCampaignPage:
        return MaterialPageRoute(builder: (_){
          return const CreateCampaignPage();
        });
      case RoutePath.noPackagePage:
        return MaterialPageRoute(builder: (_){
          return const NoPackagesPage();
        });
      case RoutePath.createPackagesPage:
        return MaterialPageRoute(builder: (_){
          return const CreatePackagesPage();
        });
      case RoutePath.editProfilePage:
        return MaterialPageRoute(builder: (_){
          return const EditProfilePage();
        });
      case RoutePath.customerCampaignPage:
        return MaterialPageRoute(builder: (_){
          return const CustomerCampaignPage();
        });
      case RoutePath.trainerPackagePage:
        return MaterialPageRoute(builder: (_){
          return const TrainerPackagePage();
        });
      case RoutePath.trainerViewCampaignDetailPage:
        if (args is int){
          return MaterialPageRoute(builder: (_){
            return TrainerViewCampaignDetailPage(campaignID: args);
          });
        }
        return _errorRoute();
      case RoutePath.trainerViewListCampaignPage:
        return MaterialPageRoute(builder: (_){
          return const TrainerAvailableCampaignPage();
        });
      case RoutePath.trainerViewListPackagePage:
        if (args is int){
          return MaterialPageRoute(builder: (_){
            return TrainerViewListPackagePage(campaignId: args,);
          });
        }
        return _errorRoute();
      case RoutePath.customerUpdateCampaignPage:
        if (args is int){
          return MaterialPageRoute(builder: (_){
            return CustomerUpdateCampaignPage(campaignID: args,);
          });
        }
        return _errorRoute();
      case RoutePath.customerAppliedPackagePage:
        if (args is int){
          return MaterialPageRoute(builder: (_){
            return CustomerAppliedPackagePage(campaignId: args,);
          });
        }
        return _errorRoute();
      case RoutePath.customerPackageDetailPage:
        if (args is Map<String, dynamic>){
          return MaterialPageRoute(builder: (_){
            return CustomerPackageDetail(data: args,);
          });
        }
        return _errorRoute();
      case RoutePath.trainerUpdatePackagePage:
        if (args is int){
          return MaterialPageRoute(builder: (_){
            return TrainerUpdatePackagePage(packageId: args,);
          });
        }
        return _errorRoute();
      case RoutePath.customerOverallReportPage:
        return MaterialPageRoute(builder: (_){
          return const CustomerOverallReportPage();
        });
      case RoutePath.customerOverallReportCalendarViewPage:
        return MaterialPageRoute(builder: (_){
          return const CustomerOverallReportCalendarViewPage();
        });
      case RoutePath.customerOngoingCampaignPage:
        if (args is int){
          return MaterialPageRoute(builder: (_){
            return CustomerOnGoingCampaignPage(campaignId: args,);
          });
        }
        return _errorRoute();
      case RoutePath.customerMakeReportPage:
        if (args is int){
          return MaterialPageRoute(builder: (_){
            return CustomerMakeReportPage(packageId: args,);
          });
        }
        return _errorRoute();
      case RoutePath.trainerFeedbackReportPage:
        if (args is int){
          return MaterialPageRoute(builder: (_){
            return TrainerFeedbackReportPage(packageId: args,);
          });
        }
        return _errorRoute();
      case RoutePath.customerReportHistoryPage:
        if (args is int){
          return MaterialPageRoute(builder: (_){
            return CustomerReportHistoryPage(packageId: args,);
          });
        }
        return _errorRoute();
      case RoutePath.customerReportDetailPage:
        print(args.runtimeType);
        if (args is int){
          return MaterialPageRoute(builder: (_){
            return CustomerReportDetailPage(reportId: args,);
          });
        }
        return _errorRoute();
      case RoutePath.trainerOnGoingPackageDetailPage:
        if (args is int){
          return MaterialPageRoute(builder: (_){
            return TrainerOnGoingPackageDetailPage(packageId: args,);
          });
        }
        return _errorRoute();
      case RoutePath.trainerReportHistoryPage:
        if (args is int){
          return MaterialPageRoute(builder: (_){
            return TrainerReportHistoryPage(packageId: args,);
          });
        }
        return _errorRoute();
      case RoutePath.trainerReportDetailPage:
        if (args is int){
          return MaterialPageRoute(builder: (_){
            return TrainerReportDetailPage(reportId: args,);
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
        appBar: GenericAppBar.builder("Something went wrong"),
        body: const Center(
          child: Text("Something went wrong"),
        ),
      );
    });
  }
}
