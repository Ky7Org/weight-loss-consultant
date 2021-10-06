import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';

class EditProfilePage extends StatefulWidget {
  const EditProfilePage({Key? key}) : super(key: key);

  @override
  _EditProfilePageState createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {
  final _formKey = GlobalKey<FormState>();
  String _gender = "Female";

  final TextEditingController _phoneNumber = TextEditingController();
  final TextEditingController _email = TextEditingController();
  final TextEditingController _dob = TextEditingController();
  final TextEditingController _illness = TextEditingController();
  final TextEditingController _record = TextEditingController();

  Widget _illnessWidget(String name) {
    return ElevatedButton(
      onPressed: () {
        return null;
      },
      child: Row(
        children: [
          Text(
            name,
            style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w900,
                color: Color(0xffffffff)),
          ),
          SizedBox(
            width: 5,
          ),
          Icon(
            Icons.highlight_remove,
            size: 20,
          )
        ],
      ),
      style: ButtonStyle(
          // maximumSize:
          //     MaterialStateProperty.all<Size>(Size(20, 20)),
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
            children: [
              const Align(
                alignment: Alignment.topLeft,
                child: Text(
                  'Personal Info',
                  style: TextStyle(
                      color: Color(0xFF0D3F67),
                      fontWeight: FontWeight.w700,
                      fontSize: 18),
                ),
              ),
              Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                            vertical: 0, horizontal: 20),
                        margin: const EdgeInsets.fromLTRB(0, 20, 0, 10),
                        height: 64,
                        decoration: const BoxDecoration(
                            color: Color(0xFFF0F3F6),
                            borderRadius:
                                BorderRadius.all(Radius.circular(20))),
                        child: TextFormField(
                          controller: _phoneNumber,
                          keyboardType: TextInputType.phone,
                          style: const TextStyle(fontSize: 15),
                          decoration: InputDecoration(
                            floatingLabelBehavior: FloatingLabelBehavior.always,
                            border: InputBorder.none,
                            labelText: 'Phone Number',
                            labelStyle: TextStyle(
                                fontSize: 13,
                                color: AppColors.PRIMARY_WORD_COLOR,
                                fontWeight: FontWeight.bold),
                            hintText: "000 - 0000 - 0000",
                            hintStyle: const TextStyle(
                                color: Color(0xFFB6C5D1),
                                fontWeight: FontWeight.w400,
                                fontSize: 15),
                            errorStyle: const TextStyle(height: 0.1),
                          ),
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            vertical: 0, horizontal: 20),
                        margin: const EdgeInsets.fromLTRB(0, 10, 0, 20),
                        height: 64,
                        decoration: const BoxDecoration(
                            color: Color(0xFFF0F3F6),
                            borderRadius:
                                BorderRadius.all(Radius.circular(20))),
                        child: TextFormField(
                          controller: _email,
                          keyboardType: TextInputType.emailAddress,
                          style: const TextStyle(fontSize: 15),
                          decoration: InputDecoration(
                            floatingLabelBehavior: FloatingLabelBehavior.always,
                            border: InputBorder.none,
                            labelText: 'Email',
                            labelStyle: TextStyle(
                                fontSize: 13,
                                color: AppColors.PRIMARY_WORD_COLOR,
                                fontWeight: FontWeight.bold),
                            hintText: "E,g: yourname@gmail.com",
                            hintStyle: const TextStyle(
                                color: Color(0xFFB6C5D1),
                                fontWeight: FontWeight.w400,
                                fontSize: 15),
                            errorStyle: const TextStyle(height: 0.1),
                          ),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.only(left: 20),
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
                        padding: EdgeInsets.only(left: 7.5),
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
                                  activeColor: Color(0xFFFF3939),
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
                                  activeColor: Color(0xFFFF3939),
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
                      Container(
                        padding: const EdgeInsets.symmetric(
                            vertical: 0, horizontal: 20),
                        margin: const EdgeInsets.fromLTRB(0, 10, 0, 30),
                        height: 64,
                        decoration: const BoxDecoration(
                            color: Color(0xFFF0F3F6),
                            borderRadius:
                                BorderRadius.all(Radius.circular(20))),
                        child: TextFormField(
                          controller: _dob,
                          keyboardType: TextInputType.datetime,
                          style: const TextStyle(fontSize: 15),
                          decoration: InputDecoration(
                            suffixIcon: Padding(
                              padding: EdgeInsets.only(top: 8),
                              child: Icon(
                                Icons.calendar_today_outlined,
                                color: Color(0xFF0D3F67),
                                size: 20,
                              ),
                            ),
                            floatingLabelBehavior: FloatingLabelBehavior.always,
                            border: InputBorder.none,
                            labelText: 'Date of Birth',
                            labelStyle: TextStyle(
                                fontSize: 13,
                                color: AppColors.PRIMARY_WORD_COLOR,
                                fontWeight: FontWeight.bold),
                            hintText: "dd/mm/yyyy",
                            hintStyle: const TextStyle(
                                color: Color(0xFFB6C5D1),
                                fontWeight: FontWeight.w400,
                                fontSize: 15),
                            errorStyle: const TextStyle(height: 0.1),
                          ),
                        ),
                      ),
                      const Align(
                        alignment: Alignment.topLeft,
                        child: Text(
                          'Campaign Info',
                          style: TextStyle(
                              color: Color(0xFF0D3F67),
                              fontWeight: FontWeight.w700,
                              fontSize: 18),
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            vertical: 0, horizontal: 20),
                        margin: const EdgeInsets.fromLTRB(0, 10, 0, 30),
                        height: 110,
                        decoration: const BoxDecoration(
                            color: Color(0xFFF0F3F6),
                            borderRadius:
                                BorderRadius.all(Radius.circular(20))),
                        child: Column(
                          children: [
                            TextFormField(
                              controller: _illness,
                              keyboardType: TextInputType.datetime,
                              style: const TextStyle(fontSize: 15),
                              decoration: InputDecoration(
                                floatingLabelBehavior:
                                    FloatingLabelBehavior.always,
                                border: InputBorder.none,
                                labelText: 'Illness',
                                labelStyle: TextStyle(
                                    fontSize: 13,
                                    color: AppColors.PRIMARY_WORD_COLOR,
                                    fontWeight: FontWeight.bold),
                                hintText: "E,g: Asthma",
                                hintStyle: const TextStyle(
                                    color: Color(0xFFB6C5D1),
                                    fontWeight: FontWeight.w400,
                                    fontSize: 15),
                                errorStyle: const TextStyle(height: 0.1),
                              ),
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceAround,
                              children: [
                                _illnessWidget('Asthma'),
                                _illnessWidget('Low Blood Sugar')
                              ],
                            )
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            vertical: 0, horizontal: 20),
                        margin: const EdgeInsets.fromLTRB(0, 10, 0, 10),
                        height: 64,
                        decoration: const BoxDecoration(
                            color: Color(0xFFF0F3F6),
                            borderRadius:
                                BorderRadius.all(Radius.circular(20))),
                        child: TextFormField(
                          controller: _record,
                          keyboardType: TextInputType.text,
                          style: const TextStyle(fontSize: 15),
                          decoration: InputDecoration(
                            suffixIcon: Padding(
                              padding: EdgeInsets.only(top: 8),
                              child: Icon(
                                Icons.attach_file,
                                color: Color(0xFF0D3F67),
                                size: 20,
                              ),
                            ),
                            floatingLabelBehavior: FloatingLabelBehavior.always,
                            border: InputBorder.none,
                            labelText: 'Upload your Campaign Record',
                            labelStyle: TextStyle(
                                fontSize: 13,
                                color: AppColors.PRIMARY_WORD_COLOR,
                                fontWeight: FontWeight.bold),
                            hintText: "Pdf or Doc files allowed",
                            hintStyle: const TextStyle(
                                color: Color(0xFFB6C5D1),
                                fontWeight: FontWeight.w400,
                                fontSize: 15),
                            errorStyle: const TextStyle(height: 0.1),
                          ),
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            vertical: 0, horizontal: 20),
                        margin: const EdgeInsets.fromLTRB(0, 10, 0, 20),
                        height: 64,
                        decoration: const BoxDecoration(
                            color: Color(0xFFF0F3F6),
                            borderRadius:
                            BorderRadius.all(Radius.circular(20))),
                        child: TextFormField(
                          controller: _phoneNumber,
                          keyboardType: TextInputType.phone,
                          style: const TextStyle(fontSize: 15),
                          decoration: InputDecoration(
                            floatingLabelBehavior: FloatingLabelBehavior.always,
                            border: InputBorder.none,
                            labelText: 'Emergency Contact',
                            labelStyle: TextStyle(
                                fontSize: 13,
                                color: AppColors.PRIMARY_WORD_COLOR,
                                fontWeight: FontWeight.bold),
                            hintText: "000 - 0000 - 0000",
                            hintStyle: const TextStyle(
                                color: Color(0xFFB6C5D1),
                                fontWeight: FontWeight.w400,
                                fontSize: 15),
                            errorStyle: const TextStyle(height: 0.1),
                          ),
                        ),
                      ),
            ElevatedButton(
              onPressed: () => null,
              child: Text(
                'Save',
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: FontWeight.w700),
              ),
              style: ButtonStyle(
                  minimumSize: MaterialStateProperty.all<Size>(Size(double.infinity, 64)),
                  backgroundColor: MaterialStateProperty.all<Color>(Color(0xFFFF3939)),
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                          borderRadius: BorderRadius.all(Radius.circular(18))
                      )
                  )
              ),
            )],
                  ))
            ],
          ),
        ),
      ),
    );
  }
}
