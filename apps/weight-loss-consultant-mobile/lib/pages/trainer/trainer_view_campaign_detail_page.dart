import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/models/campaign_model.dart';
import 'package:weight_loss_consultant_mobile/models/customer_campaign_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:weight_loss_consultant_mobile/services/trainer_service.dart';

class TrainerViewCampaignDetailPage extends StatefulWidget {
  late int campaignID;
  TrainerViewCampaignDetailPage({Key? key, this.campaignID = 0}) : super(key: key);

  @override
  _TrainerViewCampaignDetailPageState createState() => _TrainerViewCampaignDetailPageState();
}

class _TrainerViewCampaignDetailPageState extends State<TrainerViewCampaignDetailPage> {

  AccountModel user = AccountModel(email: "", fullname: "");
  CustomerCampaignModel? campaignModel;

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
        TrainerService service = TrainerService();
        service.getCampaignById(widget.campaignID, user).then((value) {
          campaignModel = value;
          setState(() {});
        });
      });
    });
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

  @override
  Widget build(BuildContext context) {
    Image avatar;
    if (campaignModel == null){
      avatar = Image.asset("assets/fake-image/miku-avatar.png");
    } else if (campaignModel!.customer == null){
      avatar = Image.asset("assets/fake-image/miku-avatar.png");
    } else if (campaignModel!.customer!.profileImage == null){
      avatar = Image.asset("assets/fake-image/miku-avatar.png");
    } else {
      avatar = Image.network(campaignModel!.customer!.profileImage as String);
    }
    return Scaffold(
      appBar: GenericAppBar.builder("Detail Campaign"),
      body: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox(
              height: 20,
            ),
            Center(
              child: CircleAvatar(
                backgroundImage:
                    avatar.image,
                radius: 50,
              ),
            ),
            Center(
              child: Text(
                campaignModel!.customer!.fullname ?? "",
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w700,
                  color: AppColors.PRIMARY_WORD_COLOR,
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.fromLTRB(10, 30, 10, 0),
              padding: const EdgeInsets.all(10),
              width: double.infinity,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(10),
                    topRight: Radius.circular(10),
                    bottomLeft: Radius.circular(10),
                    bottomRight: Radius.circular(10)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.5),
                    spreadRadius: 5,
                    blurRadius: 7,
                    offset: const Offset(0, 3), // changes position of shadow
                  ),
                ],
              ),
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
            const SizedBox(
              height: 30,
            ),
            Padding(
              padding: const EdgeInsets.all(10),
              child: FlatButton(
                height: 64,
                color: AppColors.PRIMARY_COLOR,
                onPressed: () {
                  Navigator.pushNamed(context, RoutePath.trainerViewListPackagePage, arguments: widget.campaignID);
                },
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: const [
                    SizedBox(),
                    Text(
                      'Choose package to apply',
                      style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w700,
                          fontSize: 15),
                    ),
                    Icon(
                      Icons.arrow_forward,
                      color: Colors.white,
                      size: 24,
                    )
                  ],
                ),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(18)),
              ),
            )
          ],
        ),
      ),
    );
  }
}
