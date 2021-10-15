import 'dart:convert';
import 'dart:math';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/customer_appbar.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/account_model.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:syncfusion_flutter_charts/sparkcharts.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/constants.dart';

class _UserWeightHistory{
  DateTime datetime;
  int weight;

  _UserWeightHistory(this.datetime, this.weight);

}

class _UserCalHistory{
  DateTime datetime;
  int cal;

  _UserCalHistory(this.datetime, this.cal);
}

class ReportScreen extends StatefulWidget {
  const ReportScreen({Key? key}) : super(key: key);

  @override
  _ReportScreenState createState() => _ReportScreenState();
}

class _ReportScreenState extends State<ReportScreen> {
  AccountModel user = AccountModel(email: "", fullname: "");
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final TextEditingController _textEditingController = TextEditingController();

  Future<void> initAccount() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? userJSON = prefs.getString('ACCOUNT');
    if (userJSON is String){
      Map<String, dynamic> userMap = jsonDecode(userJSON);
      user = AccountModel.fromJson(userMap);
    }
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount();
      setState(() {});
    });
  }

  Widget _buildUserBodyIndexWidget(){
    return Padding(
      padding: const EdgeInsets.fromLTRB(10, 0, 10, 20),
      child: Column(
        children: [
          Row(
            children: [
              const Text(
                "Body index",
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w700,
                ),
              ),
              const Spacer(),
              TextButton(
                onPressed: (){
                  showInformationDialog(context);
                },
                child: const Text("EDIT")
              )
            ],
          ),
          const SizedBox(height: 15,),
          Row(
            children: <Widget>[
              const Text(
                'Your weight: ',
                style: TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.w600,
                  fontSize: 17
                ),
              ),
              const SizedBox(
                width: 5,
              ),
              Text(
                user.weight.toString(),
                style: const TextStyle(
                    color: Color(0xFF0648F6),
                    fontSize: 23,
                    fontWeight: FontWeight.bold),
              ),
              const Text(
                " kg",
                style: TextStyle(
                    color: Color(0xFF0648F6),
                    fontSize: 19,
                    fontWeight: FontWeight.bold),
              ),
            ],
          ),
          const SizedBox(height: 15,),
          Row(
            children: <Widget>[
              const Text(
                'Your height: ',
                style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.w600,
                    fontSize: 17
                ),
              ),
              const SizedBox(
                width: 5,
              ),
              Text(
                user.height.toString(),
                style: const TextStyle(
                    color: Color(0xFF0648F6),
                    fontSize: 23,
                    fontWeight: FontWeight.bold),
              ),
              const Text(
                " cm",
                style: TextStyle(
                    color: Color(0xFF0648F6),
                    fontSize: 19,
                    fontWeight: FontWeight.bold),
              ),
            ],
          ),
        ],
      ),
    );
  }

  List<_UserWeightHistory> _generateWeightDataSource(){
    List<_UserWeightHistory> result = [];
    for (var history in user.weightHistory){
      DateTime dateTime = history.keys.first;
      int weight = history[dateTime] ?? 1;
      result.add(_UserWeightHistory(dateTime, weight));
    }
    return result;
  }

  Widget _buildWeightChart(){
    return Padding(
      padding: const EdgeInsets.all(10.0),
      child: Column(
        children: [
          const Align(
            alignment: Alignment.topLeft,
            child: Text(
              "Weight",
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          SizedBox(height: 15,),
          SfCartesianChart(
            primaryXAxis: DateTimeAxis(),
            series: <ChartSeries>[
              // Renders spline chart
              SplineSeries<_UserWeightHistory, DateTime>(
                  name:'Weight',
                  dataSource: _generateWeightDataSource(),
                  xValueMapper: (_UserWeightHistory history, _) => history.datetime,
                  yValueMapper: (_UserWeightHistory history, _) => history.weight,
                  dataLabelSettings: DataLabelSettings(isVisible : true)
              )
            ]
          ),
          SizedBox(height: 20,),
          Row(
            children: <Widget>[
              const SizedBox(
                width: 5,
              ),
              const Text(
                'Heaviest: ',
                style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.w600,
                    fontSize: 17
                ),
              ),
              const SizedBox(
                width: 5,
              ),
              Text(
                user.getMaxWeight().toString(),
                style: const TextStyle(
                    color: Color(0xFF0648F6),
                    fontSize: 23,
                    fontWeight: FontWeight.bold),
              ),
              const Text(
                " kg",
                style: TextStyle(
                    color: Color(0xFF0648F6),
                    fontSize: 19,
                    fontWeight: FontWeight.bold),
              ),
            ],
          ),
          SizedBox(height: 10,),
          Row(
            children: <Widget>[
              const SizedBox(
                width: 5,
              ),
              const Text(
                'Lightest: ',
                style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.w600,
                    fontSize: 17
                ),
              ),
              const SizedBox(
                width: 5,
              ),
              Text(
                user.getMinWeight().toString(),
                style: const TextStyle(
                    color: Color(0xFF0648F6),
                    fontSize: 23,
                    fontWeight: FontWeight.bold),
              ),
              const Text(
                " kg",
                style: TextStyle(
                    color: Color(0xFF0648F6),
                    fontSize: 19,
                    fontWeight: FontWeight.bold),
              ),
            ],
          ),
        ],
      ),
    );
  }

  List<_UserCalHistory> _generateCalDataSource(){
    List<_UserCalHistory> result = [];
    for (var history in user.calHistory){
      DateTime dateTime = history.keys.first;
      int cal = history[dateTime] ?? 1;
      result.add(_UserCalHistory(dateTime, cal));
    }
    return result;
  }

  Widget _buildCalChart(){
    return Padding(
      padding: const EdgeInsets.all(10.0),
      child: Column(
        children: [
          const Align(
            alignment: Alignment.topLeft,
            child: Text(
              "Calories",
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          SizedBox(height: 15,),
          SfCartesianChart(
              primaryXAxis: DateTimeAxis(),
              series: <ChartSeries>[
                // Renders spline chart
                SplineSeries<_UserCalHistory, DateTime>(
                    name:'Weight',
                    dataSource: _generateCalDataSource(),
                    xValueMapper: (_UserCalHistory history, _) => history.datetime,
                    yValueMapper: (_UserCalHistory history, _) => history.cal,
                    dataLabelSettings: DataLabelSettings(isVisible : true)
                )
              ]
          ),
          const SizedBox(height: 20,),
          Row(
            children: <Widget>[
              const Text(
                'Today calorie: ',
                style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.w600,
                    fontSize: 17
                ),
              ),
              const SizedBox(
                width: 5,
              ),
              Text(
                user.kcalNum.toString(),
                style: const TextStyle(
                    color: Color(0xFF0648F6),
                    fontSize: 23,
                    fontWeight: FontWeight.bold),
              ),
              const Spacer(),
              const Text(
                "cal",
                style: TextStyle(
                    color: Color(0xFF0648F6),
                    fontSize: 19,
                    fontWeight: FontWeight.w300),
              ),
            ],
          ),
          SizedBox(height: 15,),
          Row(
            children: <Widget>[
              const SizedBox(
                width: 5,
              ),
              const Text(
                'Average calorie: ',
                style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.w600,
                    fontSize: 17
                ),
              ),
              const SizedBox(
                width: 5,
              ),
              Text(
                user.getAverageCal().toString(),
                style: const TextStyle(
                    color: Color(0xFF0648F6),
                    fontSize: 23,
                    fontWeight: FontWeight.bold),
              ),
              const Spacer(),
              const Text(
                "cal",
                style: TextStyle(
                    color: Color(0xFF0648F6),
                    fontSize: 19,
                    fontWeight: FontWeight.w300),
              ),
            ],
          ),
        ],
      ),
    );
  }

  String _calculateBMIStatus(bmi) {
    String status = "Severely underweight";
    for (String info in bmiData.keys) {
      if (bmiData[info]["start"] < bmi && bmi <= bmiData[info]["end"]) {
        return info;
      }
    }

    if (bmi > 40){
      return "Severely obese";
    }
    if (bmi < 15){
      return "Severely underweight";
    }
    return status;
  }

  String _generateMessage(){
    double bmi = user.weight / ((user.height / 100) * (user.height / 100));
    double goal = user.weight - 21.5*((user.height / 100) * (user.height / 100));
    String message = "You are ${goal.toStringAsFixed(1)} kg overweight";
    String status = _calculateBMIStatus(bmi);
    if (status == "Healthy weight"){
      message = "You are at a perfect condition";
    }
    if (goal < 0 && status != "Healthy weight"){
      message = "You are ${(goal * -1 ).toStringAsFixed(1)} kg underweight";
    }
    return message;
  }

  Widget _buildBMIChart(){
    double bmi = user.weight / ((user.height / 100) * (user.height / 100));
    List<Widget> indicators = List.empty(growable: true);
    for(String info in bmiData.keys){
      Widget container = Expanded(
          flex: bmiData[info]["end"] - bmiData[info]["start"],
          child: Container(
            height: 50,
            color: bmiData[info]["color"],
          )
      );
      indicators.add(container);
    }

    double range = 2 * ((bmi - 15)/25) - 1;
    if (range < -1) range = -1;
    if (range > 1) range = 1;
    String status = _calculateBMIStatus(bmi);

    return Container(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          Align(
            alignment: Alignment.topLeft,
            child: Text(
              "BMI(kg/m2): ${bmi.toStringAsFixed(2)}",
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          const SizedBox(height: 30,),
          Stack(
              children: [
                Align(
                  alignment: Alignment.center,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: indicators,
                  ),
                ),
                Align(
                  alignment: Alignment(range,0),
                  child: Container(
                    height: 50,
                    width: 3,
                    color: Colors.black,
                  ),
                )
              ]
          ),
          const SizedBox(height: 15,),
          Text(
            _generateMessage(),
            style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w600,
                color: bmiData[status]["color"]

            ),
          )

        ],
      ),
    );
  }

  Future<void> showInformationDialog(BuildContext context) async {
    return await showDialog(
        context: context,
        builder: (context) {
          bool isChecked = false;
          return StatefulBuilder(builder: (context, setState) {
            return AlertDialog(
              content: Form(
                  key: _formKey,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      TextFormField(
                        controller: _textEditingController,
                        validator: (value) {
                          return value!.isNotEmpty ? null : "Enter any text";
                        },
                        decoration:
                        InputDecoration(hintText: "Please Enter Text"),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text("Choice Box"),
                          Checkbox(
                              value: isChecked,
                              onChanged: (checked) {
                                setState(() {
                                  isChecked = checked as bool;
                                });
                              })
                        ],
                      )
                    ],
                  )),
              title: Text('Stateful Dialog'),
              actions: <Widget>[
                InkWell(
                  child: Text('OK   '),
                  onTap: () {
                    if (_formKey.currentState!.validate()) {
                      // Do something like updating SharedPreferences or User Settings etc.
                      Navigator.of(context).pop();
                    }
                  },
                ),
              ],
            );
          });
        });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomerAppbar.builder("Your report"),
        body: SingleChildScrollView(
          child: SafeArea(
            child: Container(
              padding: const EdgeInsets.only(top: 20),
              child: Column(
                children: [
                  _buildUserBodyIndexWidget(),
                  const SizedBox(height: 10),
                  const Divider(
                    thickness: 10,
                  ),
                  _buildBMIChart(),
                  const SizedBox(height: 10),
                  const Divider(
                    thickness: 10,
                  ),
                  const SizedBox(height: 10),
                  _buildWeightChart(),
                  const SizedBox(height: 10),
                  const Divider(
                    thickness: 10,
                  ),
                  _buildCalChart(),
                ],
              ),
            ),
          ),
        ));
  }
}
