import 'package:flutter/cupertino.dart';

class AccountModel extends ChangeNotifier{
  late String _fullname;
  late String _email;
  late int _workoutLevel;
  late int _workoutNum;
  late int _kcalNum;
  late int _minuteNum;

  String get fullname => _fullname;

  set fullname(String value) {
    _fullname = value;
    notifyListeners();
  }

  String get email => _email;

  set email(String value) {
    _email = value;
    notifyListeners();
  }

  int get minuteNum => _minuteNum;

  set minuteNum(int value) {
    _minuteNum = value;
    notifyListeners();
  }

  int get kcalNum => _kcalNum;

  set kcalNum(int value) {
    _kcalNum = value;
    notifyListeners();
  }

  int get workoutNum => _workoutNum;

  set workoutNum(int value) {
    _workoutNum = value;
    notifyListeners();
  }

  int get workoutLevel => _workoutLevel;

  set workoutLevel(int value) {
    _workoutLevel = value;
    notifyListeners();
  }
}
