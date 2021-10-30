import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/models/package_model.dart';
import 'package:weight_loss_consultant_mobile/models/trainer_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:weight_loss_consultant_mobile/services/customer_service.dart';

class CustomerOnGoingCampaignPage extends StatefulWidget {
  int? packageID;
  CustomerOnGoingCampaignPage({Key? key,  this.packageID}) : super(key: key);

  @override
  _CustomerOnGoingCampaignPageState createState() => _CustomerOnGoingCampaignPageState();
}

class _CustomerOnGoingCampaignPageState extends State<CustomerOnGoingCampaignPage> {
  Future<PackageModel?>? packageModel;

  AccountModel user = AccountModel(email: "", fullname: "");
  CustomerService service = CustomerService();

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
        packageModel = service.getPackageById(widget.packageID as int, user);
        setState(() {});
      });
    });
  }

  Widget _buildTrainerContainer(TrainerModel model){
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
                fit:BoxFit.fill
            ),
            const SizedBox(width: 15,),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.max,
              children: [
                Text(
                  model.fullname ?? "",
                  style: TextStyle(
                      color: HexColor("#0D3F67"),
                      fontSize: 20,
                      fontWeight: FontWeight.w700
                  ),
                ),
                const SizedBox(height: 10,),
                Text(
                  "${model.gender == "1" ? "Male" : "Female"} | ${model.phone ?? ""}",
                  style: TextStyle(
                      color: HexColor("#B6C5D1"),
                      fontSize: 16,
                      fontWeight: FontWeight.w500
                  ),
                ),
                const SizedBox(height: 10,),
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
                    const SizedBox(width: 50,),
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

  Widget _buildPackageContainer(PackageModel model){
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: Container(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              const SizedBox(width: double.infinity,),
              Align(
                alignment: Alignment.topLeft,
                child: Text(
                  model.name ?? "",
                  style: TextStyle(
                      color: HexColor("#0D3F67"),
                      fontSize: 25,
                      fontWeight: FontWeight.w700
                  ),
                ),
              ),
              const SizedBox(height: 10,),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Column(
                    children: [
                      Icon(
                        Icons.watch_later_outlined,
                        color: HexColor("#0D3F67"),
                        size: 35,
                      ),
                      const SizedBox(height: 10,),
                      Text(
                        model.spendTimeToTraining.toString(),
                        style: TextStyle(
                            color: HexColor("#0D3F67"),
                            fontSize: 25,
                            fontWeight: FontWeight.w700
                        ),
                      ),
                      const SizedBox(height: 5,),
                      Text(
                        "Day/Week",
                        style: TextStyle(
                            color: HexColor("#B6C5D1"),
                            fontSize: 16,
                            fontWeight: FontWeight.w900
                        ),
                      ),
                    ],
                  ),
                  Column(
                    children: [
                      Icon(
                        Icons.account_balance_wallet_outlined,
                        color: HexColor("#0D3F67"),
                        size: 35,
                      ),
                      const SizedBox(height: 10,),
                      Text(
                        model.price.toString(),
                        style: TextStyle(
                            color: HexColor("#0D3F67"),
                            fontSize: 25,
                            fontWeight: FontWeight.w700
                        ),
                      ),
                      const SizedBox(height: 5,),
                      Text(
                        "Fee",
                        style: TextStyle(
                            color: HexColor("#B6C5D1"),
                            fontSize: 16,
                            fontWeight: FontWeight.w900
                        ),
                      ),
                    ],
                  ),
                ],
              ),

            ],
          )
      ),
    );
  }

  Widget _buildScheduleContainer(PackageModel model){
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
                "Plan Details",
                style: TextStyle(
                    color: HexColor("#0D3F67"),
                    fontSize: 25,
                    fontWeight: FontWeight.w700
                ),
              ),
              const SizedBox(height: 10,),
              Text(
                "SCHEDULE",
                style: TextStyle(
                    color: HexColor("#0D3F67"),
                    fontSize: 20,
                    fontWeight: FontWeight.w700
                ),
              ),
              const SizedBox(height: 10,),
              Text(
                model.schedule ?? "",
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

  Widget _buildExerciseContainer(PackageModel model){
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


            ],
          )
      ),
    );
  }

  Widget _buildDietContainer(PackageModel model){
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


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("Package detail"),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: HexColor("#FF3939"),
        onPressed: (){
          Navigator.pushNamed(context, RoutePath.customerMakeReportPage);
        },
        label: const Text("Report your today progress"),
        icon: const Icon(Icons.add),
      ),
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
                      _buildTrainerContainer(snapshot.requireData!.trainer as TrainerModel),
                      _buildPackageContainer(snapshot.requireData as PackageModel),
                      _buildScheduleContainer(snapshot.requireData as PackageModel),
                      _buildExerciseContainer(snapshot.requireData as PackageModel),
                      _buildDietContainer(snapshot.requireData as PackageModel),
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
