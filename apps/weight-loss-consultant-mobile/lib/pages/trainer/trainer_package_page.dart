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
import 'package:weight_loss_consultant_mobile/services/notification_service.dart';
import 'package:weight_loss_consultant_mobile/services/trainer_service.dart';

class TrainerPackagePage extends StatefulWidget {
  const TrainerPackagePage({Key? key}) : super(key: key);

  @override
  _TrainerPackagePageState createState() => _TrainerPackagePageState();
}

class _TrainerPackagePageState extends State<TrainerPackagePage> with SingleTickerProviderStateMixin{

  Future<List<PackageModel>>? listPackage;
  AccountModel user = AccountModel(email: "", fullname: "");
  TrainerService trainerService = TrainerService();
  late TabController _tabController;

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
    _tabController = TabController(length: 4, vsync: this);
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value){
        listPackage = trainerService.getTrainerPackage(user);
        setState(() {});
      });
    });
  }

  Future _showConfirmDeleteDialog() async{
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
                            "Are you sure to delete this package?",
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
                              Navigator.of(context).pop(false);
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
                              Navigator.of(context).pop(true);
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

  Future _showConfirmUndoDialog(int packageID) async{
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
                            "Are you sure to unapply this package?",
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
                              Navigator.of(context).pop(false);
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
                              Navigator.of(context).pop(true);
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

  Widget _editButtonGroup(PackageModel model){
    if (model.status == 0){
      //Active package
      return Row(
        children: [
          IconButton(
              onPressed: () async {
                Navigator.pushNamed(context, RoutePath.trainerUpdatePackagePage, arguments: model.id).then((value){
                  listPackage = trainerService.getTrainerPackage(user);
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
                _showConfirmDeleteDialog().then((value) async{
                  if (value){
                    bool result = await trainerService.deletePackage(model.id ?? 0, user);
                    if (result){
                      CustomToast.makeToast("Delete successfully");
                    } else {
                      CustomToast.makeToast("Some thing went wrong! Try again");
                    }
                    setState(() {
                      listPackage = trainerService.getTrainerPackage(user);
                    });
                  }
                });
              },
              icon: Icon(
                Icons.highlight_remove_outlined,
                color: HexColor("#FF3939"),
              )
          ),
        ],
      );
    } else if (model.status == 1){
      //Applied package
      return Row(
        children: [
          IconButton(
              onPressed: () async {
                Navigator.pushNamed(context, RoutePath.trainerUpdatePackagePage, arguments: model.id).then((value){
                  listPackage = trainerService.getTrainerPackage(user);
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
                bool confirmResult = await _showConfirmUndoDialog(model.id as int);
                if (confirmResult){
                  CustomerCampaignModel? campaignModel = await trainerService.getAppliedCampaignByPackageID(model.id as int, user);
                  bool result = await trainerService.undoApplyPackage(model.id as int, user);
                  if (result){
                    NotificationService notificationService = NotificationService();
                    await notificationService.trainerUnapply(campaignModel!.customer!.deviceID ?? "", campaignModel.id as int);
                    CustomToast.makeToast("Undo apply successfully");
                  } else {
                    CustomToast.makeToast("Some thing went wrong! Try again");
                  }
                  setState(() {
                    listPackage = trainerService.getTrainerPackage(user);
                  });
                }
              },
              icon: Icon(
                Icons.undo_rounded,
                color: HexColor("#FF3939"),
              )
          ),
        ],
      );
    }
    return Container();
  }

  Widget _activePackage(PackageModel model) {
    return GestureDetector(
      onTap: () {
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
                  _editButtonGroup(model),
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
                        text: "${model.sessionLength} minutes",
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
            "You don't have any Package.",
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

  List<Widget> _buildActiveCampaignList(List<PackageModel> data){
    List<Widget> widgets = [];
    for (PackageModel model in data){
      if (model.status != 0) continue;
      var widget = _activePackage(model);
      widgets.add(widget);
    }
    widgets.add(const SizedBox(height: 60,));
    return widgets;
  }

  List<Widget> _buildAppliedCampaignList(List<PackageModel> data){
    List<Widget> widgets = [];
    for (PackageModel model in data){
      if (model.status != 1) continue;
      var widget = _activePackage(model);
      widgets.add(widget);
    }
    widgets.add(const SizedBox(height: 60,));
    return widgets;
  }

  List<Widget> _buildApproveCampaignList(List<PackageModel> data){
    List<Widget> widgets = [];
    for (PackageModel model in data){
      if (model.status != 2) continue;
      var widget = _activePackage(model);
      widgets.add(widget);
    }
    widgets.add(const SizedBox(height: 60,));
    return widgets;
  }

  List<Widget> _buildDeclineCampaignList(List<PackageModel> data){
    List<Widget> widgets = [];
    for (PackageModel model in data){
      if (model.status != 3) continue;
      var widget = _activePackage(model);
      widgets.add(widget);
    }
    widgets.add(const SizedBox(height: 60,));
    return widgets;
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("List Packages"),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: FloatingActionButton.extended(

        backgroundColor: Colors.white,
        onPressed: (){
          Navigator.pushNamed(context, RoutePath.createPackagesPage).then((value) {
            listPackage = trainerService.getTrainerPackage(user);
            setState(() {

            });
          });
        },
        label: Text(
          "Add new package",
          style: TextStyle(
            color: HexColor("#FF3939")
          ),
        ),
        icon: Icon(
          Icons.add,
            color: HexColor("#FF3939"),
        ),
      ),
      body: Container(
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
        child: FutureBuilder<List<PackageModel>>(
            future: listPackage,
            builder: (context, snapshot) {
              if (snapshot.hasData){
                if (snapshot.requireData.isEmpty){
                  return _buildEmptyCampaignList();
                }
                return Column(
                  children: [
                    Container(
                      margin: const EdgeInsets.only(top: 20),
                      height: 48,
                      decoration: BoxDecoration(
                          color: const Color(0xFFF0F3F6),
                          borderRadius: BorderRadius.circular(18),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey.withOpacity(0.2),
                              spreadRadius: 5,
                              blurRadius: 7,
                              offset: const Offset(0, 3),
                            )
                          ]),
                      child: TabBar(
                        controller: _tabController,
                        indicator: BoxDecoration(
                          borderRadius: BorderRadius.circular(18),
                          color: Colors.white,
                        ),
                        labelColor: const Color(0xFF0D3F67),
                        unselectedLabelColor: const Color(0xFFB6C5D1),
                        tabs: const [
                          Tab(
                            child: Text(
                              'Active',
                              style: TextStyle(
                                  fontSize: 15, fontWeight: FontWeight.w700),
                            ),
                          ),
                          Tab(
                            child: Text(
                              'Applied',
                              style: TextStyle(
                                  fontSize: 15, fontWeight: FontWeight.w700),
                            ),
                          ),
                          Tab(
                            child: Text(
                              'Approve',
                              style: TextStyle(
                                  fontSize: 15, fontWeight: FontWeight.w700),
                            ),
                          ),
                          Tab(
                            child: Text(
                              'Decline',
                              style: TextStyle(
                                  fontSize: 15, fontWeight: FontWeight.w700),
                            ),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: 20,),
                    Expanded(
                      child: TabBarView(
                        controller: _tabController,
                        children: [
                          ListView(
                            children: _buildActiveCampaignList(snapshot.requireData),
                          ),
                          ListView(
                            children: _buildAppliedCampaignList(snapshot.requireData),
                          ),
                          ListView(
                            children: _buildApproveCampaignList(snapshot.requireData),
                          ),
                          ListView(
                            children: _buildDeclineCampaignList(snapshot.requireData),
                          ),
                        ],
                      ),
                    ),
                  ],
                );
              }
              return const Center(
                child: CircularProgressIndicator()
              );
            }
        ),
      ),
    );
  }
}
