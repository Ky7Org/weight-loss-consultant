class LoginService{
  String email;
  String password;

  LoginService({this.email = "", this.password = ""});

  Future<dynamic> login() async {
    //TODO: register API
    Map a = {
      "fullname": "BanhsBao"
    };
    return a;
  }
}
