import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';

class EndingCallPage extends StatefulWidget {
  const EndingCallPage({Key? key}) : super(key: key);

  @override
  _EndingCallPageState createState() => _EndingCallPageState();
}

class _EndingCallPageState extends State<EndingCallPage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _Review = TextEditingController();

  Widget _heading(String heading) {
    return Text(
      heading,
      style: TextStyle(
          color: AppColors.PRIMARY_WORD_COLOR,
          fontSize: 18,
          fontWeight: FontWeight.w700),
    );
  }

  Widget _content(String title, String content) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: TextStyle(
              color: AppColors.PRIMARY_WORD_COLOR,
              fontWeight: FontWeight.w400,
              fontSize: 15),
        ),
        Text(
          content,
          style: TextStyle(
              color: AppColors.PRIMARY_WORD_COLOR,
              fontWeight: FontWeight.w900,
              fontSize: 15),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              Center(
                child: Column(
                  children: [
                    RotatedBox(
                      quarterTurns: 1,
                      child: CircleAvatar(
                        radius: 35,
                        backgroundColor: Color(0xFFEB5757),
                        child: Icon(
                          Icons.phone_disabled_outlined,
                          size: 30,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    Text(
                      'Your call',
                      style: TextStyle(
                          color: AppColors.PRIMARY_WORD_COLOR,
                          fontSize: 30,
                          fontWeight: FontWeight.w700),
                    ),
                    Text(
                      'has ended',
                      style: TextStyle(
                          color: AppColors.PRIMARY_WORD_COLOR,
                          fontSize: 30,
                          fontWeight: FontWeight.w700),
                    )
                  ],
                ),
              ),
              SizedBox(
                height: 20,
              ),
              Container(
                padding: EdgeInsets.all(20),
                decoration: BoxDecoration(
                    color: const Color(0xFFFFFFFF),
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
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        'Mr.Bang Ngo',
                                        style: TextStyle(
                                          color: Color(0xFF0D3F67),
                                          fontWeight: FontWeight.w700,
                                          fontSize: 16,
                                        ),
                                      ),
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
                    SizedBox(
                      height: 10,
                    ),
                    _heading("Summary"),
                    SizedBox(
                      height: 5,
                    ),
                    _content("Status", "Ended"),
                    SizedBox(
                      height: 5,
                    ),
                    _content("Call duration", "20.41"),
                    SizedBox(
                      height: 10,
                    ),
                    Divider(
                      thickness: 1,
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    _heading("Give your review"),
                    SizedBox(
                      height: 5,
                    ),
                    Row(
                      children: [
                        Text(
                          'Rating',
                          style: TextStyle(
                              color: AppColors.PRIMARY_WORD_COLOR,
                              fontSize: 15,
                              fontWeight: FontWeight.w400),
                        ),
                        SizedBox(
                          width: 5,
                        ),
                        RatingBar.builder(
                          unratedColor: Color(0xFFF0F3F6),
                          initialRating: 3.5,
                          minRating: 1,
                          direction: Axis.horizontal,
                          allowHalfRating: true,
                          itemSize: 20.0,
                          itemCount: 5,
                          itemPadding: EdgeInsets.symmetric(horizontal: 4.0),
                          itemBuilder: (context, _) => Icon(
                            Icons.star,
                            color: Color(0xFF1EE0CC),
                          ),
                          onRatingUpdate: (rating) {
                            print(rating);
                          },
                        )
                      ],
                    ),
                    Form(
                        child: Column(
                      children: [
                        Container(
                          padding:
                              EdgeInsets.symmetric(vertical: 5, horizontal: 20),
                          margin:
                              EdgeInsets.only(top: 10),
                          decoration: BoxDecoration(
                              color: AppColors.INPUT_COLOR,
                              borderRadius:
                                  BorderRadius.all(Radius.circular(20))),
                          child: TextFormField(
                            controller: _Review,
                            keyboardType: TextInputType.text,
                            style: TextStyle(fontSize: 15),
                            maxLines: 3,
                            decoration: InputDecoration(
                              floatingLabelBehavior:
                                  FloatingLabelBehavior.always,
                              border: InputBorder.none,
                              labelText: 'Write Review',
                              labelStyle: TextStyle(
                                  fontSize: 15,
                                  color: AppColors.PRIMARY_WORD_COLOR,
                                  fontWeight: FontWeight.bold),
                              hintText: 'So great...',
                              hintStyle: TextStyle(
                                fontSize: 15,
                                color: Color(0xFFB6C5D1),
                                fontWeight: FontWeight.w400
                              )
                            ),
                          ),
                        ),
                      ],
                    ))
                  ],
                ),
              ),
              SizedBox(
                height: 20,
              ),
              ElevatedButton(
                onPressed: () => null,
                child: Text(
                  'Submit Review',
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
      ),
    );
  }
}
