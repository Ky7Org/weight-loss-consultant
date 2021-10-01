import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';

class InitialPage extends StatelessWidget {
  const InitialPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SvgPicture.asset('assets/onboarding-image.svg'),
            Container(
              margin: EdgeInsets.fromLTRB(50, 10, 50, 10),
              child: Text(
                "Weight Loss Consultan",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 36,
                  fontWeight: FontWeight.bold,
                  color: AppColors.PRIMARY_WORD_COLOR,
                ),
              ),
            ),
            Container(
              margin: EdgeInsets.fromLTRB(100, 5, 100, 20),
              child: Text(
                "Make your trainer appointment as easy as post a campaign from your dream.",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 15,
                  color: AppColors.PRIMARY_WORD_COLOR,
                ),
              ),
            ),
            Spacer(),
            Container(
              width: 300,
              height: 64,
              margin: EdgeInsets.fromLTRB(0, 0, 0, 20),
              child: RaisedButton(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.0),
                ),
                textColor: Colors.white,
                color: AppColors.PRIMARY_COLOR,
                onPressed: () {
                  Navigator.pushNamed(context, RoutePath.getStartedPage);
                },
                child: Text(
                  "Get started",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
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
                  Navigator.pushNamed(context, RoutePath.loginPage);
                },
                child: Text("Sign in",
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
