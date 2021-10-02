import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/customer_appbar.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/customer_drawer.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/custom_dialog.dart';


class TodayExerciseScreen extends StatefulWidget {
  final List<Map> todayExercise = [
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
    {
      "name": "JUMPING JACKS",
      "unit": "00:30",
      "videoPath": "",
      "thumbnailPath": "",
      "details": "This is bullshit",
    },
  ];


  TodayExerciseScreen({Key? key}) : super(key: key);

  @override
  _TodayExerciseScreenState createState() => _TodayExerciseScreenState();
}

class _TodayExerciseScreenState extends State<TodayExerciseScreen> {

  PreferredSize _buildAppBar(){
    return PreferredSize(
        preferredSize: Size.fromHeight(100),
        child: AppBar(
          title: Text('Today Exercise'),
          flexibleSpace: Container(
            decoration: BoxDecoration(
                image: DecorationImage(
                  fit: BoxFit.cover,
                  colorFilter: new ColorFilter.mode(Colors.black.withOpacity(0.4), BlendMode.darken),
                  image: NetworkImage("https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1738&q=80"),
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

  List<Widget> _buildListExercise(){
    List<Widget> list = List.empty(growable: true);
    for (int i=0; i< widget.todayExercise.length; i++){
      Widget widget = GestureDetector(
        onTap: (){
          showDialog(context: context,
              builder: (BuildContext context){
                return CustomDialogBox(
                  title: this.widget.todayExercise[i]['name'],
                  descriptions: this.widget.todayExercise[i]['details'],
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
                        Text(this.widget.todayExercise[i]["name"],
                            style: TextStyle(
                              fontSize: 17,
                              fontWeight: FontWeight.w900,
                            )
                        ),
                        SizedBox(height: 10,),
                        Text(this.widget.todayExercise[i]["unit"],
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
                children: _buildListExercise(),
              )
            ],
          ),
        ),
      ),
    );
  }
}
