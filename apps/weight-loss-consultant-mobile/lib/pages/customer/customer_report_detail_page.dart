import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/models/report_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/services/customer_service.dart';
import 'package:weight_loss_consultant_mobile/services/trainer_service.dart';

class CustomerReportDetailPage extends StatefulWidget {
  int? reportId;
  CustomerReportDetailPage({Key? key, this.reportId}) : super(key: key);

  @override
  _CustomerReportDetailPageState createState() => _CustomerReportDetailPageState();
}

class _CustomerReportDetailPageState extends State<CustomerReportDetailPage> {
  AccountModel user = AccountModel(email: "", fullname: "");
  Future<ReportModel?>? report;
  List<String> dietImages = [];
  List<String> exerciseImages = [];

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

  Future<String> _generateFakeReport() async {
    return "Hey";
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value){
        CustomerService service = CustomerService();
        report = service.getReportModelById(widget.reportId as int, user);
        setState(() {});
      });
    });
  }

  Widget _title(String title) {
    return Align(
      alignment: Alignment.topLeft,
      child: Text(
        title,
        style: const TextStyle(
            color: Color(0xFF0D3F67),
            fontWeight: FontWeight.w900,
            fontSize: 15),
      ),
    );
  }

  Widget _buildImages(List<String> images){
    List<Widget> listWidget = [];
    for (String file in images){
      Widget image;
      try{
        image = Image.network(
          file,
          height: 100,
          width: 100,
        )
        ;
      } catch (e){
        image = Image.asset("assets/fake-image/miku-avatar.png");
      }
      if(file.contains('https://')){
        listWidget.add(image);
      }
    }

    return Row(
      children: [
        ...listWidget,
      ],
    );
  }

  Widget _buildDietCard(ReportModel data){
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
      child: Container(
        padding: const EdgeInsets.only(left: 20, right: 20, top: 20, bottom: 10),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(10),
              topRight: Radius.circular(10),
              bottomLeft: Radius.circular(10),
              bottomRight: Radius.circular(10)),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.2),
              spreadRadius: 1,
              blurRadius: 7,
              offset: const Offset(0, 3), // changes position of shadow
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildImages(dietImages),
            const SizedBox(height: 20,),
            _title('Customer Diet'),
            const SizedBox(height: 10,),
            Text(
                data.dietDescription ?? "",
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w500,
                  color: AppColors.PRIMARY_WORD_COLOR,
                )
            ),
            //_pickUpImageCard(),
            /*_multiInput(
                "What did you eat today?", "Egg and Fish...", _todayDiet),*/
          ],
        ),
      ),
    );
  }

  Widget _buildExerciseCard(ReportModel data){
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
      child: Container(
        padding: const EdgeInsets.only(left: 20, right: 20, top: 20, bottom: 10),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(10),
              topRight: Radius.circular(10),
              bottomLeft: Radius.circular(10),
              bottomRight: Radius.circular(10)),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.2),
              spreadRadius: 1,
              blurRadius: 7,
              offset: const Offset(0, 3), // changes position of shadow
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildImages(exerciseImages),
            const SizedBox(height: 20,),
            _title('Customer Exercise'),
            const SizedBox(height: 10,),
            Text(
                data.exerciseDescription ?? "",
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w500,
                  color: AppColors.PRIMARY_WORD_COLOR,
                )
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTrainerFeedbackCard(ReportModel data){
    String status = "Not yet";
    if (data.trainerApproval != null){
      if (data.trainerApproval == 0){
        status = "Approve";
      } else {
        status = "Decline";
      }
    }
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(10),
              topRight: Radius.circular(10),
              bottomLeft: Radius.circular(10),
              bottomRight: Radius.circular(10)),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.2),
              spreadRadius: 1,
              blurRadius: 7,
              offset: const Offset(0, 3), // changes position of shadow
            ),
          ],
        ),
        padding: const EdgeInsets.only(left: 20, right: 20, top: 20, bottom: 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Trainer Feedback",
              style: TextStyle(
                  color: AppColors.PRIMARY_WORD_COLOR,
                  fontSize: 18,
                  fontWeight: FontWeight.w900
              ),
            ),
            const SizedBox(height: 20,),
            Row(
              children: [
                Text(
                  "Trainer approval",
                  style: TextStyle(
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontSize: 15,
                    fontWeight: FontWeight.w900
                  ),
                ),
                const SizedBox(width: 10,),
                Container(
                    padding: const EdgeInsets.symmetric(vertical: 3, horizontal: 7),
                    decoration: BoxDecoration(
                      color: status == "Approve" ? Colors.green : Colors.red,
                      borderRadius: const BorderRadius.all(Radius.circular(20)),
                    ),
                    child: Text(
                      status,
                      style: const TextStyle(
                        color: Colors.white,

                      ),
                    )
                ),
              ],
            ),
            const SizedBox(height: 10,),
            Text(
                data.trainerFeedback ?? "Trainer has not yet feedback this report",
                style: TextStyle(
                  fontSize: 15,
                  color: AppColors.PRIMARY_WORD_COLOR,
                )
            ),
          ],
        ),
      ),
    );
  }


  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: GenericAppBar.builder("Report detail"),
      body: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
        margin: const EdgeInsets.only(top: 20),
        child: SingleChildScrollView(
          child: FutureBuilder<ReportModel?>(
              future: report,
              builder: (context, snapshot) {
                if (snapshot.hasData){
                  var date = DateFormat("MMMM-dd-yyyy").format(DateTime.fromMillisecondsSinceEpoch(int.parse(snapshot.requireData!.createDate ?? "")));
                  TrainerService service = TrainerService();
                  ReportModel report = snapshot.requireData as ReportModel;
                  service.getExerciseReportMediaModelByReportId(report.id as int, user).then((value){
                    exerciseImages = value.map((e) => e.url ?? "").toList();
                    service.getDietReportMediaModelByReportId(report.id as int, user).then((value) {
                      dietImages = value.map((e) => e.url ?? "").toList();
                      setState(() {
                      });
                    });
                  });
                  return Column(
                    children: [
                      Align(
                        alignment: Alignment.topLeft,
                        child: Text(
                            'Create date:  $date',
                            style: TextStyle(
                                fontWeight: FontWeight.w700,
                                fontSize: 15,
                                color: AppColors.PRIMARY_WORD_COLOR
                            )
                        ),
                      ),
                      const SizedBox(
                          height: 20
                      ),
                      _buildTrainerFeedbackCard(snapshot.requireData as ReportModel),
                      const SizedBox(height: 15,),
                      _buildDietCard(snapshot.requireData as ReportModel),
                      const SizedBox(height: 15,),
                      _buildExerciseCard(snapshot.requireData as ReportModel),


                    ],
                  );
                }
                return const Center(
                  child: CircularProgressIndicator()
                );
              }
          ),
        ),
      ),
    );
  }
}
