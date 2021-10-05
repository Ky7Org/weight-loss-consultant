import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/constants/customer_bottom_navigator_index.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';

class CustomerBottomNavigator extends StatefulWidget {
  final PanelController pc;
  late CustomerBottomNavigatorIndex selectedIndex;

  CustomerBottomNavigator({required this.pc, required this.selectedIndex});

  @override
  State<CustomerBottomNavigator> createState() =>
      _CustomerBottomNavigatorState();
}

class _CustomerBottomNavigatorState extends State<CustomerBottomNavigator> {
  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: widget.selectedIndex.index,
      type: BottomNavigationBarType.fixed,
      showSelectedLabels: false,
      showUnselectedLabels: false,
      selectedIconTheme: IconThemeData(
        color: AppColors.PRIMARY_COLOR,
      ),
      onTap: (int index) {
        switch (index) {
          case 2:
            if (widget.pc.isPanelClosed) {
              widget.pc.open();
            } else {
              widget.pc.close();
            }
            break;
          case 3:
            Navigator.pushNamed(context, RoutePath.myMessagePage);
            break;
          case 4:
            Navigator.pushNamed(context, RoutePath.settingPage);
            break;
        }
        widget.selectedIndex = CustomerBottomNavigatorIndex.values[index];
      },
      iconSize: 30,
      items: [
        BottomNavigationBarItem(
          title: Text('Home'),
          icon: Icon(Icons.home_outlined),
        ),
        BottomNavigationBarItem(
          title: Text('Calendar'),
          icon: Icon(Icons.calendar_today),
        ),
        BottomNavigationBarItem(
          title: Text('Icon'),
          icon: Container(
            width: 50,
            height: 50,
            padding: EdgeInsets.all(15),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: AppColors.PRIMARY_COLOR,
            ),
            child: SvgPicture.asset("assets/logo/9-dots-icon.svg"),
          ),
        ),
        BottomNavigationBarItem(
          title: Text('Favorites'),
          icon: Icon(Icons.mail_outline),
        ),
        BottomNavigationBarItem(
          title: Text('Settings'),
          icon: Icon(Icons.settings_outlined),
        ),
      ],
    );
  }
}
