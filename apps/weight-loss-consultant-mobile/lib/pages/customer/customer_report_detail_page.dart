import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';

class CustomerReportDetailPage extends StatefulWidget {
  const CustomerReportDetailPage({Key? key}) : super(key: key);

  @override
  _CustomerReportDetailPageState createState() => _CustomerReportDetailPageState();
}

class _CustomerReportDetailPageState extends State<CustomerReportDetailPage> {
  AccountModel user = AccountModel(email: "", fullname: "");
  Future<String>? report;
  List<String> dietImages = ["assets/fake-image/miku-avatar.png", "assets/fake-image/miku-avatar.png", "assets/fake-image/miku-avatar.png"];
  List<String> exerciseImages = ["assets/fake-image/miku-avatar.png", "assets/fake-image/miku-avatar.png", "assets/fake-image/miku-avatar.png"];

  Future<void> initAccount() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? userJSON = prefs.getString('ACCOUNT');
    if (userJSON is String){
      Map<String, dynamic> userMap = jsonDecode(userJSON);
      user = AccountModel.fromJson(userMap);
    }
  }

  Future<void> saveAccount() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString("ACCOUNT", jsonEncode(user.toJson()));
  }

  Future<String> _generateFakeReport() async {
    return "Hey";
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value){
        report = _generateFakeReport();
        setState(() {});
      });
    });
  }

  Widget _title(String title) {
    return Align(
      alignment: Alignment.topLeft,
      child: Text(
        title,
        style: const TextStyle(
            color: Color(0xFF0D3F67),
            fontWeight: FontWeight.w700,
            fontSize: 18),
      ),
    );
  }

  Widget _buildImages(List<String> images){
    List<Widget> listWidget = [];
    for (String file in images){
      Widget image = Image.asset(file);
      listWidget.add(image);
    }

    return Row(
      children: [
        ...listWidget,
      ],
    );
  }

  Widget _buildDietCard(){
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
      child: Container(
        padding: const EdgeInsets.only(left: 20, right: 20, top: 20, bottom: 10),
        child: Column(
          children: [
            _buildImages(dietImages),
            const SizedBox(height: 20,),
            _title('Customer Diet'),
            const SizedBox(height: 10,),
            Text(
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                style: TextStyle(
                  fontSize: 17,
                  color: AppColors.PRIMARY_WORD_COLOR,
                )
            ),
            //_pickUpImageCard(),
            /*_multiInput(
                "What did you eat today?", "Egg and Fish...", _todayDiet),*/
          ],
        ),
      ),
    );
  }

  Widget _buildExerciseCard(){
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
      child: Container(
        padding: const EdgeInsets.only(left: 20, right: 20, top: 20, bottom: 10),
        child: Column(
          children: [
            _buildImages(exerciseImages),
            const SizedBox(height: 20,),
            _title('Customer Exercise'),
            const SizedBox(height: 10,),
            Text(
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                style: TextStyle(
                  fontSize: 17,
                  color: AppColors.PRIMARY_WORD_COLOR,
                )
            ),
            //_pickUpImageCard(),
            /*_multiInput(
                "What did you eat today?", "Egg and Fish...", _todayDiet),*/
          ],
        ),
      ),
    );
  }

  Widget _buildTrainerFeedbackCard(){
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
      child: Container(
        padding: const EdgeInsets.only(left: 20, right: 20, top: 20, bottom: 10),
        child: Column(
          children: [
            _title('Trainer Feedback'),
            const SizedBox(height: 10,),
            Row(
              children: [
                Text(
                  "Trainer approval",
                  style: TextStyle(
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontSize: 17,
                    fontWeight: FontWeight.bold
                  ),
                ),
                const SizedBox(width: 10,),
                Container(
                    padding: const EdgeInsets.symmetric(vertical: 3, horizontal: 7),
                    decoration: const BoxDecoration(
                      color: Colors.red,
                      borderRadius: BorderRadius.all(Radius.circular(20)),
                    ),
                    child: const Text(
                      "Status",
                      style: TextStyle(
                        color: Colors.white,

                      ),
                    )
                ),
              ],
            ),
            const SizedBox(height: 10,),
            Text(
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                style: TextStyle(
                  fontSize: 17,
                  color: AppColors.PRIMARY_WORD_COLOR,
                )
            ),
          ],
        ),
      ),
    );
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("Package detail"),
      body: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
        margin: const EdgeInsets.only(top: 20),
        child: SingleChildScrollView(
          child: FutureBuilder<String>(
              future: report,
              builder: (context, snapshot) {
                if (snapshot.hasData){
                  return Column(
                    children: [
                      _buildTrainerFeedbackCard(),
                      const SizedBox(height: 15,),
                      _buildDietCard(),
                      const SizedBox(height: 15,),
                      _buildExerciseCard(),
                      const SizedBox(height: 30,),
                    ],
                  );
                }
                return const CircularProgressIndicator();
              }
          ),
        ),
      ),
    );
  }
}
