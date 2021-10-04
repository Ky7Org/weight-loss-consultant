class AccountModel {
  late String email;
  late String fullname;
  int level = -1;
  int workoutNum = 0;
  int kcalNum = 0;
  int minute = 0;
  bool isFirstTime = true;

  AccountModel(
      {required this.email,
      required this.fullname,
      this.level = -1,
      this.workoutNum = 0,
      this.kcalNum = 0,
      this.minute = 0,
      this.isFirstTime = true});

  factory AccountModel.fromJson(Map<String, dynamic> parsedJson) {
    return AccountModel(
      email: parsedJson['email'] ?? "",
      fullname: parsedJson['fullname'] ?? "",
      level: parsedJson['level'] ?? -1,
      kcalNum: parsedJson['kcalNum'] ?? 0,
      minute: parsedJson['minute'] ?? 0,
      isFirstTime: parsedJson['isFirstTime'] ?? true,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "email": email,
      "fullname": fullname,
      "level": level,
      "workoutNum": workoutNum,
      "kcalNum": kcalNum,
      "minute": minute,
      "isFirstTime": isFirstTime,
    };
  }
}
