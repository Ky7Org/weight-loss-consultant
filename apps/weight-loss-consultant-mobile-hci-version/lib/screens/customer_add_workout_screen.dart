import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/toast.dart';
import 'package:weight_loss_consultant_mobile_hci_version/example_data/exercise_data.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/account_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/exercise_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';

class CustomerAddWorkoutScreen extends StatefulWidget {
  const CustomerAddWorkoutScreen({Key? key}) : super(key: key);

  @override
  _CustomerAddWorkoutScreenState createState() =>
      _CustomerAddWorkoutScreenState();
}

class _CustomerAddWorkoutScreenState extends State<CustomerAddWorkoutScreen> {
  Icon icon = const Icon(
    Icons.search,
    color: Colors.white,
  );

  Widget appBarTitle = const Text(
    "ADD WORKOUT",
    style: TextStyle(color: Colors.white),
  );
  final globalKey = GlobalKey<ScaffoldState>();
  final TextEditingController _controller = TextEditingController();
  bool _isSearching = false;
  String _searchText = "";
  List searchresult = [];
  List fullList = [];

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


  Widget _buildItemWidget(ExerciseModel model) {
    Widget widget = GestureDetector(
      onTap: () {
        user.userTodayExercise.add(model);
        saveAccount();
        CustomToast.makeToast("Add successfully");
      },
      child: Container(
          margin: const EdgeInsets.symmetric(vertical: 10),
          padding: const EdgeInsets.symmetric(vertical: 5),
          child: Row(children: [
            const SizedBox(
              width: 20,
            ),
            const Icon(Icons.menu),
            const SizedBox(width: 20,),
            Image(
              image: AssetImage(model.thumbnailPath),
              height: 100,
              width: 100,
            ),
            const SizedBox(
              width: 20,
            ),
            const SizedBox(
              width: 20,
            ),
            SizedBox(
              width: 100,
              child: Text(model.name,
                  style: const TextStyle(
                    fontSize: 17,
                    fontWeight: FontWeight.w900,
                  )),
            ),
            const Spacer(),
            Text("${model.calories.toString()} kcal"),
            const SizedBox(width: 20,)

          ])),
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
                  image: const AssetImage("assets/images/push-up.jpeg"),
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
        "ADD WORKOUT",
        style: TextStyle(color: Colors.white),
      );
      _isSearching = false;
      _controller.clear();
    });
  }

  void searchOperation(String searchText) {
    searchresult.clear();
    for (int i = 0; i < fullList.length; i++) {
      ExerciseModel data = fullList[i];
      if (data.name.toLowerCase().contains(searchText.toLowerCase())) {
        searchresult.add(data);
      }
    }
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
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value) {
        fullList = [...user.userCustomExerciseModelList, ...ExerciseList.listExercise];
        setState(() {});
      });
    });
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
    fullList = [...user.userCustomExerciseModelList, ...ExerciseList.listExercise];
    return Container(
      decoration: const BoxDecoration(
          color: Colors.white
      ),
      child: Scaffold(
        key: globalKey,
        appBar: _buildAppBar(),
        backgroundColor: Colors.transparent,
        floatingActionButton: SizedBox(
          width: 300.0,
          child: FloatingActionButton.extended(
            onPressed: (){
              Navigator.pushNamed(context, RoutePath.customerAddCustomActivity).then((value){
                initAccount().then((value){
                  setState(() {
                  });
                });
              });
            },
            icon: const Icon(Icons.add),
            label: const Text("ADD CUSTOM ACTIVITY"),

          ),
        ),
        floatingActionButtonLocation:
          FloatingActionButtonLocation.centerFloat,
        body: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const SizedBox(height: 20,),
            const Text(
              "Weightloss workouts",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 20
              ),
            ),
            const SizedBox(height: 20,),
            Flexible(
              child: searchresult.isNotEmpty || _controller.text.isNotEmpty ?
              _buildSearchList() : _buildAllList()),
            const SizedBox(height: 70,)
          ],
        ),
      ),
    );
  }
}
