import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/models/customer_campaign_model.dart';
import 'package:weight_loss_consultant_mobile/models/package_model.dart';
import 'package:weight_loss_consultant_mobile/models/trainer_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:weight_loss_consultant_mobile/services/customer_service.dart';
import 'package:weight_loss_consultant_mobile/services/trainer_service.dart';

class TrainerOnGoingPackageDetailPage extends StatefulWidget {
  int? packageId;
  TrainerOnGoingPackageDetailPage({Key? key, this.packageId}) : super(key: key);

  @override
  _TrainerOnGoingPackageDetailPageState createState() => _TrainerOnGoingPackageDetailPageState();
}

class _TrainerOnGoingPackageDetailPageState extends State<TrainerOnGoingPackageDetailPage> {
  Future<PackageModel?>? packageModel;
  CustomerCampaignModel? campaignModel;

  AccountModel user = AccountModel(email: "", fullname: "");
  CustomerService service = CustomerService();
  TrainerService trainerService = TrainerService();

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
        //packageModel = service.getPackageById(widget.packageID as int, user);
        packageModel = service.getPackageById(widget.packageId as int, user);

        trainerService.getCampaignById(35, user).then((value){
          campaignModel = value;
          setState(() {});
        });
      });
    });
  }

  Widget _buildCustomerContainer(TrainerModel model){
    var userImage;
    if (campaignModel!.customer!.profileImage == null || campaignModel!.customer!.profileImage!.isEmpty) {
      userImage = const AssetImage("assets/fake-image/fake-trainer-avatar.jpg");
    } else{
      userImage = NetworkImage(campaignModel!.customer!.profileImage as String);
    }

    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: Container(
        padding: const EdgeInsets.all(20),
        child: Row(
          mainAxisSize: MainAxisSize.max,
          children: [
              Image(
                image: userImage,
                width: 73,
                height: 73,
                fit:BoxFit.fill
            ),
            const SizedBox(width: 15,),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.max,
              children: [
                Text(
                  campaignModel!.customer!.fullname ?? "",
                  style: TextStyle(
                      color: HexColor("#0D3F67"),
                      fontSize: 20,
                      fontWeight: FontWeight.w700
                  ),
                ),
                const SizedBox(height: 10,),
                Text(
                  "${campaignModel!.customer!.gender == "1" ? "Male" : "Female"} | ${campaignModel!.customer!.phone ?? ""}",
                  style: TextStyle(
                      color: HexColor("#B6C5D1"),
                      fontSize: 16,
                      fontWeight: FontWeight.w500
                  ),
                ),
                const SizedBox(height: 10,),
              ],
            ),
          ],
        ),
      ),
    );
  }


  Widget _buildPackageContainer(PackageModel model){
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
              const SizedBox(width: double.infinity,),
              Text(
                model.name ?? "",
                style: TextStyle(
                    color: HexColor("#0D3F67"),
                    fontSize: 25,
                    fontWeight: FontWeight.w700
                ),
              ),
              const SizedBox(height: 10,),
              Text(
                "EXERCISE PLAN",
                style: TextStyle(
                    color: HexColor("#0D3F67"),
                    fontSize: 20,
                    fontWeight: FontWeight.w700
                ),
              ),
              const SizedBox(height: 10,),
              Text(
                model.exercisePlan ?? "",
                style: TextStyle(
                  color: HexColor("#0D3F67"),
                  fontSize: 20,
                ),
              ),
              const SizedBox(height: 10,),
              Text(
                "DIET PLAN",
                style: TextStyle(
                    color: HexColor("#0D3F67"),
                    fontSize: 20,
                    fontWeight: FontWeight.w700
                ),
              ),
              const SizedBox(height: 10,),
              Text(
                model.dietPlan ?? "",
                style: TextStyle(
                  color: HexColor("#0D3F67"),
                  fontSize: 20,
                ),
              ),
            ],
          )
      ),
    );
  }

  Widget _content(String title, String content) {
    return Column(
      children: [
        Align(
          alignment: Alignment.topLeft,
          child: Text(
            title,
            style: TextStyle(
                color: AppColors.PRIMARY_WORD_COLOR,
                fontSize: 15,
                fontWeight: FontWeight.w900),
          ),
        ),
        const SizedBox(
          height: 5,
        ),
        Align(
          alignment: Alignment.topLeft,
          child: Text(content,
              style: TextStyle(
                  color: AppColors.PRIMARY_WORD_COLOR,
                  fontSize: 15,
                  fontWeight: FontWeight.w500)),
        ),
        const SizedBox(
          height: 10,
        ),
      ],
    );
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



  Widget _buildCampaignContainer(){
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: Container(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _title("Detail of Campaign"),
            const SizedBox(
              height: 10,
            ),
            _content('Your target weight', '${campaignModel?.targetWeight ?? 0} kg'),
            _content('Your current weight', '${campaignModel?.currentWeight ?? 0} kg'),
            _content('Day per week can spend for training', '${campaignModel?.spendTimeForTraining ?? 0} day(s)'),
            _content('Description', campaignModel?.description ?? ""),
          ],
        ),
      ),
    );
  }

  Widget _buildReportButton(PackageModel packageModel){
    return SizedBox(
      width: 100,
      height: 100,
      child: GestureDetector(
        onTap: (){
          Navigator.pushNamed(context, RoutePath.trainerFeedbackReportPage, arguments: packageModel.id);
        },
        child: Card(
          elevation: 10,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisSize: MainAxisSize.max,
            children: const [
              Icon(
                  Icons.assignment
              ),
              SizedBox(height: 10,),
              Text(
                'Feedback progress',
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

  Widget _buildHistoryButton(PackageModel packageModel){
    return SizedBox(
      width: 100,
      height: 100,
      child: GestureDetector(
        onTap: (){
          Navigator.pushNamed(context, RoutePath.trainerReportHistoryPage, arguments: packageModel.id as int);
        },
        child: Card(
          elevation: 10,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisSize: MainAxisSize.max,
            children: const [
              Icon(
                  Icons.bar_chart
              ),
              SizedBox(height: 10,),
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


  Widget _buildButtonGroup(PackageModel packageModel){
    return Wrap(
      children: [
        _buildReportButton(packageModel),
        _buildHistoryButton(packageModel),

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
                if (snapshot.hasData){
                  return Column(
                    children: [
                      _buildCustomerContainer(snapshot.requireData!.trainer as TrainerModel),
                      _buildCampaignContainer(),
                      _buildPackageContainer(snapshot.requireData as PackageModel),
                      _buildButtonGroup(snapshot.requireData as PackageModel),
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
