import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/models/customer_campaign_model.dart';
import 'package:weight_loss_consultant_mobile/models/package_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/pages/components/toast.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:weight_loss_consultant_mobile/services/trainer_service.dart';

class CustomerAppliedPackagePage extends StatefulWidget {
  int? campaignId;
  CustomerAppliedPackagePage({Key? key, this.campaignId}) : super(key: key);

  @override
  _CustomerAppliedPackagePageState createState() => _CustomerAppliedPackagePageState();
}

class _CustomerAppliedPackagePageState extends State<CustomerAppliedPackagePage> {

  Future<List<PackageModel>>? listCampaign;
  AccountModel user = AccountModel(email: "", fullname: "");
  TrainerService service = TrainerService();

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
        listCampaign = service.getAllPackage(user);
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
            fontWeight: FontWeight.w700,
            fontSize: 18),
      ),
    );
  }


  Widget _package(PackageModel model) {
    return GestureDetector(
      onTap: () {
        Navigator.pushNamed(context, RoutePath.customerPackageDetailPage, arguments: model.id);
      },
      child: Card(
        elevation: 5,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15.0),
        ),
        child: Container(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              Align(
                alignment: Alignment.topLeft,
                child: Text(
                  'Exercise Plan',
                  style: TextStyle(
                      color: AppColors.PRIMARY_WORD_COLOR,
                      fontWeight: FontWeight.w900,
                      fontSize: 15),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 2,
                ),
              ),
              Align(
                alignment: Alignment.topLeft,
                child: Text(
                  model.exercisePlan as String,
                  style: TextStyle(
                      color: AppColors.PRIMARY_WORD_COLOR,
                      fontWeight: FontWeight.w400,
                      fontSize: 15),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 2,
                ),
              ),
              Align(
                alignment: Alignment.topLeft,
                child: Text(
                  'Diet Plan',
                  style: TextStyle(
                      color: AppColors.PRIMARY_WORD_COLOR,
                      fontWeight: FontWeight.w900,
                      fontSize: 15),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 2,
                ),
              ),
              Align(
                alignment: Alignment.topLeft,
                child: Text(
                  model.dietPlan as String,
                  style: TextStyle(
                      color: AppColors.PRIMARY_WORD_COLOR,
                      fontWeight: FontWeight.w400,
                      fontSize: 15),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 2,
                ),
              ),
              const SizedBox(
                height: 5,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Text(
                        model.price.toString(),
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w900,
                            fontSize: 15),
                      ),
                      const Icon(
                        Icons.attach_money,
                        color: Color(0xFFFF3939),
                        size: 17,
                      ),
                    ],
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildEmptyCampaignList(){
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        const SizedBox(
          height: 60,
        ),
        Center(
          child:
          SvgPicture.asset("assets/fake-image/no-package.svg"),
        ),
        const SizedBox(
          height: 30,
        ),
        Center(
          child: Text(
            'No Campaign',
            style: TextStyle(
                color: AppColors.PRIMARY_WORD_COLOR,
                fontSize: 36,
                fontWeight: FontWeight.w700
            ),
          ),
        ),
        const SizedBox(
          height: 30,
        ),
        Center(
          child: Text(
            "You don't have any campaign.",
            style: TextStyle(
                color: AppColors.PRIMARY_WORD_COLOR,
                fontSize: 15,
                fontWeight: FontWeight.w400
            ),
          ),
        ),
        Center(
          child: Text(
            'Create one?',
            style: TextStyle(
                color: AppColors.PRIMARY_WORD_COLOR,
                fontSize: 15,
                fontWeight: FontWeight.w400
            ),
          ),
        ),
      ],
    );
  }

  List<Widget> _buildCampaignList(List<PackageModel> data){
    List<Widget> widgets = [];
    for (PackageModel model in data){
      var widget = _package(model);
      widgets.add(widget);
    }
    return widgets;
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("List Packages"),
      body: Container(
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
        margin: const EdgeInsets.only(top: 20),
        child: SingleChildScrollView(
          child: FutureBuilder<List<PackageModel>>(
              future: listCampaign,
              builder: (context, snapshot) {
                if (snapshot.hasData){
                  if (snapshot.requireData.isEmpty){
                    return _buildEmptyCampaignList();
                  }
                  return Column(
                    children: [
                      _title('Available Campaign'),
                      const SizedBox(
                        height: 20,
                      ),
                      ..._buildCampaignList(snapshot.requireData),
                      const SizedBox(
                        height: 60,
                      ),
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
