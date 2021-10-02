import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/customer_appbar.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/customer_drawer.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/custom_dialog.dart';


class TodayDietScreen extends StatefulWidget {
  final Map<String, List<Map>> todayDiet = {
    "Breakfast": [
      {
        "name": "JUMPING JACKS",
        "unit": "00:30",
        "videoPath": "",
        "thumbnailPath": "",
        "details": "This is bullshit",
      },
      {
        "name": "JUMPING JACKS",
        "unit": "00:30",
        "videoPath": "",
        "thumbnailPath": "",
        "details": "This is bullshit",
      },
    ],
    "Lunch": [
      {
        "name": "JUMPING JACKS",
        "unit": "00:30",
        "videoPath": "",
        "thumbnailPath": "",
        "details": "This is bullshit",
      },
      {
        "name": "JUMPING JACKS",
        "unit": "00:30",
        "videoPath": "",
        "thumbnailPath": "",
        "details": "This is bullshit",
      },
    ],
    "Dinner": [
      {
        "name": "JUMPING JACKS",
        "unit": "00:30",
        "videoPath": "",
        "thumbnailPath": "",
        "details": "This is bullshit",
      },
      {
        "name": "JUMPING JACKS",
        "unit": "00:30",
        "videoPath": "",
        "thumbnailPath": "",
        "details": "This is bullshit",
      },
    ],
  };


  TodayDietScreen({Key? key}) : super(key: key);

  @override
  _TodayDietScreenState createState() => _TodayDietScreenState();
}

class _TodayDietScreenState extends State<TodayDietScreen> {

  PreferredSize _buildAppBar(){
    return PreferredSize(
        preferredSize: Size.fromHeight(100),
        child: AppBar(
          title: Text('Today Diet'),
          flexibleSpace: Container(
            decoration: BoxDecoration(
                image: DecorationImage(
                  fit: BoxFit.cover,
                  colorFilter: new ColorFilter.mode(Colors.black.withOpacity(0.4), BlendMode.darken),
                  image: NetworkImage("https://images.unsplash.com/photo-1542866789-bb9c9d086a5d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njl8fGZvb2R8ZW58MHwwfDB8YmxhY2t8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"),
                )
            ),
          ),
          centerTitle: false,
          titleSpacing: 0,
          titleTextStyle: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w600
          ),
          backgroundColor: Colors.transparent,
        )
    );
  }

  List<Widget> _buildListDiet(List<Map>? dietList){
    if (dietList == null){
      return List.empty();
    }
    List<Widget> list = List.empty(growable: true);
    for (int i=0; i< dietList.length; i++){
      Widget widget = GestureDetector(
        onTap: (){
          showDialog(context: context,
              builder: (BuildContext context){
                return CustomDialogBox(
                  title: dietList[i]['name'],
                  descriptions: dietList[i]['name'],
                  img: Image(
                    image: NetworkImage("https://images.unsplash.com/photo-1493690283958-32df2c86326e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8d2VpZ2h0c3xlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"),
                  ),
                );
              }
          );
        },
        child: Container(
            padding: EdgeInsets.symmetric(vertical: 5),
            child: Row(
                children: [
                  Icon(Icons.menu),
                  SizedBox(width: 20,),
                  Image(
                    image: NetworkImage("https://images.unsplash.com/photo-1493690283958-32df2c86326e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8d2VpZ2h0c3xlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"),
                    height: 100,
                    width: 100,
                  ),
                  SizedBox(width: 20,),
                  Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(dietList[i]["name"],
                            style: TextStyle(
                              fontSize: 17,
                              fontWeight: FontWeight.w900,
                            )
                        ),
                        SizedBox(height: 10,),
                        Text(dietList[i]["unit"],
                            style: TextStyle(
                                color: Colors.grey
                            )
                        ),
                      ]
                  )
                ]
            )
        ),
      );
      list.add(widget);
      list.add(Divider(thickness: 1,));
    }
    return list;
  }


  List<Widget> _buildListTodayDiet(){
    List<Widget> periodDiets = List.empty(growable: true);
    for (String period in this.widget.todayDiet.keys){
      Widget periodWidget = Container(
        child: Column(
          children: [
            SizedBox(height: 10,),
            Align(
              alignment: Alignment.topLeft,
              child: Text(period,
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),),
            ),
            ..._buildListDiet(this.widget.todayDiet[period]),
          ],
        ),
      );
      periodDiets.add(periodWidget);
    }
    return periodDiets;
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            children: [
              Row(
                children: [
                  Icon(
                    Icons.label_outline,
                    color: Colors.blueAccent,
                  ),
                  SizedBox(width: 5,),
                  Text(
                      "20 mins",
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 15
                      )
                  ),
                  Icon(
                      Icons.remove
                  ),
                  Text("16 workouts",
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 15
                      )
                  ),
                ],
              ),
              Divider(thickness: 1,),
              Column(
                children: _buildListTodayDiet(),
              )
            ],
          ),
        ),
      ),
    );
  }
}
