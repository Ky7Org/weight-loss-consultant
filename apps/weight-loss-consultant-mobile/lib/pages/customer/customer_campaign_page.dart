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
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/pages/components/toast.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:weight_loss_consultant_mobile/services/customer_service.dart';

class CustomerCampaignPage extends StatefulWidget {
  const CustomerCampaignPage({Key? key}) : super(key: key);

  @override
  _CustomerCampaignPageState createState() =>
      _CustomerCampaignPageState();
}

class _CustomerCampaignPageState extends State<CustomerCampaignPage> {
  Future<List<CampaignModel>>? listCampaign;

  AccountModel user = AccountModel(email: "", fullname: "");
  CustomerService customerService = CustomerService();

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
        listCampaign = customerService.getCustomerCampaign(user.email ?? "");
        setState(() {});
      });
    });
  }

  Widget _campaign(int id, String date, String currentWeight, String targetWeight, String description) {
    return GestureDetector(
      onTap: () {
        Navigator.pushNamed(context, RoutePath.customerAppliedPackagePage, arguments: id);
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
                  Row(
                    children: [
                      IconButton(
                          onPressed: () async {
                            Navigator.pushNamed(context, RoutePath.customerUpdateCampaignPage, arguments: id).then((value){
                              listCampaign = customerService.getCustomerCampaign(user.email ?? "");
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
                            bool result = await customerService.deleteCampaign(id, user);
                            if (result){
                              CustomToast.makeToast("Delete successfully");
                            } else {
                              CustomToast.makeToast("Some thing went wrong! Try again");
                            }
                            setState(() {
                              listCampaign = customerService.getCustomerCampaign(user.email ?? "");
                            });
                          },
                          icon: Icon(
                            Icons.highlight_remove_outlined,
                            color: HexColor("#FF3939"),
                          )
                      ),
                    ],
                  )
                ],
              ),
              const SizedBox(
                height: 10,
              ),
              Row(
                children: [
                  Text(
                    'Current Weight',
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w900,
                        fontSize: 13),
                  ),
                  const SizedBox(
                    width: 5,
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
              const SizedBox(
                height: 10,
              ),
              Row(
                children: [
                  Text(
                    'Target Weight',
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w900,
                        fontSize: 13),
                  ),
                  const SizedBox(
                    width: 5,
                  ),
                  Text(
                    targetWeight,
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w400,
                        fontSize: 13),

                  ),
                ],
              ),
              const SizedBox(
                height: 10,
              ),
              RichText(
                text: TextSpan(
                  children: [
                    TextSpan(
                      text:"Description: ",
                      style: TextStyle(
                          color: AppColors.PRIMARY_WORD_COLOR,
                          fontWeight: FontWeight.w900,
                          fontSize: 13),
                    ),
                    TextSpan(
                      text: description,
                      style: TextStyle(
                          color: AppColors.PRIMARY_WORD_COLOR,
                          fontWeight: FontWeight.w400,
                          fontSize: 13),
                    )
                  ]
                )
              )

            ],
          ),
        ),
      ),
    );
  }

  List<Widget> _buildCampaignList(List<CampaignModel> data){
    List<Widget> widgets = [];
    for (CampaignModel model in data){
      var date = DateFormat("MMMM-dd-yyyy").format(DateTime.fromMillisecondsSinceEpoch(int.parse(model.startDate ?? DateTime.now().millisecond.toString()))).toString();
      var widget = _campaign(
          model.id ?? 0,
          date,
          model.currentWeight.toString(),
          model.targetWeight.toString(),
          model.description ?? "",
      );
      widgets.add(widget);
    }
    return widgets;
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
            'No Campaign',
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
            "You don't have any campaign.",
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("List Campaigns"),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: HexColor("#FF3939"),
        onPressed: (){
          Navigator.pushNamed(context, RoutePath.createCampaignPage).then((value){
            listCampaign = customerService.getCustomerCampaign(user.email ?? "");
            setState(() {});
          });
        },
        label: const Text("Add new campaign"),
        icon: const Icon(Icons.add),
      ),
      body: Container(
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
        margin: const EdgeInsets.only(top: 20),
        child: SingleChildScrollView(
          child: FutureBuilder<List<CampaignModel>>(
            future: listCampaign,
            builder: (context, snapshot) {
              if (snapshot.hasData){
                if (snapshot.requireData.isEmpty){
                  return _buildEmptyCampaignList();
                }
                return Column(
                  children: [
                    _title('Your Campaign'),
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
              return const CircularProgressIndicator();
            }
          ),
        ),
      ),
    );
  }
}
