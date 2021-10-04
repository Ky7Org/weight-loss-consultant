import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/constants/form_error_messages.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:weight_loss_consultant_mobile/services/reset_password_service.dart';

class ResetPasswordPage extends StatefulWidget {
  late Map<dynamic, dynamic> data;

  ResetPasswordPage({Key? key, required this.data}) : super(key: key);

  @override
  _ResetPasswordPageState createState() => _ResetPasswordPageState();
}

class _ResetPasswordPageState extends State<ResetPasswordPage> {
  final _formKey = GlobalKey<FormState>();
  bool _passwordVisible = false;
  bool _confirmPasswordVisible = false;

  final TextEditingController _verifyCodeController =
      new TextEditingController();
  final TextEditingController _passwordController = new TextEditingController();
  final TextEditingController _confirmController = new TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("Recover Password"),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 60),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(width: double.infinity),
              Align(
                  alignment: Alignment.topLeft,
                  child: Container(
                    width: 200,
                    child: Text(
                      "Recover password",
                      style: TextStyle(
                        fontSize: 36,
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                  )),
              Align(
                  alignment: Alignment.topLeft,
                  child: Container(
                    margin: EdgeInsets.fromLTRB(0, 20, 0, 30),
                    width: 250,
                    child: RichText(
                      text: TextSpan(
                          text: 'Verification code has been sent to ',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w700,
                            color: AppColors.PRIMARY_WORD_COLOR,
                          ),
                          children: <TextSpan>[
                            TextSpan(
                                text: widget.data["email"],
                                style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w700,
                                    color: AppColors.BUTTON_COLOR)),
                          ]),
                    ),
                  )),
              Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      Container(
                        padding:
                            EdgeInsets.symmetric(vertical: 2, horizontal: 20),
                        height: 75,
                        margin:
                            EdgeInsets.symmetric(vertical: 5, horizontal: 0),
                        decoration: BoxDecoration(
                            color: AppColors.INPUT_COLOR,
                            borderRadius:
                                BorderRadius.all(Radius.circular(20))),
                        child: TextFormField(
                          controller: _verifyCodeController,
                          validator: (validationCode) {
                            if (!validationCode!.isEmpty){
                              return null;
                            }
                            return FormErrorMessage.otpCodeInvalid;
                          },
                          keyboardType: TextInputType.emailAddress,
                          style: TextStyle(fontSize: 20),
                          decoration: InputDecoration(
                            hintText: 'E,g: xxx - xxx - xxx',
                            hintStyle: TextStyle(
                                fontSize: 15,
                                fontWeight: FontWeight.w600,
                                color: AppColors.PLACE_HOLDER),
                            floatingLabelBehavior: FloatingLabelBehavior.always,
                            border: InputBorder.none,
                            labelText: 'Verify code',
                            labelStyle: TextStyle(
                                fontSize: 17,
                                color: AppColors.PRIMARY_WORD_COLOR,
                                fontWeight: FontWeight.w900),
                            errorStyle: TextStyle(height: 0.1),
                          ),
                        ),
                      ),
                      Container(
                        padding:
                            EdgeInsets.symmetric(vertical: 2, horizontal: 20),
                        height: 75,
                        margin:
                            EdgeInsets.symmetric(vertical: 10, horizontal: 0),
                        decoration: BoxDecoration(
                            color: AppColors.INPUT_COLOR,
                            borderRadius:
                                BorderRadius.all(Radius.circular(20))),
                        child: TextFormField(
                          controller: _passwordController,
                          validator: (password) {
                            if (!password!.isEmpty)
                              return null;
                            else
                              return FormErrorMessage.passwordInvalid;
                          },
                          obscureText: !_passwordVisible,
                          enableSuggestions: false,
                          autocorrect: false,
                          style: TextStyle(fontSize: 20),
                          decoration: InputDecoration(
                            suffixIcon: IconButton(
                              icon: Icon(
                                // Based on passwordVisible state choose the icon
                                _passwordVisible
                                    ? Icons.visibility
                                    : Icons.visibility_off,
                                color: Theme.of(context).primaryColorDark,
                              ),
                              onPressed: () {
                                // Update the state i.e. toogle the state of passwordVisible variable
                                setState(() {
                                  _passwordVisible = !_passwordVisible;
                                });
                              },
                            ),
                            floatingLabelBehavior: FloatingLabelBehavior.always,
                            border: InputBorder.none,
                            labelText: 'New-password',
                            labelStyle: TextStyle(
                                fontSize: 17,
                                color: AppColors.PRIMARY_WORD_COLOR,
                                fontWeight: FontWeight.w900),
                          ),
                        ),
                      ),
                      Container(
                        padding:
                            EdgeInsets.symmetric(vertical: 2, horizontal: 20),
                        height: 75,
                        margin:
                            EdgeInsets.symmetric(vertical: 10, horizontal: 0),
                        decoration: BoxDecoration(
                            color: AppColors.INPUT_COLOR,
                            borderRadius:
                                BorderRadius.all(Radius.circular(20))),
                        child: TextFormField(
                          validator: (val) {
                            if (val!.isEmpty)
                              return FormErrorMessage.confirmPasswordInvalid;
                            if (val != _passwordController.text)
                              return FormErrorMessage.confirmPasswordMissMatch;
                            return null;
                          },
                          controller: _confirmController,
                          obscureText: !_confirmPasswordVisible,
                          enableSuggestions: false,
                          autocorrect: false,
                          style: TextStyle(fontSize: 20),
                          decoration: InputDecoration(
                            suffixIcon: IconButton(
                              icon: Icon(
                                // Based on passwordVisible state choose the icon
                                _confirmPasswordVisible
                                    ? Icons.visibility
                                    : Icons.visibility_off,
                                color: Theme.of(context).primaryColorDark,
                              ),
                              onPressed: () {
                                // Update the state i.e. toogle the state of passwordVisible variable
                                setState(() {
                                  _confirmPasswordVisible =
                                      !_confirmPasswordVisible;
                                });
                              },
                            ),
                            floatingLabelBehavior: FloatingLabelBehavior.always,
                            border: InputBorder.none,
                            labelText: 'Re-new-password',
                            labelStyle: TextStyle(
                                fontSize: 17,
                                color: AppColors.PRIMARY_WORD_COLOR,
                                fontWeight: FontWeight.w900),
                          ),
                        ),
                      ),
                      Container(
                        height: 64,
                        width: double.infinity,
                        margin: const EdgeInsets.fromLTRB(0, 10, 0, 20),
                        child: RaisedButton(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20.0),
                          ),
                          textColor: Colors.white,
                          color: AppColors.PRIMARY_COLOR,
                          onPressed: () async {
                            if (_formKey.currentState!.validate()) {
                              ResetPasswordService service =
                                  ResetPasswordService(
                                      otp: _verifyCodeController.text,
                                      password: _passwordController.text);
                              bool result = await service.resetPassword();
                              if (result) {
                                Navigator.pushNamed(
                                    context, RoutePath.loginPage);
                              }
                            }
                          },
                          child: const Text(
                            "Submit",
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ))
            ],
          ),
        ),
      ),
    );
  }
}
