import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/custom_dialog.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/toast.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/account_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/exercise_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';
import 'package:weight_loss_consultant_mobile_hci_version/services/exercise_service.dart';


class TodayExerciseScreen extends StatefulWidget {

  const TodayExerciseScreen({Key? key}) : super(key: key);

  @override
  _TodayExerciseScreenState createState() => _TodayExerciseScreenState();
}

class _TodayExerciseScreenState extends State<TodayExerciseScreen> {

  List<ExerciseModel> _exercises = List.empty(growable: true);
  AccountModel user = AccountModel(email: "", fullname: "");
  List<int> selectedIndex = List.empty(growable: true);

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


  void resetSelectedExercise(){
    DateTime now = DateTime.now();
    DateTime today = DateTime(now.year, now.month, now.day);
    _exercises = user.scheduleModel!.data[today]!.dailyExerciseModel.exerciseList;
    for (int i = 0; i < _exercises.length; i++){
      if (user.userTodayExercise.any((element) => element.name == _exercises[i].name)){
        selectedIndex.add(i);
      } else {
        selectedIndex.remove(i);
      }
    }
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value) {
        resetSelectedExercise();
        setState(() {});
      });
    });

  }

  PreferredSize _buildAppBar(){
    return PreferredSize(
        preferredSize: const Size.fromHeight(70),
        child: AppBar(
          title: const Text('Suggestion exercises'),
          leadingWidth: 30,
          flexibleSpace: Container(
            decoration: BoxDecoration(
                image: DecorationImage(
                  fit: BoxFit.cover,
                  colorFilter: ColorFilter.mode(Colors.black.withOpacity(0.4), BlendMode.darken),
                  image: const NetworkImage("https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1738&q=80"),
                )
            ),
          ),
          centerTitle: false,
          titleSpacing: 0,
          titleTextStyle: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w600
          ),
          backgroundColor: Colors.transparent,
          actions: [
            TextButton(
              child: const Text(
                  "Your record",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.w600
                ),
              ),
              onPressed: (){
                Navigator.pushNamed(context, RoutePath.customerTodayDoneExerciseScreen).then((value) {
                  initAccount().then((value){
                    resetSelectedExercise();
                    setState(() {

                    });
                  });
                });
              },
            ),
          ],
        )
    );
  }

  List<Widget> _buildTodoListExercise(){
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
                  Checkbox(
                      value: selectedIndex.contains(i),
                      onChanged: (bool? value){
                          if (value == null) return;
                          if (value){
                            selectedIndex.add(i);
                            user.userTodayExercise.add(_exercises[i]);
                            saveAccount();
                            CustomToast.makeToast("Add successfully");
                          } else {
                            user.userTodayExercise.remove(_exercises[i]);
                            saveAccount();
                            selectedIndex.remove(i);
                          }
                          setState(() {

                          });
                      }
                  ),
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
                        SizedBox(
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
                          "${_exercises[i].calories} kcal",
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


  Widget buildProgress(){
    double indicatorProgress =  (user.getTodayExerciseKcal() / user.getUserTodayExerciseCalorieGoal()) * 350 - 10;
    if (indicatorProgress < 0){
      indicatorProgress = 0;
    }
    if (indicatorProgress > 330){
      indicatorProgress = 330;
    }

    double labelProgress = (user.getTodayExerciseKcal() / user.getUserTodayExerciseCalorieGoal()) * 350 - 10;
    if (labelProgress < 20){
      labelProgress = 20;
    }
    if (labelProgress > 280){
      labelProgress = 280;
    }
    return Column(
      children: [
        const Text("Your exercise goal",
          style: TextStyle(
            fontWeight: FontWeight.w600,
            fontSize: 25,
          ),
        ),
        const SizedBox(height: 10,),
        Stack(
          children: [
            const SizedBox(height: 70,),
            Positioned(
                top: 0,
                left: labelProgress - 20,
                child: Text(
                  "${user.getTodayExerciseKcal()} kcal",
                  style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600
                  ),
                )
            ),
            Positioned(
                top: 13,
                left: indicatorProgress,
                child: const Icon(Icons.arrow_drop_down_sharp)
            ),
            Container(
              margin: const EdgeInsets.symmetric(vertical: 30),
              height: 20,
              width: 700,
              child: ClipRRect(
                borderRadius: const BorderRadius.all(Radius.circular(10)),
                child: LinearProgressIndicator(

                  value: user.getTodayExerciseKcal() / user.getUserTodayExerciseCalorieGoal(),
                  valueColor: const AlwaysStoppedAnimation<Color>(Colors.orange),
                  backgroundColor: Colors.grey.shade400,
                ),
              ),
            ),

            const Positioned(
                top: 55,
                child: Text(
                  "0 kcal",
                  style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600
                  ),
                )
            ),
            Positioned(
                top: 55,
                right: 0,
                child: Text(
                  "${user.getUserTodayExerciseCalorieGoal()} kcal",
                  style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600
                  ),
                )
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildCongratulationMessage(){
    Widget widget = Container();
    if (user.getTodayExerciseKcal() >= user.getUserTodayExerciseCalorieGoal()){
      widget = Container(
        height: 50,
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 20),
        color: Colors.green,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Icon(
              Icons.star,
              color: Colors.white,
            ),
            SizedBox(width: 10,),
            Text(
                "You've reach your goal today",
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: FontWeight.w600
                )
            )
          ],
        ),
      );
    }
    return widget;

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: Stack(
        children: [
          SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                children: [
                  SizedBox(height: user.getTodayExerciseKcal() >= user.getUserTodayExerciseCalorieGoal() ? 50 : 0,),
                  buildProgress(),
                  const SizedBox(height: 10,),
                  Column(
                    children: _buildTodoListExercise(),
                  )
                ],
              ),
            ),
          ),
          _buildCongratulationMessage(),
        ],
      ),
    );
  }
}
