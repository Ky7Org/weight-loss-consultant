import 'package:flutter/cupertino.dart';

import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';

class CreateCampaignPage extends StatefulWidget {
  const CreateCampaignPage({Key? key}) : super(key: key);

  @override
  _CreateCampaignPageState createState() => _CreateCampaignPageState();
}

class _CreateCampaignPageState extends State<CreateCampaignPage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _weightTarget = TextEditingController();
  final TextEditingController _currentWeight = TextEditingController();
  final TextEditingController _yourTarget = TextEditingController();
  final TextEditingController _dayOfTraining = TextEditingController();
  final TextEditingController _habbit = TextEditingController();

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

  Widget _illness(String label) {
    return ElevatedButton(
      onPressed: () {
        return ;
      },
      child: Row(
        children: [
          Text(
            label,
            style: const TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w900,
                color: Color(0xffffffff)),
          ),
          const SizedBox(
            width: 5,
          ),
          const Icon(
            Icons.highlight_remove,
            size: 20,
          )
        ],
      ),
      style: ButtonStyle(
          backgroundColor:
          MaterialStateProperty.all<Color>(const Color(0xFFFF3939)),
          shape: MaterialStateProperty.all<RoundedRectangleBorder>(
              RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10.0),
              ))),
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
                  child: _title('Choose illness'),
                ),
                const SizedBox(
                  height: 5,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _illness('over weight'),
                    _illness('heart attack'),
                    _illness('broke leg'),
                  ],
                ),
                Align(
                  alignment: Alignment.topLeft,
                  child: GestureDetector(
                    child: Row(
                      children: [
                        Icon(Icons.add, color: AppColors.PRIMARY_COLOR,),
                        Text(
                          'Add Symptom',
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w700,
                            color: AppColors.PRIMARY_COLOR
                          ),
                        )
                      ],
                    ),
                  ),
                ),
                const SizedBox(
                  height: 30,
                ),
                Align(
                  alignment: Alignment.topLeft,
                  child: _title('Fill the Forms'),
                ),
                _singleInput("Your target weight", "E,g: My head feel dizzy", _weightTarget, TextInputType.text, Icons.add, false),
                _singleInput("Your current weight", "70 kilograms", _currentWeight, TextInputType.text, Icons.add, false),
                _singleInput("Your target", "50 kilograms", _yourTarget, TextInputType.text, Icons.add, false),
                _singleInput("How many day per week you can spend for training", "2 days", _dayOfTraining, TextInputType.text, Icons.keyboard_arrow_down, true),
                _multiInput("Your habits", "When i woke up i feel like...", _habbit),
                const SizedBox(
                  height: 30,
                ),
                FlatButton(
                  height: 64,
                  color: AppColors.PRIMARY_COLOR,
                  onPressed: () {},
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
