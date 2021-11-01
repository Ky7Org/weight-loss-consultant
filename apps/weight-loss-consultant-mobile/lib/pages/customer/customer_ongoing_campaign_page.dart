import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/models/package_model.dart';
import 'package:weight_loss_consultant_mobile/models/trainer_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:weight_loss_consultant_mobile/services/customer_service.dart';

class CustomerOnGoingCampaignPage extends StatefulWidget {
  int? packageID;

  CustomerOnGoingCampaignPage({Key? key, this.packageID}) : super(key: key);

  @override
  _CustomerOnGoingCampaignPageState createState() =>
      _CustomerOnGoingCampaignPageState();
}

class _CustomerOnGoingCampaignPageState
    extends State<CustomerOnGoingCampaignPage> {
  Future<PackageModel?>? packageModel;

  AccountModel user = AccountModel(email: "", fullname: "");
  CustomerService service = CustomerService();

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
        packageModel = service.getPackageById(24, user);
        setState(() {});
      });
    });
  }

  Widget _buildTrainerContainer(TrainerModel model) {
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: Container(
        padding: const EdgeInsets.all(20),
        child: Row(
          mainAxisSize: MainAxisSize.max,
          children: [
            const Image(
                image: AssetImage("assets/fake-image/fake-trainer-avatar.jpg"),
                width: 73,
                height: 73,
                fit: BoxFit.fill),
            const SizedBox(
              width: 15,
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.max,
              children: [
                Text(
                  model.fullname ?? "",
                  style: TextStyle(
                      color: HexColor("#0D3F67"),
                      fontSize: 20,
                      fontWeight: FontWeight.w700),
                ),
                const SizedBox(
                  height: 10,
                ),
                Text(
                  "${model.gender == "1" ? "Male" : "Female"} | ${model.phone ?? ""}",
                  style: TextStyle(
                      color: HexColor("#B6C5D1"),
                      fontSize: 16,
                      fontWeight: FontWeight.w500),
                ),
                const SizedBox(
                  height: 10,
                ),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    RatingBarIndicator(
                      rating: model.rating ?? 0,
                      itemBuilder: (context, index) => Icon(
                        Icons.star,
                        color: HexColor("#1EE0CC"),
                      ),
                      itemCount: 5,
                      itemSize: 20.0,
                      direction: Axis.horizontal,
                    ),
                    SizedBox(width: 30),
                    Text("${model.yearOfExp ?? 0} year(s)")
                  ],
                )
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPackageContainer(PackageModel model) {
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: Container(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(
                width: double.infinity,
              ),
              Text(
                model.name ?? "",
                style: const TextStyle(
                    color: Color(0xFF0D3F67),
                    fontWeight: FontWeight.w700,
                    fontSize: 22),
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                "EXERCISE PLAN",
                style: const TextStyle(
                    color: Color(0xFF0D3F67),
                    fontWeight: FontWeight.w700,
                    fontSize: 18),
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                model.exercisePlan ?? "",
                style: TextStyle(
                  color: HexColor("#0D3F67"),
                  fontSize: 18,
                ),
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                "DIET PLAN",
                style: const TextStyle(
                    color: Color(0xFF0D3F67),
                    fontWeight: FontWeight.w700,
                    fontSize: 18),
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                model.dietPlan ?? "",
                style: TextStyle(
                  color: HexColor("#0D3F67"),
                  fontSize: 17,
                ),
              ),
            ],
          )),
    );
  }

  Widget _buildReportButton() {
    return SizedBox(
      width: 100,
      height: 100,
      child: GestureDetector(
        onTap: () {
          Navigator.pushNamed(context, RoutePath.customerMakeReportPage);
        },
        child: Card(
          elevation: 10,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisSize: MainAxisSize.max,
            children:  [
              Icon(Icons.assignment, color: AppColors.PRIMARY_WORD_COLOR, size: 28,),
              SizedBox(
                height: 10,
              ),
              Text(
                'Report progress',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontWeight: FontWeight.w700,
                  fontSize: 15,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHistoryButton() {
    return SizedBox(
      width: 100,
      height: 100,
      child: GestureDetector(
        onTap: () {
          Navigator.pushNamed(context, RoutePath.customerReportHistoryPage);
        },
        child: Card(
          elevation: 10,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisSize: MainAxisSize.max,
            children:  [
              Icon(Icons.bar_chart, color: AppColors.PRIMARY_WORD_COLOR, size: 28,),
              SizedBox(
                height: 10,
              ),
              Text(
                'Report history',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontWeight: FontWeight.w700,
                  fontSize: 15,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildButtonGroup() {
    return Wrap(
      children: [
        _buildReportButton(),
        _buildHistoryButton(),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("Package detail"),
      body: Container(
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
        margin: const EdgeInsets.only(top: 20),
        child: SingleChildScrollView(
          child: FutureBuilder<PackageModel?>(
              future: packageModel,
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  return Column(
                    children: [
                      _buildTrainerContainer(
                          snapshot.requireData!.trainer as TrainerModel),
                      _buildPackageContainer(
                          snapshot.requireData as PackageModel),
                      const SizedBox(height: 20),
                      _buildButtonGroup(),
                      const SizedBox(
                        height: 60,
                      ),
                    ],
                  );
                }
                return const Center(child: CircularProgressIndicator());
              }),
        ),
      ),
    );
  }
}
