import 'package:flutter/cupertino.dart';

import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/services/customer_service.dart';

class CreateCampaignPage extends StatefulWidget {
  const CreateCampaignPage({Key? key}) : super(key: key);

  @override
  _CreateCampaignPageState createState() => _CreateCampaignPageState();
}

class _CreateCampaignPageState extends State<CreateCampaignPage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _weightTarget = TextEditingController();
  final TextEditingController _description = TextEditingController();
  final TextEditingController _currentWeight = TextEditingController();
  final TextEditingController _habit = TextEditingController();

  String dropdownValue = '1 day';
  int spendTimeForTraining = 1;

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
      bool haveSuffixIcon) {
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
                _singleInput("Your target weight", "E.g: 70", _weightTarget, TextInputType.number, Icons.add, false),
                _singleInput("Your current weight", "E.g: 70", _currentWeight, TextInputType.number, Icons.add, false),
                _dropdown(),
                _multiInput("Your description", "Your description...", _description),

                const SizedBox(
                  height: 30,
                ),
                FlatButton(
                  height: 64,
                  color: AppColors.PRIMARY_COLOR,
                  onPressed: () {
                    if (_formKey.currentState!.validate()){
                      _formKey.currentState?.save();
                      int targetWeight = int.parse(_weightTarget.text);
                      int currentWeight = int.parse(_currentWeight.text);
                      CustomerService service = CustomerService();
                      service.createCampaign(
                          targetWeight: targetWeight,
                          currentWeight: currentWeight,
                          description: _description.text,
                          spendTimeForTraining: spendTimeForTraining
                      );
                    }
                  },
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [
                      SizedBox(),
                      Text(
                        'Choose Method',
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 15),
                      ),
                      Icon(Icons.arrow_forward, color: Colors.white, size: 24,)
                    ],
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
