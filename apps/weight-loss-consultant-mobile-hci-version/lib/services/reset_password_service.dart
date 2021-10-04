class ResetPasswordService{
  String otp;
  String password;
  String confirmPassword;
  ResetPasswordService({this.otp = "", this.password = "", this.confirmPassword = ""});

  Future<bool> resetPassword() async {
    //TODO: register API
    return true;
  }
}
