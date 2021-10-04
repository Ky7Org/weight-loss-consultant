import 'package:flutter/material.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';

import 'customer_home_page.dart';

class MyMessagesPage extends StatefulWidget {
  const MyMessagesPage({Key? key}) : super(key: key);

  @override
  _MyMessagesPageState createState() => _MyMessagesPageState();
}

class _MyMessagesPageState extends State<MyMessagesPage>
    with SingleTickerProviderStateMixin {
  final PanelController _pc = PanelController();
  late TabController _tabController;

  @override
  void initState() {
    _tabController = TabController(length: 2, vsync: this);
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
    _tabController.dispose();
  }

  Widget _buildMessage(String name, String message, String date) {
    return GestureDetector(
      onTap:(){
        Navigator.pushNamed(context, RoutePath.chatPage);
      },
      child: (Container(
        height: 109,
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(18),
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.2),
                spreadRadius: 5,
                blurRadius: 7,
                offset: const Offset(0, 3),
              )
            ]),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                    flex: 2,
                    child: CircleAvatar(
                      backgroundImage:
                          AssetImage("assets/fake-image/miku-avatar.png"),
                    )),
                Expanded(
                  flex: 8,
                  child: Padding(
                    padding: EdgeInsets.symmetric(vertical: 2, horizontal: 10),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              name,
                              style: TextStyle(
                                  color: Color(0xFF0D3F67),
                                  fontSize: 19,
                                  fontWeight: FontWeight.w700),
                            ),
                            Text(
                              date,
                              style: TextStyle(
                                  color: Color(0xFFFF3939),
                                  backgroundColor: Color(0xFFF0F3F6),
                                  fontWeight: FontWeight.w900,
                                  fontSize: 14),
                            ),
                          ],
                        ),
                        Padding(padding: EdgeInsets.only(top: 10), child:   Text(
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ...',
                          style: TextStyle(color: Color(0xFF0D3F67), fontSize: 13.5, fontWeight: FontWeight.w500),
                        ),)

                      ],
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      )),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.white,
        appBar: GenericAppBar.builder('My Message'),
        body: Padding(
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
                        'Other(3)',
                        style: TextStyle(
                            fontSize: 18, fontWeight: FontWeight.w700),
                      ),
                    ),
                    Tab(
                      child: Text(
                        'My Trainer',
                        style: TextStyle(
                            fontSize: 18, fontWeight: FontWeight.w700),
                      ),
                    )
                  ],
                ),
              ),
              Expanded(
                  child: TabBarView(
                controller: _tabController,
                children: [
                  Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      _buildMessage('BanhsBao', "Ahiihii", "20 Jan"),
                      _buildMessage('Bang Ngo', "Ahiihii", "20 Jan"),
                      _buildMessage('Tien Truong', "Ahiihii", "20 Jan")
                    ],
                  ),
                  Center(
                    child: Text(
                      'My Trainer',
                      style:
                          TextStyle(fontSize: 15, fontWeight: FontWeight.w700),
                    ),
                  ),
                ],
              ))
            ],
          ),
        ),
        bottomNavigationBar: bottom_navigator(
          pc: _pc,
        ));
  }
}
