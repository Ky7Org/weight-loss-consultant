import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/customer_appbar.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/account_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/app_color.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/constants.dart';

class YourGoalScreen extends StatefulWidget {
  const YourGoalScreen({Key? key}) : super(key: key);

  @override
  _YourGoalScreenState createState() => _YourGoalScreenState();
}

enum Goal {
  quarter,
  half,
  threeFourth,
  full,
}

class _YourGoalScreenState extends State<YourGoalScreen> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _weightController = TextEditingController();
  final TextEditingController _startDateController = TextEditingController();
  final TextEditingController _endDateController = TextEditingController();
  double lossRate = 0;
  bool isWarningDisplay = false;
  DateTime startDate = DateTime(DateTime.now().year, DateTime.now().month, DateTime.now().day);
  DateTime endDate = DateTime(DateTime.now().year, DateTime.now().month, DateTime.now().day);
  int weight = 0;

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

  @override
  void initState() {
    super.initState();
    _weightController.addListener(weightChange);
    _startDateController.addListener(startDateChange);
    _endDateController.addListener(endDateChange);
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value) {
        setState(() {});
      });
    });
  }

  bool _generateWarningMessage(){
    lossRate = ((user.weight - weight) / (endDate.difference(startDate).inDays)) * 7;
    //isWarningDisplay = lossRate > 1;
    if (lossRate > 1){
      showDialog(
        context: context,
        builder: (ctx) => Dialog(
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(4.0)
            ),
            child: Stack(
              clipBehavior: Clip.none, alignment: Alignment.topCenter,
              children: [
                SizedBox(
                  height: 200,
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(10, 60, 10, 10),
                    child: Column(
                      children: [
                        Center(
                          child: RichText(
                            textAlign: TextAlign.center,
                            text: TextSpan(
                              style: TextStyle(
                                color: Colors.red.shade400,
                                fontWeight: FontWeight.w500,
                                fontSize: 15
                              ),
                              children: [
                                const TextSpan( text: "Warning: Your current weight loss rate is "),
                                TextSpan(
                                  text : lossRate.toStringAsFixed(1),
                                  style: const TextStyle(fontSize: 15,)
                                ),
                                const TextSpan( text: " kg per week. The recommended rate is 0.5-1 kg per week"),
                                ],
                              )
                          ),
                        ),
                        SizedBox(height: 20,),
                        RaisedButton(onPressed: () {
                          Navigator.of(context).pop();
                        },
                          color: Colors.redAccent,
                          child: const Text('Okay', style: TextStyle(color: Colors.white),),
                        )
                      ]
                    ),
                  ),
                ),
                const Positioned(
                    top: -35,
                    child: CircleAvatar(
                      backgroundColor: Colors.redAccent,
                      radius: 40,
                      child: Icon(Icons.warning, color: Colors.white, size: 50,),
                    )
                ),
              ],
            )
        )
      );
    }
    return lossRate > 1;
  }

  void weightChange(){
    if (_weightController.text == "") return;
    weight = int.parse(_weightController.text);
  }

  void startDateChange(){
    if (_weightController.text == "" || _startDateController.text == "" || _endDateController.text == "") return;
  }

  void endDateChange(){
    if (_weightController.text == "" || _startDateController.text == "" || _endDateController.text == "") return;
  }

  Widget _buildTitleWidget() {
    return Container(
      child: const Text("WHAT IS YOUR GOAL?",
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
              hintText: 'Enter your dream weight',
              hintStyle: TextStyle(
                color: AppColor.appPrimaryColor,
                fontFamily: 'OpenSans',
                fontWeight: FontWeight.bold,
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

  Widget _buildStartDateTF() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        const Text(
          'Start date',
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
            readOnly: true,
            controller: _startDateController,
            keyboardType: TextInputType.number,
            style: TextStyle(
              color: AppColor.appPrimaryColor,
              fontFamily: 'OpenSans',
              fontWeight: FontWeight.bold,
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 11),
              hintText: "Enter your journey's start date",
              hintStyle: TextStyle(
                color: AppColor.appPrimaryColor,
                fontFamily: 'OpenSans',
                fontWeight: FontWeight.bold,
              ),
              suffixIcon: IconButton(
                icon: const Icon(Icons.calendar_today),
                onPressed: (){
                  DatePicker.showDatePicker(context, showTitleActions: true,
                      minTime: DateTime.now(),
                      onConfirm: (date) {
                        startDate = DateTime(date.year, date.month, date.day);
                        _startDateController.text = DateFormat('yyyy-MM-dd').format(date);
                      },
                      currentTime: DateTime.now());
                },
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

  Widget _buildEndDateTF() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        const Text(
          'End date',
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
            readOnly: true,
            controller: _endDateController,
            keyboardType: TextInputType.number,
            style: TextStyle(
              color: AppColor.appPrimaryColor,
              fontFamily: 'OpenSans',
              fontWeight: FontWeight.bold,
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 11),
              hintText: "Enter your journey's end date",
              hintStyle: TextStyle(
                color: AppColor.appPrimaryColor,
                fontFamily: 'OpenSans',
                fontWeight: FontWeight.bold,
              ),
              suffixIcon: IconButton(
                icon: const Icon(Icons.calendar_today),
                onPressed: (){
                  DatePicker.showDatePicker(context, showTitleActions: true,
                      minTime: startDate.add(const Duration(days: 1)),
                      onConfirm: (date) {
                        endDate = DateTime(date.year, date.month, date.day);
                        _endDateController.text = DateFormat('yyyy-MM-dd').format(date);
                      },
                      currentTime: DateTime.now());
                },
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
            bool result = _generateWarningMessage();
            if (result){
              return;
            }
            user.startDate = startDate;
            user.endDate = endDate;
            user.weightGoal = weight;
            saveAccount();
            Navigator.pushNamed(context, RoutePath.yourMethodScreen);
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
        appBar: CustomerAppbar.builder("YOUR GOAL"),
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
                    _buildStartDateTF(),
                    const SizedBox(
                      height: 30.0,
                    ),
                    _buildEndDateTF(),
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
