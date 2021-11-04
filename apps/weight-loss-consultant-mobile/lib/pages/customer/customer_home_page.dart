import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/constants/customer_bottom_navigator_index.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/models/campaign_account_model.dart';
import 'package:weight_loss_consultant_mobile/models/campaign_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/cusomter_bottom_navigator.dart';
import 'package:weight_loss_consultant_mobile/pages/components/customer_sliding_up_panel.dart';
import 'package:weight_loss_consultant_mobile/pages/components/main_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:weight_loss_consultant_mobile/services/customer_service.dart';
import 'package:collection/collection.dart';


class CustomerHomePage extends StatefulWidget {

  const CustomerHomePage({Key? key}) : super(key: key);

  @override
  _CustomerHomePageState createState() => _CustomerHomePageState();
}

class _CustomerHomePageState extends State<CustomerHomePage> {

  AccountModel user = AccountModel(email: "", fullname: "");
  CampaignModel? ongoingCampaign;
  int selectedIndex = 0;
  final PanelController _pc = PanelController();

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
      initAccount().then((value) {
        CustomerService customerService = CustomerService();
        customerService.getCustomerCampaign(user.email ?? "").then((value){
          ongoingCampaign = value.firstWhereOrNull((element) => element.status == 1);
          setState(() {});
        });
      });

    });
  }

  Widget _buildUpcomingTraining(){
    return Column(
      children: [
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
            Navigator.pushNamed(context, RoutePath.upcomingTrainingPage).then((value){
              CustomerService customerService = CustomerService();
              customerService.getCustomerCampaign(user.email ?? "").then((value){
                ongoingCampaign = value.firstWhereOrNull((element) => element.status == 1);
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
      ],
    );
  }

  Widget _buildTopCategory(){
    return Column(
      children: [
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
                Navigator.pushNamed(context, RoutePath.customerTodoPage).then((value){
                  CustomerService customerService = CustomerService();
                  customerService.getCustomerCampaign(user.email ?? "").then((value){
                    ongoingCampaign = value.firstWhereOrNull((element) => element.status == 1);
                    setState(() {});
                  });
                });
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
                Navigator.pushNamed(context, RoutePath.myMessagePage).then((value){
                  CustomerService customerService = CustomerService();
                  customerService.getCustomerCampaign(user.email ?? "").then((value){
                    ongoingCampaign = value.firstWhereOrNull((element) => element.status == 1);
                    setState(() {});
                  });
                });
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
      ],
    );
  }

  Widget _buildCurrentCampaign(){
    if (ongoingCampaign == null) return Container();
    var date = DateFormat("MMMM-dd-yyyy").format(DateTime.fromMillisecondsSinceEpoch(int.parse(ongoingCampaign!.startDate ?? DateTime.now().millisecond.toString()))).toString();
    return Column(
      children: [
        Container(
          margin: const EdgeInsets.fromLTRB(0, 30, 0, 10),
          child: Align(
              alignment: Alignment.topLeft,
              child: Text("Campaign In Progress",
                style: TextStyle(
                  color: AppColors.PRIMARY_WORD_COLOR,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              )
          ),
        ),
        GestureDetector(
          onTap: () {
            Navigator.pushNamed(context, RoutePath.customerOngoingCampaignPage, arguments: ongoingCampaign!.id).then((value){
              CustomerService customerService = CustomerService();
              customerService.getCustomerCampaign(user.email ?? "").then((value){
                ongoingCampaign = value.firstWhereOrNull((element) => element.status == 1);
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
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
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
                    ],
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Row(
                    children: [
                      Text(
                        'Current Weight',
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w900,
                            fontSize: 13),
                      ),
                      const SizedBox(
                        width: 5,
                      ),
                      Text(
                        ongoingCampaign!.currentWeight.toString(),
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w400,
                            fontSize: 13),

                      ),
                    ],
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Row(
                    children: [
                      Text(
                        'Target Weight',
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w900,
                            fontSize: 13),
                      ),
                      const SizedBox(
                        width: 5,
                      ),
                      Text(
                        ongoingCampaign!.targetWeight.toString(),
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w400,
                            fontSize: 13),

                      ),
                    ],
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  RichText(
                      text: TextSpan(
                          children: [
                            TextSpan(
                              text:"Description: ",
                              style: TextStyle(
                                  color: AppColors.PRIMARY_WORD_COLOR,
                                  fontWeight: FontWeight.w900,
                                  fontSize: 13),
                            ),
                            TextSpan(
                              text: ongoingCampaign!.description ?? "",
                              style: TextStyle(
                                  color: AppColors.PRIMARY_WORD_COLOR,
                                  fontWeight: FontWeight.w400,
                                  fontSize: 13),
                            )
                          ]
                      )
                  )

                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  void callbackAfterPop(){
    CustomerService customerService = CustomerService();
    customerService.getCustomerCampaign(user.email ?? "").then((value){
      ongoingCampaign = value.firstWhereOrNull((element) => element.status == 1);
      setState(() {});
    });
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
      //drawer: CustomerDrawer.builder(user.fullname, Image.asset("assets/fake-image/miku-avatar.png"), "Customer"),
      appBar: MainAppBar.builder(user.fullname ?? "", context, image, updateProfileAfterPop),
      body: SlidingUpPanel(
        controller: _pc,
        panel: CategoryPanel(callBackAfterPop: callbackAfterPop),
        minHeight: 0,
        maxHeight: 200,
        body: Padding(
          padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
          child: ListView(
            children: [
              const SizedBox(width: double.infinity,),
              SvgPicture.asset("assets/panel-image/customer-home-panel.svg"),
              SvgPicture.asset("assets/fake-image/fake-chart.svg"),
              //_buildUpcomingTraining(),
              //_buildTopCategory(),
              _buildCurrentCampaign(),
              const SizedBox(height: 250,),
            ],
          ),
        ),
      ),
      bottomNavigationBar: CustomerBottomNavigator(pc: _pc, selectedIndex: CustomerBottomNavigatorIndex.HOME,)
    );
  }
}




