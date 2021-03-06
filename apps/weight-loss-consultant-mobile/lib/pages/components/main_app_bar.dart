import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';

class MainAppBar{
  static PreferredSizeWidget builder(String fullname, BuildContext context, Image image, Function callback) {
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
          margin: const EdgeInsets.only(right: 20),
          child: IconButton(
            padding: const EdgeInsets.all(0.0),
            icon: CircleAvatar(
              radius: 30.0,
              backgroundImage: image.image,
              backgroundColor: Colors.transparent,
            ),//Image.asset("assets/fake-image/miku-avatar.png", width: 50, height: 50,),
            onPressed: () {
              Navigator.pushNamed(context, RoutePath.customerDetailPage).then((value){
                callback.call();
              });
            },
          ),
        )
      ],
    );
  }
}
