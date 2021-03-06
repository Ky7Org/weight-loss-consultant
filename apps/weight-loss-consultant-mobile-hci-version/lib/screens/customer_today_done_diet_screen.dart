import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/account_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/diet_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';

class CustomerTodayDoneDietScreen extends StatefulWidget {
  const CustomerTodayDoneDietScreen({Key? key}) : super(key: key);

  @override
  _CustomerTodayDoneDietScreenState createState() => _CustomerTodayDoneDietScreenState();
}

class _CustomerTodayDoneDietScreenState extends State<CustomerTodayDoneDietScreen> {
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
        setState(() {});
      });
    });
  }

  PreferredSize _buildAppBar(){
    return PreferredSize(
        preferredSize: const Size.fromHeight(70),
        child: AppBar(
          title: const Text('Today diet record'),
          flexibleSpace: Container(
            decoration: BoxDecoration(
                image: DecorationImage(
                  fit: BoxFit.cover,
                  colorFilter: ColorFilter.mode(Colors.black.withOpacity(0.4), BlendMode.darken),
                  image: const AssetImage("assets/images/food.jpeg"),
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
        )
    );
  }

  Widget _buildDietTitle(){
    int count = 0;
    for (int i=0; i<user.userTodayDiet.length; i++){
      if (user.userTodayCustomDiet.contains(user.userTodayDiet[i])) continue;
      count++;
    }
    if (count == 0 ){
      return Container();
    }
    return const Align(
      alignment: Alignment.topLeft,
      child: Text("To-do list diet",
        style: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget _buildCardItem(DietModel model){
    return Dismissible(
      key: UniqueKey(),
      onDismissed: (direction) {
        // Remove the item from the data source.
        setState(() {
          user.userTodayDiet.remove(model);
          user.userTodayCustomDiet.remove(model);
          saveAccount();
        });
      },
      background: Container(color: Colors.red),
      child: Container(
          padding: const EdgeInsets.symmetric(vertical: 5),
          child: Row(
              children: [
                const Icon(Icons.menu),
                const SizedBox(width: 20,),
                Image(
                  image: AssetImage(model.thumbnailPath),
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
                            model.name,
                            style: const TextStyle(
                              fontSize: 17,
                              fontWeight: FontWeight.w900,
                            )
                        ),
                      ),
                      const SizedBox(height: 10,),
                      Text(
                          "${model.calories} kcal",
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
  }

  List<Widget> _buildListDiet(){
    List<Widget> list = List.empty(growable: true);

    for (int i=0; i < user.userTodayDiet.length; i++){
      if (user.userTodayCustomDiet.contains(user.userTodayDiet[i])) continue;
      Widget widget = _buildCardItem(user.userTodayDiet[i]);
      list.add(widget);
      list.add(const Divider(thickness: 1,));
    }
    return list;
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

  Widget _buildCustomDietTitle(){
    if (user.userTodayCustomDiet.isEmpty ){
      return Container();
    }
    return const Align(
      alignment: Alignment.topLeft,
      child: Text("Your additional diet",
        style: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  List<Widget> _buildListCustomDiet(){
    List<Widget> list = List.empty(growable: true);
    for (int i=0; i < user.userTodayCustomDiet.length; i++){
      Widget widget = _buildCardItem(user.userTodayCustomDiet[i]);
      list.add(widget);
      list.add(const Divider(thickness: 1,));
    }
    return list;
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
      floatingActionButton: SizedBox(
        width: 350.0,
        child: FloatingActionButton.extended(
          onPressed: (){
            Navigator.pushNamed(context, RoutePath.customerAddDietScreen).then((value){
              initAccount().then((value){
                setState(() {
                });
              });
            });
          },
          icon: const Icon(Icons.add),
          label: const Text("ADD NEW FOOD"),

        ),
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            child: Column(
              children: [
                SizedBox(height: user.getTodayDietKcal() >= user.getUserTodayDietCalorieGoal() ? 50 : 0,),
                Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Column(
                    children: [
                      buildProgress(),
                      const SizedBox(height: 20,),
                      _buildCustomDietTitle(),
                      ..._buildListCustomDiet(),
                      const SizedBox(height: 20,),
                      _buildDietTitle(),
                      ..._buildListDiet(),
                      const SizedBox(height: 100,)
                    ],
                  ),
                ),
              ],
            ),
          ),
          _buildCongratulationMessage(),
        ],
      ),
    );
  }
}
