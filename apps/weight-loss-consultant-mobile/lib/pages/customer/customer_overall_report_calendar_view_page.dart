import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';

class CustomerOverallReportCalendarViewPage extends StatefulWidget {
  const CustomerOverallReportCalendarViewPage({Key? key}) : super(key: key);

  @override
  _CustomerOverallReportCalendarViewPageState createState() => _CustomerOverallReportCalendarViewPageState();
}

class _CustomerOverallReportCalendarViewPageState extends State<CustomerOverallReportCalendarViewPage> {
  AccountModel user = AccountModel(email: "", fullname: "");
  DateTime selectedDate = DateTime(DateTime.now().year, DateTime.now().month, DateTime.now().day);

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

  Widget _buildDefaultCell(String day) {
    return Container(
      child: Stack(children: [
        Padding(
          padding: const EdgeInsets.all(5),
          child: Container(
              width: 30,
              height: 30,
              decoration: const BoxDecoration(
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




  Widget _buildIntenseCell(String day) {
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
                  color: HexColor("#014DF8"),
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
    if (details.date.isAtSameMomentAs(selectedDate)){
      return _buildIntenseCell(selectedDate.day.toString());
    }
    return _buildDefaultCell(details.date.day.toString());
  }

  Widget _buildCalendarSection(){
      return SfCalendar(
        backgroundColor: Colors.white.withOpacity(0.2),
        view: CalendarView.month,
        monthCellBuilder: monthCellBuilder,
        monthViewSettings: const MonthViewSettings(
          appointmentDisplayMode: MonthAppointmentDisplayMode
              .appointment,
          showTrailingAndLeadingDates: false,
        ),
        cellBorderColor: Colors.transparent,
        selectionDecoration: const BoxDecoration(),
        onTap: (calendarTapDetails) {
          DateTime date = calendarTapDetails.date as DateTime;
          selectedDate = date;
          setState(() {

          });
        },
      );
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("Report"),
      body: _buildCalendarSection(),
    );
  }
}
