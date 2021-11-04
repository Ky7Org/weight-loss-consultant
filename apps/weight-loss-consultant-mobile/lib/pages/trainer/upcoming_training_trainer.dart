import 'dart:convert';

import 'package:collection/src/iterable_extensions.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/models/campaign_model.dart';
import 'package:weight_loss_consultant_mobile/models/customer_campaign_model.dart';
import 'package:weight_loss_consultant_mobile/models/package_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/pages/customer/customer_campaign_page.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:weight_loss_consultant_mobile/services/customer_service.dart';


class UpcomingTrainingTrainerPage extends StatefulWidget {
  CustomerCampaignModel? campaignModel;

  UpcomingTrainingTrainerPage({Key? key, this.campaignModel}) : super(key: key);

  @override
  _UpcomingTrainingTrainerPageState createState() => _UpcomingTrainingTrainerPageState();
}

class _UpcomingTrainingTrainerPageState extends State<UpcomingTrainingTrainerPage> {
  AccountModel user = AccountModel(email: "", fullname: "");
  PackageModel? package;
  CampaignModel? ongoingCampaign;

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
        setState(() {});
      });
    });
  }

  Widget _heading(String heading) {
    return Text(
      heading,
      style: TextStyle(
          color: AppColors.PRIMARY_WORD_COLOR,
          fontSize: 18,
          fontWeight: FontWeight.w700),
    );
  }

  Widget _content(String content, String title) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            content,
            style: TextStyle(
                color: AppColors.PRIMARY_WORD_COLOR,
                fontWeight: FontWeight.w900,
                fontSize: 15),
          ),
          const SizedBox(
            height: 5,
          ),

          Text(
            title,
            style: TextStyle(
                color: AppColors.PRIMARY_WORD_COLOR,
                fontWeight: FontWeight.w400,
                fontSize: 13),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    Widget avatarOfUser() {
      if (widget.campaignModel!.customer!.profileImage!.isNotEmpty) {
        return Image(
            image: NetworkImage(widget.campaignModel!.customer!.profileImage!),
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

    var date = DateFormat("MMMM-dd-yyyy")
        .format(
        DateTime.fromMillisecondsSinceEpoch(int.parse(widget.campaignModel!.customer!.dob ??  "")))
        .toString();
    return Scaffold(
      appBar: GenericAppBar.builder("Call your customer"),
      body: Container(
        padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 20),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 20),
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
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  avatarOfUser(),
                  const SizedBox(
                    width: 15,
                  ),
                  Expanded(
                      flex: 8,
                      child: SizedBox(
                        height: 70,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  widget.campaignModel!.customer!.fullname ?? "",
                                  style: TextStyle(
                                    color: Color(0xFF0D3F67),
                                    fontWeight: FontWeight.w700,
                                    fontSize: 16,
                                  ),
                                ),
                                Icon(
                                  Icons.more_horiz,
                                  color: Color(0xFF0D3F67),
                                )
                              ],
                            ),
                            Text(
                             widget.campaignModel!.customer!.phone ?? "",
                              style: const TextStyle(
                                  color: Color(0xFFB6C5D1),
                                  fontSize: 13,
                                  fontWeight: FontWeight.w900),
                            ),
                            Text(
                              date,
                              style: const TextStyle(
                                  color: Color(0xFF0D3F67),
                                  fontSize: 15,
                                  fontWeight: FontWeight.w400),
                            )
                          ],
                        ),
                      ))
                ],
              ),
              const Divider(
                thickness: 1,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    child: Row(
                      children: [
                        Container(
                            width: 42,
                            height: 42,
                            margin: EdgeInsets.only(right: 10),
                            child: Icon(
                              Icons.play_arrow_outlined,
                              color: AppColors.PRIMARY_COLOR,
                              size: 28,
                            ),
                            decoration: BoxDecoration(
                                color: Color(0xFFFDD9D9),
                                borderRadius: BorderRadius.circular(10))),
                        Text(
                          'Video Call',
                          style: TextStyle(
                              color: AppColors.PRIMARY_WORD_COLOR,
                              fontSize: 15,
                              fontWeight: FontWeight.w400),
                        ),
                      ],
                    ),
                  ),
                  FlatButton(
                    color: AppColors.PRIMARY_COLOR,
                    onPressed: () {
                      Navigator.pushNamed(context, RoutePath.videoCallPage);
                    },
                    child: Row(
                      children: const [
                        Text(
                          'Start Now',
                          style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w700,
                              fontSize: 13),
                        ),
                        SizedBox(
                          width: 10,
                        ),
                        Icon(
                          Icons.arrow_forward,
                          color: Colors.white,
                          size: 18,
                        )
                      ],
                    ),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(18)),
                  )
                ],
              ),
              const Divider(
                thickness: 1,
              ),
              _heading("Applying Campaign"),
              const SizedBox(
                  height: 10
              ),
              _content("Current Weight", widget.campaignModel!.currentWeight!.toString()),
              _content("Target Weight", widget.campaignModel!.targetWeight!.toString()),
              _content("Description", widget.campaignModel!.description!),
              const Divider(
                thickness: 1,
              ),
              _heading("Note"),
              const SizedBox(
                  height: 10
              ),
              _content("Days in week", '${widget.campaignModel!.spendTimeForTraining!} days'),
            ],
          ),
        ),
      ),
    );
  }
}
