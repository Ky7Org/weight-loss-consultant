class LoginService{
  String email;
  String password;

  LoginService({this.email = "", this.password = ""});

  Future<dynamic> login() async {
    //TODO: register API
    Map result = {
      "fullname": "BanhsBao"
    };
    return result;
  }
}
