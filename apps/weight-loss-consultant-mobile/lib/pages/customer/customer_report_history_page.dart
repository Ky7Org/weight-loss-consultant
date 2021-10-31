import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';

class CustomerReportHistoryPage extends StatefulWidget {
  const CustomerReportHistoryPage({Key? key}) : super(key: key);

  @override
  _CustomerReportHistoryPageState createState() => _CustomerReportHistoryPageState();
}

class _CustomerReportHistoryPageState extends State<CustomerReportHistoryPage> {
  AccountModel user = AccountModel(email: "", fullname: "");
  Future<List<String>?>? listReport;

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

  Future<List<String>> _generateFakeList() async{
    List<String> list = ["tien", "truong", "tran"];
    return list;
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value){
        listReport = _generateFakeList();
        setState(() {});
      });
    });
  }

  Widget _buildReportCard(String data){
    return GestureDetector(
      onTap: (){
        Navigator.pushNamed(context, RoutePath.customerReportDetailPage);
      },
      child: Card(
        child: Container(
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
                    decoration: const BoxDecoration(
                      color: Colors.red,
                      borderRadius: BorderRadius.all(Radius.circular(20)),
                    ),
                    child: const Text(
                      "Status",
                      style: TextStyle(
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
                "Tien truong 123 Tien truong 123 Tien truong 123 Tien truong 123 Tien truong 123 Tien truong 123 Tien truong 123 Tien truong 123 ",
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
                "Tien truong 123 Tien truong 123 Tien truong 123 Tien truong 123 Tien truong 123 Tien truong 123 Tien truong 123 Tien truong 123 ",
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
                "Tien truong 123 Tien truong 123 Tien truong 123 Tien truong 123 Tien truong 123 Tien truong 123 Tien truong 123 Tien truong 123 ",
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

  List<Widget> _generateReportCardList(List<String>? data){
    List<Widget> widgetList = [];
    for (String reportString in data!){
      Widget widget = _buildReportCard(reportString);
      widgetList.add(widget);
    }

    return widgetList;
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("Package detail"),
      body: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
        margin: const EdgeInsets.only(top: 20),
        child: SingleChildScrollView(
          child: FutureBuilder<List<String>?>(
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
                return const CircularProgressIndicator();
              }
          ),
        ),
      ),
    );
  }
}
