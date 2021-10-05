import 'package:flutter_svg/flutter_svg.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:flutter/material.dart';

class CategoryPanel extends StatelessWidget {
  CategoryPanel({
    Key? key
  }) : super(key: key);

  final List<Map> categories = [
    {
      "text": "Todo",
      "imageName": "todo-icon.svg",
    },
    {
      "text": "Message",
      "imageName": "message-icon.svg",
      "route": RoutePath.myMessagePage,
    },
    {
      "text": "Campaign",
      "imageName": "campaign-icon.svg",
    },
    {
      "text": "Package",
      "imageName": "package-icon.svg",
    },
    {
      "text": "Calendar",
      "imageName": "calendar-icon.svg",
    },
    {
      "text": "Video Call",
      "imageName": "video-call-icon.svg",
    },
    {
      "text": "Tutorial",
      "imageName": "tutorial-icon.svg",
    },
    {
      "text": "Payment",
      "imageName": "payment-icon.svg",
    },
    {
      "text": "Profile",
      "imageName": "profile-icon.svg",
      "route": RoutePath.customerDetailPage,
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Wrap(
          spacing: 10,
          children: [
            for (var items in categories)
              GestureDetector(
                onTap: (){
                  Navigator.pushNamed(context, items["route"]);
                },
                child: SizedBox(
                  height: 118,
                  width: 105,
                  child: Card(
                    elevation: 15,
                    child: Container(
                      padding: EdgeInsets.all(15),
                      child: Column(
                        children: [
                          SvgPicture.asset("assets/panel-image/category/${items["imageName"]}"),
                          Expanded(
                            flex: 1,
                            child: Center(
                                child: Text(
                                  "${items["text"]}",
                                  style: TextStyle(
                                      fontSize: 13,
                                      fontWeight: FontWeight.bold,
                                      color: AppColors.PRIMARY_WORD_COLOR
                                  ),
                                )
                            ),
                          ),
                        ],
                      ),
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20.0),
                    ),
                  ),
                ),
              )
          ],
        )
    );
  }
}
