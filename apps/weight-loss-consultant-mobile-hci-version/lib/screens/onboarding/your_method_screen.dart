import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile_hci_version/components/customer_appbar.dart';
import 'package:weight_loss_consultant_mobile_hci_version/routing/route_path.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/app_color.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/constants.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/app_color.dart';

class YourMethodScreen extends StatefulWidget {
  const YourMethodScreen({Key? key}) : super(key: key);

  @override
  _YourMethodScreenState createState() => _YourMethodScreenState();
}

class _YourMethodScreenState extends State<YourMethodScreen> {
  final _formKey = GlobalKey<FormState>();
  UserMethodChoice? userMethod = null;

  Widget _buildTitleWidget() {
    return const Text(
      "WHICH METHOD BEST SUITED YOU ?",
      textAlign: TextAlign.center,
      style: TextStyle(
          color: Colors.white,
          fontSize: 25,
          fontWeight: FontWeight.bold)
    );
  }

  Widget _buildExerciseCard(){
    return GestureDetector(
      onTap: (){
        setState(() {
          userMethod = UserMethodChoice.exercise;
        });
      },
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(40.0),
          side: BorderSide(color: Colors.white, width: userMethod == UserMethodChoice.exercise ? 3.0 : 0.0),
        ),
        elevation: 0,
        child: Container(
          height: 100,
          width: double.infinity,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(40.0),
              image: const DecorationImage(
                fit: BoxFit.cover,
                image: AssetImage("assets/images/gym.jpeg"),
              )
          ),
          child: const Center(
            child: Text('Exercise',
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

  Widget _buildDietCard(){
    return GestureDetector(
      onTap: (){
        setState(() {
          userMethod = UserMethodChoice.diet;
        });
      },
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(40.0),
          side: BorderSide(color: Colors.white, width: userMethod == UserMethodChoice.diet ? 3.0 : 0.0),
        ),
        elevation: 0,
        child: Container(
          height: 100,
          width: double.infinity,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(40.0),
              image: const DecorationImage(
                fit: BoxFit.fill,
                image: AssetImage("assets/images/food.jpeg"),
              )
          ),
          child: const Center(
            child: Text('Diet',
              style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w800,
                  fontSize: 25
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildBothCard(){
    return GestureDetector(
      onTap: (){
        setState(() {
          userMethod = UserMethodChoice.both;
        });
      },
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(40.0),
          side: BorderSide(color: Colors.white, width: userMethod == UserMethodChoice.both ? 3.0 : 0.0),
        ),
        elevation: 0,
        child: Container(
          height: 100,
          width: double.infinity,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(40.0),
              image: DecorationImage(
                fit: BoxFit.cover,
                colorFilter: userMethod != UserMethodChoice.both ? ColorFilter.mode(Colors.black.withOpacity(1), BlendMode.dstATop) : ColorFilter.mode(Colors.black.withOpacity(1), BlendMode.dstATop),
                image: const AssetImage("assets/images/both-method.jpg"),
              )
          ),
          child: const Center(
            child: Text('Both',
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

  Widget _buildLNextBtn() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 25.0),
      width: double.infinity,
      child: RaisedButton(
        elevation: 5.0,
        onPressed: () async {
          if (_formKey.currentState!.validate()) {
            _formKey.currentState?.save();
            Navigator.pushNamed(context, RoutePath.yourAbilityPage);
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
        appBar: CustomerAppbar.builder("YOUR METHOD"),
        backgroundColor: Colors.transparent,
        body: Container(
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
                    _buildExerciseCard(),
                    const SizedBox(height: 30.0),
                    _buildDietCard(),
                    const SizedBox(height: 30.0),
                    _buildBothCard(),
                    const SizedBox(height: 30.0),
                    _buildLNextBtn(),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
