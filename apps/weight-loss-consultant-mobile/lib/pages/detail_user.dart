import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/pages/components/customer_drawer.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';

import '../constants.dart';

class DetailUser extends StatefulWidget {
  const DetailUser({Key? key}) : super(key: key);

  @override
  _DetailUserState createState() => _DetailUserState();
}

class _DetailUserState extends State<DetailUser> {
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("My profile"),
      drawer: CustomerDrawer.builder(
          "Banhs bao", Image.asset("assets/Miku.png"), "Customer"),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                margin: const EdgeInsets.only(bottom: 10),
                child: const CircleAvatar(
                  backgroundImage: AssetImage("assets/Miku.png"),
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
                    'BanhsBao',
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
                      text: ' SAI GON',
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
                        '+1 456 876 323',
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
                        'youza@gmail.com',
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
                        'Male',
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
                        '23 August 1992',
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
