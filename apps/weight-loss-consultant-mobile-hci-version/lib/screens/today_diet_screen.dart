import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/custom_dialog.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/diet_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/services/diet_service.dart';


class TodayDietScreen extends StatefulWidget {
  const TodayDietScreen({Key? key}) : super(key: key);

  @override
  _TodayDietScreenState createState() => _TodayDietScreenState();
}

class _TodayDietScreenState extends State<TodayDietScreen> {

  Map<String, List<DietModel>> _todayDiets = {};
  static final DietService _dietService = DietService();

  @override
  void initState() {
    super.initState();
    _todayDiets = _dietService.getTodayDiet(1);
  }

  PreferredSize _buildAppBar(){
    return PreferredSize(
        preferredSize: Size.fromHeight(100),
        child: AppBar(
          title: Text('Today Diet'),
          flexibleSpace: Container(
            decoration: BoxDecoration(
                image: DecorationImage(
                  fit: BoxFit.cover,
                  colorFilter: ColorFilter.mode(Colors.black.withOpacity(0.4), BlendMode.darken),
                  image: const NetworkImage("https://images.unsplash.com/photo-1542866789-bb9c9d086a5d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njl8fGZvb2R8ZW58MHwwfDB8YmxhY2t8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"),
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
        )
    );
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
              /*Row(
                children:const [
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
                  Text(
                    "16 workouts",
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 15
                    )
                  ),
                ],
              ),
              const Divider(thickness: 1,),*/
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
