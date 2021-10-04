import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/generic_appbar.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';
import 'package:weight_loss_consultant_mobile_hci_version/services/reset_password_service.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/constants.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/form_error_message.dart';

class ResetPasswordScreen extends StatefulWidget {
  String email;

  ResetPasswordScreen({Key? key, this.email = ""}) : super(key: key);

  @override
  _ResetPasswordScreenState createState() => _ResetPasswordScreenState();
}

class _ResetPasswordScreenState extends State<ResetPasswordScreen> {

  final _formKey = GlobalKey<FormState>();
  bool _passwordVisible = false;
  bool _confirmPasswordVisible = false;

  final TextEditingController _otpController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController = TextEditingController();


  Widget _buildOTPTextField() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        const Text(
          'OTPCode',
          style: kLabelStyle,
        ),
        const SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          child: TextFormField(
            controller: _otpController,
            keyboardType: TextInputType.emailAddress,
            style: TextStyle(
              color: Colors.white,
              fontFamily: 'OpenSans',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: EdgeInsets.symmetric(vertical: 5, horizontal: 14),
            ),
            validator: (value){
              return null;
            },
          ),
        ),
      ],
    );
  }

  Widget _buildPasswordTextField(){
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        const Text(
          'Password',
          style: kLabelStyle,
        ),
        const SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          child: TextFormField(
            controller: _passwordController,
            obscureText: !_passwordVisible,
            enableSuggestions: false,
            autocorrect: false,
            style: TextStyle(
              color: Colors.white,
              fontFamily: 'OpenSans',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: EdgeInsets.symmetric(vertical: 10, horizontal: 14),
              suffixIcon: IconButton(
                icon: Icon(
                  _passwordVisible ? Icons.visibility : Icons.visibility_off,
                  color: Theme.of(context).primaryColorDark,
                ),
                onPressed: (){
                  setState(() {
                    _passwordVisible = !_passwordVisible;
                  });
                },
              ),
            ),
            validator: (val){
              if (val!.isEmpty)
                return FormErrorMessage.passwordInvalid;
              return null;
            },
          ),
        ),
      ],
    );
  }

  Widget _buildConfirmPasswordTextField(){
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        const Text(
          'Confirm password',
          style: kLabelStyle,
        ),
        const SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          child: TextFormField(
            controller: _confirmPasswordController,
            obscureText: !_confirmPasswordVisible,
            enableSuggestions: false,
            autocorrect: false,
            style: TextStyle(
              color: Colors.white,
              fontFamily: 'OpenSans',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: EdgeInsets.symmetric(vertical: 10, horizontal: 14),
              suffixIcon: IconButton(
                icon: Icon(
                  _confirmPasswordVisible ? Icons.visibility : Icons.visibility_off,
                  color: Theme.of(context).primaryColorDark,
                ),
                onPressed: (){
                  setState(() {
                    _confirmPasswordVisible = !_confirmPasswordVisible;
                  });
                },
              ),
            ),
            validator: (val){
              if(val!.isEmpty)
                return FormErrorMessage.confirmPasswordInvalid;
              if(val != _passwordController.text)
                return FormErrorMessage.confirmPasswordMissMatch;
              return null;
            },
          ),
        ),
      ],
    );
  }

  Widget _buildSubmitBtn() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 25.0),
      width: double.infinity,
      child: RaisedButton(
        elevation: 5.0,
        onPressed: () async {
          if (_formKey.currentState!.validate()) {
            _formKey.currentState?.save();
            ResetPasswordService service = ResetPasswordService(
              otp: _otpController.text,
              password: _passwordController.text,
              confirmPassword: _confirmPasswordController.text,
            );
            bool result = await service.resetPassword();
            if (result) {
              Navigator.pushNamed(context, RoutePath.loginScreen);
            }
          }
        },
        padding: const EdgeInsets.all(15.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(30.0),
        ),
        color: Colors.white,
        child: const Text(
          'SUBMIT',
          style: TextStyle(
            color: Color(0xFF527DAA),
            letterSpacing: 1.5,
            fontSize: 18.0,
            fontWeight: FontWeight.bold,
            fontFamily: 'OpenSans',
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("Reset password"),
      body: AnnotatedRegion<SystemUiOverlayStyle>(
        value: SystemUiOverlayStyle.light,
        child: GestureDetector(
          onTap: () => FocusScope.of(context).unfocus(),
          child: Stack(
            children: <Widget>[
              Container(
                height: double.infinity,
                width: double.infinity,
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Color(0xFF73AEF5),
                      Color(0xFF61A4F1),
                      Color(0xFF478DE0),
                      Color(0xFF398AE5),
                    ],
                    stops: [0.1, 0.4, 0.7, 0.9],
                  ),
                ),
              ),
              SizedBox(
                height: double.infinity,
                child: SingleChildScrollView(
                  physics: const AlwaysScrollableScrollPhysics(),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 40.0,
                    vertical: 50.0,
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      const Text(
                        'Recover\nPassword',
                        style: TextStyle(
                          color: Colors.white,
                          fontFamily: 'OpenSans',
                          fontSize: 30.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(
                        height: 10.0,
                      ),
                      Text(
                        'An verification code has been sent to ${widget.email}',
                        style: TextStyle(
                          color: Colors.white,
                          fontFamily: 'OpenSans',
                          fontSize: 15.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Form(
                          key: _formKey,
                          child: Column(
                            children: [
                              const SizedBox(height: 30.0),
                              _buildOTPTextField(),
                              const SizedBox(height: 30.0),
                              _buildPasswordTextField(),
                              const SizedBox(height: 30.0),
                              _buildConfirmPasswordTextField(),
                              const SizedBox(
                                height: 30.0,
                              ),
                              _buildSubmitBtn(),
                            ],
                          )
                      )

                    ],
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
