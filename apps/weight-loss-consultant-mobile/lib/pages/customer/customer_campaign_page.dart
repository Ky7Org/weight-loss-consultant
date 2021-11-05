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
import 'package:weight_loss_consultant_mobile/models/customer_campaign_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/pages/components/toast.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:weight_loss_consultant_mobile/services/customer_service.dart';
import 'package:weight_loss_consultant_mobile/services/notification_service.dart';
import 'package:weight_loss_consultant_mobile/services/trainer_service.dart';

class CustomerCampaignPage extends StatefulWidget {
  const CustomerCampaignPage({Key? key}) : super(key: key);

  @override
  _CustomerCampaignPageState createState() =>
      _CustomerCampaignPageState();
}

class _CustomerCampaignPageState extends State<CustomerCampaignPage> with SingleTickerProviderStateMixin {
  Future<List<CampaignModel>>? listCampaign;
  AccountModel user = AccountModel(email: "", fullname: "");
  CustomerService customerService = CustomerService();
  List<CampaignModel>? fullList;

  late TabController _tabController ;

  Icon icon = Icon(
    Icons.search,
    color: AppColors.PRIMARY_WORD_COLOR,
  );

  Widget appBarTitle = Text(
    "Your Campaign List",
    style: TextStyle(color: AppColors.PRIMARY_WORD_COLOR),
  );

  final TextEditingController _controller = TextEditingController();
  bool _isSearching = false;
  String _searchText = "";
  final globalKey = GlobalKey<ScaffoldState>();

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
    _tabController = TabController(length: 3, vsync: this);
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value){
        listCampaign = customerService.getCustomerCampaign(user.email ?? "");
        listCampaign!.then((value){
          fullList = value;
        });
        setState(() {});
      });
    });
  }

  Future _showConfirmDeleteDialog() async{
    return showDialog(
        context: context,
        builder: (ctx) => Dialog(
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(4.0)),
            child: Stack(
              clipBehavior: Clip.none,
              alignment: Alignment.topCenter,
              children: [
                SizedBox(
                  height: 180,
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(10, 60, 10, 10),
                    child: Column(children: [
                      const Center(
                          child: Text(
                            "Are you sure to delete this campaign?",
                            style: TextStyle(
                              color: Colors.redAccent,
                            ),
                          )),
                      const SizedBox(
                        height: 20,
                      ),
                      Row(
                        mainAxisSize: MainAxisSize.max,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          RaisedButton(
                            onPressed: () {
                              Navigator.of(context).pop(false);
                            },
                            color: Colors.redAccent,
                            child: const Text(
                              'Cancel',
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                          SizedBox(width: 20,),
                          RaisedButton(
                            onPressed: () async {
                              Navigator.of(context).pop(true);
                            },
                            color: Colors.redAccent,
                            child: const Text(
                              'Okay',
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                        ],
                      ),

                    ]),
                  ),
                ),
                const Positioned(
                    top: -35,
                    child: CircleAvatar(
                      backgroundColor: Colors.redAccent,
                      radius: 40,
                      child: Icon(
                        Icons.warning,
                        color: Colors.white,
                        size: 50,
                      ),
                    )),
              ],
            )));
  }

  Widget _buildEditButtonGroup(CampaignModel campaignModel){
    if (campaignModel.status == 0){
      //Active campaign
      return Row(
        children: [
          IconButton(
              onPressed: () async {
                Navigator.pushNamed(context, RoutePath.customerUpdateCampaignPage, arguments: campaignModel.id).then((value){
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
                bool result = await _showConfirmDeleteDialog();
                if (result){
                  TrainerService trainerService = TrainerService();
                  CustomerCampaignModel? customerCampaignModel = await trainerService.getCampaignById(campaignModel.id as int, user);
                  result = await customerService.removeActiveCampaign(campaignModel.id as int, user);
                  if (result){
                    NotificationService notificationService = NotificationService();
                    await notificationService.customerRemoveActiveCampaign(customerCampaignModel!.customer!.deviceID ?? "", campaignModel.id as int);

                    CustomToast.makeToast("Delete successfully");
                  } else {
                    CustomToast.makeToast("Some thing went wrong! Try again");
                  }
                  setState(() {
                    listCampaign = customerService.getCustomerCampaign(user.email ?? "");
                  });
                }
              },
              icon: Icon(
                Icons.highlight_remove_outlined,
                color: HexColor("#FF3939"),
              )
          ),
        ],
      );
    }
    return Container();
  }

  Widget _campaign(CampaignModel campaignModel) {
    String createDate = DateFormat("MMMM-dd-yyyy").format(DateTime.fromMillisecondsSinceEpoch(campaignModel.createDate ?? 0));
    String startDate = DateFormat("MMMM-dd-yyyy").format(DateTime.fromMillisecondsSinceEpoch(int.parse(campaignModel.startDate ?? DateTime.now().millisecond.toString()))).toString();
    String endDate = DateFormat("MMMM-dd-yyyy").format(DateTime.fromMillisecondsSinceEpoch(int.parse(campaignModel.endDate ?? DateTime.now().millisecond.toString()))).toString();
    return GestureDetector(
      onTap: () {
        Navigator.pushNamed(context, RoutePath.customerAppliedPackagePage, arguments: campaignModel.id).then((value){
          listCampaign = customerService.getCustomerCampaign(user.email ?? "");
          setState(() {});
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
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        "Created at: ",
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w900,
                            fontSize: 13,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            vertical: 5, horizontal: 10),
                        child: Text(
                          createDate,
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
                    ],
                  ),
                  _buildEditButtonGroup(campaignModel),
                ],
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
                    campaignModel.currentWeight.toString(),
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
                    campaignModel.targetWeight.toString(),
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
                      text: campaignModel.description,
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

  List<Widget> _buildOnGoingCampaignList(List<CampaignModel> data){
    List<Widget> widgets = [];
    for (CampaignModel model in data){
      if (model.status != 1) continue;
      var widget = _campaign(model);
      widgets.add(widget);
    }
    widgets.add(const SizedBox(height: 70,));
    return widgets;
  }

  List<Widget> _buildActiveCampaignList(List<CampaignModel> data){
    List<Widget> widgets = [];
    for (CampaignModel model in data){
      if (model.status != 0) continue;
      var widget = _campaign(model);
      widgets.add(widget);
    }
    widgets.add(const SizedBox(height: 70,));
    return widgets;
  }

  List<Widget> _buildClosedCampaignList(List<CampaignModel> data){
    List<Widget> widgets = [];
    for (CampaignModel model in data){
      if (model.status != 2) continue;
      var widget = _campaign(model);
      widgets.add(widget);
    }
    widgets.add(const SizedBox(height: 70,));
    return widgets;
  }

  Widget _buildEmptyCampaignList(){
    return SingleChildScrollView(
      child: Column(
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
      ),
    );
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
        "Your Campaign List",
        style: TextStyle(color: AppColors.PRIMARY_WORD_COLOR,),
      );
      _isSearching = false;
      _controller.clear();
    });
  }

  Future<List<CampaignModel>> updateAndGetList(String searchText) async{
    List<CampaignModel> searchresult = [];
    for (int i = 0; i < fullList!.length; i++) {
      CampaignModel data = fullList![i];
      if (data.description!.toLowerCase().contains(searchText.toLowerCase())) {
        searchresult.add(data);
      }
    }
    return searchresult;
  }

  void searchOperation(String searchText) {
    setState(() {
      listCampaign = updateAndGetList(searchText);
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
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: Colors.white,
        onPressed: (){
          Navigator.pushNamed(context, RoutePath.createCampaignPage).then((value){
            listCampaign = customerService.getCustomerCampaign(user.email ?? "");
            setState(() {});
          });
        },
        label: Text(
          "Add new campaign",
          style: TextStyle(
            color: HexColor("#FF3939"),
          ),
        ),
        icon: Icon(
          Icons.add,
          color: HexColor("#FF3939"),
        ),
      ),
      body: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        margin: const EdgeInsets.only(top: 20),
        child: FutureBuilder<List<CampaignModel>>(
          future: listCampaign,
          builder: (context, snapshot) {
            if (snapshot.hasData){
              if (snapshot.requireData.isEmpty){
                return _buildEmptyCampaignList();
              }
              return Column(
                children: [
                  Container(
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
                            'On-going',
                            style: TextStyle(
                                fontSize: 18, fontWeight: FontWeight.w700),
                          ),
                        ),
                        Tab(
                          child: Text(
                            'Active',
                            style: TextStyle(
                                fontSize: 18, fontWeight: FontWeight.w700),
                          ),
                        ),
                        Tab(
                          child: Text(
                            'Closed',
                            style: TextStyle(
                                fontSize: 18, fontWeight: FontWeight.w700),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20,),
                  Expanded(
                    child: TabBarView(
                      controller: _tabController,
                      children: [
                        ListView(
                          children: _buildOnGoingCampaignList(snapshot.requireData),
                        ),
                        ListView(
                          children: _buildActiveCampaignList(snapshot.requireData),
                        ),
                        ListView(
                          children: _buildClosedCampaignList(snapshot.requireData),
                        ),
                      ],
                    ),
                  ),
                ],
              );
            }
            return const Center(
              child: CircularProgressIndicator()
            );
          }
        ),
      ),
    );
  }
}
