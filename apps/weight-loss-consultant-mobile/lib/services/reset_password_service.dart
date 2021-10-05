class ResetPasswordService{
  String otp;
  String password;

  ResetPasswordService({required this.otp, required this.password});

  Future<bool> resetPassword() async {
    //TODO: call API
    return true;
  }
}
