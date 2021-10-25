import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/constants/customer_bottom_navigator_index.dart';
import 'package:weight_loss_consultant_mobile/constants/enums.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/cusomter_bottom_navigator.dart';
import 'package:weight_loss_consultant_mobile/pages/components/customer_sliding_up_panel.dart';
import 'package:weight_loss_consultant_mobile/pages/components/main_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';

class CustomerHomePage extends StatefulWidget {

  const CustomerHomePage({Key? key}) : super(key: key);

  @override
  _CustomerHomePageState createState() => _CustomerHomePageState();
}

class _CustomerHomePageState extends State<CustomerHomePage> {

  AccountModel user = AccountModel(email: "", fullname: "");

  Future<void> initAccount() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? userJSON = prefs.getString('ACCOUNT');
    if (userJSON is String){
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
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount();
      setState(() {});
    });
  }

  int selectedIndex = 0;
  final PanelController _pc = PanelController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      //drawer: CustomerDrawer.builder(user.fullname, Image.asset("assets/fake-image/miku-avatar.png"), "Customer"),
      appBar: MainAppBar.builder(user.fullname ?? "", context),
      body: SlidingUpPanel(
        controller: _pc,
        panel: CategoryPanel(),
        minHeight: 0,
        maxHeight: 400,
        body: Padding(
          padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
          child: ListView(
            children: [
              const SizedBox(width: double.infinity,),
              SvgPicture.asset("assets/panel-image/customer-home-panel.svg"),
              SvgPicture.asset("assets/fake-image/fake-chart.svg"),
              Container(
                margin: const EdgeInsets.fromLTRB(0, 30, 0, 10),
                child: Align(
                    alignment: Alignment.topLeft,
                    child: Text("Upcoming Training",
                      style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    )
                ),
              ),
              GestureDetector(
                onTap: (){
                  Navigator.pushNamed(context, RoutePath.upcomingTrainingPage);
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
                                padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
                                margin: const EdgeInsets.only(bottom: 10),
                                child: Text(
                                  "16:00 Nov 30, 2021",
                                  style: TextStyle(
                                      color: HexColor("#6B48FF"),
                                      fontSize: 13,
                                      fontWeight: FontWeight.w900
                                  ),
                                ),
                                decoration: BoxDecoration(
                                    color: HexColor("#F0F3F6"),
                                    borderRadius: const BorderRadius.all(Radius.circular(5))
                                ),
                              ),
                              Container(
                                  margin: const EdgeInsets.only(bottom: 10),
                                  child: Text(
                                    "Cardio Training",
                                    style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        color: AppColors.PRIMARY_WORD_COLOR,
                                        fontSize: 20
                                    ),
                                  )),
                              Text("Dr. Bang Ngo", style: TextStyle(
                                  fontSize: 17,
                                  fontWeight: FontWeight.w800,
                                  color: HexColor("#B6C5D1")
                              ),)
                            ],
                          ),
                        ),
                        IconButton(
                          iconSize: 48,
                          onPressed: (){},
                          icon: SvgPicture.asset("assets/icon/call-icon.svg"),
                        )
                      ],
                    ),
                  ),
                ),
              ),
              Container(
                margin: const EdgeInsets.fromLTRB(0, 30, 0, 10),
                child: Align(
                    alignment: Alignment.topLeft,
                    child: Text("Top category",
                      style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    )
                ),
              ),
              Wrap(
                spacing: 10,
                children: [
                  GestureDetector(
                    onTap: (){
                      Navigator.pushNamed(context, RoutePath.customerTodoPage);
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
                              SvgPicture.asset("assets/panel-image/category/todo-icon.svg"),
                              Expanded(
                                flex: 1,
                                child: Center(
                                    child: Text(
                                      "To do",
                                      style: TextStyle(
                                          fontSize: 13,
                                          fontWeight: FontWeight.bold,
                                          color: AppColors.PRIMARY_WORD_COLOR
                                      ),
                                    )
                                ),
                              ),
                            ],
                          ),
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20.0),
                        ),
                      ),
                    ),
                  ),
                  GestureDetector(
                    onTap: (){
                      Navigator.pushNamed(context, RoutePath.myMessagePage);
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
                              SvgPicture.asset("assets/panel-image/category/message-icon.svg"),
                              Expanded(
                                flex: 1,
                                child: Center(
                                    child: Text(
                                      "Message",
                                      style: TextStyle(
                                          fontSize: 13,
                                          fontWeight: FontWeight.bold,
                                          color: AppColors.PRIMARY_WORD_COLOR
                                      ),
                                    )
                                ),
                              ),
                            ],
                          ),
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20.0),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 118,
                    width: 105,
                    child: Card(
                      elevation: 15,
                      child: Container(
                        padding: const EdgeInsets.all(15),
                        child: Column(
                          children: [
                            SvgPicture.asset("assets/panel-image/category/campaign-icon.svg"),
                            Expanded(
                              flex: 1,
                              child: Center(
                                  child: Text(
                                    "Campaign",
                                    style: TextStyle(
                                        fontSize: 13,
                                        fontWeight: FontWeight.bold,
                                        color: AppColors.PRIMARY_WORD_COLOR
                                    ),
                                  )
                              ),
                            ),
                          ],
                        ),
                      ),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20.0),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 250,),
            ],
          ),
        ),
      ),
      bottomNavigationBar: CustomerBottomNavigator(pc: _pc, selectedIndex: CustomerBottomNavigatorIndex.HOME,)
    );
  }
}




