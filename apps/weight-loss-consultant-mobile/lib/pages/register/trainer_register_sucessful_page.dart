import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';

class TrainerRegisterSuccessfulPage extends StatefulWidget {
  Map<dynamic, dynamic> data;

  TrainerRegisterSuccessfulPage({Key? key, this.data = const {"fullname": ""}})
      : super(key: key);

  @override
  _TrainerRegisterSuccessfulPageState createState() =>
      _TrainerRegisterSuccessfulPageState();
}

class _TrainerRegisterSuccessfulPageState extends State<TrainerRegisterSuccessfulPage> {
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
                  "Hi",
                  style: TextStyle(
                    fontSize: 36,
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontWeight: FontWeight.w900,
                  ),
                )),
            Align(
                alignment: Alignment.topLeft,
                child: Text(
                  widget.data["fullname"],
                  style: TextStyle(
                    fontSize: 36,
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontWeight: FontWeight.w900,
                  ),
                )),
            Align(
                alignment: Alignment.topLeft,
                child: Container(
                  margin: EdgeInsets.fromLTRB(0, 20, 0, 30),
                  width: 200,
                  child: Text(
                    "Your contact has been send to us. We will contact you soon",
                    style: TextStyle(
                      fontSize: 15,
                      color: AppColors.PRIMARY_WORD_COLOR,
                    ),
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
                  Navigator.pushNamedAndRemoveUntil(
                      context, RoutePath.initialPage, (route) => false);
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
