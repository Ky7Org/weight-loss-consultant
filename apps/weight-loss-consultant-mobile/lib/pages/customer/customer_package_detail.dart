import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/constants/enums.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/models/package_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/pages/components/toast.dart';
import 'package:weight_loss_consultant_mobile/services/customer_service.dart';
import 'package:weight_loss_consultant_mobile/services/notification_service.dart';
import 'package:weight_loss_consultant_mobile/services/trainer_service.dart';
import 'package:weight_loss_consultant_mobile/models/trainer_model.dart';

class CustomerPackageDetail extends StatefulWidget {
  Map<String, dynamic>? data;

  CustomerPackageDetail({Key? key, this.data}) : super(key: key);

  @override
  _CustomerPackageDetailState createState() => _CustomerPackageDetailState();
}

class _CustomerPackageDetailState extends State<CustomerPackageDetail> {
  Future<PackageModel?>? packageModel;

  AccountModel user = AccountModel(email: "", fullname: "");
  CustomerService service = CustomerService();
  int? campaignID;
  int? packageID;

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
        packageID = widget.data!["packageID"];
        campaignID = widget.data!["campaignID"];
        packageModel = service.getPackageById(packageID as int, user);
        setState(() {});
      });
    });
  }

  Widget _buildTrainerContainer(TrainerModel model) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 10),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(18),
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.2),
                spreadRadius: 5,
                blurRadius: 7,
                offset: const Offset(0, 3),
              )
            ]),
        child: Row(
          mainAxisSize: MainAxisSize.max,
          children: [
              Image(
                image: NetworkImage(model.profileImage as String),
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
                    const SizedBox(
                      width: 30,
                    ),
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
      margin: const EdgeInsets.symmetric(vertical: 10),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(18),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.2),
                  spreadRadius: 5,
                  blurRadius: 7,
                  offset: const Offset(0, 3),
                )
              ]),
          child: Column(
            children: [
              const SizedBox(
                width: double.infinity,
              ),
              Align(
                alignment: Alignment.center,
                child: Text(
                  model.name ?? "",
                  style: TextStyle(
                      color: HexColor("#0D3F67"),
                      fontSize: 20,
                      fontWeight: FontWeight.w700),
                ),
              ),
              const SizedBox(
                height: 10,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Column(
                    children: [
                      Icon(
                        Icons.watch_later_outlined,
                        color: HexColor("#0D3F67"),
                        size: 30,
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Text(
                        model.spendTimeToTraining.toString(),
                        style: TextStyle(
                            color: HexColor("#0D3F67"),
                            fontSize: 20,
                            fontWeight: FontWeight.w700),
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      Text(
                        "Day/Week",
                        style: TextStyle(
                            color: HexColor("#B6C5D1"),
                            fontSize: 16,
                            fontWeight: FontWeight.w900),
                      ),
                    ],
                  ),
                  Column(
                    children: [
                      Icon(
                        Icons.watch_later_outlined,
                        color: HexColor("#0D3F67"),
                        size: 30,
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Text(
                        model.sessionLength.toString(),
                        style: TextStyle(
                            color: HexColor("#0D3F67"),
                            fontSize: 20,
                            fontWeight: FontWeight.w700),
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      Text(
                        "Mins",
                        style: TextStyle(
                            color: HexColor("#B6C5D1"),
                            fontSize: 16,
                            fontWeight: FontWeight.w900),
                      ),
                    ],
                  ),
                  Column(
                    children: [
                      Icon(
                        Icons.account_balance_wallet_outlined,
                        color: HexColor("#0D3F67"),
                        size: 30,
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Text(
                        model.price.toString(),
                        style: TextStyle(
                            color: HexColor("#0D3F67"),
                            fontSize: 20,
                            fontWeight: FontWeight.w700),
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      Text(
                        "Fee",
                        style: TextStyle(
                            color: HexColor("#B6C5D1"),
                            fontSize: 16,
                            fontWeight: FontWeight.w900),
                      ),
                    ],
                  ),

                ],
              ),
            ],
          )),
    );
  }

  Widget _buildPlanDetailContainer(PackageModel model) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 10),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(18),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.2),
                  spreadRadius: 5,
                  blurRadius: 7,
                  offset: const Offset(0, 3),
                )
              ]),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(
                width: double.infinity,
              ),
              Text(
                "Plan Details",
                style: TextStyle(
                    color: HexColor("#0D3F67"),
                    fontSize: 20,
                    fontWeight: FontWeight.w700),
              ),
              const SizedBox(
                height: 20,
              ),
              Text(
                "Schedule",
                style: TextStyle(
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontWeight: FontWeight.w900,
                    fontSize: 15),
              ),
              const SizedBox(
                height: 5,
              ),
              Text(
                model.schedule ?? "",
                style: TextStyle(
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontWeight: FontWeight.w400,
                    fontSize: 15),
              ),
              const SizedBox(
                height: 15,
              ),
              Text(
                "Exercise Plan",
                style: TextStyle(
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontWeight: FontWeight.w900,
                    fontSize: 15),
              ),
              const SizedBox(
                height: 5,
              ),
              Text(
                model.exercisePlan ?? "",
                style: TextStyle(
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontWeight: FontWeight.w400,
                    fontSize: 15),
              ),
              const SizedBox(
                height: 15,
              ),
              Text(
                "Diet Plan",
                style: TextStyle(
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontWeight: FontWeight.w900,
                    fontSize: 15),
              ),
              const SizedBox(
                height: 5,
              ),
              Text(
                model.dietPlan ?? "",
                style: TextStyle(
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontWeight: FontWeight.w400,
                    fontSize: 15),
              ),
            ],
          )),
    );
  }

  Widget _buildExerciseContainer(PackageModel model) {
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
                "Exercise Plan",
                style: TextStyle(
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontWeight: FontWeight.w900,
                    fontSize: 15),
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                model.exercisePlan ?? "",
                style: TextStyle(
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontWeight: FontWeight.w400,
                    fontSize: 15),
              ),
            ],
          )),
    );
  }

  Widget _buildDietContainer(PackageModel model) {
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
                "Diet Plan",
                style: TextStyle(
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontWeight: FontWeight.w900,
                    fontSize: 15),
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                model.dietPlan ?? "",
                style: TextStyle(
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontWeight: FontWeight.w400,
                    fontSize: 15),
                ),

            ],
          )),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("Package detail"),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: HexColor("#FF3939"),
        onPressed: () async {
          CustomerService customerService = CustomerService();
          TrainerService trainerService = TrainerService();
          NotificationService notificationService = NotificationService();

          PackageModel? packageModel =
              await trainerService.getPackageById(packageID as int, user);
          if (packageModel == null) {
            CustomToast.makeToast("Some thing went wrong! Try again");
            return;
          }
          bool result = await customerService.approvePackage(
              packageID as int, campaignID as int, user);
          if (result) {
            notificationService.approvePackage(
                packageModel.trainer!.deviceID as String,
                packageModel.trainer!.email as String,
                packageID as int);
            CustomToast.makeToast("Approve successfully");
          } else {
            CustomToast.makeToast("Some thing went wrong! Try again");
          }
          Navigator.pop(context);
        },
        label: const Text("Approve this package"),
        icon: const Icon(Icons.add),
      ),
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
                      _buildPlanDetailContainer(
                          snapshot.requireData as PackageModel),
                      const SizedBox(
                        height: 60,
                      ),
                    ],
                  );
                }
                return const Center(
                  child: CircularProgressIndicator()
                );
              }),
        ),
      ),
    );
  }
}
