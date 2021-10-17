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
                          (user.dailyCalorieGoal - user.getTodayKcal()).toString(),
                          style: const TextStyle(
                              fontSize: 17,
                            color: Colors.white,
                            fontWeight: FontWeight.w900
                          ),
                        ),
                          const SizedBox(height: 5,),
                          const Text(
                            "kcal \n Remaining",
                            textAlign: TextAlign.center,
                            style: TextStyle(
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
                  value: (user.getTodayKcal() * 100 / user.dailyCalorieGoal),
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

  Widget _buildYourProgress(){
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 30),
      decoration: const BoxDecoration(
          color: Color(0xFF478DE0),
          borderRadius: BorderRadius.only(bottomLeft: Radius.circular(50), bottomRight: Radius.circular(50)),
      ),
      child: Column(
        children: [
          const Text(
            "TODAY PROGRESS",
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
                    user.dailyCalorieGoal.toString(),
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 30,
                        fontWeight: FontWeight.w700
                    ),
                  ),
                  const Text("Daily kcal Goal",
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
      )
    );
  }

  Widget _buildFabExpandable(){
    return SpeedDial(
      spacing: 10,
      spaceBetweenChildren: 10,
      backgroundColor: Color(0xFF478DE0),
      icon: Icons.add,
      children: [
        SpeedDialChild(
          child: const Icon(
            Icons.fastfood,
            color: Colors.white,
          ),
          backgroundColor: Color(0xFF478DE0),
          label: "Add diet",
          onTap: (){
            Navigator.pushNamed(context, RoutePath.customerAddDietScreen);
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
              Navigator.pushNamed(context, RoutePath.customerAddWorkoutScreen);
            }
        ),
      ],
    );
    /*return ExpandableFab(
      distance: 112.0,
      children: [
        ActionButton(
          onPressed: (){
            Navigator.pushNamed(context, RoutePath.customerAddDietScreen);
          },
          icon: const Icon(Icons.fastfood),
        ),
        ActionButton(
          onPressed: (){
            Navigator.pushNamed(context, RoutePath.customerAddWorkoutScreen);
          },
          icon: const Icon(Icons.downhill_skiing),
        ),
        ActionButton(
          onPressed: (){},
          icon: const Icon(Icons.event_note_outlined),
        ),
      ],
    );*/
  }

  Widget _buildBalanceDietCard(){
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      elevation: 10,
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
        child: Column(
          children: [
            const Align(
              alignment: Alignment(-1, 1),
              child: Text(
                "Balance Diet",
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold
                ),
              ),
            ),
            const SizedBox(height: 10,),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    const Text(
                      "Protein",
                      style: TextStyle(
                        fontSize: 19,
                        fontWeight: FontWeight.bold
                      ),
                    ),
                    const SizedBox(height: 4,),
                    const Text(
                      "30/105 g",
                      style: TextStyle(
                        color: Colors.grey
                      )
                    ),
                    Container(
                      margin: const EdgeInsets.symmetric(vertical: 10),
                      height: 10,
                      width: 70,
                      child: ClipRRect(
                        borderRadius: const BorderRadius.all(Radius.circular(10)),
                        child: LinearProgressIndicator(
                          value: 0.7,
                          valueColor: const AlwaysStoppedAnimation<Color>(Colors.cyan),
                          backgroundColor: Colors.grey.shade100,
                        ),
                      ),
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    const Text(
                      "Carb",
                      style: TextStyle(
                          fontSize: 19,
                          fontWeight: FontWeight.bold
                      ),
                    ),
                    const SizedBox(height: 4,),
                    const Text(
                        "109/264 g",
                        style: TextStyle(
                            color: Colors.grey,
                        )
                    ),
                    Container(
                      margin: const EdgeInsets.symmetric(vertical: 10),
                      height: 10,
                      width: 70,
                      child: ClipRRect(
                        borderRadius: const BorderRadius.all(Radius.circular(10)),
                        child: LinearProgressIndicator(
                          value: 0.4,
                          valueColor: const AlwaysStoppedAnimation<Color>(Colors.green),
                          backgroundColor: Colors.grey.shade100,
                        ),
                      ),
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    const Text(
                      "Fat",
                      style: TextStyle(
                          fontSize: 19,
                          fontWeight: FontWeight.bold
                      ),
                    ),
                    const SizedBox(height: 4,),
                    const Text(
                        "12/79 g",
                        style: TextStyle(
                            color: Colors.grey
                        )
                    ),
                    Container(
                      margin: const EdgeInsets.symmetric(vertical: 10),
                      height: 10,
                      width: 70,
                      child: ClipRRect(
                        borderRadius: const BorderRadius.all(Radius.circular(10)),
                        child: LinearProgressIndicator(
                          value: 0.2,
                          valueColor: const AlwaysStoppedAnimation<Color>(Colors.red),
                          backgroundColor: Colors.grey.shade100,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            )
          ],
        ),
      ),
    );
  }

  List<Widget> _getCustomerTodayExerciseList(){
    List<Widget> result = List.empty(growable: true);
    for (int i = 0; i < user.userTodayExercise.length ; i++){
      ExerciseModel model = user.userTodayExercise[i];
      Widget widget = Dismissible(
          key: UniqueKey(),
          onDismissed: (direction) {
            // Remove the item from the data source.
            setState(() {
              user.userTodayExercise.removeAt(i);
              saveAccount();
            });
          },
          background: Container(color: Colors.red),
          child: Container(
              padding: const EdgeInsets.symmetric(vertical: 5),
              child: Row(children: [
                const SizedBox(width: 20,),
                SizedBox(
                  width: 150,
                  child: Text(
                      model.name,
                      style: const TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w500,
                      )
                  ),
                ),
                const Spacer(),
                Text("${model.calories} kcal"),
                const SizedBox(width: 20,)
              ])
          )
      );
      result.add(widget);
    };
    return result;
  }

  List<Widget> _getCustomerTodayDietList(){
    List<Widget> result = List.empty(growable: true);
    for (int i = 0; i < user.userTodayDiet.length ; i++){
      DietModel model = user.userTodayDiet[i];
      Widget widget = Dismissible(
          key: UniqueKey(),
          onDismissed: (direction) {
            // Remove the item from the data source.
            setState(() {
              user.userTodayDiet.removeAt(i);
              saveAccount();
            });
          },
          background: Container(color: Colors.red),
          child: Container(
          padding: const EdgeInsets.symmetric(vertical: 5),
          child: Row(children: [
            const SizedBox(width: 20,),
            SizedBox(
              width: 200,
              child: Text(
                  model.name,
                  style: const TextStyle(
                    fontSize: 17,
                    fontWeight: FontWeight.w500,
                  )
              ),
            ),
            const Spacer(),
            Text("${model.calories} kcal"),
            const SizedBox(width: 20,)
          ])
      )
      );

      result.add(widget);
    };
    return result;
  }

  Widget _buildWorkoutListCard(){
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      elevation: 10,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 10),
        child: Column(
          children: [
            Stack(
              children: [
                const Align(
                  alignment: Alignment.topCenter,
                  child: Text(
                    "Your activities today",
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Align(
                  alignment: Alignment.topRight,
                  child: SizedBox(
                    height: 20,
                    child: IconButton(
                        padding: EdgeInsets.zero,
                        onPressed: (){
                          Navigator.pushNamed(context, RoutePath.customerAddWorkoutScreen).then((value) {
                            initAccount();
                            setState(() {

                            });
                          });
                        },
                        icon: const Icon(Icons.add)
                    ),
                  ),
                )
              ]
            ),
            const SizedBox(height: 10,),
            Column(
              children: _getCustomerTodayExerciseList(),
            )
          ],
        ),
      )
    );
  }

  Widget _buildDietListCard(){
    return Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0),
        ),
        elevation: 10,
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 10),
          child: Column(
            children: [
              Stack(
                  children: [
                    const Align(
                      alignment: Alignment.topCenter,
                      child: Text(
                        "Your diet today",
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    Align(
                      alignment: Alignment.topRight,
                      child: SizedBox(
                        height: 20,
                        child: IconButton(
                            padding: EdgeInsets.zero,
                            onPressed: (){
                              Navigator.pushNamed(context, RoutePath.customerAddDietScreen).then((value) {
                                initAccount();
                                setState(() {

                                });
                              });
                            },
                            icon: const Icon(Icons.add)
                        ),
                      ),
                    )
                  ]
              ),
              const SizedBox(height: 10,),
              Column(
                children: _getCustomerTodayDietList(),
              )
            ],
          ),
        )
    );
  }

  Widget _buildWarning(){
    String message = "Warning: you have exceeded today goal";
    Widget widget = Container();
    if (user.getTodayKcal() > user.dailyCalorieGoal){
      widget = Container(
        height: 50,
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 20),
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
                SizedBox(height: user.getTodayKcal() > user.dailyCalorieGoal ? 50 : 0,),
                _buildYourProgress(),
                Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      const SizedBox(width: double.infinity,),
                      _buildBalanceDietCard(),
                      const SizedBox(height: 10,),
                      _buildWorkoutListCard(),
                      const SizedBox(height: 10,),
                      _buildDietListCard(),
                      const SizedBox(height: 20,),
                      _buildTodayExerciseCard(),
                      const SizedBox(height: 20,),
                      _buildTodayDietCard(),
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
