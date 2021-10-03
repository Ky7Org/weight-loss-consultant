class LoginService {
  String email;
  String password;

  LoginService({this.email = "", this.password = ""});

  Future<dynamic> login() async {
    //TODO: register API
    if (email == "banhsbao@gmail.com") {
      Map result = {
        "fullname": "BanhsBao",
        "isFirstTime": true,
      };
      return result;
    }
    Map result = {
      "fullname": "BanhsBao",
      "isFirstTime": false,
    };
    return result;
  }
}
