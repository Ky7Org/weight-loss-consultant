import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';

class MainAppBar{
  static PreferredSizeWidget builder(String fullname, BuildContext context) {
    return AppBar(
      toolbarHeight: 80,
      title: Text("Hi, $fullname",
        style: TextStyle(
            fontSize: 24,
            color: AppColors.PRIMARY_WORD_COLOR,
            fontStyle: FontStyle.italic,
            fontWeight: FontWeight.bold),
      ),
      elevation: 0,
      backgroundColor: Colors.white,
      iconTheme: IconThemeData(
        color: AppColors.PRIMARY_WORD_COLOR,
      ),
      actions: <Widget>[
        Container(
          margin: EdgeInsets.only(right: 20),
          child: IconButton(
            padding: new EdgeInsets.all(0.0),
            icon: Image.asset("assets/Miku.png", width: 50, height: 50,),
            onPressed: () {
              Navigator.pushNamed(context, RoutePath.customerDetailPage);
            },
          ),
        )
      ],
    );
  }
}
