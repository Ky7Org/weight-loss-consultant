import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/pages/components/toast.dart';
import 'package:weight_loss_consultant_mobile/services/trainer_service.dart';

class CreatePackagesPage extends StatefulWidget {
  const CreatePackagesPage({Key? key}) : super(key: key);

  @override
  _CreatePackagesPageState createState() => _CreatePackagesPageState();
}

class _CreatePackagesPageState extends State<CreatePackagesPage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _exercisePlan = TextEditingController();
  final TextEditingController _dietPlan = TextEditingController();
  final TextEditingController _titles = TextEditingController();
  final TextEditingController _fee = TextEditingController();
  final TextEditingController _schedule = TextEditingController();

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
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value){
        setState(() {});
      });
    });
  }


  String dropdownValue = '1 day';
  int spendTimeToTraining = 1;

  Widget _multiInput(
      String label, String hint, TextEditingController controller) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 20),
      margin: const EdgeInsets.symmetric(vertical: 5),
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

  Widget _singleInput(String label, String hint, bool haveSuffixIcon,
      bool havePrefixIcon, IconData icon, TextEditingController controller) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 20),
      margin: const EdgeInsets.symmetric(vertical: 5),
      decoration: BoxDecoration(
          color: AppColors.INPUT_COLOR,
          borderRadius: const BorderRadius.all(Radius.circular(20))),
      child: Column(
        children: [
          Align(
            alignment: Alignment.topLeft,
            child: Text(
              label,
              style: const TextStyle(
                  color: Color(0xFF0D3F67),
                  fontSize: 11,
                  fontWeight: FontWeight.bold),
            ),
          ),
          Row(
            children: [
              havePrefixIcon
                  ? Padding(
                      padding: const EdgeInsets.only(bottom: 6),
                      child: Icon(
                        icon,
                        color: const Color(0xFFFF3939),
                        size: 20,
                      ),
                    )
                  : const SizedBox(),
              Expanded(
                child: TextFormField(
                  controller: controller, keyboardType: TextInputType.phone,
                  style: const TextStyle(fontSize: 15),
                  decoration: InputDecoration(
                    suffixIcon: haveSuffixIcon
                        ? Icon(
                            icon,
                            color: const Color(0xFF0D3F67),
                            size: 20,
                          )
                        : const SizedBox(),
                    border: InputBorder.none,
                    hintText: hint,
                    hintStyle: const TextStyle(
                        color: Color(0xFFB6C5D1),
                        fontWeight: FontWeight.w400,
                        fontSize: 15),
                    errorStyle: const TextStyle(height: 0.1),
                  ),
                ),
              )
            ],
          ),
        ],
      ),
    );
  }

  Widget _dropdown(){
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 20),
      margin: const EdgeInsets.symmetric(vertical: 10),
      decoration: BoxDecoration(
          color: AppColors.INPUT_COLOR,
          borderRadius: const BorderRadius.all(Radius.circular(20))),
      child:  Column(
        children: [
          const Align(
            alignment: Alignment.topLeft,
            child: Text(
              'Total number of days to meet',
              style: TextStyle(
                  color: Color(0xFF0D3F67),
                  fontSize: 11,
                  fontWeight: FontWeight.bold),
            ),
          ),
          DropdownButton<String>(
            value: dropdownValue,
            icon: const Icon(Icons.arrow_drop_down_sharp),
            iconSize: 24,
            elevation: 16,
            isExpanded: true,
            style: const TextStyle(color: Color(0xFF0D3F67), fontWeight: FontWeight.w400, fontSize: 15),
            underline: const SizedBox(),
            onChanged: (String? newValue) {
              setState(() {
                dropdownValue = newValue!;
                switch (newValue){
                  case '1 day':
                    spendTimeToTraining = 1;
                    break;
                  case '2 days':
                    spendTimeToTraining = 2;
                    break;
                  case "3 days":
                    spendTimeToTraining = 3;
                    break;
                  case "4 days":
                    spendTimeToTraining = 4;
                    break;
                  case "5 days":
                    spendTimeToTraining = 5;
                    break;
                }
              });
            },
            items: <String>['1 day','2 days', '3 days', '4 days', '5 days']
                .map<DropdownMenuItem<String>>((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(value),
              );
            }).toList(),
          ),
        ],
      ),
    );


  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("Packages"),
      body: Container(
        margin: const EdgeInsets.symmetric(horizontal: 20),
        child: SingleChildScrollView(
          child: Column(
            children: [
              const SizedBox(height: 20),
              const Align(
                alignment: Alignment.topLeft,
                child: Text(
                  'Fill the Packages',
                  style: TextStyle(
                      color: Color(0xFF0D3F67),
                      fontWeight: FontWeight.w700,
                      fontSize: 18),
                ),
              ),
              const SizedBox(height: 10),
              Form(
                key: _formKey,
                child: Column(
                  children: [
                    _singleInput(
                        "Titles (Max. 30 characters)",
                        "E,g: Tap luyen cung BanhsBao",
                        false,
                        false,
                        Icons.ac_unit,
                        _titles),
                    _dropdown(),
                    _multiInput("Exercise Plan", "Do what?", _exercisePlan),
                    _multiInput("Diet Plan", "Eat what?", _dietPlan),
                    _singleInput("Training Fee", "000.00", false, true,
                        Icons.attach_money, _fee),
                    _multiInput("Schedule description", "Your description...", _schedule),
                    const SizedBox(
                      height: 20,
                    ),
                    FlatButton(
                      height: 64,
                      minWidth: MediaQuery.of(context).size.width,
                      color: AppColors.PRIMARY_COLOR,
                      onPressed: () async {
                        if (_formKey.currentState!.validate()){
                          _formKey.currentState?.save();
                          String exercisePlan = _exercisePlan.text;
                          String schedule = _schedule.text;
                          double price = double.parse(_fee.text);
                          int status = 1;
                          String dietPlan = _dietPlan.text;
                          String name = _titles.text;
                          TrainerService trainerService = TrainerService();
                          bool result = await trainerService.createPackage(
                            exercisePlan: exercisePlan,
                            schedule: schedule,
                            price: price,
                            status: status,
                            dietPlan: dietPlan,
                            spendTimeToTraining: spendTimeToTraining,
                            name: name,
                            user: user,
                          );
                          if (result){
                            CustomToast.makeToast("Create successfully");
                          } else {
                            CustomToast.makeToast("Some thing went wrong! Try again");
                          }

                        }
                      },
                      child: const Text(
                        'Create Package',
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 15),
                      ),
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(18)
                      ),
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
