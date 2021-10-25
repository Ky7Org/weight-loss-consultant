import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/customer_appbar.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/constants.dart';

class YourAbilityScreen extends StatefulWidget {
  const YourAbilityScreen({Key? key}) : super(key: key);

  @override
  _YourAbilityScreenState createState() => _YourAbilityScreenState();
}

class _YourAbilityScreenState extends State<YourAbilityScreen> {

  final _formKey = GlobalKey<FormState>();
  UserAbilityChoice? userAbility;


  Widget _buildTitleWidget() {
    return const Text("HOW MANY PUSH UP CAN YOU DO?",
        textAlign: TextAlign.center,
        style: TextStyle(
            color: Colors.white, fontSize: 25, fontWeight: FontWeight.bold));
  }

  Widget _buildBeginnerCard(){
    return GestureDetector(
      onTap: (){
        setState(() {
          userAbility = UserAbilityChoice.beginner;
        });
      },
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(40.0),
          //side: new BorderSide(color: Colors.orange, width: 3.0),
        ),
        elevation: 0,
        child: Container(
          height: 100,
          width: double.infinity,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(40.0),
            color: userAbility == UserAbilityChoice.beginner ? Colors.amber.shade800 : Colors.white,
          ),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Beginner',
                  style: TextStyle(
                      color: userAbility == UserAbilityChoice.beginner ? Colors.white : Colors.amber.shade800,
                      fontWeight: FontWeight.w900,
                      fontSize: 25
                  ),
                ),
                Text("3-5",
                  style: TextStyle(
                      color: userAbility == UserAbilityChoice.beginner ? Colors.white : Colors.amber.shade800,
                      fontWeight: FontWeight.w700,
                      fontSize: 15
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildIntermediateCard(){
    return GestureDetector(
      onTap: (){
        setState(() {
          userAbility = UserAbilityChoice.intermediate;
        });
      },
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(40.0),
        ),
        elevation: 0,
        child: Container(
          height: 100,
          width: double.infinity,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(40.0),
            color: userAbility == UserAbilityChoice.intermediate ? Colors.amber.shade800 : Colors.white,
          ),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Intermediate',
                  style: TextStyle(
                      color: userAbility == UserAbilityChoice.intermediate ? Colors.white : Colors.amber.shade800,
                      fontWeight: FontWeight.w900,
                      fontSize: 25
                  ),
                ),
                Text("5-10",
                  style: TextStyle(
                      color: userAbility == UserAbilityChoice.intermediate ? Colors.white : Colors.amber.shade800,
                      fontWeight: FontWeight.w700,
                      fontSize: 15
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildAdvancedCard(){
    return GestureDetector(
      onTap: (){
        setState(() {
          userAbility = UserAbilityChoice.advanced;
        });
      },
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(40.0),
        ),
        elevation: 0,
        child: Container(
          height: 100,
          width: double.infinity,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(40.0),
              color: userAbility == UserAbilityChoice.advanced ? Colors.amber.shade800 : Colors.white,
          ),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Advanced',
                  style: TextStyle(
                      color: userAbility == UserAbilityChoice.advanced ? Colors.white : Colors.amber.shade800,
                      fontWeight: FontWeight.w900,
                      fontSize: 25
                  ),
                ),
                Text("At least 10",
                  style: TextStyle(
                      color: userAbility == UserAbilityChoice.advanced ? Colors.white : Colors.amber.shade800,
                      fontWeight: FontWeight.w700,
                      fontSize: 15
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildLNextBtn() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 25.0),
      width: double.infinity,
      child: RaisedButton(
        elevation: 5.0,
        onPressed: () async {
          if (_formKey.currentState!.validate()) {
            _formKey.currentState?.save();
            Navigator.pushNamed(context, RoutePath.yourDailyDietGoalScreen);
          }
        },
        padding: const EdgeInsets.all(15.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(30.0),
        ),
        color: Colors.white,
        child: const Text(
          'NEXT',
          style: TextStyle(
            color: Color(0xFF527DAA),
            letterSpacing: 1.5,
            fontSize: 18.0,
            fontWeight: FontWeight.bold,
            fontFamily: 'OpenSans',
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            Color(0xFF398AE5),
            Color(0xFF478DE0),
            Color(0xFF61A4F1),
            Color(0xFF73AEF5),
          ],
          stops: [0.1, 0.4, 0.7, 0.9],
        ),
      ),
      child: Scaffold(
        appBar: CustomerAppbar.builder("YOUR ABILITY"),
        backgroundColor: Colors.transparent,
        body: SingleChildScrollView(
          child: Container(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                const SizedBox(
                  height: 20,
                ),
                _buildTitleWidget(),
                Form(
                  key: _formKey,
                  child: Column(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const SizedBox(height: 30.0),
                      _buildBeginnerCard(),
                      const SizedBox(height: 30.0),
                      _buildIntermediateCard(),
                      const SizedBox(height: 30.0),
                      _buildAdvancedCard(),
                      const SizedBox(height: 30.0),
                      _buildLNextBtn(),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
