import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/constants/enums.dart';
import 'package:weight_loss_consultant_mobile/constants/form_error_messages.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:weight_loss_consultant_mobile/services/authentication_service.dart';
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

  void _showLoginError(){
    showDialog(
        context: context,
        builder: (ctx) => Dialog(
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(4.0)
            ),
            child: Stack(
              clipBehavior: Clip.none, alignment: Alignment.topCenter,
              children: [
                SizedBox(
                  height: 200,
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(10, 60, 10, 10),
                    child: Column(
                        children: [
                          const Center(
                            child: Text(
                              "Wrong email or password",
                              style: TextStyle(
                                color:  Colors.redAccent,
                              ),
                            )
                          ),
                          SizedBox(height: 20,),
                          RaisedButton(onPressed: () {
                            Navigator.of(context).pop();
                          },
                            color: Colors.redAccent,
                            child: const Text('Okay', style: TextStyle(color: Colors.white),),
                          )
                        ]
                    ),
                  ),
                ),
                const Positioned(
                    top: -35,
                    child: CircleAvatar(
                      backgroundColor: Colors.redAccent,
                      radius: 40,
                      child: Icon(Icons.warning, color: Colors.white, size: 50,),
                    )
                ),
              ],
            )
        )
    );
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
              const SizedBox(width: double.infinity),
              const Align(
                alignment: Alignment.topLeft,
                child: Image(
                  image: AssetImage("assets/logo/app-logo.png"),
                  width: 120,
                ),
              ),
              Container(
                margin: const EdgeInsets.fromLTRB(0, 0, 0, 20),
                child: Align(
                    alignment: Alignment.topLeft,
                    child: SizedBox(
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
                        padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 20),
                        margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 0),
                        decoration: BoxDecoration(
                            color: AppColors.INPUT_COLOR,
                            borderRadius: const BorderRadius.all(Radius.circular(20))),
                        child: TextFormField(
                          controller: _email,
                          validator: (email) {
                            /*if (Validator.isEmailValid(email as String))
                              return null;
                            else
                              return FormErrorMessage.emailInvalid;*/
                          },
                          keyboardType: TextInputType.emailAddress,
                          style: const TextStyle(fontSize: 30),
                          decoration: InputDecoration(
                            floatingLabelBehavior: FloatingLabelBehavior.always,
                            border: InputBorder.none,
                            labelText: 'Email',
                            labelStyle: TextStyle(
                                fontSize: 15,
                                color: AppColors.PRIMARY_WORD_COLOR,
                                fontWeight: FontWeight.bold),
                            errorStyle: const TextStyle(height: 0.1),
                          ),
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 20),
                        margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 0),

                        decoration: BoxDecoration(
                            color: AppColors.INPUT_COLOR,
                            borderRadius: const BorderRadius.all(Radius.circular(20))),
                        child: TextFormField(
                          controller: _password,
                          validator: (password){
                            if (password!.isNotEmpty) {
                              return null;
                            } else {
                              return FormErrorMessage.passwordInvalid;
                            }
                          },
                          obscureText: !_passwordVisible,
                          enableSuggestions: false,
                          autocorrect: false,
                          style: const TextStyle(fontSize: 30),
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
                        margin: const EdgeInsets.fromLTRB(0, 10, 0, 20),
                        child: RaisedButton(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20.0),
                          ),
                          textColor: Colors.white,
                          color: AppColors.PRIMARY_COLOR,
                          onPressed: () async {
                            if (_formKey.currentState!.validate()) {
                              _formKey.currentState?.save();
                              AuthenticationService service = AuthenticationService();
                              String email = _email.text;
                              String password = _password.text;
                              AccountModel? user = await service.login(email, password);
                              if (user == null) {
                                _showLoginError();
                                return;
                              }
                              if (user.status == AccountStatus.active.value ) {
                                if (user.role == Role.customer.value){
                                  Navigator.pushNamedAndRemoveUntil(context, RoutePath.customerHomePage, (route) => false);
                                } else if (user.role == Role.trainer.value){
                                  Navigator.pushNamedAndRemoveUntil(context, RoutePath.trainerHomePage, (route) => false);
                                } else{
                                  Navigator.pushNamedAndRemoveUntil(context, RoutePath.trainerHomePage, (route) => false);
                                }
                              }
                            }
                          },
                          child: const Text(
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
                  child: Text(
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
              const SizedBox(
                height: 40,
              ),
              Text(
                  "Connect with your social account",
                  style: TextStyle(
                      color: HexColor("#B6C5D1"),
                  )
              ),
              const SizedBox(
                height: 20,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SvgPicture.asset('assets/logo/google-logo.svg'),
                  const SizedBox(
                    width: 40,
                  ),
                  SvgPicture.asset('assets/logo/facebook-logo.svg'),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
