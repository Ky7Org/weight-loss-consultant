import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';

class CustomerCampaignPage extends StatefulWidget {
  const CustomerCampaignPage({Key? key}) : super(key: key);

  @override
  _CustomerCampaignPageState createState() =>
      _CustomerCampaignPageState();
}

class _CustomerCampaignPageState extends State<CustomerCampaignPage> {
  Widget _campaign(String date, String currentWeight, String targetWeight, String customerName) {
    return GestureDetector(
      onTap: () {},
      child: Card(
        elevation: 5,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15.0),
        ),
        child: Container(
          padding: const EdgeInsets.all(20),
          child: Row(
            children: [
              Expanded(
                  flex: 1,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(
                                vertical: 5, horizontal: 10),
                            margin: const EdgeInsets.only(bottom: 10),
                            child: Text(
                              date,
                              style: TextStyle(
                                  color: HexColor("#FF3939"),
                                  fontSize: 13,
                                  fontWeight: FontWeight.w900),
                            ),
                            decoration: BoxDecoration(
                                color: HexColor("#F0F3F6"),
                                borderRadius:
                                const BorderRadius.all(Radius.circular(5))),
                          ),
                          Text(
                            customerName,
                            style: TextStyle(
                                color: AppColors.PRIMARY_WORD_COLOR,
                                fontWeight: FontWeight.w900,
                                fontSize: 15),
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            children: [
                              Text(
                                'Current Weight',
                                style: TextStyle(
                                    color: AppColors.PRIMARY_WORD_COLOR,
                                    fontWeight: FontWeight.w900,
                                    fontSize: 13),
                              ),
                              const SizedBox(
                                height: 5,
                              ),
                              Text(
                                currentWeight,
                                style: TextStyle(
                                    color: AppColors.PRIMARY_WORD_COLOR,
                                    fontWeight: FontWeight.w400,
                                    fontSize: 13),

                              ),
                            ],
                          ),
                          Column(
                            children: [
                              Text(
                                'Target Weight',
                                style: TextStyle(
                                    color: AppColors.PRIMARY_WORD_COLOR,
                                    fontWeight: FontWeight.w900,
                                    fontSize: 13),
                              ),
                              const SizedBox(
                                height: 5,
                              ),
                              Text(
                                targetWeight,
                                style: TextStyle(
                                    color: AppColors.PRIMARY_WORD_COLOR,
                                    fontWeight: FontWeight.w400,
                                    fontSize: 13),

                              ),
                            ],
                          )
                        ],
                      ),

                    ],
                  ))
            ],
          ),
        ),
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("List Campaigns"),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: (){
          Navigator.pushNamed(context, RoutePath.createCampaignPage);
        },
        label: const Text("Add new campaign"),
        icon: const Icon(Icons.add),
      ),
      body: Container(
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
        margin: const EdgeInsets.only(top: 20),
        child: SingleChildScrollView(
          child: Column(
            children: [
              _title('Your Campaign'),
              const SizedBox(
                height: 20,
              ),
              _campaign('17:00 Nov 30,2021', '62', '52', 'Tran Duy Nghiem'),
              _campaign('17:00 Nov 30,2021', '92', '82', 'Truong Tran Tien'),
              _campaign('17:00 Nov 30,2021', '82', '69', 'Ngo Nguyen Bang'),
              _campaign('17:00 Nov 30,2021', '82', '69', 'Ngo Nguyen Bang'),
              _campaign('17:00 Nov 30,2021', '82', '69', 'Ngo Nguyen Bang'),
              _campaign('17:00 Nov 30,2021', '82', '69', 'Ngo Nguyen Bang'),
              _campaign('17:00 Nov 30,2021', '82', '69', 'Ngo Nguyen Bang'),
            ],
          ),
        ),
      ),
    );
  }
}
