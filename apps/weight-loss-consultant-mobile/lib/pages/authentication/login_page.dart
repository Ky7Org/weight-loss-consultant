import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/constants/form_error_messages.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:weight_loss_consultant_mobile/services/login_service.dart';
import 'package:weight_loss_consultant_mobile/utils/validator.dart';


class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  bool _passwordVisible = false;

  final TextEditingController _email = TextEditingController();
  final TextEditingController _password = TextEditingController();

  @override
  void initState() {
    _passwordVisible = false;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("Sign in"),
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
                  image: AssetImage("assets/logo.png"),
                  width: 120,
                ),
              ),
              Container(
                margin: EdgeInsets.fromLTRB(0, 0, 0, 20),
                child: Align(
                    alignment: Alignment.topLeft,
                    child: Container(
                      width: 200,
                      child: Text(
                        "Welcome back!",
                        style: TextStyle(
                            fontSize: 36,
                            fontWeight: FontWeight.bold,
                            color: AppColors.PRIMARY_WORD_COLOR
                        ),
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
                          controller: _email,
                          validator: (email) {
                            if (Validator.isEmailValid(email as String))
                              return null;
                            else
                              return FormErrorMessage.emailInvalid;
                          },
                          keyboardType: TextInputType.emailAddress,
                          style: TextStyle(fontSize: 30),
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
                          validator: (password){
                            if (!password!.isEmpty)
                              return null;
                            else
                              return FormErrorMessage.passwordInvalid;
                          },
                          obscureText: !_passwordVisible,
                          enableSuggestions: false,
                          autocorrect: false,
                          style: TextStyle(fontSize: 30),
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
                            labelText: 'Password',
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
                              LoginService service = LoginService(
                                email: _email.text,
                                password: _password.text,
                              );
                              dynamic result = await service.login();
                              if (result != null) {
                                Navigator.pushReplacementNamed(context, RoutePath.customerHomePage, arguments: {
                                  "fullname": result["fullname"] as String
                                });
                              }
                            }
                          },
                          child: Text(
                            "Sign in",
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ],
                  )),
              InkWell(
                  child: new Text(
                      "Forget password?",
                    style: TextStyle(
                      fontSize: 15,
                      color: AppColors.PRIMARY_WORD_COLOR,
                      fontWeight: FontWeight.bold
                    ),
                  ),
                  onTap: () {
                    Navigator.pushNamed(context, RoutePath.recoverPasswordPage);
                  }
              ),
              SizedBox(
                height: 40,
              ),
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
                  SvgPicture.asset('assets/Google.svg'),
                  SizedBox(
                    width: 40,
                  ),
                  SvgPicture.asset('assets/Facebook.svg'),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
