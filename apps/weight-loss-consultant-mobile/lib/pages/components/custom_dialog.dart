import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class CustomDialogBox extends StatefulWidget {
  final String title, descriptions;
  final Image img;

  CustomDialogBox({Key? key,
    required this.title,
    required this.descriptions,
    required this.img}) : super(key: key);

  @override
  _CustomDialogBoxState createState() => _CustomDialogBoxState();
}

class _CustomDialogBoxState extends State<CustomDialogBox> {
  @override
  Widget build(BuildContext context) {
    return Dialog(
      elevation: 0,
      backgroundColor: Colors.transparent,
      child: contentBox(context),
    );
  }
  contentBox(context){
    return Stack(
      children: <Widget>[
        Container(
          decoration: BoxDecoration(
              shape: BoxShape.rectangle,
              color: Colors.white,
              borderRadius: BorderRadius.circular(6),
              boxShadow: [
                BoxShadow(color: Colors.black,offset: Offset(0,5),
                    blurRadius: 8
                ),
              ]
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                height: 100,
                decoration: BoxDecoration(
                    color: Colors.white,
                    image: DecorationImage(
                      image: this.widget.img.image,
                      fit: BoxFit.cover,

                    )
                ),
              ),
              Padding(
                padding: EdgeInsets.all(20),
                child: Column(
                  children: [
                    Text(
                      widget.title,
                      style: TextStyle(fontSize: 22,fontWeight: FontWeight.w600)
                    ),
                    SizedBox(height: 15,),
                    Text(
                      widget.descriptions,
                      style: TextStyle(fontSize: 14),
                      textAlign: TextAlign.center,),
                    SizedBox(height: 22,),
                    Align(
                      alignment: Alignment.bottomRight,
                      child: FlatButton(
                          onPressed: (){
                            Navigator.of(context).pop();
                          },
                          child: Text(
                            "Close",
                            style: TextStyle(fontSize: 18),
                          )
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
