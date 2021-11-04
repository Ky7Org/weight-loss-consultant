import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/constants/customer_bottom_navigator_index.dart';
import 'package:weight_loss_consultant_mobile/main.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/models/package_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/cusomter_bottom_navigator.dart';
import 'package:weight_loss_consultant_mobile/pages/components/main_app_bar.dart';
import 'package:weight_loss_consultant_mobile/pages/components/trainer_sliding_up_panel.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:weight_loss_consultant_mobile/services/trainer_service.dart';
import 'package:collection/collection.dart';

class TrainerHomePage extends StatefulWidget {
  const TrainerHomePage({Key? key}) : super(key: key);

  @override
  _TrainerHomePageState createState() => _TrainerHomePageState();
}

class _TrainerHomePageState extends State<TrainerHomePage> {
  int selectedIndex = 0;
  final PanelController _pc = PanelController();
  List<PackageModel>? onGoingPackage;

  AccountModel user = AccountModel(email: "", fullname: "");

  Future<void> initAccount() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? userJSON = prefs.getString('ACCOUNT');
    if (userJSON is String) {
      Map<String, dynamic> userMap = jsonDecode(userJSON);
      user = AccountModel.fromJson(userMap);
    }
  }

  Future<void> saveAccount() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString("ACCOUNT", jsonEncode(user.toJson()));
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_) {
      initAccount().then((value) {
        TrainerService trainerService = TrainerService();
        trainerService.getTrainerPackage(user).then((value) {
          onGoingPackage =
              value.where((element) => element.status == 2).toList();
          setState(() {});
        });
      });
    });
  }

  Widget _phoneCard(String date, String nameTraining, String nameCustomer) {
    return GestureDetector(
      onTap: () {
        Navigator.pushNamed(context, RoutePath.upcomingTrainingPage).then((value){
          TrainerService trainerService = TrainerService();
          trainerService.getTrainerPackage(user).then((value) {
            onGoingPackage =
                value.where((element) => element.status == 2).toList();
            setState(() {});
          });
        });
      },
      child: Card(
        elevation: 5,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15.0),
        ),
        child: Container(
          padding: const EdgeInsets.all(20),
          child: Row(
            children: [
              Expanded(
                flex: 1,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(
                          vertical: 5, horizontal: 10),
                      margin: const EdgeInsets.only(bottom: 10),
                      child: Text(
                        date,
                        style: TextStyle(
                            color: HexColor("#FF3939"),
                            fontSize: 13,
                            fontWeight: FontWeight.w900),
                      ),
                      decoration: BoxDecoration(
                          color: HexColor("#F0F3F6"),
                          borderRadius:
                              const BorderRadius.all(Radius.circular(5))),
                    ),
                    Container(
                        margin: const EdgeInsets.only(bottom: 10),
                        child: Text(
                          nameTraining,
                          style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: AppColors.PRIMARY_WORD_COLOR,
                              fontSize: 20),
                        )),
                    Text(
                      nameCustomer,
                      style: TextStyle(
                          fontSize: 17,
                          fontWeight: FontWeight.w800,
                          color: HexColor("#B6C5D1")),
                    )
                  ],
                ),
              ),
              IconButton(
                iconSize: 48,
                onPressed: () {},
                icon: SvgPicture.asset("assets/icon/call-icon.svg"),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _category(String title, String icon) {
    return GestureDetector(
      onTap: () {
        if (title == "Message") {
          Navigator.pushNamed(context, RoutePath.myMessagePage).then((value){
            TrainerService trainerService = TrainerService();
            trainerService.getTrainerPackage(user).then((value) {
              onGoingPackage =
                  value.where((element) => element.status == 2).toList();
              setState(() {});
            });
          });
        }
      },
      child: SizedBox(
        height: 118,
        width: 105,
        child: Card(
          elevation: 15,
          child: Container(
            padding: const EdgeInsets.all(15),
            child: Column(
              children: [
                SvgPicture.asset("assets/panel-image/category/$icon"),
                Expanded(
                  flex: 1,
                  child: Center(
                      child: Text(
                    title,
                    style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                        color: AppColors.PRIMARY_WORD_COLOR),
                  )),
                ),
              ],
            ),
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20.0),
          ),
        ),
      ),
    );
  }

  List<Widget> _buildCurrentCampaignList(){
    List<Widget> widgets = [];
    if (onGoingPackage == null) return widgets;
    for (PackageModel packageModel in onGoingPackage!){
      Widget widget = _buildCurrentCampaign(packageModel);
      widgets.add(widget);
    }
    return widgets;
  }

  Widget _buildCurrentCampaign(PackageModel model) {
    return GestureDetector(
      onTap: () {
        Navigator.pushNamed(context, RoutePath.trainerOnGoingPackageDetailPage,
            arguments: model.id as int).then((value){
          TrainerService trainerService = TrainerService();
          trainerService.getTrainerPackage(user).then((value) {
            onGoingPackage =
                value.where((element) => element.status == 2).toList();
            setState(() {});
          });
        });
      },
      child: Card(
        elevation: 5,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15.0),
        ),
        child: Container(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Text(
                    model.name ?? "",
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w900,
                        fontSize: 19),
                  ),
                ],
              ),
              const SizedBox(
                height: 5,
              ),
              RichText(
                text: TextSpan(children: [
                  TextSpan(
                    text: 'Exercise Plan: ',
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w900,
                        fontSize: 15),
                  ),
                  TextSpan(
                    text: model.exercisePlan ?? "",
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w400,
                        fontSize: 15),
                  )
                ]),
              ),
              const SizedBox(
                height: 5,
              ),
              RichText(
                text: TextSpan(children: [
                  TextSpan(
                    text: 'Diet Plan: ',
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w900,
                        fontSize: 15),
                  ),
                  TextSpan(
                    text: model.dietPlan ?? "",
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w400,
                        fontSize: 15),
                  )
                ]),
              ),
              const SizedBox(
                height: 5,
              ),
              RichText(
                text: TextSpan(children: [
                  TextSpan(
                    text: "Session in weeks: ",
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w900,
                        fontSize: 15),
                  ),
                  TextSpan(
                    text:
                        "${model.spendTimeToTraining.toString()} day(s)",
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w400,
                        fontSize: 15),
                  )
                ]),
              ),
              const SizedBox(
                height: 5,
              ),
              RichText(
                text: TextSpan(children: [
                  TextSpan(
                    text: "Session length: ",
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w900,
                        fontSize: 15),
                  ),
                  TextSpan(
                    text: "45 minutes",
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w400,
                        fontSize: 15),
                  )
                ]),
              ),
              const SizedBox(
                height: 5,
              ),
              Row(
                children: [
                  Text(
                    "Price: ",
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w900,
                        fontSize: 15),
                  ),
                  Text(
                    model.price.toString(),
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w400,
                        fontSize: 15),
                  ),
                  const Icon(
                    Icons.attach_money,
                    color: Color(0xFFFF3939),
                    size: 17,
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  void updateProfileAfterPop() {
    initAccount().then((value) {
      setState(() {

      });
    });
  }

  @override
  Widget build(BuildContext context) {
    Image image;
    if (user.profileImage == null){
      image = Image.asset("assets/fake-image/miku-avatar.png", width: 50, height: 50,);
    } else {
      image = Image.network(
        user.profileImage as String,
        height: 50,
        width: 50,
      );
    }
    return Scaffold(
        backgroundColor: Colors.white,
        appBar: MainAppBar.builder(user.fullname ?? "", context, image, updateProfileAfterPop),
        body: SlidingUpPanel(
          controller: _pc,
          panel: TrainerCategoryPanel(),
          minHeight: 0,
          maxHeight: 200,
          body: Padding(
            padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
            child: ListView(
              children: [
                const SizedBox(
                  width: double.infinity,
                ),
                SvgPicture.asset("assets/panel-image/customer-home-panel.svg"),
                /*Container(
                  margin: const EdgeInsets.fromLTRB(0, 30, 0, 10),
                  child: Align(
                      alignment: Alignment.topLeft,
                      child: Text(
                        "Upcoming Training",
                        style: TextStyle(
                          color: AppColors.PRIMARY_WORD_COLOR,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      )),
                ),
                _phoneCard(
                    "17:00 Nov 30,2021", "Cardio Training", "Mr Duy Nghiem"),
                _phoneCard("17:00 Nov 30,2021", "Cardio Training", "Mr Son"),
                _phoneCard("17:00 Nov 30,2021", "Cardio Training", "Mrs Thy"),*/
                Container(
                  margin: const EdgeInsets.fromLTRB(0, 30, 0, 10),
                  child: Align(
                      alignment: Alignment.topLeft,
                      child: Text(
                        "In Progress Campaign",
                        style: TextStyle(
                          color: AppColors.PRIMARY_WORD_COLOR,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      )),
                ),
                ..._buildCurrentCampaignList(),
                const SizedBox(
                  height: 250,
                ),
              ],
            ),
          ),
        ),
        bottomNavigationBar: CustomerBottomNavigator(
          pc: _pc,
          selectedIndex: CustomerBottomNavigatorIndex.HOME,
        ));
  }
}
