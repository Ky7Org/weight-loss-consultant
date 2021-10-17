import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/enums.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/customer_drawer.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';

import '../../constants/app_colors.dart';

class CustomerDetailPage extends StatefulWidget {
  const CustomerDetailPage({Key? key}) : super(key: key);

  @override
  _CustomerDetailPageState createState() => _CustomerDetailPageState();
}

class _CustomerDetailPageState extends State<CustomerDetailPage> {
  final _formKey = GlobalKey<FormState>();
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


  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount();
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("My profile"),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                margin: const EdgeInsets.only(bottom: 10),
                child: const CircleAvatar(
                  backgroundImage: AssetImage("assets/fake-image/miku-avatar.png"),
                  radius: 50,
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const SizedBox(
                    width: 40,
                  ),
                  Text(
                    user.fullname ?? "",
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.w700,
                      color: AppColors.PRIMARY_WORD_COLOR,
                    ),
                  ),
                  const Icon(
                    Icons.create_outlined,
                    color: Color(0xffFF3939),
                  )
                ],
              ),
              Container(
                margin: const EdgeInsets.only(bottom: 20),
                child: RichText(
                  text: TextSpan(children: [
                    WidgetSpan(
                        child: Icon(
                      Icons.location_on_sharp,
                      color: AppColors.PRIMARY_WORD_COLOR,
                    )),
                    TextSpan(
                      text: user.address,
                      style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w900,
                        color: AppColors.PRIMARY_WORD_COLOR,
                      ),
                    ),
                  ]),
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Column(
                    children: [
                      Icon(
                        Icons.paste_outlined,
                        color: AppColors.PRIMARY_WORD_COLOR,
                        size: 30,
                      ),
                      Text('5',
                          style: TextStyle(
                            fontSize: 20,
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w900,
                          )),
                      const Text('Packages',
                          style: TextStyle(
                            fontSize: 15,
                            color: Color(0xffB6C5D1),
                            fontWeight: FontWeight.w900,
                          ))
                    ],
                  ),
                  Column(
                    children: [
                      Icon(
                        Icons.access_time,
                        color: AppColors.PRIMARY_WORD_COLOR,
                        size: 30,
                      ),
                      Text('300',
                          style: TextStyle(
                            fontSize: 20,
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w900,
                          )),
                      const Text('Hours',
                          style: TextStyle(
                            fontSize: 15,
                            color: Color(0xffB6C5D1),
                            fontWeight: FontWeight.w900,
                          ))
                    ],
                  ),
                  Column(
                    children: [
                      Icon(
                        Icons.payment_outlined,
                        color: AppColors.PRIMARY_WORD_COLOR,
                        size: 30,
                      ),
                      Text('150',
                          style: TextStyle(
                            fontSize: 20,
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontWeight: FontWeight.w900,
                          )),
                      const Text('Spending',
                          style: TextStyle(
                            fontSize: 15,
                            color: Color(0xffB6C5D1),
                            fontWeight: FontWeight.w900,
                          ))
                    ],
                  ),
                ],
              ),
              Container(
                  margin: const EdgeInsets.fromLTRB(10, 30, 10, 0),
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: const BorderRadius.only(
                        topLeft: Radius.circular(10),
                        topRight: Radius.circular(10),
                        bottomLeft: Radius.circular(10),
                        bottomRight: Radius.circular(10)),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.5),
                        spreadRadius: 5,
                        blurRadius: 7,
                        offset:
                            const Offset(0, 3), // changes position of shadow
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: <Widget>[
                          Expanded(
                              flex: 7,
                              child: Text('Personal Info',
                                  style: TextStyle(
                                    fontSize: 20,
                                    color: AppColors.PRIMARY_WORD_COLOR,
                                    fontWeight: FontWeight.w800,
                                  ))),
                          Expanded(
                            flex: 3,
                            child: TextButton(
                                child: Text("Change".toUpperCase(),
                                    style: const TextStyle(
                                        fontSize: 12,
                                        fontWeight: FontWeight.w800,
                                        color: Color(0xffFF3939))),
                                style: ButtonStyle(
                                    padding: MaterialStateProperty.all<EdgeInsets>(
                                        const EdgeInsets.fromLTRB(6, 5, 10, 6)),
                                    foregroundColor:
                                        MaterialStateProperty.all<Color>(
                                            const Color(0xffFF3939)),
                                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                                        RoundedRectangleBorder(
                                            borderRadius:
                                                BorderRadius.circular(20.0),
                                            side: const BorderSide(
                                                color: Colors.red)))),
                                onPressed: () => null),
                          )
                        ],
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Text(
                        'Phone Number',
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontSize: 15,
                            fontWeight: FontWeight.w500),
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      Text(
                        user.phone ?? "",
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontSize: 17,
                            fontWeight: FontWeight.w900),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Text(
                        'Email',
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontSize: 15,
                            fontWeight: FontWeight.w500),
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      Text(
                        user.email ?? "",
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontSize: 17,
                            fontWeight: FontWeight.w900),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Text(
                        'Gender',
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontSize: 15,
                            fontWeight: FontWeight.w500),
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      Text(
                        user.gender == "1" ? "male" : "female",
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontSize: 17,
                            fontWeight: FontWeight.w900),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Text(
                        'Date of Birth',
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontSize: 15,
                            fontWeight: FontWeight.w500),
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      Text(
                        DateFormat("MMMM-dd-yyyy").format(DateTime.fromMicrosecondsSinceEpoch(int.parse(user.dob ?? ""))).toString(),
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontSize: 17,
                            fontWeight: FontWeight.w900),
                      ),
                      const SizedBox(
                        height: 15,
                      ),
                      const Divider(height: 15, thickness: 2),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: <Widget>[
                          Expanded(
                              flex: 7,
                              child: Text('Campain Info',
                                  style: TextStyle(
                                    fontSize: 20,
                                    color: AppColors.PRIMARY_WORD_COLOR,
                                    fontWeight: FontWeight.w800,
                                  ))),
                          Expanded(
                            flex: 3,
                            child: TextButton(
                                child: Text("Change".toUpperCase(),
                                    style: const TextStyle(
                                        fontSize: 12,
                                        fontWeight: FontWeight.w800,
                                        color: Color(0xffFF3939))),
                                style: ButtonStyle(
                                    padding: MaterialStateProperty.all<EdgeInsets>(
                                        const EdgeInsets.fromLTRB(6, 5, 10, 6)),
                                    foregroundColor:
                                        MaterialStateProperty.all<Color>(
                                            const Color(0xffFF3939)),
                                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                                        RoundedRectangleBorder(
                                            borderRadius:
                                                BorderRadius.circular(20.0),
                                            side: const BorderSide(
                                                color: Colors.red)))),
                                onPressed: () => null),
                          )
                        ],
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Text(
                        'Illness',
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontSize: 15,
                            fontWeight: FontWeight.w500),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          OutlinedButton(
                            onPressed: () {
                              return null;
                            },
                            child: const Text(
                              'Migraine',
                              style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.w900,
                                  color: Color(0xffFF3939)),
                            ),
                            style: ButtonStyle(
                                backgroundColor:
                                    MaterialStateProperty.all<Color>(
                                        const Color(0xFFF0F3F6)),
                                shape: MaterialStateProperty.all<
                                        RoundedRectangleBorder>(
                                    RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10.0),
                                ))),
                          ),
                          OutlinedButton(
                            onPressed: () {
                              return null;
                            },
                            child: const Text(
                              'Asthma',
                              style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.w900,
                                  color: Color(0xffFF3939)),
                            ),
                            style: ButtonStyle(
                                backgroundColor:
                                MaterialStateProperty.all<Color>(
                                    const Color(0xFFF0F3F6)),
                                shape: MaterialStateProperty.all<
                                    RoundedRectangleBorder>(
                                    RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(10.0),
                                    ))),
                          ),
                          OutlinedButton(
                            onPressed: () {
                              return null;
                            },
                            child: const Text(
                              'Low Blood Sugar',
                              style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.w900,
                                  color: Color(0xffFF3939)),
                            ),
                            style: ButtonStyle(
                                backgroundColor:
                                MaterialStateProperty.all<Color>(
                                    const Color(0xFFF0F3F6)),
                                shape: MaterialStateProperty.all<
                                    RoundedRectangleBorder>(
                                    RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(10.0),
                                    ))),
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 15,
                      ),
                      Text(
                        'Campaign Record',
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontSize: 15,
                            fontWeight: FontWeight.w500),
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      Text(
                        'My Campaign.pdf',
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontSize: 17,
                            fontWeight: FontWeight.w900),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Text(
                        'Emergency Contact',
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontSize: 15,
                            fontWeight: FontWeight.w500),
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      Text(
                        '+1 453 2872 2873',
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontSize: 17,
                            fontWeight: FontWeight.w900),
                      ),
                      const SizedBox(
                        height: 15,
                      ),
                    ],
                  ))
            ],
          ),
        ),
      ),
    );
  }
}
