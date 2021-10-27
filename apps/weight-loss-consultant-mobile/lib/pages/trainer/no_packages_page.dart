import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';

class NoPackagesPage extends StatefulWidget {
  const NoPackagesPage({Key? key}) : super(key: key);

  @override
  _NoPackagesPageState createState() => _NoPackagesPageState();
}

class _NoPackagesPageState extends State<NoPackagesPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder('Your package'),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Center(
            child:
            SvgPicture.asset("assets/fake-image/no-package.svg"),
          ),
          const SizedBox(
            height: 30,
          ),
          Center(
            child: Text(
              'No Packages',
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
              'You dont have any package.',
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
          const SizedBox(
            height: 60,
          ),
          Center(
            child: GestureDetector(
              child: SvgPicture.asset("assets/fake-image/add-button.svg"),
              onTap: (){
                Navigator.pushNamed(context, RoutePath.createPackagesPage);
              },
            ),
          )
        ],
      ),
    );
  }
}
