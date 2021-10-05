import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';

class RegisterSuccessfulPage extends StatefulWidget {
  Map<dynamic, dynamic> data;

  RegisterSuccessfulPage({Key? key, this.data = const {"email": ""}})
      : super(key: key);

  @override
  _RegisterSuccessfulPageState createState() =>
      _RegisterSuccessfulPageState();
}

class _RegisterSuccessfulPageState extends State<RegisterSuccessfulPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("Successful"),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 100),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SizedBox(width: double.infinity),
            Align(
                alignment: Alignment.topLeft,
                child: Text(
                  "Hi\nUser",
                  style: TextStyle(
                    fontSize: 36,
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontWeight: FontWeight.w800,
                  ),
                )),

            Align(
                alignment: Alignment.topLeft,
                child: Container(
                  margin: EdgeInsets.symmetric(vertical: 20),
                  width: 200,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                      "Please check your email",
                      style: TextStyle(
                        fontSize: 15,
                        color: AppColors.PRIMARY_WORD_COLOR,
                        ),
                      ),
                      Text(
                        widget.data["email"],
                        style: TextStyle(
                          fontSize: 15,
                          color: AppColors.PRIMARY_COLOR,
                        ),
                      ),
                      Text(
                        "and verifiy your account",
                        style: TextStyle(
                          fontSize: 15,
                          color: AppColors.PRIMARY_WORD_COLOR,
                        ),
                      ),

                    ]
                  ),
                )),
            Container(
              height: 64,
              width: double.infinity,
              margin: EdgeInsets.fromLTRB(0, 10, 0, 20),
              child: RaisedButton(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.0),
                ),
                textColor: Colors.white,
                color: HexColor("#B6C5D1"),
                onPressed: () {
                  Navigator.pushNamed(
                      context, RoutePath.loginPage);
                },
                child: Text(
                  "Done",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
