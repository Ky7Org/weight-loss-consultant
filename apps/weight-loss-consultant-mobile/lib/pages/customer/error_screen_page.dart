import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class ErrorPage extends StatefulWidget {
  const ErrorPage({Key? key}) : super(key: key);

  @override
  _ErrorPageState createState() => _ErrorPageState();
}

class _ErrorPageState extends State<ErrorPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Column(
              children: [
                Center(
                  child:
                  SvgPicture.asset("assets/fake-image/Error_Illustration4.svg"),
                ),
                SizedBox(
                  height: 10,
                ),
                Center(
                  child: Text(
                    'Lost Connection',
                    style: TextStyle(
                        color: Color(0xFF0D3F67),
                        fontSize: 39,
                        fontWeight: FontWeight.w700),
                  ),
                ),
                SizedBox(
                  height: 10,
                ),
                Center(
                  child: Text(
                    'It looks like your connection has',
                    style: TextStyle(
                        color: Color(0xFF0D3F67),
                        fontSize: 16,
                        fontWeight: FontWeight.w400),
                  ),
                ),
                Center(
                  child: Text(
                    'interupted. Please check your internet',
                    style: TextStyle(
                        color: Color(0xFF0D3F67),
                        fontSize: 16,
                        fontWeight: FontWeight.w400),
                  ),
                ),
                Center(
                  child: Text(
                    'provider',
                    style: TextStyle(
                        color: Color(0xFF0D3F67),
                        fontSize: 16,
                        fontWeight: FontWeight.w400),
                  ),
                ),
              ],
            ),
            SizedBox(
              height: 100,
            ),
            ElevatedButton(
              onPressed: () => null,
              child: Text(
                'Try Again',
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: FontWeight.w700),
              ),
              style: ButtonStyle(
                  minimumSize: MaterialStateProperty.all<Size>(Size(double.infinity, 64)),
                  backgroundColor: MaterialStateProperty.all<Color>(Color(0xFFFF3939)),
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                          borderRadius: BorderRadius.all(Radius.circular(18))
                      )
                  )
              ),
            )
          ],
        ),
      ),
    );
  }
}
