import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/custom_dialog.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/customer_appbar.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/account_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/customer_history_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/diet_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/exercise_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/user_daily_task.dart';


class CustomerHistoryDetailScreen extends StatefulWidget {
  DateTime date;
  CustomerHistoryDetailScreen({Key? key, required this.date}) : super(key: key);

  @override
  _CustomerHistoryDetailScreenState createState() => _CustomerHistoryDetailScreenState();
}

class _CustomerHistoryDetailScreenState extends State<CustomerHistoryDetailScreen>
    with SingleTickerProviderStateMixin{
  late TabController _tabController;
  AccountModel user = AccountModel(email: "", fullname: "");
  List<ExerciseModel> _exercises = List.empty(growable: true);
  List<DietModel> _todayDiets = [];
  CustomerHistoryModel? historyModel;
  UserDailyTask? task;

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
    _tabController = TabController(length: 2, vsync: this);
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value) {
        historyModel = user.userHistory.firstWhere((element) => element.dateTime.compareTo(widget.date)==0);
        _exercises = historyModel!.userExerciseList;
        _todayDiets = historyModel!.userDietList;
        task = user.scheduleModel!.data[widget.date];
        setState(() {});
      });
    });
  }

  @override
  void dispose() {
    super.dispose();
    _tabController.dispose();
  }


  List<Widget> _buildListExercise(){
    List<Widget> list = List.empty(growable: true);
    for (int i=0; i<_exercises.length; i++){
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


  List<Widget> _buildListDiet(){
    List<Widget> list = List.empty(growable: true);
    for (int i=0; i<_todayDiets.length; i++){
      Widget widget = GestureDetector(
        onTap: (){
          showDialog(context: context,
              builder: (BuildContext context){
                return CustomDialogBox(
                  title: _todayDiets[i].name,
                  descriptions: _todayDiets[i].details,
                  img: Image(
                    image: AssetImage(_todayDiets[i].thumbnailPath),
                  ),
                  videoPath: _todayDiets[i].videoPath,
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
                    image: AssetImage(_todayDiets[i].thumbnailPath),
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
                              _todayDiets[i].name,
                              style: const TextStyle(
                                fontSize: 17,
                                fontWeight: FontWeight.w900,
                              )
                          ),
                        ),
                        const SizedBox(height: 10,),
                        Text(
                            "${_todayDiets[i].calories} kcal",
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


  Widget buildDietProgress(){
    if (historyModel == null || task == null) return Container();
    double indicatorProgress =  (historyModel!.getDietKcal() / task!.getDietGoal()) * 350 - 10;
    if (indicatorProgress < 0){
      indicatorProgress = 0;
    }
    if (indicatorProgress > 330){
      indicatorProgress = 330;
    }

    double labelProgress = (historyModel!.getDietKcal() / task!.getDietGoal()) * 350 - 10;
    if (labelProgress < 20){
      labelProgress = 20;
    }
    if (labelProgress > 280){
      labelProgress = 280;
    }
    return Column(
      children: [
        const Text("Your diet goal",
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
                  "${task!.getDietGoal()} kcal",
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

                  value: historyModel!.getDietKcal() / task!.getDietGoal(),
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
                  "${task!.getDietGoal()} kcal",
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

  Widget buildExerciseProgress(){
    if (historyModel == null || task == null) return Container();
    double indicatorProgress =  (historyModel!.getExerciseKcal() / task!.getExerciseGoal()) * 350 - 10;
    if (indicatorProgress < 0){
      indicatorProgress = 0;
    }
    if (indicatorProgress > 330){
      indicatorProgress = 330;
    }

    double labelProgress = (historyModel!.getExerciseKcal() / task!.getExerciseGoal()) * 350 - 10;
    if (labelProgress < 20){
      labelProgress = 20;
    }
    if (labelProgress > 290){
      labelProgress = 290;
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
                  "${historyModel!.getExerciseKcal()} kcal",
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

                  value: historyModel!.getExerciseKcal() / task!.getExerciseGoal(),
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
                  "${task!.getExerciseGoal()} kcal",
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: CustomerAppbar.builder('Daily record'),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Text(
              "Your daily record on ${DateFormat('dd-MM-yyyy').format(widget.date)}",
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            Container(
              margin: const EdgeInsets.only(top: 20),
              height: 48,
              decoration: BoxDecoration(
                  color: const Color(0xFFF0F3F6),
                  borderRadius: BorderRadius.circular(18),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.2),
                      spreadRadius: 5,
                      blurRadius: 7,
                      offset: const Offset(0, 3),
                    )
                  ]),
              child: TabBar(
                controller: _tabController,
                indicator: BoxDecoration(
                  borderRadius: BorderRadius.circular(18),
                  color: Colors.white,
                ),
                labelColor: const Color(0xFF0D3F67),
                unselectedLabelColor: const Color(0xFFB6C5D1),
                tabs: const [
                  Tab(
                    child: Text(
                      'Exercise',
                      style: TextStyle(
                          fontSize: 18, fontWeight: FontWeight.w700),
                    ),
                  ),
                  Tab(
                    child: Text(
                      'Diet',
                      style: TextStyle(
                          fontSize: 18, fontWeight: FontWeight.w700),
                    ),
                  )
                ],
              ),
            ),
            const SizedBox(height: 20,),
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  ListView(
                    children: [
                      buildExerciseProgress(),
                      ..._buildListExercise(),
                    ],
                  ),
                  ListView(
                    children: [
                      buildDietProgress(),
                      ..._buildListDiet()
                    ],
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
