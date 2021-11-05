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
import 'package:weight_loss_consultant_mobile/services/customer_service.dart';
import 'package:weight_loss_consultant_mobile/services/trainer_service.dart';

class CustomerAppliedPackagePage extends StatefulWidget {
  int? campaignId;

  CustomerAppliedPackagePage({Key? key, this.campaignId}) : super(key: key);

  @override
  _CustomerAppliedPackagePageState createState() =>
      _CustomerAppliedPackagePageState();
}

class _CustomerAppliedPackagePageState
    extends State<CustomerAppliedPackagePage> {
  Future<List<PackageModel>>? listPackage;
  AccountModel user = AccountModel(email: "", fullname: "");
  TrainerService trainerService = TrainerService();
  CustomerService customerService = CustomerService();

  List<PackageModel>? fullList;

  Icon icon = Icon(
    Icons.search,
    color: AppColors.PRIMARY_WORD_COLOR,
  );

  Widget appBarTitle = Text(
    "Package List",
    style: TextStyle(color: AppColors.PRIMARY_WORD_COLOR),
  );

  final TextEditingController _controller = TextEditingController();
  bool _isSearching = false;
  String _searchText = "";
  final globalKey = GlobalKey<ScaffoldState>();

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
    _controller.addListener(() {
      if (_controller.text.isEmpty) {
        setState(() {
          _isSearching = false;
          _searchText = "";
        });
      } else {
        setState(() {
          _isSearching = true;
          _searchText = _controller.text;
        });
      }
    });
    WidgetsBinding.instance?.addPostFrameCallback((_) {
      initAccount().then((value) {
        listPackage =
            trainerService.getAppliedPackage(widget.campaignId ?? 0, user);
        listPackage!.then((value){
          fullList = value;
        });
        setState(() {});
      });
    });
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

  Widget _package(PackageModel model) {
    var startDate = DateFormat("MMMM-dd-yyyy").format(DateTime.fromMillisecondsSinceEpoch(int.parse(model.startDate ?? DateTime.now().millisecondsSinceEpoch.toString()))).toString();
    var endDate = DateFormat("MMMM-dd-yyyy").format(DateTime.fromMillisecondsSinceEpoch(int.parse(model.endDate ?? DateTime.now().millisecondsSinceEpoch.toString()))).toString();
    Image avatar;
    if (model == null){
      avatar = Image.asset("assets/fake-image/miku-avatar.png");
    } else if (model.trainer == null){
      avatar = Image.asset("assets/fake-image/miku-avatar.png");
    } else if (model.trainer!.profileImage == null){
      avatar = Image.asset("assets/fake-image/miku-avatar.png");
    } else {
      avatar = Image.network(model.trainer!.profileImage as String);
    }
    return GestureDetector(
      onTap: () {
        Navigator.pushNamed(context, RoutePath.customerPackageDetailPage,
            arguments: {
              "packageID": model.id,
              "campaignID": widget.campaignId,
            });
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
                children: [
                  SizedBox(
                    height: 60,
                    width: 60,
                    child: avatar,
                  ),
                  const SizedBox(width: 20,),
                  Column(
                    mainAxisSize: MainAxisSize.max,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        model.trainer!.fullname ?? "",
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w900,
                            fontSize: 15
                        ),
                      ),
                      const SizedBox(height: 10,),
                      Text(
                        model.trainer!.gender == "1" ? "Male" : "Female",
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w900,
                            fontSize: 15
                        ),
                      ),
                    ],
                  ),
                  const Spacer(),
                  Row(
                    children: [
                      Text(
                        model.price.toString(),
                        style: TextStyle(
                          color: AppColors.PRIMARY_WORD_COLOR,
                          fontWeight: FontWeight.w900,
                          fontSize: 15
                        ),
                      ),
                      const Icon(
                        Icons.attach_money,
                        color: Colors.red,
                        size: 17,
                      )
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 10,),
              RichText(
                overflow: TextOverflow.ellipsis,
                maxLines: 2,
                text: TextSpan(
                    children: [
                      TextSpan(
                        text: 'Name: ',
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w900,
                            fontSize: 13),
                      ),
                      TextSpan(
                        text: model.name,
                        style: TextStyle(
                          color: AppColors.PRIMARY_WORD_COLOR,
                          fontWeight: FontWeight.w400,
                          fontSize: 13,
                        ),
                      )
                    ]
                ),
              ),
              const SizedBox(height: 10,),
              RichText(
                overflow: TextOverflow.ellipsis,
                maxLines: 2,
                text: TextSpan(
                  children: [
                    TextSpan(
                      text: 'Diet plan: ',
                      style: TextStyle(
                          color: AppColors.PRIMARY_WORD_COLOR,
                          fontWeight: FontWeight.w900,
                          fontSize: 13),
                    ),
                    TextSpan(
                      text: model.dietPlan,
                      style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w400,
                        fontSize: 13,
                      ),
                    )
                  ]
                ),
              ),
              const SizedBox(height: 10,),
              RichText(
                overflow: TextOverflow.ellipsis,
                maxLines: 2,
                text: TextSpan(
                    children: [
                      TextSpan(
                        text: 'Exercise plan: ',
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w900,
                            fontSize: 13),
                      ),
                      TextSpan(
                        text: model.exercisePlan,
                        style: TextStyle(
                          color: AppColors.PRIMARY_WORD_COLOR,
                          fontWeight: FontWeight.w400,
                          fontSize: 13,
                        ),
                      )
                    ]
                ),
              ),
              const SizedBox(height: 10,),
              Row(
                children: [
                  Text(
                    'Start date:',
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w900,
                        fontSize: 13),
                  ),
                  const SizedBox(
                    width: 5,
                  ),
                  Text(
                    startDate,
                    style: TextStyle(
                        color: HexColor("#FF3939"),
                        fontSize: 13,
                        fontWeight: FontWeight.w900),
                  ),
                ],
              ),
              const SizedBox(height: 10,),
              Row(
                children: [
                  Text(
                    'End date:',
                    style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontWeight: FontWeight.w900,
                        fontSize: 13),
                  ),
                  const SizedBox(
                    width: 5,
                  ),
                  Text(
                    endDate,
                    style: TextStyle(
                        color: HexColor("#FF3939"),
                        fontSize: 13,
                        fontWeight: FontWeight.w900),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }


  Widget _buildEmptyPackageList() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        const SizedBox(
          height: 60,
        ),
        Center(
          child: SvgPicture.asset("assets/fake-image/no-package.svg"),
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
                fontWeight: FontWeight.w700),
          ),
        ),
        const SizedBox(
          height: 30,
        ),
        Center(
          child: Text(
            "You don't have any package\n applied to this campaign.",
            style: TextStyle(
                color: AppColors.PRIMARY_WORD_COLOR,
                fontSize: 15,
                fontWeight: FontWeight.w400),
          ),
        ),
      ],
    );
  }

  List<Widget> _buildCampaignList(List<PackageModel> data) {
    List<Widget> widgets = [];
    for (PackageModel model in data) {
      var widget = _package(model);
      widgets.add(widget);
    }
    return widgets;
  }

  void _handleSearchStart() {
    setState(() {
      _isSearching = true;
    });
  }

  void _handleSearchEnd() {
    setState(() {
      icon = Icon(
        Icons.search,
        color: AppColors.PRIMARY_WORD_COLOR,
      );
      appBarTitle = Text(
        "Package List",
        style: TextStyle(color: AppColors.PRIMARY_WORD_COLOR,),
      );
      _isSearching = false;
      _controller.clear();
    });
  }

  Future<List<PackageModel>> updateAndGetList(String searchText) async{
    List<PackageModel> searchresult = [];
    for (int i = 0; i < fullList!.length; i++) {
      PackageModel data = fullList![i];
      if (data.trainer!.fullname!.toLowerCase().contains(searchText.toLowerCase())) {
        searchresult.add(data);
      }
    }
    return searchresult;
  }

  void searchOperation(String searchText) {
    setState(() {
      listPackage = updateAndGetList(searchText);
    });
  }

  AppBar _buildAppBar(){
    return AppBar(
      centerTitle: false,
      titleSpacing: 0,
      title: appBarTitle,
      shadowColor: Colors.grey,
      backgroundColor: Colors.white,
      iconTheme: IconThemeData(
        color: AppColors.PRIMARY_WORD_COLOR,
      ),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(
          bottom: Radius.circular(30),
        ),
      ),
      actions: [
        IconButton(
            onPressed: () {
              setState(() {
                if (icon.icon == Icons.search) {
                  icon = Icon(
                    Icons.close,
                    color: AppColors.PRIMARY_WORD_COLOR,
                  );
                  appBarTitle = TextField(
                    controller: _controller,
                    style: TextStyle(
                      color: AppColors.PRIMARY_WORD_COLOR,
                    ),
                    decoration: InputDecoration(
                        prefixIcon: Icon(Icons.search, color: AppColors.PRIMARY_WORD_COLOR),
                        hintText: "Search...",
                        hintStyle: TextStyle(color: AppColors.PRIMARY_WORD_COLOR)),
                    onChanged: searchOperation,
                  );
                  _handleSearchStart();
                } else {
                  _handleSearchEnd();
                }
              });
            },
            icon: icon
        )
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: globalKey,
      appBar: _buildAppBar(),
      body: Container(
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
        margin: const EdgeInsets.only(top: 20),
        child: SingleChildScrollView(
          child: FutureBuilder<List<PackageModel>>(
              future: listPackage,
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  if (snapshot.requireData.isEmpty) {
                    return _buildEmptyPackageList();
                  }
                  return Column(
                    children: [
                      _title('Applied Package'),
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
                return const Center(child: CircularProgressIndicator());
              }),
        ),
      ),
    );
  }
}
