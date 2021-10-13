import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/customer_appbar.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/account_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/app_color.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/constants.dart';

class YourInformationScreen extends StatefulWidget {
  const YourInformationScreen({Key? key}) : super(key: key);

  @override
  _YourInformationScreenState createState() => _YourInformationScreenState();
}

class _YourInformationScreenState extends State<YourInformationScreen> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _weightController = TextEditingController();
  final TextEditingController _heightController = TextEditingController();
  double bmi = 0;
  int weight = 0;
  int height = 0;
  String message = "";

  AccountModel user = AccountModel(email: "", fullname: "");


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

  void _generateMessage(){
    double goal = weight - 21.5*((height / 100) * (height / 100));
    message = "You are ${goal.toStringAsFixed(1)} kg overweight";
    String status = _calculateBMIStatus();
    print(status);
    if (status == "Healthy weight"){
      message = "You are at a perfect condition";
    }
    if (goal < 0 && status != "Healthy weight"){
      message = "You are ${(goal * -1 ).toStringAsFixed(1)} kg underweight";
    }
  }

  void weightChange(){
    if (_weightController.text == "") return;
    weight = int.parse(_weightController.text);
    setState(() {
      if (height == 0) {
        bmi = 0;
      } else {
        bmi = weight / ((height / 100) * (height / 100));
        _generateMessage();
      }
    });
  }

  void heightChange(){
    if (_heightController.text == "") return;
    height = int.parse(_heightController.text);
    setState(() {
      if (height == 0) {
        bmi = 0;
      } else {
        bmi = weight / ((height / 100) * (height / 100));
        _generateMessage();
      }
    });
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value) {
        setState(() {});
      });
    });
    _weightController.addListener(weightChange);
    _heightController.addListener(heightChange);
  }

  Widget _buildTitleWidget() {
    return Container(
      child: const Text("ENTER YOUR BODY INDEX",
          textAlign: TextAlign.center,
          style: TextStyle(
              color: Colors.white, fontSize: 25, fontWeight: FontWeight.bold)),
    );
  }

  Widget _buildWeightTF() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        const Text(
          'Weight',
          style: kLabelStyle,
        ),
        const SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(15.0),
            boxShadow: const [
              BoxShadow(
                color: Colors.black12,
                blurRadius: 6.0,
                offset: Offset(0, 2),
              ),
            ],
          ),
          height: 60.0,
          child: TextFormField(
            controller: _weightController,
            keyboardType: TextInputType.number,
            style: TextStyle(
              color: AppColor.appPrimaryColor,
              fontFamily: 'OpenSans',
              fontWeight: FontWeight.bold,
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 11),
              hintText: 'Enter your weight',
              hintStyle: TextStyle(
                color: AppColor.appPrimaryColor,
                fontFamily: 'OpenSans',
              ),
              suffixIcon: Padding(
                padding: const EdgeInsets.all(14.0),
                child: Text(
                  "kg",
                  style: TextStyle(
                    color: AppColor.appPrimaryColor,
                    fontFamily: 'OpenSans',
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            validator: (weight) {
              return null;
            },
          ),
        ),
      ],
    );
  }

  Widget _buildHeightTF() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        const Text(
          'Height',
          style: kLabelStyle,
        ),
        const SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(15.0),
            boxShadow: const [
              BoxShadow(
                color: Colors.black12,
                blurRadius: 6.0,
                offset: Offset(0, 2),
              ),
            ],
          ),
          height: 60.0,
          child: TextFormField(
            controller: _heightController,
            keyboardType: TextInputType.number,
            style: TextStyle(
              color: AppColor.appPrimaryColor,
              fontFamily: 'OpenSans',
              fontWeight: FontWeight.bold,
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 11),
              hintText: 'Enter your height',
              hintStyle: TextStyle(
                color: AppColor.appPrimaryColor,
                fontFamily: 'OpenSans',
              ),
              suffixIcon: Padding(
                padding: const EdgeInsets.all(14.0),
                child: Text(
                  "cm",
                  style: TextStyle(
                    color: AppColor.appPrimaryColor,
                    fontFamily: 'OpenSans',
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            validator: (weight) {
              return null;
            },
          ),
        ),
      ],
    );
  }

  Widget _buildLNextBtn() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 25.0),
      width: double.infinity,
      child: RaisedButton(
        elevation: 5.0,
        onPressed: () async {
          if (_formKey.currentState!.validate()) {
            _formKey.currentState?.save();
            user.height = int.parse(_heightController.text);
            user.weight = int.parse(_weightController.text);
            await saveAccount();
            Navigator.pushNamed(context, RoutePath.yourGoalScreen);
          }
        },
        padding: const EdgeInsets.all(15.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(30.0),
        ),
        color: Colors.white,
        child: const Text(
          'NEXT',
          style: TextStyle(
            color: Color(0xFF527DAA),
            letterSpacing: 1.5,
            fontSize: 18.0,
            fontWeight: FontWeight.bold,
            fontFamily: 'OpenSans',
          ),
        ),
      ),
    );
  }

  Widget _buildBMIWidget() {
    return Container(
        child: Column(
      children: [
        Text(
          "YOUR BMI: ${bmi.toStringAsFixed(1)}",
          style: const TextStyle(
            color: Colors.white,
            fontSize: 20, fontWeight:
            FontWeight.bold
          ),
        ),
      ],
    ));
  }

  String _calculateBMIStatus() {
    String status = "Severely underweight";
    for (String info in bmiData.keys) {
      if (bmiData[info]["start"] < bmi && bmi <= bmiData[info]["end"]) {
        return info;
      }
    }

    if (bmi > 40){
      return "Severely obese";
    }
    if (bmi < 15){
      return "Severely underweight";
    }
    return status;
  }

  Widget _buildBMIChart(){
    List<Widget> indicators = List.empty(growable: true);
    for(String info in bmiData.keys){
      Widget container = Expanded(
          flex: bmiData[info]["end"] - bmiData[info]["start"],
          child: Container(
            height: 50,
            color: bmiData[info]["color"],
          )
      );
      indicators.add(container);
    }

    double range = 2 * ((bmi - 15)/25) - 1;
    if (range < -1) range = -1;
    if (range > 1) range = 1;
    String status = _calculateBMIStatus();


    return Column(
      children: [
        Stack(
            children: [
              Align(
                alignment: Alignment.bottomCenter,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: indicators,
                ),
              ),
              Align(
                alignment: Alignment(range,0),
                child: Container(
                  height: 50,
                  width: 3,
                  color: Colors.black,
                ),
              )
            ]
        ),
        const SizedBox(height: 15,),
        Text(
          message,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w600,
            color: Colors.white
            //color: bmiData[status]["color"]

          ),
        )

      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            Color(0xFF398AE5),
            Color(0xFF478DE0),
            Color(0xFF61A4F1),
            Color(0xFF73AEF5),
          ],
          stops: [0.1, 0.4, 0.7, 0.9],
        ),
      ),
      child: Scaffold(
        appBar: CustomerAppbar.builder("YOUR INFORMATION"),
        backgroundColor: Colors.transparent,
        body: Container(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              const SizedBox(
                height: 20,
              ),
              _buildTitleWidget(),
              Form(
                key: _formKey,
                child: Column(
                  mainAxisSize: MainAxisSize.max,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const SizedBox(height: 30.0),
                    _buildWeightTF(),
                    const SizedBox(
                      height: 30.0,
                    ),
                    _buildHeightTF(),
                    const SizedBox(
                      height: 30.0,
                    ),
                    _buildBMIWidget(),
                    SizedBox(height: 20,),
                    _buildBMIChart(),
                    const SizedBox(
                      height: 30.0,
                    ),
                    _buildLNextBtn(),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
