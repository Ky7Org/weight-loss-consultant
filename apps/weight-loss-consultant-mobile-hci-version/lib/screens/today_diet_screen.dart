import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/custom_dialog.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/toast.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/account_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/diet_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';


class TodayDietScreen extends StatefulWidget {
  const TodayDietScreen({Key? key}) : super(key: key);

  @override
  _TodayDietScreenState createState() => _TodayDietScreenState();
}

class _TodayDietScreenState extends State<TodayDietScreen> {

  Map<String, dynamic> _todayDiets = {};
  AccountModel user = AccountModel(email: "", fullname: "");
  List<String> selectedDiet = List.empty(growable: true);



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
        resetSelectedDiet();
        setState(() {});
      });
    });
  }

  resetSelectedDiet(){
    DateTime now = DateTime.now();
    DateTime today = DateTime(now.year, now.month, now.day);
    _todayDiets = user.scheduleModel!.data[today]!.dailyDietModel.dietMap;
    _todayDiets.forEach((key, value) {
      for (DietModel model in value){
        if (user.userTodayDiet.contains(model)){
          selectedDiet.add(model.name);
        } else {
          selectedDiet.remove(model.name);
        }
      }
    });
  }

  PreferredSize _buildAppBar(){
    return PreferredSize(
        preferredSize: const Size.fromHeight(70),
        child: AppBar(
          title: Text('Suggestion diet'),
          leadingWidth: 30,
          flexibleSpace: Container(
            decoration: BoxDecoration(
                image: DecorationImage(
                  fit: BoxFit.cover,
                  colorFilter: ColorFilter.mode(Colors.black.withOpacity(0.4), BlendMode.darken),
                  image: const NetworkImage("https://images.unsplash.com/photo-1542866789-bb9c9d086a5d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njl8fGZvb2R8ZW58MHwwfDB8YmxhY2t8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"),
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
                Navigator.pushNamed(context, RoutePath.customerTodayDoneDietScreen).then((value) {
                  initAccount().then((value){
                    resetSelectedDiet();
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

  List<Widget> _buildListDiet(List<DietModel>? dietList){
    List<Widget> list = List.empty(growable: true);
    if (dietList == null){
      return list;
    }
    for (int i=0; i< dietList.length; i++){
      Widget widget = GestureDetector(
        onTap: (){
          showDialog(context: context,
              builder: (BuildContext context){
                return CustomDialogBox(
                  title: dietList[i].name,
                  descriptions: dietList[i].details,
                  img: Image(
                    image: AssetImage(dietList[i].thumbnailPath),
                  ),
                  videoPath: dietList[i].videoPath,
                );
              }
          );
        },
        child: Container(
            padding: const EdgeInsets.symmetric(vertical: 5),
            child: Row(
                children: [
                  Checkbox(
                      value: selectedDiet.contains(dietList[i].name),
                      onChanged: (bool? value){
                        if (value == null) return;
                        if (value){
                          selectedDiet.add(dietList[i].name);
                          user.userTodayDiet.add(dietList[i]);
                          saveAccount();
                          CustomToast.makeToast("Add successfully");
                        } else {
                          user.userTodayDiet.remove(dietList[i]);
                          saveAccount();
                          selectedDiet.remove(dietList[i].name);
                        }
                        setState(() {

                        });
                      }
                  ),
                  const SizedBox(width: 20,),
                  Image(
                    image: AssetImage(dietList[i].thumbnailPath),
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
                          dietList[i].name,
                          style: const TextStyle(
                            fontSize: 17,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                      ),
                      const SizedBox(height: 10,),
                      Text(
                        "${dietList[i].calories} kcal",
                        style: const TextStyle(
                            color: Colors.grey
                        ),
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


  List<Widget> _buildListTodayDiet(){
    List<Widget> periodDiets = List.empty(growable: true);
    for (String period in _todayDiets.keys){
      Widget periodWidget = Column(
        children: [
          const SizedBox(height: 10,),
          Align(
            alignment: Alignment.topLeft,
            child: Text(period,
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),),
          ),
          ..._buildListDiet(_todayDiets[period]),
        ],
      );
      periodDiets.add(periodWidget);
    }
    return periodDiets;
  }

  Widget buildProgress(){
    double indicatorProgress =  (user.getTodayDietKcal() / user.getUserTodayDietCalorieGoal()) * 350 - 10;
    if (indicatorProgress < 0){
      indicatorProgress = 0;
    }
    if (indicatorProgress > 330){
      indicatorProgress = 330;
    }

    double labelProgress = (user.getTodayDietKcal() / user.getUserTodayDietCalorieGoal()) * 350 - 10;
    if (labelProgress < 20){
      labelProgress = 20;
    }
    if (labelProgress > 290){
      labelProgress = 290;
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
                  "${user.getTodayDietKcal()} kcal",
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

                  value: user.getTodayDietKcal() / user.getUserTodayDietCalorieGoal(),
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
                  "${user.getUserTodayDietCalorieGoal()} kcal",
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
    if (user.getTodayDietKcal() >= user.getUserTodayDietCalorieGoal() && user.getTodayDietKcal() < user.getUserTodayDietCalorieGoal() + 100){
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
    else if (user.getTodayDietKcal() >= user.getUserTodayDietCalorieGoal() + 100){
      widget = Container(
        height: 50,
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
        color: Colors.redAccent,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Icon(
              Icons.warning_amber_outlined,
              color: Colors.white,
            ),
            SizedBox(width: 10,),
            Text(
                "Warning: you have exceeded today's limit",
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
                  SizedBox(height: user.getTodayDietKcal() >= user.getUserTodayDietCalorieGoal() ? 50 : 0,),
                  buildProgress(),
                  const SizedBox(height: 10,),
                  ..._buildListTodayDiet(),
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
