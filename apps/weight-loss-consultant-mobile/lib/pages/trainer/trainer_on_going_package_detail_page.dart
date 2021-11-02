import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/models/customer_campaign_model.dart';
import 'package:weight_loss_consultant_mobile/models/package_model.dart';
import 'package:weight_loss_consultant_mobile/models/trainer_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/customer_sliding_up_panel.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:weight_loss_consultant_mobile/services/customer_service.dart';
import 'package:weight_loss_consultant_mobile/services/trainer_service.dart';

class TrainerOnGoingPackageDetailPage extends StatefulWidget {
  int? packageId;

  TrainerOnGoingPackageDetailPage({Key? key, this.packageId}) : super(key: key);

  @override
  _TrainerOnGoingPackageDetailPageState createState() =>
      _TrainerOnGoingPackageDetailPageState();
}

class _TrainerOnGoingPackageDetailPageState
    extends State<TrainerOnGoingPackageDetailPage>  with SingleTickerProviderStateMixin {
  Future<PackageModel?>? packageModel;
  CustomerCampaignModel? campaignModel;
  final PanelController _pc = PanelController();
  late TabController _tabController;
  AccountModel user = AccountModel(email: "", fullname: "");
  CustomerService service = CustomerService();
  TrainerService trainerService = TrainerService();

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
  void dispose() {
    super.dispose();
    _tabController.dispose();
  }

  @override
  void initState() {
    _tabController = TabController(length: 3, vsync: this);
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_) {
      initAccount().then((value) {
        //packageModel = service.getPackageById(widget.packageID as int, user);
        packageModel = service.getPackageById(widget.packageId as int, user);

        trainerService.getCampaignById(35, user).then((value) {
          campaignModel = value;
          setState(() {});
        });
      });
    });
  }

  Widget _buildCustomerContainer(TrainerModel model) {

    Widget avatarOfUser() {
      if (campaignModel!.customer!.profileImage != null ||
          campaignModel!.customer!.profileImage!.isNotEmpty) {
        return Image(
            image: NetworkImage(campaignModel!.customer!.profileImage!),
            width: 100,
            height: 100,
            fit: BoxFit.fill);
      }
      return const Image(
          image: AssetImage("assets/fake-image/fake-trainer-avatar.jpg"),
          width: 100,
          height: 100,
          fit: BoxFit.fill);
    }

    var date = DateFormat("MMMM-dd-yyyy").format(
        DateTime.fromMillisecondsSinceEpoch(
            int.parse(campaignModel!.customer!.dob.toString())));

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
          mainAxisSize: MainAxisSize.max,
          children: [
            Center(child: avatarOfUser()),
            const SizedBox(
              height: 15,
            ),
            _content("Name of trainer", campaignModel!.customer!.fullname ?? ""),
            _content("Email", campaignModel!.customer!.email ?? ""),
            _content("Gender", "${campaignModel!.customer!.gender == "1" ? "Male" : "Female"} "),
            _content("Phone number", campaignModel!.customer!.phone ?? ""),
            _content("Date of birth", date ?? ""),
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
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(
                width: double.infinity,
              ),
              Text(
                "Name of package",
                style: TextStyle(
                    color: HexColor("#0D3F67"),
                    fontSize: 15,
                    fontWeight: FontWeight.w900),
              ),
              const SizedBox(
                  height: 5
              ),
              Text(
                model.name ?? "",
                style: TextStyle(
                    color: HexColor("#0D3F67"),
                    fontSize: 15,
                    fontWeight: FontWeight.w500),
              ),
              const SizedBox(
                height: 15,
              ),
              Text(
                "Exercise Plan",
                style: TextStyle(
                    color: HexColor("#0D3F67"),
                    fontSize: 15,
                    fontWeight: FontWeight.w900),
              ),
              const SizedBox(
                height: 5,
              ),
              Text(
                model.exercisePlan ?? "",
                style: TextStyle(
                    color: HexColor("#0D3F67"),
                    fontSize: 15,
                    fontWeight: FontWeight.w500),
              ),
              const SizedBox(
                height: 15,
              ),
              Text(
                "Diet Plan",
                style: TextStyle(
                    color: HexColor("#0D3F67"),
                    fontSize: 15,
                    fontWeight: FontWeight.w900),
              ),
              const SizedBox(
                height: 5,
              ),
              Text(
                model.dietPlan ?? "",
                style: TextStyle(
                    color: HexColor("#0D3F67"),
                    fontSize: 15,
                    fontWeight: FontWeight.w500),
              ),
            ],
          )),
    );
  }

  Widget _content(String title, String content) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 5),
      child: Column(
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
      ),
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

  Widget _buildCampaignContainer() {
    return Card(
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
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _title("Detail of Campaign"),
            const SizedBox(
              height: 10,
            ),
            _content(
                'Your target weight', '${campaignModel?.targetWeight ?? 0} kg'),
            _content('Your current weight',
                '${campaignModel?.currentWeight ?? 0} kg'),
            _content('Day per week can spend for training',
                '${campaignModel?.spendTimeForTraining ?? 0} day(s)'),
            _content('Description', campaignModel?.description ?? ""),
          ],
        ),
      ),
    );
  }

  Widget _buildReportButton(PackageModel packageModel) {
    return SizedBox(
      width: 100,
      height: 100,
      child: GestureDetector(
        onTap: () {
          Navigator.pushNamed(context, RoutePath.trainerFeedbackReportPage,
              arguments: packageModel.id);
        },
        child: Card(
          elevation: 10,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisSize: MainAxisSize.max,
            children:  [
              Icon(Icons.assignment, color: AppColors.PRIMARY_WORD_COLOR,),
              SizedBox(
                height: 10,
              ),
              Text(
                'Feedback progress',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontWeight: FontWeight.w700,
                  color: AppColors.PRIMARY_WORD_COLOR,
                  fontSize: 15,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHistoryButton(PackageModel packageModel) {
    return SizedBox(
      width: 100,
      height: 100,
      child: GestureDetector(
        onTap: () {
          Navigator.pushNamed(context, RoutePath.trainerReportHistoryPage,
              arguments: packageModel.id as int);
        },
        child: Card(
          elevation: 10,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisSize: MainAxisSize.max,
            children:  [
              Icon(Icons.bar_chart, color: AppColors.PRIMARY_WORD_COLOR,),
              SizedBox(
                height: 10,
              ),
              Text(
                'Report history',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontWeight: FontWeight.w700,
                  fontSize: 15,
                  color: AppColors.PRIMARY_WORD_COLOR,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildButtonGroup(PackageModel packageModel) {
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
      body: SlidingUpPanel(
        controller: _pc,
        panel: CategoryPanel(),
        minHeight: 0,
        maxHeight: 400,
        body: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
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
                        'Customer Campaign',
                        style: TextStyle(
                            fontSize: 15, fontWeight: FontWeight.w700),
                      ),
                    ),
                    Tab(
                      child: Text(
                        'Customer Info',
                        style: TextStyle(
                            fontSize: 15, fontWeight: FontWeight.w700),
                      ),
                    ),
                    Tab(
                      child: Text(
                        'Package\n Detail',
                        style: TextStyle(
                            fontSize: 15, fontWeight: FontWeight.w700),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              Expanded(child: TabBarView(
                controller: _tabController,
                children: [
                  Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      FutureBuilder<PackageModel?>(
                        future: packageModel,
                        builder: (context, snapshot) {
                          while (!snapshot.hasData) {
                            return const Center(
                              child: CircularProgressIndicator(),
                            );
                          }
                          return Column(
                            children: [
                              _buildCampaignContainer(),
                              const SizedBox(
                                height: 15
                              ),
                              _buildButtonGroup(
                                  snapshot.requireData as PackageModel),
                            ],
                          );
                        },
                      ),
                    ],
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      FutureBuilder<PackageModel?>(
                        future: packageModel,
                        builder: (context, snapshot) {
                          while (!snapshot.hasData) {
                            return const Center(
                              child: CircularProgressIndicator(),
                            );
                          }
                          return Column(
                            children: [
                              _buildCustomerContainer(
                                  snapshot.requireData!.trainer as TrainerModel),
                            ],
                          );
                        },
                      ),
                    ],
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      FutureBuilder<PackageModel?>(
                        future: packageModel,
                        builder: (context, snapshot) {
                          while (!snapshot.hasData) {
                            return const Center(
                              child: CircularProgressIndicator(),
                            );
                          }
                          return Column(
                            children: [
                              _buildPackageContainer(
                              snapshot.requireData as PackageModel),
                            ],
                          );
                        },
                      ),
                    ],
                  ),
                ],
              ))
            ],
          ),
        ),
      )
    );
  }
}
