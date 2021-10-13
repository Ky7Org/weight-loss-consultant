import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/app_color.dart';

class CustomerAppbar {
  static PreferredSizeWidget builder(String title) {
    return AppBar(
      title: Text(
        title,
        style: TextStyle(
            fontSize: 17,
            color: Colors.white,
            fontWeight: FontWeight.bold),
      ),
      centerTitle: true,
      titleSpacing: 0,
      shadowColor: Colors.transparent,
      backgroundColor: Color(0xFF01579B),
      iconTheme: IconThemeData(
          color: Colors.white
          ),
    );
  }
}
