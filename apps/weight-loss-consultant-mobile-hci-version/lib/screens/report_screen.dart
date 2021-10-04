import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import "package:charcode/html_entity.dart";


class ReportScreen extends StatefulWidget {
  const ReportScreen({Key? key}) : super(key: key);

  @override
  _ReportScreenState createState() => _ReportScreenState();
}

class _ReportScreenState extends State<ReportScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SingleChildScrollView(
          child: GestureDetector(
            onTap: () => FocusScope.of(context).unfocus(),
            child: Stack(
              children: <Widget>[
                Container(
                  padding: const EdgeInsets.symmetric(vertical: 60),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          Column(
                            children: const <Widget>[
                              Text(
                                '0',
                                style: TextStyle(
                                    color: Color(0xFF0648F6),
                                    fontSize: 25,
                                    fontWeight: FontWeight.bold),
                              ),
                              SizedBox(
                                height: 5,
                              ),
                              Text(
                                'WORKOUT',
                                style: TextStyle(
                                    color: Color(0xFFB6B6B6),
                                    fontWeight: FontWeight.w600),
                              )
                            ],
                          ),
                          Column(
                            children: const <Widget>[
                              Text(
                                '0',
                                style: TextStyle(
                                    color: Color(0xFF0648F6),
                                    fontSize: 25,
                                    fontWeight: FontWeight.bold),
                              ),
                              SizedBox(
                                height: 5,
                              ),
                              Text(
                                'KCAL',
                                style: TextStyle(
                                    color: Color(0xFFB6B6B6),
                                    fontWeight: FontWeight.w600),
                              )
                            ],
                          ),
                          Column(
                            children: const <Widget>[
                              Text(
                                '0',
                                style: TextStyle(
                                    color: Color(0xFF0648F6),
                                    fontSize: 25,
                                    fontWeight: FontWeight.bold),
                              ),
                              SizedBox(
                                height: 5,
                              ),
                              Text(
                                'MINUTE',
                                style: TextStyle(
                                    color: Color(0xFFB6B6B6),
                                    fontWeight: FontWeight.w600),
                              )
                            ],
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      const Divider(
                        thickness: 1,
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(20, 10, 10, 20),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: const [
                            Text(
                              'History',
                              style: TextStyle(
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                                fontSize: 18,
                              ),
                            ),
                            Text(
                              'MORE',
                              style: TextStyle(
                                color: Color(0xFF2D5BC7),
                                fontSize: 18,
                              ),
                            )
                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(10, 10, 10, 10),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Column(
                              children: [
                                const Text(
                                  'S',
                                  style: TextStyle(
                                      color: Color(0xFFDEDCDF),
                                      fontSize: 18,
                                      fontWeight: FontWeight.w500),
                                ),
                                Transform.scale(
                                  scale: 1.5,
                                  child: Checkbox(
                                    value: true,
                                    onChanged: (bool? value) {
                                      return null;
                                    },
                                    activeColor: Color(0xFFDEDCDF),
                                    shape: CircleBorder(),
                                  ),
                                ),
                                Text('26')
                              ],
                            ),
                            Column(
                              children: [
                                const Text(
                                  'M',
                                  style: TextStyle(
                                      color: Color(0xFFDEDCDF),
                                      fontSize: 18,
                                      fontWeight: FontWeight.w500),
                                ),
                                Transform.scale(
                                  scale: 1.5,
                                  child: Checkbox(
                                    value: true,
                                    onChanged: (bool? value) {
                                      return null;
                                    },
                                    activeColor: Color(0xFFDEDCDF),
                                    shape: CircleBorder(),
                                  ),
                                ),
                                Text('27')
                              ],
                            ),
                            Column(
                              children: [
                                const Text(
                                  'T',
                                  style: TextStyle(
                                      color: Color(0xFFDEDCDF),
                                      fontSize: 18,
                                      fontWeight: FontWeight.w500),
                                ),
                                Transform.scale(
                                  scale: 1.5,
                                  child: Checkbox(
                                    value: true,
                                    onChanged: (bool? value) {
                                      return null;
                                    },
                                    activeColor: Color(0xFFDEDCDF),
                                    shape: CircleBorder(),
                                  ),
                                ),
                                Text('28')
                              ],
                            ),
                            Column(
                              children: [
                                const Text(
                                  'W',
                                  style: TextStyle(
                                      color: Color(0xFFDEDCDF),
                                      fontSize: 18,
                                      fontWeight: FontWeight.w500),
                                ),
                                Transform.scale(
                                  scale: 1.5,
                                  child: Checkbox(
                                    value: true,
                                    onChanged: (bool? value) {
                                      return null;
                                    },
                                    activeColor: Color(0xFFDEDCDF),
                                    shape: CircleBorder(),
                                  ),
                                ),
                                Text('29')
                              ],
                            ),
                            Column(
                              children: [
                                const Text(
                                  'T',
                                  style: TextStyle(
                                      color: Color(0xFFDEDCDF),
                                      fontSize: 18,
                                      fontWeight: FontWeight.w500),
                                ),
                                Transform.scale(
                                  scale: 1.5,
                                  child: Checkbox(
                                    value: true,
                                    onChanged: (bool? value) {
                                      return null;
                                    },
                                    activeColor: Color(0xFFDEDCDF),
                                    shape: CircleBorder(),
                                  ),
                                ),
                                Text('30')
                              ],
                            ),
                            Column(
                              children: [
                                const Text(
                                  'F',
                                  style: TextStyle(
                                      color: Color(0xFFDEDCDF),
                                      fontSize: 18,
                                      fontWeight: FontWeight.w500),
                                ),
                                Transform.scale(
                                  scale: 1.5,
                                  child: Checkbox(
                                    value: true,
                                    onChanged: (bool? value) {
                                      return null;
                                    },
                                    activeColor: Color(0xFFDEDCDF),
                                    shape: CircleBorder(),
                                  ),
                                ),
                                Text('1')
                              ],
                            ),
                            Column(
                              children: [
                                const Text(
                                  'S',
                                  style: TextStyle(
                                      color: Color(0xFFDEDCDF),
                                      fontSize: 18,
                                      fontWeight: FontWeight.w500),
                                ),
                                Transform.scale(
                                  scale: 1.5,
                                  child: Checkbox(
                                    value: true,
                                    onChanged: (bool? value) {
                                      return null;
                                    },
                                    activeColor: Color(0xFFDEDCDF),
                                    shape: CircleBorder(),
                                  ),
                                ),
                                Text('2')
                              ],
                            ),
                          ],
                        ),
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'RECORDS',
                            style: TextStyle(
                              color: Color(0xFF2D5BC7),
                              fontSize: 18,
                            ),
                          )
                        ],
                      ),
                      SizedBox(
                        height: 15,
                      ),
                      Divider(
                        thickness: 10,
                        color: Color(0xFFF3F3F3),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(vertical: 20, horizontal: 20),
                        child: Column(
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'Weight',
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 18,
                                  ),
                                ),
                                Icon(Icons.add, color: Color(0xFF0246FA), size: 25),
                              ],
                            ),
                            SizedBox(
                              height: 20,
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                Text(
                                  'lbs',
                                  style: TextStyle(
                                      color: Colors.black,
                                      fontWeight: FontWeight.bold),
                                )
                              ],
                            ),
                          ],
                        ),
                      ),
                      Text(
                        'October',
                        style: TextStyle(color: Color(0xFF9EA2A6)),
                      ),
                      Padding(
                        padding: EdgeInsets.all(10),
                        child: Row(
                          children: [
                            Expanded(
                              flex: 1,
                              child: Text(
                                '500',
                                style: TextStyle(color: Color(0xFFA1A3A6)),
                              ),
                            ),
                            Expanded(
                                flex: 9,
                                child: Divider(
                                  thickness: 1,
                                )),
                          ],
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.all(10),
                        child: Row(
                          children: [
                            Expanded(
                              flex: 1,
                              child: Text(
                                '  ',
                                style: TextStyle(color: Color(0xFFA1A3A6)),
                              ),
                            ),
                            Expanded(
                                flex: 9,
                                child: Divider(
                                  thickness: 1,
                                )),
                          ],
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.all(10),
                        child: Row(
                          children: [
                            Expanded(
                              flex: 1,
                              child: Text(
                                '300',
                                style: TextStyle(color: Color(0xFFA1A3A6)),
                              ),
                            ),
                            Expanded(
                                flex: 9,
                                child: Divider(
                                  thickness: 1,
                                )),
                          ],
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.all(10),
                        child: Row(
                          children: [
                            Expanded(
                              flex: 1,
                              child: Text(
                                '  ',
                                style: TextStyle(color: Color(0xFFA1A3A6)),
                              ),
                            ),
                            Expanded(
                                flex: 9,
                                child: Divider(
                                  thickness: 1,
                                )),
                          ],
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.fromLTRB(10, 10, 10, 0),
                        child: Row(
                          children: [
                            Expanded(
                              flex: 1,
                              child: Text(
                                '100',
                                style: TextStyle(color: Color(0xFFA1A3A6)),
                              ),
                            ),
                            Expanded(
                                flex: 9,
                                child: Divider(
                                  thickness: 1,
                                )),
                          ],
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.fromLTRB(25, 1, 20, 1),
                        child: Row(
                          children: [
                            Expanded(
                              flex: 1,
                              child: Text(
                                '  ',
                                style: TextStyle(color: Color(0xFFA1A3A6)),
                              ),
                            ),
                            Expanded(
                                flex: 9,
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(
                                      '05',
                                      style: TextStyle(color: Color(0xFFA1A3A6)),
                                    ),
                                    Text(
                                      '06',
                                      style: TextStyle(color: Color(0xFFA1A3A6)),
                                    ),
                                    Text(
                                      '07',
                                      style: TextStyle(color: Color(0xFFA1A3A6)),
                                    ),
                                    Text(
                                      '08',
                                      style: TextStyle(color: Color(0xFFA1A3A6)),
                                    ),
                                    Text(
                                      '09',
                                      style: TextStyle(color: Color(0xFFA1A3A6)),
                                    ),
                                    Text(
                                      '10',
                                      style: TextStyle(color: Color(0xFFA1A3A6)),
                                    ),
                                    Text(
                                      '11',
                                      style: TextStyle(color: Color(0xFFA1A3A6)),
                                    ),
                                    Text(
                                      '12',
                                      style: TextStyle(color: Color(0xFFA1A3A6)),
                                    ),
                                  ],
                                )),
                          ],
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.fromLTRB(20, 10, 20, 20),
                        child: Row(
                          children: [
                            Icon(
                              Icons.stop_rounded,
                              color: Color(0xFF2D5BC7),
                            ),
                            Text('  Weight',
                                style: TextStyle(color: Color(0xFF9B9B9B)))
                          ],
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.fromLTRB(20, 0, 20, 15),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Current',
                                style: TextStyle(color: Color(0xFF9B9B9B))),
                            Text('0.00 lbs',
                                style: TextStyle(color: Color(0xFF9B9B9B)))
                          ],
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.fromLTRB(20, 0, 20, 15),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Heaviest',
                                style: TextStyle(color: Color(0xFF9B9B9B))),
                            Text('0.00 lbs',
                                style: TextStyle(color: Color(0xFF9B9B9B)))
                          ],
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.fromLTRB(20, 0, 20, 20),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Lightest',
                                style: TextStyle(color: Color(0xFF9B9B9B))),
                            Text('0.00 lbs',
                                style: TextStyle(color: Color(0xFF9B9B9B)))
                          ],
                        ),
                      ),
                      Divider(
                        thickness: 10,
                        color: Color(0xFFF3F3F3),
                      ),
                      Padding(padding: EdgeInsets.symmetric(vertical: 10, horizontal:20),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('BMI(kg/m2)', style: TextStyle(
                              fontWeight: FontWeight.bold,
                            ),),
                            Text(
                              'EDIT',
                              style: TextStyle(
                                color: Color(0xFF2D5BC7),
                              ),
                            )
                          ],
                        ),),
                      Divider(
                        thickness: 1,
                      ),
                      Padding(padding: EdgeInsets.symmetric(vertical: 10, horizontal:20),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Height', style: TextStyle(
                              fontWeight: FontWeight.bold,
                            ),),
                            Text(
                              'EDIT',
                              style: TextStyle(
                                color: Color(0xFF2D5BC7),
                              ),
                            )
                          ],
                        ),)
                    ],
                  ),
                )
              ],
            ),
          ),
        ));
  }
}
