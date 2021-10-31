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
import 'package:weight_loss_consultant_mobile/services/customer_service.dart';

class CreateCampaignPage extends StatefulWidget {
  const CreateCampaignPage({Key? key}) : super(key: key);

  @override
  _CreateCampaignPageState createState() => _CreateCampaignPageState();
}

class _CreateCampaignPageState extends State<CreateCampaignPage> {

  AccountModel user = AccountModel(email: "", fullname: "");

  final _formKey = GlobalKey<FormState>();
  final TextEditingController _weightTarget = TextEditingController();
  final TextEditingController _description = TextEditingController();
  final TextEditingController _currentWeight = TextEditingController();
  final TextEditingController _startDateController = TextEditingController();
  final TextEditingController _endDateController = TextEditingController();
  DateTime startDate = DateTime(DateTime.now().year, DateTime.now().month, DateTime.now().day);
  DateTime endDate = DateTime(DateTime.now().year, DateTime.now().month, DateTime.now().day);



  String dropdownValue = '1 day';
  int spendTimeForTraining = 1;


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

  Widget _title(String title) {
    return Text(title,
        style: const TextStyle(
            color: Color(0xFF0D3F67),
            fontWeight: FontWeight.w700,
            fontSize: 18));
  }

  Widget _singleInput(
      String label,
      String hint,
      TextEditingController controller,
      TextInputType type,
      IconData icon,
      bool haveSuffixIcon,
      FormFieldValidator<String> validator) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 20),
      margin: const EdgeInsets.symmetric(vertical: 10),
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
              Expanded(
                child: TextFormField(
                  controller: controller,
                  keyboardType: type,
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

  Widget _multiInput(
      String label, String hint, TextEditingController controller, int maxCharacter) {
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
              'How many day per week you can spend for training',
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
              switch (newValue){
                case "1 day":
                  spendTimeForTraining = 1;
                  break;
                case "2 days":
                  spendTimeForTraining = 2;
                  break;
                case "3 days":
                  spendTimeForTraining = 3;
                  break;
                case "4 days":
                  spendTimeForTraining = 4;
                  break;
                case "5 days":
                  spendTimeForTraining = 5;
                  break;
              }
              setState(() {
                dropdownValue = newValue!;
              });
            },
            items: <String>["1 day", '2 days', '3 days', '4 days', '5 days']
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("Campaign"),
      body: Container(
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
        margin: const EdgeInsets.only(top: 20),
        child: SingleChildScrollView(
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Align(
                  alignment: Alignment.topLeft,
                  child: _title('Fill the Forms'),
                ),
                _singleInput("Your current weight", "E.g: 70", _currentWeight, TextInputType.number, Icons.add, false, (text){
                  if (text == null || text.isEmpty){
                    return "Current weight cannot be empty";
                  }
                  try{
                    int weight = int.parse(text);
                    if (weight < 0){
                      return "Current weight cannot be negative";
                    }
                    if (weight > 300){
                      return "Current weight cannot be bigger than 300kg";
                    }
                  } catch (e){
                    return "Current weight must be a number";
                  }
                  return null;
                }),
                _singleInput("Your target weight", "E.g: 70", _weightTarget, TextInputType.number, Icons.add, false, (text){
                  int currentWeight = 0;
                  if (_currentWeight.text.isEmpty){
                    return null;
                  }
                  try{
                    currentWeight = int.parse(_currentWeight.text);
                    if (currentWeight < 0 || currentWeight > 300){
                      return null;
                    }
                  } catch (e){
                    return null;
                  }

                  if (text == null || text.isEmpty){
                    return "Target weight cannot be empty";
                  }
                  try{
                    int weight = int.parse(text);
                    if (weight < 0){
                      return "Target weight cannot be negative";
                    }
                    if (weight > 300){
                      return "Target weight cannot be bigger than 300kg";
                    }
                    if (weight > currentWeight){
                      return "Target weight cannot be bigger than current weight";
                    }
                  } catch (e){
                    return "Target weight must be a number";
                  }
                  return null;
                }),
                _dropdown(),
                _multiInput("Your description", "Your description...", _description, 1000),
                _buildStartDateTF(),
                const SizedBox(height: 20,),
                _buildEndDateTF(),
                const SizedBox(
                  height: 30,
                ),

                FlatButton(
                  height: 64,
                  color: AppColors.PRIMARY_COLOR,
                  onPressed: () async {
                    if (_formKey.currentState!.validate()){
                      _formKey.currentState?.save();
                      int targetWeight = int.parse(_weightTarget.text);
                      int currentWeight = int.parse(_currentWeight.text);
                      CustomerService service = CustomerService();
                      bool result = await service.createCampaign(
                        targetWeight: targetWeight,
                        currentWeight: currentWeight,
                        description: _description.text,
                        spendTimeForTraining: spendTimeForTraining,
                        user: user,
                        startDate: startDate,
                        endDate: endDate,
                      );
                      if (result){
                        CustomToast.makeToast("Create successfully");
                      } else {
                        CustomToast.makeToast("Some thing went wrong! Try again");
                      }
                    }
                  },
                  minWidth: 300,
                  child: const Text(
                    'Create campaign',
                    style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 15),
                  ),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(18)
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
