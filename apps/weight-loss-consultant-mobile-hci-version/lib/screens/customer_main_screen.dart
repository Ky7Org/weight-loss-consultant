import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/customer_appbar.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/customer_drawer.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/account_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';

class CustomerMainScreen extends StatefulWidget {
  const CustomerMainScreen({Key? key}) : super(key: key);

  @override
  _CustomerMainScreenState createState() => _CustomerMainScreenState();
}

class _CustomerMainScreenState extends State<CustomerMainScreen> {
  AccountModel user = AccountModel(email: "", fullname: "");

  Widget _buildDialogOptionCard(String title, String description, int level, StateSetter setState){
    return GestureDetector(
      onTap:(){
        setState(() {
          user.level = level;
        });
      },
      child: Card(
          color: user.level != level ? Colors.white.withOpacity(0.4) : Colors.blue,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.0),
          ),
          child: Container(
            padding: EdgeInsets.all(10),
            child: Stack(
              children: [
                Align(
                  alignment: Alignment.center,
                  child: Column(
                    children: [
                      Text(
                        title,
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 20,
                          color: Colors.white,
                        ),
                      ),
                      SizedBox(height: 5,),
                      Text(
                        description,
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 15,
                          color: Colors.white,
                        ),
                      )
                    ],
                  ),
                ),
                SizedBox(
                  height: 50,
                  child: Align(
                    alignment: Alignment.centerRight,
                    child: Icon(
                      user.level != level ? Icons.check_circle_outline : Icons.check_circle,
                      color: Colors.white,
                      size: 30,
                    ),
                  ),
                )
              ],
            ),
          )
      ),
    );
  }


  Widget _buildDialog(){
    return StatefulBuilder(
      builder: (context, setState) {
        if (user.level != -1){
          Future.delayed(const Duration(milliseconds: 300), () {
            Navigator.pop(context);
          });
        }
        return Dialog(
          elevation: 0,
          insetPadding: EdgeInsets.all(10),
          child: Container(
            padding: EdgeInsets.all(20),
            decoration: BoxDecoration(
              shape: BoxShape.rectangle,
              color: Colors.transparent,
              borderRadius: BorderRadius.circular(6),
              image: DecorationImage(
                fit: BoxFit.cover,
                colorFilter: ColorFilter.mode(Colors.blue.shade900.withOpacity(0.7), BlendMode.darken),
                image: NetworkImage("https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1738&q=80"),
              ),
              boxShadow: const [
                BoxShadow(color: Colors.black,offset: Offset(0,5),
                  blurRadius: 8
                ),
              ],
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                SizedBox(width: double.infinity, height: 30,),
                Text(
                  "HOW MANY PUSH-UPS CAN YOU DO AT ONE TIME?",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 18,
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 10,),
                Container(
                  margin: EdgeInsets.symmetric(vertical: 15),
                  child: Column(
                    children: [
                      _buildDialogOptionCard("BEGINNER", "3-5", 1, setState),
                      SizedBox(height: 10),
                      _buildDialogOptionCard("INTERMEDIATE", "5-10", 2, setState),
                      SizedBox(height: 10),
                      _buildDialogOptionCard("ADVANCE", "At least 10", 3, setState),
                    ],
                  ),
                )
              ],
            ),
          ),
        );
      },
    );
  }

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


  void displayFirstTimeDialog(){
    if (user.isFirstTime){
      WidgetsBinding.instance?.addPostFrameCallback((_) async {
        await showDialog<String>(
          context: context,
          builder: (BuildContext context){
            if (user.level != -1){
              Navigator.pop(context);
            }
            return _buildDialog();
          },
        );
      });
    }
  }

  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value) => displayFirstTimeDialog());
      setState(() {});
    });
  }



  @override
  void deactivate() {
    saveAccount().then((value) => super.deactivate());
  }

  Widget _buildWorkoutInformationRow(){
    TextStyle numStyle = TextStyle(
        color: Colors.white,
        fontWeight: FontWeight.w600,
        fontSize: 24
    );
    TextStyle typeStyle = TextStyle(
        color: Colors.white,
        fontWeight: FontWeight.w400,
        fontSize: 15
    );
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        Column(
          children: [
            Text(user.workoutNum.toString(), style: numStyle),
            Text("WORKOUT", style: typeStyle),
          ],
        ),
        Column(
          children: [
            Text(user.kcalNum.toString(), style: numStyle,),
            Text("KCAL", style: typeStyle),
          ],
        ),
        Column(
          children: [
            Text(user.minute.toString(), style: numStyle),
            Text("MINUTE", style: typeStyle),
          ],
        ),
      ],
    );
  }

  Widget _buildTodayExerciseCard(){
    return GestureDetector(
      onTap: (){
        Navigator.pushNamed(context, RoutePath.todayExerciseScreen);
      },
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0),
        ),
        elevation: 10,
        child: Container(
          height: 150,
          width: double.infinity,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10.0),
              image: DecorationImage(
                fit: BoxFit.cover,
                colorFilter: new ColorFilter.mode(Colors.black.withOpacity(1), BlendMode.dstATop),
                image: NetworkImage("https://images.unsplash.com/photo-1615911217285-a44fb0b6e324?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80"),
              )
          ),
          child: Center(
            child: Text('Today Exercise',
              style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w900,
                  fontSize: 25
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTodayDietCard(){
    return GestureDetector(
      onTap: (){
        Navigator.pushNamed(context, RoutePath.todayDietScreen);
      },
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0),
        ),
        elevation: 10,
        child: Container(
          height: 150,
          width: double.infinity,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10.0),
              image: DecorationImage(
                fit: BoxFit.cover,
                colorFilter: new ColorFilter.mode(Colors.black.withOpacity(1), BlendMode.dstATop),
                image: NetworkImage("https://images.unsplash.com/photo-1542866789-bb9c9d086a5d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njl8fGZvb2R8ZW58MHwwfDB8YmxhY2t8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"),
              )
          ),
          child: Center(
            child: Text('Today Diet',
              style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w900,
                  fontSize: 25
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildYourReportCard(){
    return GestureDetector(
      onTap: (){
        Navigator.pushNamed(context, RoutePath.customerReportScreen);
      },
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0),
        ),
        elevation: 10,
        child: Container(
          height: 150,
          width: double.infinity,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10.0),
              image: DecorationImage(
                fit: BoxFit.cover,
                colorFilter: new ColorFilter.mode(Colors.black.withOpacity(1), BlendMode.dstATop),
                image: NetworkImage("https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1780&q=80"),
              )
          ),
          child: Center(
            child: Text('Your report',
              style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w900,
                  fontSize: 25
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomCenter,
              colors: [Colors.blueAccent, Colors.white])),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        drawer: CustomerDrawer.builder(context, user.fullname, Image.asset("assets/images/miku.png")),
        appBar: CustomerAppbar.builder("HOME PAGE"),
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SizedBox(width: double.infinity,),
                _buildWorkoutInformationRow(),
                SizedBox(height: 20,),
                _buildTodayExerciseCard(),
                SizedBox(height: 20,),
                _buildTodayDietCard(),
                SizedBox(height: 20,),
                _buildYourReportCard(),
              ],
            ),
          ),
        ),
      ),
    );
  }


}
