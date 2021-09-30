import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';
import 'package:weight_loss_consultant_mobile/constants.dart';
import 'package:weight_loss_consultant_mobile/pages/components/customer_drawer.dart';
import 'package:weight_loss_consultant_mobile/pages/components/main_app_bar.dart';

class CustomerMain extends StatefulWidget {
  const CustomerMain({Key? key}) : super(key: key);

  @override
  _CustomerMainState createState() => _CustomerMainState();
}

class _CustomerMainState extends State<CustomerMain> {
  int selectedIndex = 0;
  Map data = {};
  PanelController _pc = new PanelController();
  List<Map> categories = [
    {
      "text": "Todo",
      "imageName": "todo-icon.svg",
    },
    {
      "text": "Message",
      "imageName": "message-icon.svg",
      "route": "/chat"
    },
    {
      "text": "Campaign",
      "imageName": "campaign-icon.svg",
    },
    {
      "text": "Package",
      "imageName": "package-icon.svg",
    },
    {
      "text": "Calendar",
      "imageName": "calendar-icon.svg",
    },
    {
      "text": "Video Call",
      "imageName": "video-call-icon.svg",
    },
    {
      "text": "Tutorial",
      "imageName": "tutorial-icon.svg",
    },
    {
      "text": "Payment",
      "imageName": "payment-icon.svg",
    },
    {
      "text": "Profile",
      "imageName": "profile-icon.svg",
      "route": "/customerDetail",
    },
  ];
  @override
  Widget build(BuildContext context) {
    if (ModalRoute.of(context)!.settings.arguments != null){
      data = ModalRoute.of(context)!.settings.arguments as Map<dynamic, dynamic>;
    } else {
      data = {
        "fullname": ""
      };
    }
    return Scaffold(
      backgroundColor: Colors.white,
      drawer: CustomerDrawer.builder(data["fullname"], Image.asset("assets/Miku.png"), "Customer"),
      appBar: MainAppBar.builder(data["fullname"], context),
      body: SlidingUpPanel(
        controller: _pc,
        panel: Center(
          child: Wrap(
            spacing: 10,
            children: [
              for (var items in categories)
                GestureDetector(
                  onTap: (){
                    Navigator.pushNamed(context, items["route"]);
                  },
                  child: SizedBox(
                    height: 118,
                    width: 105,
                    child: Card(
                      elevation: 15,
                      child: Container(
                        padding: EdgeInsets.all(15),
                        child: Column(
                          children: [
                            SvgPicture.asset("assets/${items["imageName"]}"),
                            Expanded(
                              flex: 1,
                              child: Center(
                                  child: Text(
                                    "${items["text"]}",
                                    style: TextStyle(
                                        fontSize: 13,
                                        fontWeight: FontWeight.bold,
                                        color: AppColors.PRIMARY_WORD_COLOR
                                    ),
                                  )
                              ),
                            ),
                          ],
                        ),
                      ),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20.0),
                      ),
                    ),
                  ),
                )
            ],
          )
        ),
        minHeight: 0,
        maxHeight: 400,
        body: Padding(
          padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
          child: ListView(
            //mainAxisAlignment: MainAxisAlignment.start,
            //crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(width: double.infinity,),
              SvgPicture.asset("assets/customer-main-panel.svg"),
              SvgPicture.asset("assets/fake-chart.svg"),
              Container(
                margin: EdgeInsets.fromLTRB(0, 30, 0, 10),
                child: Align(
                    alignment: Alignment.topLeft,
                    child: Text("Upcoming Training",
                      style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    )
                ),
              ),
              Card(
                elevation: 5,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15.0),
                ),
                child: Container(
                  padding: EdgeInsets.all(20),
                  child: Row(
                    children: [
                      Expanded(
                        flex: 1,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              padding: EdgeInsets.symmetric(vertical: 5, horizontal: 10),
                              margin: EdgeInsets.only(bottom: 10),
                              child: Text(
                                "16:00 Nov 30, 2021",
                                style: TextStyle(
                                    color: HexColor("#6B48FF"),
                                    fontSize: 13,
                                    fontWeight: FontWeight.w900
                                ),
                              ),
                              decoration: BoxDecoration(
                                  color: HexColor("#F0F3F6"),
                                  borderRadius: BorderRadius.all(Radius.circular(5))
                              ),
                            ),
                            Container(
                                margin: EdgeInsets.only(bottom: 10),
                                child: Text(
                                  "Cardio Training",
                                  style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      color: AppColors.PRIMARY_WORD_COLOR,
                                      fontSize: 20
                                  ),
                                )),
                            Text("Dr. Bang Ngo", style: TextStyle(
                                fontSize: 17,
                                fontWeight: FontWeight.w800,
                                color: HexColor("#B6C5D1")
                            ),)
                          ],
                        ),
                      ),
                      IconButton(
                        iconSize: 48,
                        onPressed: (){},
                        icon: SvgPicture.asset("assets/call-icon.svg"),
                      )
                    ],
                  ),
                ),
              ),
              Container(
                margin: EdgeInsets.fromLTRB(0, 30, 0, 10),
                child: Align(
                    alignment: Alignment.topLeft,
                    child: Text("Top category",
                      style: TextStyle(
                        color: AppColors.PRIMARY_WORD_COLOR,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    )
                ),
              ),
              Wrap(
                spacing: 10,
                children: [
                  GestureDetector(
                    onTap: (){},
                    child: SizedBox(
                      height: 118,
                      width: 105,
                      child: Card(
                        elevation: 15,
                        child: Container(
                          padding: EdgeInsets.all(15),
                          child: Column(
                            children: [
                              SvgPicture.asset("assets/todo-icon.svg"),
                              Expanded(
                                flex: 1,
                                child: Center(
                                    child: Text(
                                      "To do",
                                      style: TextStyle(
                                          fontSize: 13,
                                          fontWeight: FontWeight.bold,
                                          color: AppColors.PRIMARY_WORD_COLOR
                                      ),
                                    )
                                ),
                              ),
                            ],
                          ),
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20.0),
                        ),
                      ),
                    ),
                  ),
                  GestureDetector(
                    onTap: (){
                      Navigator.pushNamed(context, "/chat");
                    },
                    child: SizedBox(
                      height: 118,
                      width: 105,
                      child: Card(
                        elevation: 15,
                        child: Container(
                          padding: EdgeInsets.all(15),
                          child: Column(
                            children: [
                              SvgPicture.asset("assets/message-icon.svg"),
                              Expanded(
                                flex: 1,
                                child: Center(
                                    child: Text(
                                      "Message",
                                      style: TextStyle(
                                          fontSize: 13,
                                          fontWeight: FontWeight.bold,
                                          color: AppColors.PRIMARY_WORD_COLOR
                                      ),
                                    )
                                ),
                              ),
                            ],
                          ),
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20.0),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 118,
                    width: 105,
                    child: Card(
                      elevation: 15,
                      child: Container(
                        padding: EdgeInsets.all(15),
                        child: Column(
                          children: [
                            SvgPicture.asset("assets/campaign-icon.svg"),
                            Expanded(
                              flex: 1,
                              child: Center(
                                  child: Text(
                                    "Campaign",
                                    style: TextStyle(
                                        fontSize: 13,
                                        fontWeight: FontWeight.bold,
                                        color: AppColors.PRIMARY_WORD_COLOR
                                    ),
                                  )
                              ),
                            ),
                          ],
                        ),
                      ),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20.0),
                      ),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 250,),
            ],
          ),
        ),
      ),
      bottomNavigationBar: bottom_navigator(pc: _pc,)
    );
  }

}

class bottom_navigator extends StatefulWidget {
  final PanelController? pc;
  bottom_navigator({this.pc});

  @override
  State<bottom_navigator> createState() => _bottom_navigatorState();
}

class _bottom_navigatorState extends State<bottom_navigator> {
  int selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: this.selectedIndex,
      type: BottomNavigationBarType.fixed,
      showSelectedLabels: false,
      showUnselectedLabels: false,
      selectedIconTheme: IconThemeData(
        color: AppColors.PRIMARY_COLOR,
      ),
      onTap: (int index) {
        setState(() {
          if (index == 2 ){
            if (widget.pc!.isPanelClosed){
              widget.pc?.open();
            } else{
              widget.pc?.close();
            }
          } else {
            if (index == 3){
              Navigator.pushNamed(context, "/chat");
            }
            this.selectedIndex = index;
          }
        });
      },
      iconSize: 30,
      items: [
        BottomNavigationBarItem(
          title: Text('Home'),
          icon: Icon(Icons.home_outlined),
        ),
        BottomNavigationBarItem(
          title: Text('Calendar'),
          icon: Icon(Icons.calendar_today),
        ),
        BottomNavigationBarItem(

          title: Text('Icon'),
          icon: Container(
            width: 50,
            height: 50,
            padding: EdgeInsets.all(15),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: AppColors.PRIMARY_COLOR,
            ),
            child: SvgPicture.asset("assets/9-dots-icon.svg"),
          ),
        ),
        BottomNavigationBarItem(
          title: Text('Favorites'),
          icon: Icon(Icons.mail_outline),
        ),
        BottomNavigationBarItem(
          title: Text('Settings'),
          icon: Icon(Icons.settings_outlined),
        ),
      ],
    );
  }
}
