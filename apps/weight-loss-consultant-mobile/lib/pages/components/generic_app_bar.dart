import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';

class GenericAppBar{
  static PreferredSizeWidget builder(String title) {
    return AppBar(
      title: Text(
        title,
        style: TextStyle(
            fontSize: 16,
            color: AppColors.PRIMARY_WORD_COLOR,
            fontWeight: FontWeight.bold),
      ),
      centerTitle: true,
      shadowColor: Colors.grey,
      backgroundColor: Colors.white,
      iconTheme: IconThemeData(
        color: AppColors.PRIMARY_WORD_COLOR,
      ),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(
          bottom: Radius.circular(30),
        ),
      ),
    );
  }
}
