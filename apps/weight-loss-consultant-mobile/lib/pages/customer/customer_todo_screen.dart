import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';
import 'package:weight_loss_consultant_mobile/constants/customer_bottom_navigator_index.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/models/diet_model.dart';
import 'package:weight_loss_consultant_mobile/models/exercise_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/cusomter_bottom_navigator.dart';
import 'package:weight_loss_consultant_mobile/pages/components/custom_dialog.dart';
import 'package:weight_loss_consultant_mobile/pages/components/customer_sliding_up_panel.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/services/diet_service.dart';
import 'package:weight_loss_consultant_mobile/services/exercise_service.dart';



class CustomerTodoPage extends StatefulWidget {
  const CustomerTodoPage({Key? key}) : super(key: key);

  @override
  _CustomerTodoPageState createState() => _CustomerTodoPageState();
}

class _CustomerTodoPageState extends State<CustomerTodoPage>
    with SingleTickerProviderStateMixin {
  final PanelController _pc = PanelController();
  late TabController _tabController;
  List<ExerciseModel> _exercises = List.empty(growable: true);
  Map<String, List<DietModel>> _todayDiets = {};
  AccountModel user = AccountModel(email: "", fullname: "");
  static final ExerciseService _exerciseService = ExerciseService();
  static final DietService _dietService = DietService();

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
    _tabController = TabController(length: 2, vsync: this);
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value) {
        _exercises = _exerciseService.getTodayExercise();
        _todayDiets = _dietService.getTodayDiet();
      });
      setState(() {});
    });
  }

  @override
  void dispose() {
    super.dispose();
    _tabController.dispose();
  }


  List<Widget> _buildListExercise(){
    List<Widget> list = List.empty(growable: true);
    for (int i=0; i< _exercises.length; i++){
      Widget widget = GestureDetector(
        onTap: (){
          showDialog(context: context,
              builder: (BuildContext context){
                return CustomDialogBox(
                  title: _exercises[i].name,
                  descriptions: _exercises[i].details,
                  img: Image(
                    image: NetworkImage(_exercises[i].thumbnailPath),
                  ),
                );
              }
          );
        },
        child: Container(
            padding: const EdgeInsets.symmetric(vertical: 5),
            child: Row(
                children: [
                  const Icon(Icons.menu),
                  const SizedBox(width: 20,),
                  Image(
                    image: NetworkImage(_exercises[i].thumbnailPath),
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
                              _exercises[i].name,
                              style: const TextStyle(
                                fontSize: 17,
                                fontWeight: FontWeight.w900,
                              )
                          ),
                        ),
                        const SizedBox(height: 10,),
                        Text(
                            _exercises[i].unit,
                            style: const TextStyle(
                              color: Colors.grey,
                            )
                        ),
                      ]
                  )
                ]
            )
        ),
      );
      list.add(widget);
      list.add(const Divider(thickness: 1,));
    }
    //need to add this for ListView to work
    list.add(SizedBox(height: 200,));
    return list;
  }

  List<Widget> _buildListDiet(List<DietModel>? dietList){
    List<Widget> list = List.empty(growable: true);
    if (dietList == null){
      return list;
    }
    for (int i=0; i< dietList.length; i++){
      Widget widget = GestureDetector(
        onTap: (){
          showDialog(context: context,
              builder: (BuildContext context){
                return CustomDialogBox(
                  title: dietList[i].name,
                  descriptions: dietList[i].details,
                  img: Image(
                    image: NetworkImage(dietList[i].thumbnailPath),
                  ),
                );
              }
          );
        },
        child: Container(
            padding: const EdgeInsets.symmetric(vertical: 5),
            child: Row(
                children: [
                  const Icon(Icons.menu),
                  const SizedBox(width: 20,),
                  Image(
                    image: NetworkImage(dietList[i].thumbnailPath),
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
                            dietList[i].name,
                            style: const TextStyle(
                              fontSize: 17,
                              fontWeight: FontWeight.w900,
                            ),
                          ),
                        ),
                        const SizedBox(height: 10,),
                        Text(
                          dietList[i].unit,
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
      list.add(widget);
      list.add(const Divider(thickness: 1,));
    }
    return list;
  }


  List<Widget> _buildListTodayDiet(){
    List<Widget> periodDiets = List.empty(growable: true);
    for (String period in _todayDiets.keys){
      Widget periodWidget = Column(
        children: [
          const SizedBox(height: 10,),
          Align(
            alignment: Alignment.topLeft,
            child: Text(period,
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),),
          ),
          ..._buildListDiet(_todayDiets[period]),
        ],
      );
      periodDiets.add(periodWidget);
    }
    periodDiets.add(SizedBox(height: 200,));
    return periodDiets;
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.white,
        appBar: GenericAppBar.builder('Your todo list'),
        body: SlidingUpPanel(
            controller: _pc,
            panel: CategoryPanel(),
            minHeight: 0,
            maxHeight: 400,
            body: Container(
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  children: [
                    Container(
                      margin: const EdgeInsets.only(top: 20),
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
                              'Exercise',
                              style: TextStyle(
                                  fontSize: 18, fontWeight: FontWeight.w700),
                            ),
                          ),
                          Tab(
                            child: Text(
                              'Diet',
                              style: TextStyle(
                                  fontSize: 18, fontWeight: FontWeight.w700),
                            ),
                          )
                        ],
                      ),
                    ),
                    SizedBox(height: 20,),
                    Expanded(
                      child: TabBarView(
                        controller: _tabController,
                        children: [
                          ListView(
                            children: _buildListExercise(),
                          ),
                          ListView(
                            children: _buildListTodayDiet(),
                          ),
                        ],
                      ),
                    )
                  ],
                ),
              ),
            )),
        bottomNavigationBar: CustomerBottomNavigator(
          pc: _pc,
          selectedIndex: CustomerBottomNavigatorIndex.SLIDE_UP,
        ));
  }
}
