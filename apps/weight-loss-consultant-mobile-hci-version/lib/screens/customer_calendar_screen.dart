import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/customer_appbar.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/generic_appbar.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/account_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/customer_schedule_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';
import 'package:weight_loss_consultant_mobile_hci_version/services/customer_schedule_service.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/constants.dart';

class CustomerCalendarScreen extends StatefulWidget {
  const CustomerCalendarScreen({Key? key}) : super(key: key);

  @override
  _CustomerCalendarScreenState createState() => _CustomerCalendarScreenState();
}

class _CustomerCalendarScreenState extends State<CustomerCalendarScreen> {

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

  Widget _buildDefaultCell(String day) {
    bool isToday = DateTime.now().day.toString() == day;
    return Container(
      child: Stack(children: [
        Padding(
          padding: const EdgeInsets.all(5),
          child: Container(
              width: 30,
              height: 30,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.white,
              )
          ),
        ),
        Center(
          child: Text(
            day,
            style: const TextStyle(
                color: Colors.black,
                fontWeight: FontWeight.bold
            ),
          ),
        ),
      ]),
    );
  }

  Widget _buildFreeCell(String day) {
    bool isToday = DateTime.now().day.toString() == day;
    return Container(
      child: Stack(children: [
        Align(
          alignment: Alignment.center,
          child: Padding(
            padding: const EdgeInsets.all(5),
            child: Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: HexColor("#C4C4C4"),
                )
            ),
          ),
        ),
        Center(
          child: Text(
            day,
            style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold
            ),
          ),
        ),
      ]),
    );
  }

  Widget _buildLightCell(String day) {
    bool isToday = DateTime.now().day.toString() == day;
    return Container(
      child: Stack(children: [
        Align(
          alignment: Alignment.center,
          child: Padding(
            padding: const EdgeInsets.all(5),
            child: Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: HexColor("#00AC63"),
                )
            ),
          ),
        ),
        Center(
          child: Text(
            day,
            style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold
            ),
          ),
        ),
      ]),
    );
  }

  Widget _buildMediumCell(String day) {
    bool isToday = DateTime.now().day.toString() == day;
    return Container(
      child: Stack(children: [
        Align(
          alignment: Alignment.center,
          child: Padding(
            padding: const EdgeInsets.all(5),
            child: Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: HexColor("#00A7DC"),
                )

            ),
          ),
        ),
        Center(
          child: Text(
            day,
            style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold
            ),
          ),
        ),
      ]),
    );
  }

  Widget _buildIntenseCell(String day) {
    bool isToday = DateTime.now().day.toString() == day;
    return Container(
      child: Stack(children: [
        Align(
          alignment: Alignment.center,
          child: Padding(
            padding: const EdgeInsets.all(5),
            child: Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: HexColor("#FAA61A"),
                )
            ),
          ),
        ),
        Center(
          child: Text(
            day,
            style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold
            ),
          ),
        ),
      ]),
    );
  }


  Widget monthCellBuilder(BuildContext context, MonthCellDetails details) {
    if (user.scheduleModel == null){
      return _buildDefaultCell(details.date.day.toString());
    }
    if (user.scheduleModel!.data.keys.contains(details.date)) {
      if (user.scheduleModel!.data[details.date]!.dailyExerciseModel.intensity ==
          DailyExerciseIntensity.rest) {
        return _buildFreeCell(details.date.day.toString());
      }
      if (user.scheduleModel!.data[details.date]!.dailyExerciseModel.intensity ==
          DailyExerciseIntensity.light) {
        return _buildLightCell(details.date.day.toString());
      }
      if (user.scheduleModel!.data[details.date]!.dailyExerciseModel.intensity ==
          DailyExerciseIntensity.medium) {
        return _buildMediumCell(details.date.day.toString());
      }
      if (user.scheduleModel!.data[details.date]!.dailyExerciseModel.intensity ==
          DailyExerciseIntensity.intense) {
        return _buildIntenseCell(details.date.day.toString());
      }
    }
    return _buildDefaultCell(details.date.day.toString());
  }

  Widget _buildLegend(){
    return Card(
      child: Container(
        padding: const EdgeInsets.only(top: 20, left: 10, right: 10, bottom: 20),
        child: Column(
          children: [
            Text(
              "Daily energy intake",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 20,
                color: Colors.grey.shade900,
              ),
            ),
            Text(
              "(exercise + diet)",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 15,
                color: Colors.grey.shade900,
              ),
            ),
            const SizedBox(height: 20,),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Column(children: [
                  Container(
                    width: 30.0,
                    height: 30.0,
                    decoration: BoxDecoration(
                      color: HexColor("#C4C4C4"),
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(height: 5,),
                  const Text(
                    "Free",
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const Text(
                    "2100 kcal",
                    style: TextStyle(
                      fontSize: 15,
                    ),
                  )
                ],),
                Column(children: [
                  Container(
                    width: 30.0,
                    height: 30.0,
                    decoration: BoxDecoration(
                      color: HexColor("#00AC63"),
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(height: 5,),
                  const Text(
                    "Light",
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const Text(
                    "2000 kcal",
                    style: TextStyle(
                      fontSize: 15,
                    ),
                  )
                ],),
                Column(children: [
                  Container(
                    width: 30.0,
                    height: 30.0,
                    decoration: BoxDecoration(
                      color: HexColor("#00A7DC"),
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(height: 5,),
                  const Text(
                    "Medium",
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const Text(
                    "1900 kcal",
                    style: TextStyle(
                      fontSize: 15,
                    ),
                  )
                ],),
                Column(children: [
                  Container(
                    width: 30.0,
                    height: 30.0,
                    decoration: BoxDecoration(
                      color: HexColor("#FAA61A"),
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(height: 5,),
                  const Text(
                    "Intense",
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const Text(
                    "1800 kcal",
                    style: TextStyle(
                      fontSize: 15,
                    ),
                  )
                ],),
              ],
            )
          ],
        ),
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
      ),
      child: Scaffold(
        appBar: CustomerAppbar.builder("Your calendar"),
        backgroundColor: Colors.transparent,
        body: SafeArea(
          child: Column(
            children: [
              Expanded(
                child: Card(
                  child: SfCalendar(
                    backgroundColor: Colors.white.withOpacity(0.2),
                    view: CalendarView.month,
                    monthCellBuilder: monthCellBuilder,
                    monthViewSettings: const MonthViewSettings(
                        appointmentDisplayMode: MonthAppointmentDisplayMode
                            .appointment,
                        showTrailingAndLeadingDates: false,
                    ),
                    onTap: (calendarTapDetails) {
                      DateTime date = calendarTapDetails.date as DateTime;
                      Navigator.pushNamed(context, RoutePath.customerTodoPage, arguments: date);
                    },
                  ),
                ),
              ),
              const SizedBox(height: 20,),
              _buildLegend(),
              const SizedBox(height: 100,),
            ],
          ),
        ),
      ),
    );
  }

}
