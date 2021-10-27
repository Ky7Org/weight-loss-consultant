import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';

class TrainerViewCampaignDetailPage extends StatefulWidget {
  const TrainerViewCampaignDetailPage({Key? key}) : super(key: key);

  @override
  _TrainerViewCampaignDetailPageState createState() => _TrainerViewCampaignDetailPageState();
}

class _TrainerViewCampaignDetailPageState extends State<TrainerViewCampaignDetailPage> {
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
    return Scaffold(
      appBar: GenericAppBar.builder("Detail Campaign"),
      body: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox(
              height: 20,
            ),
            const Center(
              child: CircleAvatar(
                backgroundImage:
                    AssetImage("assets/fake-image/miku-avatar.png"),
                radius: 50,
              ),
            ),
            Center(
              child: Text(
                'BanhsBao',
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
                  _content('Illness', 'Heart attack'),
                  _content('Your target weight', '72 kg'),
                  _content('Your current weight', '92 kg'),
                  _content('Day per week can spend for training', '2 days'),
                  _content('Description', 'I am very fat'),
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
                  Navigator.pushNamed(context, RoutePath.trainerViewListPackagePage);
                },
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: const [
                    SizedBox(),
                    Text(
                      'Choose Package',
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
