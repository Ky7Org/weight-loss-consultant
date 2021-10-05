class RegisterService {
  String email;
  String password;
  String confirmPassword;

  RegisterService({this.email = "", this.password = "", this.confirmPassword = ""});

  Future<bool> register() async {
    //TODO: register API
    return true;
  }

}
