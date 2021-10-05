import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';

class GetStartedPage extends StatelessWidget {
  const GetStartedPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("Register"),
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SizedBox(width : double.infinity),
            Image(
              image: AssetImage("assets/logo/app-logo-with-title.png"),
            ),
            Spacer(),
            Container(
              width: 300,
              margin: EdgeInsets.fromLTRB(10, 0, 0, 16),
              child: Text(
                "Let’s us know who you are",
                style: TextStyle(
                  fontSize: 15,
                  color: AppColors.PRIMARY_WORD_COLOR,
                ),
              ),
            ),
            Container(
              width: 300,
              height: 64,
              margin: EdgeInsets.fromLTRB(0, 0, 0, 20),
              child: RaisedButton(
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20.0),
                    side: BorderSide(color: AppColors.PRIMARY_COLOR)),
                color: Colors.white,
                textColor: AppColors.PRIMARY_COLOR,
                onPressed: () {
                  Navigator.pushNamed(context, RoutePath.trainerRegisterPage);
                },
                child: Text("Trainer",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                    )),
              ),
            ),
            Container(
              width: 300,
              height: 64,
              margin: EdgeInsets.fromLTRB(0, 0, 0, 45),
              child: RaisedButton(
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20.0),
                    side: BorderSide(color: AppColors.PRIMARY_COLOR)),
                color: Colors.white,
                textColor: AppColors.PRIMARY_COLOR,
                onPressed: () {
                  Navigator.pushNamed(context, RoutePath.registerPage);
                },
                child: Text("Customer",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                    )),
              ),
            ),

          ],
        ),
      ),
    );
  }
}
