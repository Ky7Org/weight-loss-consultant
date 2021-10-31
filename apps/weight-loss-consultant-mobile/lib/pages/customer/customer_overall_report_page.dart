import 'dart:convert';

import 'package:calendar_timeline/calendar_timeline.dart';
import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:syncfusion_flutter_sliders/sliders.dart';
import 'package:syncfusion_flutter_core/theme.dart';



class CustomerOverallReportPage extends StatefulWidget {
  const CustomerOverallReportPage({Key? key}) : super(key: key);

  @override
  _CustomerOverallReportPageState createState() =>
      _CustomerOverallReportPageState();
}

class _CustomerOverallReportPageState extends State<CustomerOverallReportPage> {
  AccountModel user = AccountModel(email: "", fullname: "");
  DateTime selectedDate = DateTime.now();
  double userWeight = 30;


  Future<void> initAccount() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? userJSON = prefs.getString('ACCOUNT');
    if (userJSON is String) {
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
    WidgetsBinding.instance?.addPostFrameCallback((_) {
      initAccount().then((value) {
        setState(() {});
      });
    });
  }

  List<_UserWeightHistory> _generateWeightDataSource(){
    List<_UserWeightHistory> result = [];
    /*for (var history in user.weightHistory){
      DateTime dateTime = history.keys.first;
      int weight = history[dateTime] ?? 1;
      result.add(_UserWeightHistory(dateTime, weight));
    }*/
    return result;
  }

  Widget _buildWeightChart(){
    return Padding(
      padding: const EdgeInsets.all(10.0),
      child: Column(
        children: [
          Align(
            alignment: Alignment.topLeft,
            child: Text(
              "Weight",
              style: TextStyle(
                fontSize: 30,
                fontWeight: FontWeight.w900,
                color: HexColor("#0D3F67"),
              ),
            ),
          ),
          const SizedBox(height: 15,),
          SfCartesianChart(
              primaryXAxis: DateTimeAxis(),
              series: <ChartSeries>[
                // Renders spline chart
                SplineSeries<_UserWeightHistory, DateTime>(
                    name:'Weight',
                    dataSource: _generateWeightDataSource(),
                    xValueMapper: (_UserWeightHistory history, _) => history.datetime,
                    yValueMapper: (_UserWeightHistory history, _) => history.weight,
                    dataLabelSettings: const DataLabelSettings(isVisible : true)
                )
              ]
          ),
        ],
      ),
    );
  }

  Widget _buildWeightStatisticsPanel(){
    return Container(
      padding: const EdgeInsets.only(left: 10, right: 20),
      child: Column(
        children: [
          const SizedBox(height: 20,),
          Row(
            children: <Widget>[
              Text(
                'Current weight',
                style: TextStyle(
                    color: HexColor("#0D3F67"),
                    fontSize: 17,
                    fontWeight: FontWeight.w500
                ),
              ),
              const Spacer(),
              Text(
                "$userWeight kg",
                style: TextStyle(
                    color: HexColor("#0D3F67"),
                    fontSize: 17,
                    fontWeight: FontWeight.w400
                ),
              )

            ],
          ),
          const SizedBox(height: 15,),
          Row(
            children: <Widget>[
              Text(
                'Heaviest weight',
                style: TextStyle(
                    color: HexColor("#0D3F67"),
                    fontSize: 17,
                    fontWeight: FontWeight.w500
                ),
              ),
              const Spacer(),
              Text(
                "50 kg",
                style: TextStyle(
                    color: HexColor("#0D3F67"),
                    fontSize: 17,
                    fontWeight: FontWeight.w400
                ),
              ),
            ],
          ),
          const SizedBox(height: 15,),
          Row(
            children: <Widget>[
              Text(
                'Lightest weight',
                style: TextStyle(
                    color: HexColor("#0D3F67"),
                    fontSize: 17,
                    fontWeight: FontWeight.w500
                ),
              ),
              const Spacer(),
              Text(
                "50 kg",
                style: TextStyle(
                  color: HexColor("#0D3F67"),
                  fontSize: 17,
                  fontWeight: FontWeight.w400
                ),
              )

            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCalendarSlider(){
    return Card(
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.only(
          bottomLeft: Radius.circular(15),
          bottomRight: Radius.circular(15),
        ),
      ),
      child: Container(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Text(
              DateFormat.yMMMEd().format(selectedDate),
              style: TextStyle(
                color: HexColor("#0D3F67"),
                fontWeight: FontWeight.w700,
                fontSize: 20,
              )
            ),
            Row(
              children: [
                Text(
                  "History",
                  style: TextStyle(
                    color: HexColor("#0D3F67"),
                    fontWeight: FontWeight.w700,
                    fontSize: 20,
                  ),
                ),
                const Spacer(),
                TextButton(
                  onPressed: (){},
                  child: Text(
                    "More",
                    style: TextStyle(
                        color: HexColor("#0D3F67"),
                        fontSize: 20,
                        fontWeight: FontWeight.w400
                    ),
                  ))
              ],
            ),
            CalendarTimeline(
              initialDate: selectedDate,
              firstDate: DateTime.now().subtract(const Duration(days: 30 * 2)),
              lastDate: DateTime.now().add(const Duration(days: 30 * 2)),
              onDateSelected: (date){
                setState(() {
                  selectedDate = date as DateTime;
                });
              },
              leftMargin: 20,
              monthColor: HexColor("##0D3F67"),
              dayColor: HexColor("##0D3F67"),
              activeDayColor: HexColor("##0D3F67"),
              activeBackgroundDayColor: Colors.transparent,
              dotsColor: Color(0xFF333A47),
              locale: 'en_ISO',
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildChangeTodayWeight(){
    return Container(
        child: SfSliderTheme(
          data: SfSliderThemeData(
            tooltipBackgroundColor: Colors.red[300],
            activeTrackColor: HexColor("#FF3939"),
            inactiveTrackColor: HexColor("#FF3939").withOpacity(0.18),
            thumbColor: Colors.red,
            activeLabelStyle: TextStyle(color: HexColor("#0D3F67"), fontSize: 15),
            inactiveLabelStyle: TextStyle(color: HexColor("#0D3F67"), fontSize: 15),
          ),
          child: SfSlider(
            min: 30,
            max: 150,
            stepSize: 1,
            showLabels: true,
            enableTooltip: true,
            value: userWeight,
            onChanged: (dynamic newValue){
              setState(() {
                userWeight = newValue;
              });
            },
          ),
        )
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("Report"),
      body: Container(
        padding: const EdgeInsets.only(bottom: 20),
        child: SingleChildScrollView(
          child: Column(
            children: [
              _buildCalendarSlider(),
              _buildWeightChart(),
              _buildWeightStatisticsPanel(),
              _buildChangeTodayWeight(),
            ],
          ),
        ),
      ),
    );
  }
}

class _UserWeightHistory{
  DateTime datetime;
  int weight;

  _UserWeightHistory(this.datetime, this.weight);

  @override
  String toString() {
    return "_UserWeightHistory{datetime: $datetime, weight: $weight}";
  }
}
