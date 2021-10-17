import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/toast.dart';
import 'package:weight_loss_consultant_mobile_hci_version/example_data/exercise_data.dart';
import 'package:weight_loss_consultant_mobile_hci_version/example_data/food_data.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/account_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/diet_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';

class CustomerAddDietScreen extends StatefulWidget {
  const CustomerAddDietScreen({Key? key}) : super(key: key);

  @override
  _CustomerAddDietScreenState createState() =>
      _CustomerAddDietScreenState();
}

class _CustomerAddDietScreenState extends State<CustomerAddDietScreen> {
  Icon icon = const Icon(
    Icons.search,
    color: Colors.white,
  );

  Widget appBarTitle = const Text(
    "ADD DIET",
    style: TextStyle(color: Colors.white),
  );
  final globalKey = GlobalKey<ScaffoldState>();
  final TextEditingController _controller = TextEditingController();
  bool _isSearching = false;
  String _searchText = "";
  List<DietModel> searchresult = [];
  List<DietModel> fullList = [];

  AccountModel user = AccountModel(email: "", fullname: "");


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


  Widget _buildItemWidget(DietModel model) {
    Widget widget = GestureDetector(
      onTap: () {
        user.userTodayDiet.add(model);
        saveAccount();
        CustomToast.makeToast("Add successfully");
      },
      child: Container(
          padding: const EdgeInsets.symmetric(vertical: 5),
          child: Row(
              children: [
                const Icon(Icons.menu),
                const SizedBox(width: 20,),
                Image(
                  image: AssetImage(model.thumbnailPath),
                  height: 100,
                  width: 100,
                ),
                const SizedBox(width: 20,),
                Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        width: 150,
                        child: Text(
                          model.name,
                          style: const TextStyle(
                            fontSize: 17,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                      ),
                      const SizedBox(height: 10,),
                      Text(
                        "${model.calories} kcal",
                        style: const TextStyle(
                            color: Colors.grey
                        ),
                      ),
                    ]
                )
              ]
          )
      ),
    );
    return widget;
  }

  PreferredSize _buildAppBar() {
    return PreferredSize(
        preferredSize: const Size.fromHeight(100),
        child: AppBar(
          title: appBarTitle,
          flexibleSpace: Container(
            decoration: BoxDecoration(
                image: DecorationImage(
                  fit: BoxFit.cover,
                  colorFilter: ColorFilter.mode(
                      Colors.black.withOpacity(0.4), BlendMode.darken),
                  image: const AssetImage("assets/images/food.jpeg"),
                )
            ),
          ),
          centerTitle: false,
          titleSpacing: 0,
          titleTextStyle: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w600
          ),
          backgroundColor: Colors.transparent,
          actions: [
            IconButton(
                onPressed: () {
                  setState(() {
                    if (icon.icon == Icons.search) {
                      icon = const Icon(
                        Icons.close,
                        color: Colors.white,
                      );
                      appBarTitle = TextField(
                        controller: _controller,
                        style: const TextStyle(
                          color: Colors.white,
                        ),
                        decoration: const InputDecoration(
                            prefixIcon: Icon(Icons.search, color: Colors.white),
                            hintText: "Search...",
                            hintStyle: TextStyle(color: Colors.white)),
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
        )
    );
  }

  void _handleSearchStart() {
    setState(() {
      _isSearching = true;
    });
  }

  void _handleSearchEnd() {
    setState(() {
      icon = const Icon(
        Icons.search,
        color: Colors.white,
      );
      appBarTitle = const Text(
        "ADD DIET",
        style: TextStyle(color: Colors.white),
      );
      _isSearching = false;
      _controller.clear();
    });
  }

  void searchOperation(String searchText) {
    searchresult.clear();
    for (int i = 0; i < fullList.length; i++) {
      DietModel data = fullList[i];
      if (data.name.toLowerCase().contains(searchText.toLowerCase())) {
        searchresult.add(data);
      }
    }
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
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value) {
        fullList = [...user.userCustomDietModelList, ...FoodList.listFood];
        setState(() {});
      });
    });
    super.initState();
  }

  _buildSearchList() {
    return ListView.separated(
        shrinkWrap: true,
        itemCount: searchresult.length,
        itemBuilder: (BuildContext context, int index) {
          return _buildItemWidget(searchresult[index]);
        },
        separatorBuilder: (context, index) {
          return const Divider();
        }
    );
  }

  _buildAllList() {
    return ListView.separated(
      shrinkWrap: true,
      itemCount: fullList.length,
      itemBuilder: (BuildContext context, int index) {
        return _buildItemWidget(fullList[index]);
      },
      separatorBuilder: (context, index) {
        return const Divider();
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    fullList = [...user.userCustomDietModelList, ...FoodList.listFood];
    return Container(
      decoration: const BoxDecoration(
          color: Colors.white
      ),
      child: Scaffold(
        key: globalKey,
        appBar: _buildAppBar(),
        backgroundColor: Colors.transparent,
        floatingActionButton: Container(
          width: 300.0,
          child: FloatingActionButton.extended(
            onPressed: (){
              Navigator.pushNamed(context, RoutePath.customerAddCustomFood).then((value){
                initAccount().then((value){
                  setState(() {
                  });
                });
              });
            },
            icon: const Icon(Icons.add),
            label: const Text("ADD CUSTOM FOOD"),

          ),
        ),
        body: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const SizedBox(height: 20,),
            const Text(
              "Weightloss food",
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 20
              ),
            ),
            const SizedBox(height: 20,),
            Flexible(
                child: searchresult.isNotEmpty || _controller.text.isNotEmpty ?
                _buildSearchList() : _buildAllList())
          ],
        ),
      ),
    );
  }
}
