import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/customer_appbar.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/customer_drawer.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/custom_dialog.dart';

class CustomerMainScreen extends StatefulWidget {
  const CustomerMainScreen({Key? key}) : super(key: key);

  @override
  _CustomerMainScreenState createState() => _CustomerMainScreenState();
}

class _CustomerMainScreenState extends State<CustomerMainScreen> {



  Widget _buildWorkoutInformationRow(){
    TextStyle numStyle = TextStyle(
        color: Colors.white,
        fontWeight: FontWeight.w600,
        fontSize: 24
    );
    TextStyle typeStyle = TextStyle(
        color: Colors.white,
        fontWeight: FontWeight.w400,
        fontSize: 15
    );
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        Column(
          children: [
            Text("0", style: numStyle),
            Text("WORKOUT", style: typeStyle),
          ],
        ),
        Column(
          children: [
            Text("0", style: numStyle,),
            Text("KCAL", style: typeStyle),
          ],
        ),
        Column(
          children: [
            Text("0", style: numStyle),
            Text("MINUTE", style: typeStyle),
          ],
        ),
      ],
    );
  }

  Widget _buildTodayExerciseCard(){
    return GestureDetector(
      onTap: (){
        Navigator.pushNamed(context, RoutePath.todayExerciseScreen);
      },
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0),
        ),
        elevation: 10,
        child: Container(
          height: 150,
          width: double.infinity,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10.0),
              image: DecorationImage(
                fit: BoxFit.cover,
                colorFilter: new ColorFilter.mode(Colors.black.withOpacity(1), BlendMode.dstATop),
                image: NetworkImage("https://images.unsplash.com/photo-1615911217285-a44fb0b6e324?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80"),
              )
          ),
          child: Center(
            child: Text('Today Exercise',
              style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w900,
                  fontSize: 25
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTodayDietCard(){
    return GestureDetector(
      onTap: (){
        Navigator.pushNamed(context, RoutePath.todayDietScreen);
      },
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0),
        ),
        elevation: 10,
        child: Container(
          height: 150,
          width: double.infinity,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10.0),
              image: DecorationImage(
                fit: BoxFit.cover,
                colorFilter: new ColorFilter.mode(Colors.black.withOpacity(1), BlendMode.dstATop),
                image: NetworkImage("https://images.unsplash.com/photo-1542866789-bb9c9d086a5d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njl8fGZvb2R8ZW58MHwwfDB8YmxhY2t8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"),
              )
          ),
          child: Center(
            child: Text('Today Diet',
              style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w900,
                  fontSize: 25
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildYourReportCard(){
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      elevation: 10,
      child: Container(
        height: 150,
        width: double.infinity,
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10.0),
            image: DecorationImage(
              fit: BoxFit.cover,
              colorFilter: new ColorFilter.mode(Colors.black.withOpacity(1), BlendMode.dstATop),
              image: NetworkImage("https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1780&q=80"),
            )
        ),
        child: Center(
          child: Text('Your report',
            style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w900,
                fontSize: 25
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomCenter,
              colors: [Colors.blueAccent, Colors.white])),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        drawer: CustomerDrawer.builder(context, "BanhsBao", Image.asset("assets/images/miku.png")),
        appBar: CustomerAppbar.builder("HOME PAGE"),
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SizedBox(width: double.infinity,),
                _buildWorkoutInformationRow(),
                SizedBox(height: 20,),
                _buildTodayExerciseCard(),
                SizedBox(height: 20,),
                _buildTodayDietCard(),
                SizedBox(height: 20,),
                _buildYourReportCard(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
