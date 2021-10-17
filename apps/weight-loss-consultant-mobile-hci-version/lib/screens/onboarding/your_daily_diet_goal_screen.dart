import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/customer_appbar.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';

class YourDailyDietGoalScreen extends StatefulWidget {

  const YourDailyDietGoalScreen({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _YourDailyDietGoalScreenState();
}

class _YourDailyDietGoalScreenState extends State<YourDailyDietGoalScreen> {
  late Map<String, double> data = {
    "Protein": 20,
    "Carb": 50,
    "Fat": 30,
  };

  final Map<String, int> values = {
    "Energy": 2119,
    "Protein": 105,
    "Carb": 264,
    "Fat": 79,
  };

  final List<String> yourMission = [
    "Track your food and your exercise",
    "Follow your daily calorie recommendation",
    "Balance your intake of carbs, protein, fat and diary fibers",
    "Log your progress by logging your body weight every day",
  ];

  Widget _buildPieChart(){
    return Card(
      elevation: 5,
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            const Text(
              "Daily nutritional recommendations",
              textAlign: TextAlign.center,
              style: TextStyle(
                fontWeight: FontWeight.w700,
                fontSize: 20,
              ),
            ),
            Stack(
              children: [
                Container(
                  color: Colors.transparent,
                  height: 200,
                  child: PieChart(
                    PieChartData(
                        sectionsSpace: 0,
                        centerSpaceRadius: 40,
                        sections: showingSections()),
                  ),
                ),
                Positioned(
                  bottom: 0,
                  right: 0,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            width: 10,
                            height: 10,
                            color: Colors.deepOrangeAccent,
                            margin: const EdgeInsets.only(right: 10),
                          ),
                          const Text("Protein"),
                        ],
                      ),
                      SizedBox(height: 5,),
                      Row(
                        children: [
                          Container(
                            width: 10,
                            height: 10,
                            color: Colors.green,
                            margin: const EdgeInsets.only(right: 10),
                          ),
                          const Text("Carb"),
                        ],
                      ),
                      SizedBox(height: 5,),
                      Row(
                        children: [
                          Container(
                            width: 10,
                            height: 10,
                            color: Colors.black,
                            margin: const EdgeInsets.only(right: 10),
                          ),
                          const Text("Fat"),
                        ],
                      )
                    ],
                  ),
                )
              ],
            ),
            _buildDailyNutrition(),

          ]
        ),
      ),
    );
  }

  Widget _buildDailyNutrition(){
    return Column(
      children: [
        const SizedBox(height: 20,),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              children: [
                const Text(
                  "Energy",
                  style: TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 20,
                  ),
                ),
                const SizedBox(height: 10,),
                Text(
                  "${values["Energy"]} kcal\n ",
                  style:  const TextStyle(
                    fontWeight: FontWeight.w500,
                    fontSize: 15,
                  ),
                ),
              ],
            ),
            Column(
              children: [
                const Text(
                  "Protein",
                  style: TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 20,
                  ),
                ),
                const SizedBox(height: 10,),
                Text(
                  "${data["Protein"]}%\n(${values["Protein"]}g)",
                  style:  const TextStyle(
                    fontWeight: FontWeight.w500,
                    fontSize: 15,
                  ),
                ),
              ],
            ),
            Column(
              children: [
                const Text(
                  "Carb",
                  style: TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 20,
                  ),
                ),
                const SizedBox(height: 10,),
                Text(
                  "${data["Carb"]}%\n(${values["Carb"]}g)",
                  style:  const TextStyle(
                    fontWeight: FontWeight.w500,
                    fontSize: 15,
                  ),
                ),
              ],
            ),
            Column(
              children: [
                const Text(
                  "Fat",
                  style: TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 20,
                  ),
                ),
                const SizedBox(height: 10,),
                Text(
                  "${data["Fat"]}%\n(${values["Fat"]}g)",
                  style: const TextStyle(
                    fontWeight: FontWeight.w500,
                    fontSize: 15,
                  ),
                ),
              ],
            )
          ],
        )
      ],
    );
  }

  Widget _buildLNextBtn() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 20),
      padding: const EdgeInsets.symmetric(vertical: 25.0),
      width: double.infinity,
      child: RaisedButton(
        elevation: 5.0,
        onPressed: () async {
          Navigator.pushNamed(context, RoutePath.yourWorkoutRoutineScreen);
        },
        padding: const EdgeInsets.all(15.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(30.0),
        ),
        color: Colors.white,
        child: const Text(
          'NEXT',
          style: TextStyle(
            color: Color(0xFF527DAA),
            letterSpacing: 1.5,
            fontSize: 18.0,
            fontWeight: FontWeight.bold,
            fontFamily: 'OpenSans',
          ),
        ),
      ),
    );
  }

  List<PieChartSectionData> showingSections() {
    List<PieChartSectionData> result = List.empty(growable: true);
    for (String key in data.keys){
      switch (key){
        case "Protein":
          result.add(PieChartSectionData(
            color: Colors.deepOrangeAccent,
            value: data[key] as double,
            title: "${data[key]!.toStringAsFixed(1)}%",
            radius: 50,
            titleStyle: const TextStyle(
                fontSize: 10.0, fontWeight: FontWeight.bold, color: const Color(0xffffffff)),
          ));
          break;
        case "Carb":
          result.add(PieChartSectionData(
            color: Colors.green,
            value: data[key] as double,
            title: "${data[key]!.toStringAsFixed(1)}%",
            radius: 50,
            titleStyle: const TextStyle(
                fontSize: 10, fontWeight: FontWeight.bold, color: const Color(0xffffffff)),
          ));
          break;
        case "Fat":
          result.add(PieChartSectionData(
            color: Colors.black,
            value: data[key] as double,
            title: "${data[key]!.toStringAsFixed(1)}%",
            radius: 50,
            titleStyle: const TextStyle(
                fontSize: 10.0, fontWeight: FontWeight.bold, color: const Color(0xffffffff)),
          ));
          break;
      }
    }
    return result;
  }

  Widget _buildWhatYouNeedTodo(){
    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Align(
            child: Text(
              "What you need to do",
              style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w600,
                  color: Colors.white
              ),
            ),
            alignment: Alignment.topLeft,
          ),
          ListView.builder(
            physics: const NeverScrollableScrollPhysics(),
            shrinkWrap: true,
            itemCount: yourMission.length,
            itemBuilder: (context, index){
              return ListTile(
                contentPadding: EdgeInsets.zero,
                leading: const Icon(Icons.label ,color: Colors.white,),
                minLeadingWidth: 10,
                title: Text(
                  yourMission[index],
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),
                ),
              );
            },
            padding: EdgeInsets.zero,
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            Color(0xFF398AE5),
            Color(0xFF478DE0),
            Color(0xFF61A4F1),
            Color(0xFF73AEF5),
          ],
          stops: [0.1, 0.4, 0.7, 0.9],
        ),
        //color: Color(0xFF8AB9F3),
      ),
      child: Scaffold(
        appBar: CustomerAppbar.builder("YOUR DAILY NUTRITION GOAL"),
        backgroundColor: Colors.transparent,
        body: SingleChildScrollView(
          child: Container(
            padding: const EdgeInsets.all(5),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const SizedBox(height: 100,),
                _buildPieChart(),
                const SizedBox(height: 10,),
                //_buildWhatYouNeedTodo(),
                _buildLNextBtn(),
                const SizedBox(height: 20,),
              ],
            ),
          ),
        ),
      ),
    );
  }


}
