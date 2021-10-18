import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/custom_dialog.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/account_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/exercise_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/services/exercise_service.dart';


class TodayExerciseScreen extends StatefulWidget {

  const TodayExerciseScreen({Key? key}) : super(key: key);

  @override
  _TodayExerciseScreenState createState() => _TodayExerciseScreenState();
}

class _TodayExerciseScreenState extends State<TodayExerciseScreen> {

  List<ExerciseModel> _exercises = List.empty(growable: true);
  AccountModel user = AccountModel(email: "", fullname: "");

  Future<void> initAccount() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? userJSON = prefs.getString('ACCOUNT');
    if (userJSON is String){
      Map<String, dynamic> userMap = jsonDecode(userJSON);
      user = AccountModel.fromJson(userMap);
    }
  }

  Future<void> saveAccount() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString("ACCOUNT", jsonEncode(user.toJson()));
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value) {
        DateTime now = DateTime.now();
        DateTime today = DateTime(now.year, now.month, now.day);
        _exercises = user.scheduleModel!.data[today]!.dailyExerciseModel.exerciseList;
      });
      setState(() {});
    });

  }

  PreferredSize _buildAppBar(){
    return PreferredSize(
        preferredSize: Size.fromHeight(100),
        child: AppBar(
          title: Text('Today Exercise'),
          flexibleSpace: Container(
            decoration: BoxDecoration(
                image: DecorationImage(
                  fit: BoxFit.cover,
                  colorFilter: ColorFilter.mode(Colors.black.withOpacity(0.4), BlendMode.darken),
                  image: NetworkImage("https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1738&q=80"),
                )
            ),
          ),
          centerTitle: false,
          titleSpacing: 0,
          titleTextStyle: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w600
          ),
          backgroundColor: Colors.transparent,
        )
    );
  }

  List<Widget> _buildListExercise(){
    List<Widget> list = List.empty(growable: true);
    for (int i=0; i< _exercises.length; i++){
      Widget widget = GestureDetector(
        onTap: (){
          showDialog(context: context,
              builder: (BuildContext context){
                return CustomDialogBox(
                  title: _exercises[i].name,
                  descriptions: _exercises[i].details,
                  img: Image(
                    image: AssetImage(_exercises[i].thumbnailPath),
                  ),
                  videoPath: _exercises[i].videoPath,
                );
              }
          );
        },
        child: Container(
            padding: const EdgeInsets.symmetric(vertical: 5),
            child: Row(
                children: [
                  const Icon(Icons.menu),
                  const SizedBox(width: 20,),
                  Image(
                    image: AssetImage(_exercises[i].thumbnailPath),
                    height: 100,
                    width: 100,
                  ),
                  const SizedBox(width: 20,),
                  Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          width: 150,
                          child: Text(
                            _exercises[i].name,
                            style: const TextStyle(
                              fontSize: 17,
                              fontWeight: FontWeight.w900,
                            )
                          ),
                        ),
                        const SizedBox(height: 10,),
                        Text(
                          _exercises[i].unit,
                          style: const TextStyle(
                            color: Colors.grey,
                          )
                        ),
                      ]
                  )
                ]
            )
        ),
      );
      list.add(widget);
      list.add(const Divider(thickness: 1,));
    }
    return list;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            children: [
              Row(
                children: [
                  Icon(
                    Icons.label_outline,
                    color: Colors.blueAccent,
                  ),
                  SizedBox(width: 5,),
                  Text(
                    "20 mins",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 15
                    )
                  ),
                  Icon(
                    Icons.remove
                  ),
                  Text("${_exercises.length} workouts",
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 15
                    )
                  ),
                ],
              ),
              const Divider(thickness: 1,),
              Column(
                children: _buildListExercise(),
              )
            ],
          ),
        ),
      ),
    );
  }
}
