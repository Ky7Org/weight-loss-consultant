import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/app_color.dart';

class GenericAppBar{
  static PreferredSizeWidget builder(String title) {
    return AppBar(
      title: Text(
        title,
        style: TextStyle(
            fontSize: 16,
            color: AppColor.appPrimaryColor,
            fontWeight: FontWeight.bold),
      ),
      centerTitle: true,
      shadowColor: Colors.grey,
      backgroundColor: Colors.white,
      iconTheme: IconThemeData(
        //color: AppColors.PRIMARY_WORD_COLOR,
      ),
    );
  }
}
