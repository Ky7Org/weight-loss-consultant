import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/constants/enums.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/pages/components/toast.dart';
import 'package:weight_loss_consultant_mobile/services/trainer_service.dart';
import 'package:cloud_firestore/cloud_firestore.dart';


class EditProfilePage extends StatefulWidget {
  const EditProfilePage({Key? key}) : super(key: key);

  @override
  _EditProfilePageState createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {

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



  final _formKey = GlobalKey<FormState>();
  var _gender = "Female";
  String regionPrefix = "+1";

  final TextEditingController _phoneNumber = TextEditingController();
  final TextEditingController _email = TextEditingController();
  final TextEditingController _dob = TextEditingController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value) {
        setState(() {

        });
      });
    });
  }


  Widget _inputWidget(
    TextEditingController controller,
    TextInputType type,
    String label,
    String hint,
    Function onChange,
    List<String> prefixRegionPhone,
    bool haveDropdown,
    bool haveSuffixIcon,
    IconData icon,
    String initialValue,
    bool isEditable,
  ) {
    controller.text = initialValue;
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 20),
      height: 64,
      decoration: const BoxDecoration(
          color: Color(0xFFF0F3F6),
          borderRadius: BorderRadius.all(Radius.circular(20))),
      child: Column(
        children: [
          Align(
            alignment: Alignment.topLeft,
            child: Text(
              label,
              style: const TextStyle(
                  color: Color(0xFF0D3F67),
                  fontSize: 11,
                  fontWeight: FontWeight.w900),
            ),
          ),
          Expanded(
            child: Row(
              children: [
                haveDropdown
                    ? Expanded(
                        flex: 1,
                        child: DropdownButton(
                          value: regionPrefix,
                          onChanged: (String? newValue) {
                            setState(() {
                              regionPrefix = newValue!;
                            });
                          },
                          icon: const Icon(Icons.keyboard_arrow_down,
                              color: Color(0xFF0D3F67), size: 15),
                          style: const TextStyle(color: Colors.deepPurple),
                          underline: const SizedBox(),
                          items: prefixRegionPhone
                              .map<DropdownMenuItem<String>>((String prefix) {
                            return DropdownMenuItem<String>(
                              value: prefix,
                              child: Text(
                                prefix,
                                style: const TextStyle(
                                    color: Color(0xFFFF3939),
                                    fontSize: 14,
                                    fontWeight: FontWeight.w900),
                              ),
                            );
                          }).toList(),
                        ),
                      )
                    : const SizedBox(),
                Expanded(
                    flex: 9,
                    child: Container(
                      margin: haveDropdown
                          ? const EdgeInsets.only(left: 5)
                          : const EdgeInsets.only(left: 0),
                      child: TextFormField(
                        enabled: isEditable,
                        controller: controller,
                        keyboardType: TextInputType.phone,
                        style: const TextStyle(fontSize: 15),
                        decoration: InputDecoration(
                          suffixIcon: haveSuffixIcon
                              ? Padding(
                                  padding: const EdgeInsets.only(top: 8),
                                  child: Icon(
                                    icon,
                                    color: const Color(0xFF0D3F67),
                                    size: 20,
                                  ),
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
                    ))
              ],
            ),
          )
        ],
      ),
    );
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("Edit Profile"),
      body: Container(
        padding: const EdgeInsets.fromLTRB(20, 25, 20, 20),
        margin: const EdgeInsets.only(top: 20),
        width: double.infinity,
        height: double.infinity,
        decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(36)),
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.2),
                spreadRadius: 8,
                blurRadius: 7,
                offset: const Offset(0, 3),
              )
            ]),
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              _title('Personal Info'),
              const SizedBox(
                height: 20,
              ),
              Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      _inputWidget(
                          _email,
                          TextInputType.emailAddress,
                          'Email',
                          'E,g: yourname@gmail.com',
                              () {},
                          [],
                          false,
                          false,
                          Icons.add,
                          user.email ?? "",
                          false
                      ),
                      const SizedBox(
                        height: 15,
                      ),
                      _inputWidget(
                          _phoneNumber,
                          TextInputType.phone,
                          "Phone Number",
                          "000 - 0000 - 0000",
                              () {},
                          [],
                          false,
                          false,
                          Icons.add,
                          user.phone ?? "",
                          true
                      ),

                      const SizedBox(
                        height: 15,
                      ),
                      Padding(
                        padding: const EdgeInsets.only(left: 20),
                        child: Align(
                          alignment: Alignment.topLeft,
                          child: Text(
                            'Gender',
                            style: TextStyle(
                                fontSize: 13,
                                color: AppColors.PRIMARY_WORD_COLOR,
                                fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(left: 7.5),
                        child: Row(
                          children: [
                            Expanded(
                              child: ListTile(
                                horizontalTitleGap: 1,
                                contentPadding: EdgeInsets.zero,
                                title: const Text(
                                  'Male',
                                  style: TextStyle(
                                      color: Color(0xFF0D3F67),
                                      fontSize: 15,
                                      fontWeight: FontWeight.w400),
                                ),
                                leading: Radio<String>(
                                  activeColor: const Color(0xFFFF3939),
                                  groupValue: _gender,
                                  value: "Male",
                                  onChanged: (value) {
                                    setState(() {
                                      _gender = value!;
                                    });
                                  },
                                ),
                              ),
                            ),
                            Expanded(
                              child: ListTile(
                                horizontalTitleGap: 0,
                                title: const Text(
                                  'Female',
                                  style: TextStyle(
                                      color: Color(0xFF0D3F67),
                                      fontSize: 15,
                                      fontWeight: FontWeight.w400),
                                ),
                                leading: Radio<String>(
                                  activeColor: const Color(0xFFFF3939),
                                  groupValue: _gender,
                                  value: "Female",
                                  onChanged: (value) {
                                    setState(() {
                                      _gender = value!;
                                    });
                                  },
                                ),
                              ),
                            )
                          ],
                        ),
                      ),
                      _inputWidget(
                          _dob,
                          TextInputType.datetime,
                          "Date of Birth",
                          "dd/mm/yyyy",
                          () {},
                          [],
                          false,
                          true,
                          Icons.calendar_today_outlined,
                          DateFormat("MMMM-dd-yyyy").format(DateTime.fromMicrosecondsSinceEpoch(int.parse(user.dob ?? ""))).toString(),
                          true
                      ),

                      const SizedBox(
                        height: 25,
                      ),
                      ElevatedButton(
                        onPressed: () async {
                          if (_formKey.currentState!.validate()){
                            _formKey.currentState?.save();
                            user.phone = _phoneNumber.text;
                            user.dob = Timestamp.fromDate(DateFormat("MMMM-dd-yyyy").parse(_dob.text)).millisecondsSinceEpoch.toString();
                            user.gender = _gender == "Female" ? Gender.female.value.toString() : Gender.male.value.toString();
                            saveAccount();
                            if (user.role == Role.trainer.value || user.role == Role.admin.value){
                              TrainerService trainerService = TrainerService();
                              bool result =  await trainerService.updateTrainerProfile(user);
                              if (result){
                                CustomToast.makeToast("Save successfully");
                              } else {
                                CustomToast.makeToast("Some thing went wrong! Try again");
                              }
                            }
                          }
                        },
                        child: const Text(
                          'Save',
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 16,
                              fontWeight: FontWeight.w700),
                        ),
                        style: ButtonStyle(
                            minimumSize: MaterialStateProperty.all<Size>(
                                const Size(double.infinity, 64)),
                            backgroundColor: MaterialStateProperty.all<Color>(
                                const Color(0xFFFF3939)),
                            shape: MaterialStateProperty.all<
                                    RoundedRectangleBorder>(
                                const RoundedRectangleBorder(
                                    borderRadius: BorderRadius.all(
                                        Radius.circular(18))))),
                      )
                    ],
                  ))
            ],
          ),
        ),
      ),
    );
  }
}
