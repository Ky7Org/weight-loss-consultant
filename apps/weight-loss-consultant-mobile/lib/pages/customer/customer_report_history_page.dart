import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/models/report_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:weight_loss_consultant_mobile/services/customer_service.dart';

class CustomerReportHistoryPage extends StatefulWidget {
  int? packageId;
  CustomerReportHistoryPage({Key? key, this.packageId}) : super(key: key);

  @override
  _CustomerReportHistoryPageState createState() => _CustomerReportHistoryPageState();
}

class _CustomerReportHistoryPageState extends State<CustomerReportHistoryPage> {
  AccountModel user = AccountModel(email: "", fullname: "");
  Future<List<ReportModel>?>? listReport;

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
      initAccount().then((value){
        CustomerService service = CustomerService();
        listReport = service.getReportsByPackageId(widget.packageId as int, user);
        setState(() {});
      });
    });
  }

  Widget _buildReportCard(ReportModel data){
    String status = "Not yet";
    if (data.trainerApproval != null){
      if (data.trainerApproval == 0){
        status = "Approve";
      } else {
        status = "Decline";
      }
    }

    return GestureDetector(
      onTap: (){
        Navigator.pushNamed(context, RoutePath.customerReportDetailPage, arguments: data.id);
      },
      child: Card(
        margin: const EdgeInsets.symmetric(vertical: 10),
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
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(
                    DateFormat.yMMMd().format(DateTime.now()),
                    style: TextStyle(
                      color: AppColors.PRIMARY_WORD_COLOR,
                      fontSize: 17,
                      fontWeight: FontWeight.bold
                    ),
                  ),
                  const Spacer(),
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
                "Your diet",
                style: TextStyle(
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontSize: 17,
                    fontWeight: FontWeight.bold
                ),
              ),
              Text(
                data.dietDescription ?? "",
                overflow: TextOverflow.ellipsis,
                maxLines: 2,
                style: TextStyle(
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontSize: 17,
                )
              ),
              const SizedBox(height: 10,),
              Text(
                "Your exercise",
                style: TextStyle(
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontSize: 17,
                    fontWeight: FontWeight.bold
                ),
              ),
              Text(
                data.exerciseDescription ?? "",
                overflow: TextOverflow.ellipsis,
                maxLines: 2,
                style: TextStyle(
                  color: AppColors.PRIMARY_WORD_COLOR,
                  fontSize: 17,
                )
              ),
              const SizedBox(height: 10,),
              Text(
                "Trainer feedback",
                style: TextStyle(
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontSize: 17,
                    fontWeight: FontWeight.bold
                ),
              ),
              Text(
                data.trainerFeedback ?? "Trainer has not yet feedback this report",
                overflow: TextOverflow.ellipsis,
                maxLines: 2,
                style: TextStyle(
                  color: AppColors.PRIMARY_WORD_COLOR,
                  fontSize: 17,
                )
              ),
            ],
          ),
        ),
      ),
    );
  }

  List<Widget> _generateReportCardList(List<ReportModel>? data){
    List<Widget> widgetList = [];
    for (ReportModel reportString in data!){
      Widget widget = _buildReportCard(reportString);
      widgetList.add(widget);
    }

    return widgetList;
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("Report History"),
      body: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
        margin: const EdgeInsets.only(top: 20),
        child: SingleChildScrollView(
          child: FutureBuilder<List<ReportModel>?>(
              future: listReport,
              builder: (context, snapshot) {
                if (snapshot.hasData){
                  return Column(
                    children: [
                      ..._generateReportCardList(snapshot.requireData),
                      const SizedBox(height: 60,),
                    ],
                  );
                }
                return const Center(
                  child: CircularProgressIndicator(),
                );
              }
          ),
        ),
      ),
    );
  }
}
