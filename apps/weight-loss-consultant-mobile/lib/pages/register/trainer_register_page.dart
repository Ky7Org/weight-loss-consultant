import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/constants/form_error_messages.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:weight_loss_consultant_mobile/services/trainer_register_service.dart';
import 'package:weight_loss_consultant_mobile/utils/validator.dart';

class TrainerRegisterPage extends StatefulWidget {
  const TrainerRegisterPage({Key? key}) : super(key: key);

  @override
  _TrainerRegisterPageState createState() => _TrainerRegisterPageState();
}

class _TrainerRegisterPageState extends State<TrainerRegisterPage> {
  final _formKey = GlobalKey<FormState>();
  late String email;
  late String fullname;
  late String phone;



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("Create Account"),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 30, 20, 30),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(width: double.infinity),
              Align(
                alignment: Alignment.topLeft,
                child: Image(
                  image: AssetImage("assets/app-logo.png"),
                  width: 120,
                ),
              ),
              Container(
                margin: EdgeInsets.fromLTRB(0, 0, 0, 20),
                child: Align(
                    alignment: Alignment.topLeft,
                    child: Text(
                        "Join our Trainer community",
                      style: TextStyle(
                        fontSize: 36,
                        fontWeight: FontWeight.bold,
                        color: AppColors.PRIMARY_WORD_COLOR
                      ),
                    )
                ),
              ),
              Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      Container(
                        padding:
                            EdgeInsets.symmetric(vertical: 5, horizontal: 20),
                        margin:
                            EdgeInsets.symmetric(vertical: 10, horizontal: 0),
                        decoration: BoxDecoration(
                            color: AppColors.INPUT_COLOR,
                            borderRadius: BorderRadius.all(Radius.circular(20))),
                        child: TextFormField(
                          onSaved: (String? value){this.fullname=value as String;},
                          style: TextStyle(fontSize: 20),
                          decoration: InputDecoration(
                            floatingLabelBehavior: FloatingLabelBehavior.always,
                            border: InputBorder.none,
                            labelText: 'Full Name',
                            labelStyle: TextStyle(
                                fontSize: 15,
                                color: AppColors.PRIMARY_WORD_COLOR,
                                fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                      Container(
                        padding:
                            EdgeInsets.symmetric(vertical: 5, horizontal: 20),
                        margin:
                            EdgeInsets.symmetric(vertical: 10, horizontal: 0),
                        decoration: BoxDecoration(
                            color: AppColors.INPUT_COLOR,
                            borderRadius: BorderRadius.all(Radius.circular(20))),
                        child: TextFormField(
                          onSaved: (String? value){this.email=value as String;},
                          validator: (email) {
                            if (Validator.isEmailValid(email as String))
                              return null;
                            else
                              return FormErrorMessage.emailInvalid;
                          },
                          keyboardType: TextInputType.emailAddress,
                          style: TextStyle(fontSize: 20),
                          decoration: InputDecoration(
                            floatingLabelBehavior: FloatingLabelBehavior.always,
                            border: InputBorder.none,
                            labelText: 'Email',
                            labelStyle: TextStyle(
                                fontSize: 15,
                                color: AppColors.PRIMARY_WORD_COLOR,
                                fontWeight: FontWeight.bold),
                            errorStyle: TextStyle(height: 0.1),
                          ),
                        ),
                      ),
                      Container(
                        padding:
                            EdgeInsets.symmetric(vertical: 5, horizontal: 20),
                        margin:
                            EdgeInsets.symmetric(vertical: 10, horizontal: 0),
                        decoration: BoxDecoration(
                            color: AppColors.INPUT_COLOR,
                            borderRadius: BorderRadius.all(Radius.circular(20))),
                        child: TextFormField(
                          onSaved: (String? value){this.phone=value as String;},
                          keyboardType: TextInputType.number,
                          style: TextStyle(fontSize: 20),
                          decoration: InputDecoration(
                            floatingLabelBehavior: FloatingLabelBehavior.always,
                            border: InputBorder.none,
                            labelText: 'Phone number',
                            labelStyle: TextStyle(
                                fontSize: 15,
                                color: AppColors.PRIMARY_WORD_COLOR,
                                fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                      Container(
                        height: 64,
                        width: double.infinity,
                        margin: EdgeInsets.fromLTRB(0, 10, 0, 20),
                        child: RaisedButton(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20.0),
                          ),
                          textColor: Colors.white,
                          color: AppColors.PRIMARY_COLOR,
                          onPressed: () async {
                            if (_formKey.currentState!.validate()) {
                              _formKey.currentState?.save();
                              TrainerRegisterService service = TrainerRegisterService(
                                email: this.email,
                                fullname: this.fullname,
                                phone: this.phone
                              );
                              bool result = await service.registerTrainer();
                              if (result) {
                                Navigator.pushNamed(context, RoutePath.trainerRegisterSuccessfullyPage, arguments: {
                                  "fullname": this.fullname,
                                });
                              }
                            }
                          },
                          child: Text(
                            "Send",
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ],
                  )),
              Text(
                  "Connect with your social account",
                style: TextStyle(
                  color: HexColor("#B6C5D1"),
                )
              ),
              SizedBox(
                height: 20,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SvgPicture.asset('assets/google-logo.svg'),
                  SizedBox(
                    width: 40,
                  ),
                  SvgPicture.asset('assets/facebook-logo.svg'),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}


