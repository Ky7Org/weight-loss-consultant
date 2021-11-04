import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';
import 'package:intl/intl.dart';
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
  final TextEditingController _startDateController = TextEditingController();
  final TextEditingController _endDateController = TextEditingController();
  DateTime startDate = DateTime(DateTime.now().year, DateTime.now().month, DateTime.now().day);
  DateTime endDate = DateTime(DateTime.now().year, DateTime.now().month, DateTime.now().day);

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
  String perSessionValue = '30 mins';
  int spendTimeToTraining = 1;
  int spendTimePerSession = 30;

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
      bool havePrefixIcon, IconData icon, TextEditingController controller, FormFieldValidator<String> validator, TextInputType type) {
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
                  keyboardType: type,
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

  Widget _dropdownInWeek(){
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

  Widget _dropdownPerSession(){
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
            value: perSessionValue,
            icon: const Icon(Icons.arrow_drop_down_sharp),
            iconSize: 24,
            elevation: 16,
            isExpanded: true,
            style: const TextStyle(color: Color(0xFF0D3F67), fontWeight: FontWeight.w400, fontSize: 15),
            underline: const SizedBox(),
            onChanged: (String? newValue) {
              setState(() {
                perSessionValue = newValue!;
                switch (newValue){
                  case '30 mins':
                    spendTimeToTraining = 30;
                    break;
                  case '45 mins':
                    spendTimeToTraining = 45;
                    break;
                  case "60 mins":
                    spendTimeToTraining = 60;
                    break;
                  case "90 mins":
                    spendTimeToTraining = 90;
                    break;
                }
              });
            },
            items: <String>['30 mins','45 mins', '60 mins', '90 mins']
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

  Widget _buildStartDateTF() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        const Text(
          'Start date',
          style: TextStyle(
              color: Color(0xFF0D3F67),
              fontSize: 11,
              fontWeight: FontWeight.bold
          ),
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
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              color: Color(0xFF0D3F67),
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 11),
              hintText: "Enter your journey's start date",
              hintStyle: const TextStyle(
                fontWeight: FontWeight.bold,
                color: Color(0xFF0D3F67),
              ),
              suffixIcon: IconButton(
                icon: const Icon(Icons.calendar_today),
                onPressed: (){
                  DatePicker.showDatePicker(context, showTitleActions: true,
                      minTime: DateTime.now(),
                      onConfirm: (date) {
                        startDate = DateTime(date.year, date.month, date.day);
                        _startDateController.text = DateFormat.yMMMd().format(date);
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
            style: const TextStyle(
              fontFamily: 'OpenSans',
              fontWeight: FontWeight.bold,
              color: Color(0xFF0D3F67),
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 11),
              hintText: "Enter your journey's end date",
              hintStyle: const TextStyle(
                fontFamily: 'OpenSans',
                fontWeight: FontWeight.bold,
                color: Color(0xFF0D3F67),

              ),
              suffixIcon: IconButton(
                icon: const Icon(Icons.calendar_today),
                onPressed: (){
                  DatePicker.showDatePicker(context, showTitleActions: true,
                      minTime: startDate.add(const Duration(days: 1)),
                      onConfirm: (date) {
                        endDate = DateTime(date.year, date.month, date.day);
                        _endDateController.text =  DateFormat.yMMMd().format(date);
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
                        },
                      TextInputType.text
                    ),
                    _dropdownInWeek(),
                    _dropdownPerSession(),
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
                        },
                        TextInputType.number

                    ),
                    _multiInput("Schedule description", "Your description...", _schedule, 1000),
                    _buildStartDateTF(),
                    const SizedBox(height: 20,),
                    _buildEndDateTF(),
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
                            spendTimePerSession: spendTimePerSession,
                            name: name,
                            user: user,
                            endDate: endDate.millisecondsSinceEpoch,
                            startDate: startDate.millisecondsSinceEpoch,
                          );
                          Navigator.pop(context);
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
