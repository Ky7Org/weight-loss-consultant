import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/models/campaign_model.dart';
import 'package:weight_loss_consultant_mobile/models/package_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/pages/components/toast.dart';
import 'package:weight_loss_consultant_mobile/services/trainer_service.dart';

class TrainerUpdatePackagePage extends StatefulWidget {
  int? packageId;
  TrainerUpdatePackagePage({Key? key, this.packageId}) : super(key: key);

  @override
  _TrainerUpdatePackagePageState createState() => _TrainerUpdatePackagePageState();
}

class _TrainerUpdatePackagePageState extends State<TrainerUpdatePackagePage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _exercisePlan = TextEditingController();
  final TextEditingController _dietPlan = TextEditingController();
  final TextEditingController _titles = TextEditingController();
  final TextEditingController _fee = TextEditingController();
  final TextEditingController _schedule = TextEditingController();

  AccountModel user = AccountModel(email: "", fullname: "");
  PackageModel? packageModel;

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
        TrainerService service = TrainerService();
        service.getPackageById(widget.packageId ?? 0, user).then((value) {
          packageModel = value;
          _exercisePlan.text = packageModel!.exercisePlan ?? "";
          _dietPlan.text = packageModel!.dietPlan ?? "";
          _titles.text = packageModel!.name ?? "";
          _fee.text = packageModel!.price.toString();
          _schedule.text = packageModel!.schedule ?? "";
          setState(() {});
        });
      });
    });
  }


  String dropdownValue = '1 day';
  int spendTimeToTraining = 1;

  Widget _multiInput(
      String label, String hint, TextEditingController controller, int maxCharacter) {
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
            maxLines: 5,
            inputFormatters: [
              LengthLimitingTextInputFormatter(maxCharacter),
            ],
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
          Align(
            alignment: Alignment.bottomRight,
            child: Text(
              'Max. $maxCharacter characters',
              style: const TextStyle(
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
      bool havePrefixIcon, IconData icon, TextEditingController controller, FormFieldValidator<String> validator) {
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
              havePrefixIcon ? Padding(
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
                  controller: controller,
                  keyboardType: TextInputType.phone,
                  validator: validator,
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
      appBar: GenericAppBar.builder("Update Package"),
      body: Container(
        margin: const EdgeInsets.symmetric(horizontal: 20),
        child: SingleChildScrollView(
          child: Column(
            children: [
              const SizedBox(height: 20),
              const Align(
                alignment: Alignment.topLeft,
              ),
              const SizedBox(height: 10),
              Form(
                key: _formKey,
                child: Column(
                  children: [
                    _singleInput(
                        "Title (Max. 30 characters)",
                        "E,g: Tap luyen cung BanhsBao",
                        false,
                        false,
                        Icons.ac_unit,
                        _titles,
                        (text){
                          if (text == null || text.isEmpty){
                            return "Title cannot be empty";
                          }
                          if (text.length > 30){
                            return "Title cannot be bigger than 30 characters";
                          }
                          return null;
                        }
                    ),
                    _dropdown(),
                    _multiInput("Exercise Plan", "Do what?", _exercisePlan, 1000),
                    _multiInput("Diet Plan", "Eat what?", _dietPlan, 1000),
                    _singleInput("Training Fee", "000.00", false, true,
                        Icons.attach_money, _fee, (text){
                          if (text == null || text.isEmpty){
                            return "Fee cannot be empty";
                          }
                          try {
                              double fee = double.parse(text);
                              if (fee < 0){
                                return "Fee cannot be negative";
                              }
                              if (fee > 1000000){
                                return "Fee cannot be bigger than 1000000";
                              }
                          } catch (e){
                            return "Fee must be a number";
                          }
                          return null;
                        }),
                    _multiInput("Schedule description", "Your description...", _schedule, 1000),
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
                          TrainerService trainerService = TrainerService();
                          packageModel!.exercisePlan = _exercisePlan.text;
                          packageModel!.schedule = _schedule.text;
                          packageModel!.price = double.parse(_fee.text);
                          packageModel!.status = 1;
                          packageModel!.dietPlan = _dietPlan.text;
                          packageModel!.name = _titles.text;
                          bool result = await trainerService.updatePackage(packageModel!, user);
                          if (result){
                            CustomToast.makeToast("Update successfully");
                          } else {
                            CustomToast.makeToast("Some thing went wrong! Try again");
                          }
                        }
                      },
                      child: const Text(
                        'Update',
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
