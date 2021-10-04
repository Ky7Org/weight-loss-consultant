import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';

import 'customer_home_page.dart';

class SettingWidget extends StatelessWidget {
  final IconData icon;
  final String title;

  SettingWidget(this.icon, this.title);

  @override
  Widget build(BuildContext context) {
    return TextButton(
        onPressed: () => null,
        child: Row(children: [
          Icon(icon, color: Color(0xFF0D3F67), size: 24,),
          SizedBox(
            width: 10,
          ),
          Text(
            title,
            style: TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w900,
                color: Color(0xFF0D3F67)),
          )
        ]),
        style: ButtonStyle(
          minimumSize:
              MaterialStateProperty.all<Size>(Size(double.infinity, 69)),
          backgroundColor: MaterialStateProperty.all<Color>(Color(0xFFFFFFFF)),

        ));
  }
}

class SettingScreen extends StatefulWidget {
  const SettingScreen({Key? key}) : super(key: key);

  @override
  _SettingScreenState createState() => _SettingScreenState();
}

class _SettingScreenState extends State<SettingScreen> {
  @override
  Widget build(BuildContext context) {
    PanelController _pc = new PanelController();
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: GenericAppBar.builder('Setting'),
      bottomNavigationBar: bottom_navigator(
        pc: _pc,
      ),
      body: Padding(
        padding: EdgeInsets.symmetric(vertical: 50, horizontal: 10),
        child: Column(
          children: [
            SettingWidget(Icons.settings_outlined, "Account"),
            SettingWidget(Icons.payment_outlined, "Payment Account"),
            SettingWidget(Icons.notifications_none, "Notification"),
            SizedBox(height: 50,),
            SettingWidget(Icons.contact_support_outlined, "Support"),
            SettingWidget(Icons.sticky_note_2_outlined, "Terms & Policies"),
          ],
        ),
      )
    );
  }
}
