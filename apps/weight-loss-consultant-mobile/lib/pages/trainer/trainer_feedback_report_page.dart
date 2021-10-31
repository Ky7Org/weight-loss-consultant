import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';

class TrainerFeedbackReportPage extends StatefulWidget {
  const TrainerFeedbackReportPage({Key? key}) : super(key: key);

  @override
  _TrainerFeedbackReportPageState createState() => _TrainerFeedbackReportPageState();
}

class _TrainerFeedbackReportPageState extends State<TrainerFeedbackReportPage> {
  AccountModel user = AccountModel(email: "", fullname: "");
  List<String> dietImages = ["assets/fake-image/miku-avatar.png", "assets/fake-image/miku-avatar.png", "assets/fake-image/miku-avatar.png"];
  List<String> exerciseImages = ["assets/fake-image/miku-avatar.png", "assets/fake-image/miku-avatar.png", "assets/fake-image/miku-avatar.png"];
  final TextEditingController _feedback = TextEditingController();

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


  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value) {
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

  Widget _multiInput(
      String label, String hint, TextEditingController controller) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 20),
      margin: const EdgeInsets.symmetric(vertical: 10),
      decoration: BoxDecoration(
          color: AppColors.INPUT_COLOR,
          borderRadius: const BorderRadius.all(Radius.circular(20))),
      child: Column(
        children: [
          TextFormField(
            controller: controller,
            keyboardType: TextInputType.text,
            style: const TextStyle(fontSize: 15),
            maxLines: 3,
            decoration: InputDecoration(
                floatingLabelBehavior: FloatingLabelBehavior.always,
                border: InputBorder.none,
                labelText: label,
                labelStyle: TextStyle(
                    fontSize: 15,
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontWeight: FontWeight.bold),
                hintText: hint,
                hintStyle: const TextStyle(
                    fontSize: 15,
                    color: Color(0xFFB6C5D1),
                    fontWeight: FontWeight.w400)),
          ),
          const Align(
            alignment: Alignment.bottomRight,
            child: Text(
              'Max. 150 characters',
              style: TextStyle(
                  color: Color(0xFFB6C5D1),
                  fontWeight: FontWeight.w400,
                  fontSize: 11),
            ),
          )
        ],
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

  Widget _buildStatusSlider(){
    return DefaultTabController(
      length: 2,
      child: Container(
        margin: const EdgeInsets.only(top: 20),
        height: 48,
        decoration: BoxDecoration(
            color: const Color(0xFFF0F3F6),
            borderRadius: BorderRadius.circular(18),
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.2),
                spreadRadius: 5,
                blurRadius: 7,
                offset: const Offset(0, 3),
              )
            ]),
        child: TabBar(
          indicator: BoxDecoration(
            borderRadius: BorderRadius.circular(18),
            color: Colors.white,
          ),
          labelColor: const Color(0xFF0D3F67),
          unselectedLabelColor: const Color(0xFFB6C5D1),
          onTap: (index){

          },
          tabs: const [
            Tab(
              child: Text("Approved", style: TextStyle(
                  color: Colors.green,
                  fontWeight: FontWeight.bold
              ),
              ),
            ),
            Tab(
              child: Text("Deny",
                style: TextStyle(
                    color: Colors.red,
                    fontWeight: FontWeight.bold
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFeedbackButton(){
    return FlatButton(
      height: 64,
      color: AppColors.PRIMARY_COLOR,
      onPressed: () async {},
      minWidth: double.infinity,
      child: const Text(
        'Send feedback',
        style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.w700,
            fontSize: 15),
      ),
      shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(18)),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder('Daily Report'),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        child: Column(
          children: [
            Column(
              children: [
                _buildDietCard(),
                const SizedBox(height: 15,),
                _buildExerciseCard(),
                const SizedBox(height: 30,),
                _multiInput("Your feedback", "Noice", _feedback),
                _buildStatusSlider(),
                const SizedBox(height: 30,),
                _buildFeedbackButton(),
              ],
            )
          ],
        ),
      ),
    );
  }
}
