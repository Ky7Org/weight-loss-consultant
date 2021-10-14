import 'package:flutter/material.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';

class UpcomingTrainingPage extends StatefulWidget {
  const UpcomingTrainingPage({Key? key}) : super(key: key);

  @override
  _UpcomingTrainingPageState createState() => _UpcomingTrainingPageState();
}

class _UpcomingTrainingPageState extends State<UpcomingTrainingPage> {

  Widget _heading(String heading){
    return Text(
      heading,
      style: TextStyle(
        color: AppColors.PRIMARY_WORD_COLOR,
        fontSize: 18,
        fontWeight: FontWeight.w700
      ),
    );
  }


  Widget _content(String content, String title){
    return Container(
      margin: EdgeInsets.symmetric(vertical: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: TextStyle(
              color: AppColors.PRIMARY_WORD_COLOR,
              fontWeight: FontWeight.w400,
              fontSize: 13
          ),),
          SizedBox(
            height: 5,
          ),
          Text(content, style: TextStyle(
              color: AppColors.PRIMARY_WORD_COLOR,
              fontWeight: FontWeight.w900,
              fontSize: 15
          ),),
        ],
      ),
    );
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("Upcoming Training"),
      body: Container(
        padding: EdgeInsets.symmetric(vertical: 30, horizontal: 20),
        child: Container(
          padding: EdgeInsets.symmetric(vertical: 30, horizontal: 20),
          decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(18),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.2),
                  spreadRadius: 5,
                  blurRadius: 7,
                  offset: const Offset(0, 3),
                )
              ]),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    flex: 2,
                    child: Container(
                      height: 80,
                      width: 80,
                      child: Image.asset(
                          'assets/fake-image/fake-trainer-avatar.jpg'),
                    ),
                  ),
                  SizedBox(
                    width: 15,
                  ),
                  Expanded(
                      flex: 8,
                      child: Container(
                        height: 70,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'Mr.Bang Ngo',
                                  style: TextStyle(
                                    color: Color(0xFF0D3F67),
                                    fontWeight: FontWeight.w700,
                                    fontSize: 16,
                                  ),
                                ),
                                Icon(
                                  Icons.more_horiz,
                                  color: Color(0xFF0D3F67),
                                )
                              ],
                            ),
                            Text(
                              'Boxing | Gym Trainer',
                              style: TextStyle(
                                  color: Color(0xFFB6C5D1),
                                  fontSize: 13,
                                  fontWeight: FontWeight.w900),
                            ),
                            Text(
                              '30 November 2021 17:00',
                              style: TextStyle(
                                  color: Color(0xFF0D3F67),
                                  fontSize: 11,
                                  fontWeight: FontWeight.w400),
                            )
                          ],
                        ),
                      ))
                ],
              ),
              Divider(
                thickness: 1,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    child: Row(
                      children: [Container(
                          width: 42,
                          height: 42,
                          margin: EdgeInsets.only(right: 10),
                          child: Icon(
                            Icons.play_arrow_outlined,
                            color: AppColors.PRIMARY_COLOR,
                            size: 28,
                          ),
                          decoration: BoxDecoration(
                              color: Color(0xFFFDD9D9),
                              borderRadius: BorderRadius.circular(10))), Text(
                        'Video Call',
                        style: TextStyle(
                            color: AppColors.PRIMARY_WORD_COLOR,
                            fontSize: 15,
                            fontWeight: FontWeight.w400),
                      ),],
                    ),
                  ),
                  FlatButton(
                      color: AppColors.PRIMARY_COLOR,
                      onPressed: () {},
                      child: Row(
                        children: [
                          Text(
                            'Start Now',
                            style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 13),
                          ),
                          SizedBox(
                            width: 10,
                          ),
                          Icon(Icons.arrow_forward, color: Colors.white, size: 18,)
                        ],
                      ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(18)
                    ),
                  )
                ],
              ),
              Divider(
                thickness: 1,
              ),
              _heading("Cardio Training"),
              _content("Weight loss consultant", "Training Program"),
              _content("Burn fat", "Description"),
              Divider(
                thickness: 1,
              ),
              _heading("Note"),
              _content("600 Calories", "Target"),
              _content("Eat before train...", "Trainer guide"),
            ],
          ),
        ),
      ),
    );
  }
}
