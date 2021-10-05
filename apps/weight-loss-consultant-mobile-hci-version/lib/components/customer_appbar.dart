import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/app_color.dart';

class CustomerAppbar {
  static PreferredSizeWidget builder(String title) {
    return AppBar(
      title: Text(
        title,
        style: TextStyle(
            fontSize: 20,
            color: Colors.white,
            fontWeight: FontWeight.bold),
      ),
      centerTitle: false,
      titleSpacing: 0,
      shadowColor: Colors.grey,
      backgroundColor: AppColor.appPrimaryColor,
      iconTheme: IconThemeData(
          color: Colors.white
          ),
    );
  }
}
