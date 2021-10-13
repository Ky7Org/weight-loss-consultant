import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/app_color.dart';

class CustomerDrawer {
  static List<Map> navigation = [
    {
      "text": "Training plans",
      "icon": Icons.lock_clock,
      "route": RoutePath.customerMainScreen,
    },
    {
      "text": "Report",
      "icon": Icons.bar_chart,
      "route": RoutePath.customerReportScreen,
    },
    {
      "text": "Calendar",
      "icon": Icons.calendar_today,
      "route": RoutePath.customerCalendar,
    },
    {
      "text": "Settings",
      "icon": Icons.settings,
    },
    {
      "text": "Logout",
      "icon": Icons.logout_outlined,
      "route": RoutePath.loginScreen,
    },
  ];

  static Widget _buildHeader(String customerName, Image avatar){
    return Container(
      margin: const EdgeInsets.all(0.0),
      padding: const EdgeInsets.all(0.0),
      height: 150,
      child: DrawerHeader(
        decoration: BoxDecoration(
          color: Color(0xFF01579B),
        ),
        child: Container(
          margin: EdgeInsets.only(top: 18),
          child: Column(
            children: [
              Row(
                children: [
                  SizedBox(
                    width: 100,
                    height: 100,
                    child: IconButton(
                      icon: avatar,
                      onPressed: () {},
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(left: 10),
                    width: 150,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          customerName,
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  )
                ],
              )
            ],
            ),
        )
      ),
    );
  }

  static Widget builder (BuildContext context, String customerName, Image avatar){
    return Drawer(
        child: MediaQuery.removePadding(
          context: context,
          removeTop: true,
          child: ListView.builder(
            itemCount: navigation.length + 1,
            itemBuilder: (context, index){
              if (index == 0) {
                return _buildHeader(customerName, avatar);
              }
              return ListTile(
                leading: Icon(
                  navigation[index-1]["icon"],
                  size: 30,
                  //color: AppColors.PRIMARY_WORD_COLOR,
                ),
                horizontalTitleGap: 0,
                title: Text(
                  navigation[index-1]["text"],
                  style: TextStyle(
                      //color: AppColors.PRIMARY_WORD_COLOR,
                      fontSize: 20
                  ),
                ),
                onTap: () async {
                  if (navigation[index-1]["text"] == "Logout"){
                    SharedPreferences prefs = await SharedPreferences.getInstance();
                    prefs.clear();
                    Navigator.pushNamedAndRemoveUntil(context, RoutePath.loginScreen, (route) => false);
                  } else {
                    Navigator.pushNamed(context, navigation[index-1]["route"]);
                  }
                },
              );
            }
          ),
        )
    );
  }
}
