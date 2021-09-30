import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/constants.dart';
class CustomerDrawer {
  static List<Map> navigation = [
    {
      "text": "Home",
      "icon": Icons.home_outlined,
      "route": "/customerMain"
    },
    {
      "text": "Message",
      "icon": Icons.mail_outline,
      "route": "/chat"
    },
    {
      "text": "My calendar",
      "icon": Icons.calendar_today,
    },
    {
      "text": "My campaign",
      "icon": Icons.sticky_note_2_outlined,
    },
    {
      "text": "My packages",
      "icon": Icons.assignment_outlined,
    },
    {
      "text": "Logout",
      "icon": Icons.logout_outlined,
      "route": "/login"
    },
  ];
  static Drawer builder(String customerName, Image avatar, String customerRole){
    return Drawer(
        child: ListView.builder(
            itemCount: navigation.length + 1,
            itemBuilder: (context, index){
              if (index == 0) {
                return Container(
                  margin: EdgeInsets.all(0.0),
                  padding: EdgeInsets.all(0.0),
                  height: 150,
                  child: DrawerHeader(
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
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      customerName,
                                      style: TextStyle(
                                        color: AppColors.PRIMARY_WORD_COLOR,
                                        fontSize: 24,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    Text(customerRole),
                                  ],
                                ),
                              )
                            ],
                          )
                        ],
                      )
                  ),
                );
              }
              return ListTile(
                leading: Icon(
                  navigation[index-1]["icon"],
                  size: 30,
                  color: AppColors.PRIMARY_WORD_COLOR,
                ),
                horizontalTitleGap: 0,
                title: Text(
                  navigation[index-1]["text"],
                  style: TextStyle(
                      color: AppColors.PRIMARY_WORD_COLOR,
                      fontSize: 20
                  ),
                ),
                onTap: () {
                  if (navigation[index-1]["text"] == "Logout"){
                    Navigator.pushNamedAndRemoveUntil(context, "/", (route) => false);
                  } else {
                    Navigator.pushNamed(context, navigation[index-1]["route"]);
                  }
                },
                hoverColor: AppColors.PRIMARY_COLOR,
              );


            }
        )
    );
  }
}
