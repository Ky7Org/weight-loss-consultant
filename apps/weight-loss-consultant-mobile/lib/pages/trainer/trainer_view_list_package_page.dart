import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';

class TrainerViewListPackagePage extends StatefulWidget {
  const TrainerViewListPackagePage({Key? key}) : super(key: key);

  @override
  _TrainerViewListPackagePageState createState() => _TrainerViewListPackagePageState();
}

class _TrainerViewListPackagePageState extends State<TrainerViewListPackagePage> {
  // List<Widget> _listPackage(List<PackageModel>? listPackage) {
  //   List<Widget> list = List.empty(growable: true);
  //   if (listPackage == null) {
  //     return list;
  //   }
  //   for (int i = 0; i < listPackage.length; i++) {
  //     list.add(_package(
  //         listPackage[i].,
  //         listPackage[i].dayToMeet.toString(),
  //         listPackage[i].,
  //         "20.0"))
  //   }
  // }

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

  Widget _package(
      String exercisePlan, String dietPlan, String dayOfTraining, String fee) {
    return GestureDetector(
      onTap: () {},
      child: Card(
        elevation: 5,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15.0),
        ),
        child: Container(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              Align(
                alignment: Alignment.topLeft,
                child: Text(
                  'Exercise Plan',
                  style: TextStyle(
                      color: AppColors.PRIMARY_WORD_COLOR,
                      fontWeight: FontWeight.w900,
                      fontSize: 15),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 2,
                ),
              ),
              Align(
                alignment: Alignment.topLeft,
                child: Text(
                  exercisePlan,
                  style: TextStyle(
                      color: AppColors.PRIMARY_WORD_COLOR,
                      fontWeight: FontWeight.w400,
                      fontSize: 15),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 2,
                ),
              ),
              Align(
                alignment: Alignment.topLeft,
                child: Text(
                  'Diet Plan',
                  style: TextStyle(
                      color: AppColors.PRIMARY_WORD_COLOR,
                      fontWeight: FontWeight.w900,
                      fontSize: 15),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 2,
                ),
              ),
              Align(
                alignment: Alignment.topLeft,
                child: Text(
                  dietPlan,
                  style: TextStyle(
                      color: AppColors.PRIMARY_WORD_COLOR,
                      fontWeight: FontWeight.w400,
                      fontSize: 15),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 2,
                ),
              ),
              SizedBox(
                height: 5,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    dayOfTraining,
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w900,
                        fontSize: 15),
                  ),
                  Row(
                    children: [
                      Text(
                        fee,
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w900,
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
              )
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("List Packages"),
      body: Container(
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
        margin: const EdgeInsets.only(top: 20),
        child: SingleChildScrollView(
          child: Column(
            children: [
              _title('Available Packages'),
              const SizedBox(
                height: 10,
              ),
              _package(
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
                  "2 days",
                  '20.0'),
              _package(
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
                  "5 days",
                  '50.0'),
              _package(
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
                  "2 days",
                  '69.0'),
              const SizedBox(
                height: 20,
              ),
              FlatButton(
                height: 64,
                color: AppColors.PRIMARY_COLOR,
                onPressed: () {
                  Navigator.pushNamed(context, RoutePath.createPackagesPage);
                },
                child: const Text(
                  'Add Custom Package',
                  style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w700,
                      fontSize: 15),
                ),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(18)),
              )
            ],
          ),
        ),
      ),
    );
  }
}
