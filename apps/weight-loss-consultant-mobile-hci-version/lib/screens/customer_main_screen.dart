import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/customer_appbar.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/customer_drawer.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/account_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/diet_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/exercise_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';


class CustomerMainScreen extends StatefulWidget {
  const CustomerMainScreen({Key? key}) : super(key: key);

  @override
  _CustomerMainScreenState createState() => _CustomerMainScreenState();
}

class _CustomerMainScreenState extends State<CustomerMainScreen> {
  AccountModel user = AccountModel(email: "", fullname: "");
  int progressChartType = 0;


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
      initAccount();
      setState(() {});
    });
  }

  @override
  void deactivate() {
    saveAccount().then((value) => super.deactivate());
  }

  Widget _buildExerciseRecordCard(){
    return GestureDetector(
      onTap: (){
        Navigator.pushNamed(context, RoutePath.customerTodayDoneExerciseScreen).then((value) {
          initAccount().then((value){
            setState(() {

            });
          });
        });
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
              image: const DecorationImage(
                fit: BoxFit.cover,
                image: NetworkImage("https://images.unsplash.com/photo-1499438075715-fc23ef376ab9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1642&q=80"),
              )
          ),
          child: const Center(
            child: Text('Your activities today',
              textAlign: TextAlign.center,
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

  Widget _buildDietRecordCard(){
    return GestureDetector(
      onTap: (){
        Navigator.pushNamed(context, RoutePath.customerTodayDoneDietScreen).then((value){
          initAccount().then((value) {
            setState(() {

            });
          });
        });

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
              image: const DecorationImage(
                fit: BoxFit.cover,
                image: NetworkImage("https://images.unsplash.com/photo-1590643515786-250b0b9e8000?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80"),
              )
          ),
          child: const Center(
            child: Text('Your diet today',
              textAlign: TextAlign.center,
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

  Widget _buildTodayExerciseCard(){
    return GestureDetector(
      onTap: (){
        Navigator.pushNamed(context, RoutePath.todayExerciseScreen).then((value){
          initAccount().then((value) {
            setState(() {

            });
          });
        });

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
              image: const DecorationImage(
                fit: BoxFit.cover,
                image: AssetImage("assets/images/gym.jpeg"),
              )
          ),
          child: const Center(
            child: Text('Today Suggestion Exercise',
              textAlign: TextAlign.center,
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
        Navigator.pushNamed(context, RoutePath.todayDietScreen).then((value){
          initAccount().then((value) {
            setState(() {

            });
          });
        });

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
              image: const DecorationImage(
                fit: BoxFit.cover,
                image: AssetImage("assets/images/food.jpeg")
              )
          ),
          child: const Center(
            child: Text('Today Suggestion Diet',
              textAlign: TextAlign.center,
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
        Navigator.pushNamed(context, RoutePath.customerReportScreen).then((value){
          initAccount().then((value) {
            setState(() {

            });
          });
        });
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
              image: const DecorationImage(
                fit: BoxFit.cover,
                image: AssetImage("assets/images/note.jpg"),
              )
          ),
          child: const Center(
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

  Widget _buildProgressBar(){
    String message = "kcal \n remaining";
    String kcal = (user.getUserTodayDietCalorieGoal() - user.getTodayDietKcal()).toString();
    if (user.getUserTodayDietCalorieGoal() - user.getTodayDietKcal() < 0){
      message = "kcal \n extra consumed";
      kcal = (user.getTodayDietKcal() - user.getUserTodayDietCalorieGoal()).toString();
    }


    return SizedBox(
      height: 200,
      child: SfRadialGauge(
          axes: <RadialAxis>[
            RadialAxis(
              minimum: 0,
              maximum: 100,
              showLabels: false,
              showTicks: false,
              annotations: [
                GaugeAnnotation(
                    positionFactor: 0.1,
                    angle: 90,
                    widget: Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                          kcal,
                          style: const TextStyle(
                              fontSize: 17,
                            color: Colors.white,
                            fontWeight: FontWeight.w900
                          ),
                        ),
                          const SizedBox(height: 5,),
                          Text(
                            message,
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 13
                            ),
                          )
                        ],
                      ),
                    ))
              ],
              pointers: [
                RangePointer(
                  value: (user.getTodayDietKcal() * 100 / user.getUserTodayDietCalorieGoal()),
                  cornerStyle: CornerStyle.bothCurve,
                  width: 0.2,
                  sizeUnit: GaugeSizeUnit.factor,
                  color: Colors.orange,
                )
              ],
              axisLineStyle: const AxisLineStyle(
                thickness: 0.2,
                cornerStyle: CornerStyle.bothCurve,
                color: Colors.white,
                thicknessUnit: GaugeSizeUnit.factor,
              ),
            ),
          ]),
    );
  }

  Widget _buildExerciseProgressBar(){
    String message = "kcal \n remaining";
    String kcal = (user.getUserTodayExerciseCalorieGoal() - user.getTodayExerciseKcal()).toString();
    if (user.getUserTodayExerciseCalorieGoal() - user.getTodayExerciseKcal() < 0){
      message = "kcal \n extra burned";
      kcal = (user.getTodayExerciseKcal() - user.getUserTodayExerciseCalorieGoal()).toString();
    }


    return SizedBox(
      height: 200,
      child: SfRadialGauge(
          axes: <RadialAxis>[
            RadialAxis(
              minimum: 0,
              maximum: 100,
              showLabels: false,
              showTicks: false,
              annotations: [
                GaugeAnnotation(
                    positionFactor: 0.1,
                    angle: 90,
                    widget: Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            kcal,
                            style: const TextStyle(
                                fontSize: 17,
                                color: Colors.white,
                                fontWeight: FontWeight.w900
                            ),
                          ),
                          const SizedBox(height: 5,),
                          Text(
                            message,
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                                color: Colors.white,
                                fontSize: 13
                            ),
                          )
                        ],
                      ),
                    ))
              ],
              pointers: [
                RangePointer(
                  value: (user.getTodayExerciseKcal() * 100 / user.getUserTodayExerciseCalorieGoal()),
                  cornerStyle: CornerStyle.bothCurve,
                  width: 0.2,
                  sizeUnit: GaugeSizeUnit.factor,
                  color: Colors.orange,
                )
              ],
              axisLineStyle: const AxisLineStyle(
                thickness: 0.2,
                cornerStyle: CornerStyle.bothCurve,
                color: Colors.white,
                thicknessUnit: GaugeSizeUnit.factor,
              ),
            ),
          ]),
    );
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
    if (labelProgress > 290){
      labelProgress = 290;
    }
    return Column(
      children: [
        const Text("Your exercise goal",
          style: TextStyle(
            fontWeight: FontWeight.w700,
            fontSize: 20,
            color: Colors.white,
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
                    fontWeight: FontWeight.w600,
                    color: Colors.white,

                  ),
                )
            ),
            Positioned(
                top: 13,
                left: indicatorProgress,
                child: const Icon(Icons.arrow_drop_down_sharp, color: Colors.white,)
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
                      fontWeight: FontWeight.w600,
                    color: Colors.white,
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
                      fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),
                )
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildYourDietProgress(){
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 30),
      decoration: const BoxDecoration(
          color: Colors.green,
          borderRadius: BorderRadius.only(bottomLeft: Radius.circular(50), bottomRight: Radius.circular(50)),
      ),
      child: Stack(
        children: [
          Column(
            children: [
              const Text(
                "TODAY DIET PROGRESS",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.w700
                ),
              ),
              const SizedBox(height: 20,),
              _buildProgressBar(),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Column(
                    children: [
                      Text(user.getTodayDietKcal().toString(),
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 30,
                          fontWeight: FontWeight.w700
                        ),
                      ),
                      const Text("today kcal",
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 15,
                            fontWeight: FontWeight.w500
                        ),
                      )
                    ],
                  ),
                  Column(
                    children: [
                      Text(
                        user.getUserTodayDietCalorieGoal().toString(),
                        style: const TextStyle(
                            color: Colors.white,
                            fontSize: 30,
                            fontWeight: FontWeight.w700
                        ),
                      ),
                      const Text("daily kcal goal",
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 15,
                            fontWeight: FontWeight.w500
                        ),
                      ),
                    ],
                  )
                ],
              ),
            ],
          ),
          Positioned(
            top: 100,
              right: 10,
              child: Column(
                children: [
                  IconButton(
                      icon: const Icon(Icons.arrow_forward_ios, color: Colors.white),
                      onPressed: (){
                        setState(() {
                          progressChartType = 2;
                        });
                      },
                  ),
                  const Text(
                    "exercise",
                    style: TextStyle(color: Colors.white),
                  )
                ],
              )
          ),
          Positioned(
              top: 100,
              left: 10,
              child: Column(
                children: [
                  IconButton(
                    icon: const Icon(Icons.arrow_back_ios, color: Colors.white),
                    onPressed: (){
                      setState(() {
                        progressChartType = 0;
                      });
                    },
                  ),
                  const Text(
                    "overall",
                    style: TextStyle(color: Colors.white),
                  )
                ],
              )
          ),
        ],
      )
    );
  }

  Widget _buildYourExerciseProgress(){
    return Container(
        padding: const EdgeInsets.symmetric(vertical: 30),
        decoration: BoxDecoration(
          color: Colors.pinkAccent.shade700,
          borderRadius: const BorderRadius.only(bottomLeft: Radius.circular(50), bottomRight: Radius.circular(50)),
        ),
        child: Stack(
          children: [
            Column(
              children: [
                const Text(
                  "TODAY EXERCISE PROGRESS",
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.w700
                  ),
                ),
                const SizedBox(height: 20,),
                _buildExerciseProgressBar(),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Column(
                      children: [
                        Text(user.getTodayExerciseKcal().toString(),
                          style: const TextStyle(
                              color: Colors.white,
                              fontSize: 30,
                              fontWeight: FontWeight.w700
                          ),
                        ),
                        const Text("today kcal",
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 15,
                              fontWeight: FontWeight.w500
                          ),
                        )
                      ],
                    ),
                    Column(
                      children: [
                        Text(
                          user.getUserTodayExerciseCalorieGoal().toString(),
                          style: const TextStyle(
                              color: Colors.white,
                              fontSize: 30,
                              fontWeight: FontWeight.w700
                          ),
                        ),
                        const Text("daily kcal goal",
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 15,
                              fontWeight: FontWeight.w500
                          ),
                        ),
                      ],
                    )
                  ],
                ),
              ],
            ),
            Positioned(
                top: 100,
                left: 10,
                child: Column(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.arrow_back_ios, color: Colors.white),
                      onPressed: (){
                        setState(() {
                          progressChartType = 1;
                        });
                      },
                    ),
                    const Text(
                      "diet",
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    )
                  ],
                )
            ),
            Positioned(
                top: 100,
                right: 10,
                child: Column(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.arrow_forward_ios, color: Colors.white),
                      onPressed: (){
                        setState(() {
                          progressChartType = 0;
                        });
                      },
                    ),
                    const Text(
                      "overall",
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    )
                  ],
                )
            ),
          ],
        )
    );
  }

  Widget _buildGeneralProgressBar(){
    String message = "kcal \n remaining";
    String kcal = (user.getUserTodayOverallCalorieGoal() - user.getTodayKcal()).toString();
    if (user.getUserTodayOverallCalorieGoal() - user.getTodayKcal() < 0){
      message = "kcal \n extra consumed";
      kcal = (user.getTodayKcal() - user.getUserTodayOverallCalorieGoal()).toString();
    }


    return SizedBox(
      height: 200,
      child: SfRadialGauge(
          axes: <RadialAxis>[
            RadialAxis(
              minimum: 0,
              maximum: 100,
              showLabels: false,
              showTicks: false,
              annotations: [
                GaugeAnnotation(
                    positionFactor: 0.1,
                    angle: 90,
                    widget: Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            kcal,
                            style: const TextStyle(
                                fontSize: 17,
                                color: Colors.white,
                                fontWeight: FontWeight.w900
                            ),
                          ),
                          const SizedBox(height: 5,),
                          Text(
                            message,
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                                color: Colors.white,
                                fontSize: 13
                            ),
                          )
                        ],
                      ),
                    ))
              ],
              pointers: [
                RangePointer(
                  value: (user.getTodayKcal() * 100 / user.getUserTodayOverallCalorieGoal()),
                  cornerStyle: CornerStyle.bothCurve,
                  width: 0.2,
                  sizeUnit: GaugeSizeUnit.factor,
                  color: Colors.orange,
                )
              ],
              axisLineStyle: const AxisLineStyle(
                thickness: 0.2,
                cornerStyle: CornerStyle.bothCurve,
                color: Colors.white,
                thicknessUnit: GaugeSizeUnit.factor,
              ),
            ),
          ]),
    );
  }

  Widget _buildYourGeneralProgress(){
    return Container(
        padding: const EdgeInsets.symmetric(vertical: 30),
        decoration: const BoxDecoration(
          color: Color(0xFF478DE0),
          borderRadius: BorderRadius.only(bottomLeft: Radius.circular(50), bottomRight: Radius.circular(50)),
        ),
        child: Stack(
          children: [
            Column(
              children: [
                const Text(
                  "TODAY OVERALL PROGRESS",
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.w700
                  ),
                ),
                const SizedBox(height: 20,),
                _buildGeneralProgressBar(),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Column(
                      children: [
                        Text(user.getTodayKcal().toString(),
                          style: const TextStyle(
                              color: Colors.white,
                              fontSize: 30,
                              fontWeight: FontWeight.w700
                          ),
                        ),
                        const Text("today kcal",
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 15,
                              fontWeight: FontWeight.w500
                          ),
                        )
                      ],
                    ),
                    Column(
                      children: [
                        Text(
                          user.getUserTodayOverallCalorieGoal().toString(),
                          style: const TextStyle(
                              color: Colors.white,
                              fontSize: 30,
                              fontWeight: FontWeight.w700
                          ),
                        ),
                        const Text("daily kcal goal",
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 15,
                              fontWeight: FontWeight.w500
                          ),
                        ),
                      ],
                    )
                  ],
                ),
              ],
            ),
            Positioned(
                top: 100,
                left: 10,
                child: Column(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.arrow_back_ios, color: Colors.white),
                      onPressed: (){
                        setState(() {
                          progressChartType = 2;
                        });
                      },
                    ),
                    const Text(
                      "exercise",
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    )
                  ],
                )
            ),
            Positioned(
                top: 100,
                right: 10,
                child: Column(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.arrow_forward_ios, color: Colors.white),
                      onPressed: (){
                        setState(() {
                          progressChartType = 1;
                        });
                      },
                    ),
                    const Text(
                      "diet",
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    )
                  ],
                )
            ),
          ],
        )
    );
  }

  Widget _buildYourProgress(){
    switch (progressChartType){
      case 0:
        return _buildYourGeneralProgress();
      case 1:
        return _buildYourDietProgress();
      case 2:
        return _buildYourExerciseProgress();
    }
    return _buildYourGeneralProgress();
  }

  Widget _buildFabExpandable(){
    return SpeedDial(
      spacing: 10,
      spaceBetweenChildren: 10,
      backgroundColor: const Color(0xFF478DE0),
      icon: Icons.add,
      children: [
        SpeedDialChild(
          child: const Icon(
            Icons.fastfood,
            color: Colors.white,
          ),
          backgroundColor: const Color(0xFF478DE0),
          label: "Add diet",
          onTap: (){
            Navigator.pushNamed(context, RoutePath.customerAddDietScreen).then((value) {
              initAccount().then((value){
                setState(() {

                });
              });
            });

          }
        ),
        SpeedDialChild(
            child: const Icon(
              Icons.downhill_skiing,
              color: Colors.white,
            ),
            label: "Add workout",
            backgroundColor: Color(0xFF478DE0),
            onTap: (){
              Navigator.pushNamed(context, RoutePath.customerAddWorkoutScreen).then((value){
                initAccount().then((value){
                  setState(() {

                  });
                });
              });

            }
        ),
      ],
    );
  }





  Widget _buildWarning(){
    String message = "Warning: you have exceeded calorie's limit";
    Widget widget = Container();
    if (user.getTodayKcal() > user.getUserTodayOverallCalorieGoal() + 100){
      widget = Container(
        height: 50,
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 0),
        color: Colors.redAccent,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(
              Icons.warning_amber_outlined,
              color: Colors.white,
            ),
            const SizedBox(width: 10,),
            Text(
                message,
                style: const TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: FontWeight.w600
                )
            )

          ],
        ),
      );
    }
    else if (user.getTodayKcal() > user.getUserTodayOverallCalorieGoal() && user.getTodayKcal() < user.getUserTodayOverallCalorieGoal() + 100){
      String message = "You've reached your daily goal";
      widget = Container(
        height: 50,
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 20),
        color: Colors.green,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(
              Icons.star,
              color: Colors.white,
            ),
            const SizedBox(width: 10,),
            Text(
                message,
                style: const TextStyle(
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
    return Container(
      decoration: BoxDecoration(
        color: Colors.grey.shade200,
      ),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        drawer: CustomerDrawer.builder(context, user.fullname, Image.asset("assets/images/miku.png")),
        appBar: CustomerAppbar.builder("HOME PAGE"),
        floatingActionButton: _buildFabExpandable(),
        body: Stack(
          children: [
            SingleChildScrollView(
              child: Column(
              children: [
                SizedBox(height: user.getTodayKcal() > user.getUserTodayOverallCalorieGoal() ? 50 : 0,),
                _buildYourProgress(),
                Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      const SizedBox(width: double.infinity,),
                      const SizedBox(height: 10,),
                      _buildTodayExerciseCard(),
                      const SizedBox(height: 20,),
                      _buildTodayDietCard(),
                      const SizedBox(height: 20,),
                      _buildExerciseRecordCard(),
                      const SizedBox(height: 20,),
                      _buildDietRecordCard(),
                      const SizedBox(height: 20,),
                      _buildYourReportCard(),

                    ],
                  ),
                ),
              ],
          ),
            ),
            _buildWarning(),
          ],
        ),
      ),
    );
  }


}
