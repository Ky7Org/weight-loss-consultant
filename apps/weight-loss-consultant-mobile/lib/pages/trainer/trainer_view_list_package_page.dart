import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/models/campaign_model.dart';
import 'package:weight_loss_consultant_mobile/models/customer_campaign_model.dart';
import 'package:weight_loss_consultant_mobile/models/package_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/pages/components/toast.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:weight_loss_consultant_mobile/services/customer_service.dart';
import 'package:weight_loss_consultant_mobile/services/notification_service.dart';
import 'package:weight_loss_consultant_mobile/services/trainer_service.dart';

class TrainerViewListPackagePage extends StatefulWidget {
  int? campaignId;
  TrainerViewListPackagePage({Key? key, this.campaignId}) : super(key: key);

  @override
  _TrainerViewListPackagePageState createState() => _TrainerViewListPackagePageState();
}

class _TrainerViewListPackagePageState extends State<TrainerViewListPackagePage> {

  Future<List<PackageModel>>? listPackage;
  AccountModel user = AccountModel(email: "", fullname: "");
  TrainerService service = TrainerService();
  CustomerService customerService = CustomerService();
  NotificationService notificationService = NotificationService();

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
        listPackage = service.getTrainerPackage(user);
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

  Future _showLoginError(int packageID) async{
    return showDialog(
        context: context,
        builder: (ctx) => Dialog(
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(4.0)),
            child: Stack(
              clipBehavior: Clip.none,
              alignment: Alignment.topCenter,
              children: [
                SizedBox(
                  height: 180,
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(10, 60, 10, 10),
                    child: Column(children: [
                      const Center(
                          child: Text(
                            "Are you sure to apply this package?",
                            style: TextStyle(
                              color: Colors.redAccent,
                            ),
                          )),
                      const SizedBox(
                        height: 20,
                      ),
                      Row(
                        mainAxisSize: MainAxisSize.max,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          RaisedButton(
                            onPressed: () {
                              Navigator.of(context).pop();
                            },
                            color: Colors.redAccent,
                            child: const Text(
                              'Cancel',
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                          SizedBox(width: 20,),
                          RaisedButton(
                            onPressed: () async {
                              CustomerCampaignModel? campaignModel = await service.getCampaignById(widget.campaignId as int, user);
                              if (campaignModel == null) {
                                CustomToast.makeToast("Some thing went wrong! Try again");
                                return;
                              }

                              notificationService.applyPackage(campaignModel.customer!.deviceID as String
                                  , user.email as String, packageID, widget.campaignId as int);

                              bool result = await service.applyPackageToCampaign(packageID, widget.campaignId as int, user);
                              if (result){
                                CustomToast.makeToast("Save successfully");
                              } else {
                                CustomToast.makeToast("Some thing went wrong! Try again");
                              }
                              Navigator.of(context).pop(result);
                            },
                            color: Colors.redAccent,
                            child: const Text(
                              'Okay',
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                        ],
                      ),

                    ]),
                  ),
                ),
                const Positioned(
                    top: -35,
                    child: CircleAvatar(
                      backgroundColor: Colors.redAccent,
                      radius: 40,
                      child: Icon(
                        Icons.warning,
                        color: Colors.white,
                        size: 50,
                      ),
                    )),
              ],
            )));
  }



  Widget _package(PackageModel model) {
    return GestureDetector(
      onTap: () {
        _showLoginError(model.id as int).then((value){
          if (value){
            Navigator.pop(context);
          }
        });
      },
      child: Card(
        elevation: 5,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15.0),
        ),
        child: Container(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Text(
                    model.name ?? "",
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w900,
                        fontSize: 19),
                  ),
                  const Spacer(),
                  IconButton(
                      onPressed: () async {
                        Navigator.pushNamed(context, RoutePath.trainerUpdatePackagePage, arguments: model.id).then((value){
                          listPackage = service.getTrainerPackage(user);
                          setState(() {});
                        });
                      },
                      icon: Icon(
                        Icons.edit,
                        color: HexColor("#FF3939"),
                      )
                  ),
                  IconButton(
                      onPressed: () async {
                        bool result = await service.deletePackage(model.id ?? 0, user);
                        if (result){
                          CustomToast.makeToast("Delete successfully");
                        } else {
                          CustomToast.makeToast("Some thing went wrong! Try again");
                        }
                        setState(() {
                          listPackage = service.getTrainerPackage(user);
                        });
                      },
                      icon: Icon(
                        Icons.highlight_remove_outlined,
                        color: HexColor("#FF3939"),
                      )
                  ),
                ],
              ),
              RichText(
                text: TextSpan(
                    children: [
                      TextSpan(
                        text: 'Exercise Plan: ',
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w900,
                            fontSize: 15),
                      ),
                      TextSpan(
                        text: model.exercisePlan ?? "",
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w400,
                            fontSize: 15),
                      )

                    ]
                ),
              ),
              const SizedBox(
                height: 5,
              ),
              RichText(
                text: TextSpan(
                    children: [
                      TextSpan(
                        text: 'Diet Plan: ',
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w900,
                            fontSize: 15),
                      ),
                      TextSpan(
                        text: model.dietPlan ?? "",
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w400,
                            fontSize: 15),
                      )

                    ]
                ),
              ),
              const SizedBox(
                height: 5,
              ),
              RichText(
                text: TextSpan(
                    children: [
                      TextSpan(
                        text: "Session in weeks: ",
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w900,
                            fontSize: 15),
                      ),
                      TextSpan(
                        text: "${model.spendTimeToTraining.toString()} day(s)",
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w400,
                            fontSize: 15),
                      )

                    ]
                ),
              ),
              const SizedBox(
                height: 5,
              ),
              RichText(
                text: TextSpan(
                    children: [
                      TextSpan(
                        text: "Session length: ",
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w900,
                            fontSize: 15),
                      ),
                      TextSpan(
                        text: "45 minutes",
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w400,
                            fontSize: 15),
                      )

                    ]
                ),
              ),
              const SizedBox(
                height: 5,
              ),
              Row(
                children: [
                  Text(
                    "Price: ",
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w900,
                        fontSize: 15),
                  ),
                  Text(
                    model.price.toString(),
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w400,
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
            'No Package',
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
            "You don't have any active package.",
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
      if (model.status != 0) continue;
      var widget = _package(model);
      widgets.add(widget);
    }
    return widgets;
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("List Packages"),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: FloatingActionButton.extended(

        backgroundColor: HexColor("#FF3939"),
        onPressed: (){
          Navigator.pushNamed(context, RoutePath.createPackagesPage).then((value) {
            listPackage = service.getTrainerPackage(user);
            setState(() {

            });
          });
        },
        label: const Text("Add new package"),
        icon: const Icon(Icons.add),
      ),
      body: Container(
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
        margin: const EdgeInsets.only(top: 20),
        child: SingleChildScrollView(
          child: FutureBuilder<List<PackageModel>>(
              future: listPackage,
              builder: (context, snapshot) {
                if (snapshot.hasData){
                  List<PackageModel> activePackage = snapshot.requireData.where((element) => element.status == 0).toList();
                  if (activePackage.isEmpty){
                    return _buildEmptyCampaignList();
                  }
                  return Column(
                    children: [
                      _title('Your active package'),
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
