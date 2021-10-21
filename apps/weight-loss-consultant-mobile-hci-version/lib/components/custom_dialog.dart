import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'dart:io' show Platform;



class CustomDialogBox extends StatefulWidget {
  final String title, descriptions;
  final Image img;
  final String videoPath;

  const CustomDialogBox({Key? key,
    required this.title,
    required this.descriptions,
    required this.img,
    required this.videoPath,
  }) : super(key: key);

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
              boxShadow: const [
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
                      image: widget.img.image,
                      fit: BoxFit.cover,

                    )
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  children: [
                    Text(
                      widget.title,
                      style: const TextStyle(fontSize: 22,fontWeight: FontWeight.w600)
                    ),
                    const SizedBox(height: 15,),
                    Text(
                      widget.descriptions,
                      style: const TextStyle(fontSize: 14),
                      textAlign: TextAlign.center,),
                    const SizedBox(height: 22,),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        FlatButton(
                            onPressed: () async {
                              if (Platform.isIOS) {
                                  String youtubePath = widget.videoPath.replaceAll("https", "youtube");
                                  if (await canLaunch(youtubePath)) {
                                    await launch(youtubePath, forceSafariVC: true);
                                  } else {
                                    if (await canLaunch(widget.videoPath)) {
                                      await launch(widget.videoPath);
                                    } else {
                                      throw 'Could not launch https://www.youtube.com/channel/UCwXdFgeE9KYzlDdR7TG9cMw';
                                    }
                                  }
                              } else {
                                if (await canLaunch(widget.videoPath)) {
                                  await launch(widget.videoPath);
                                } else {
                                  throw 'Could not launch ${widget.videoPath}';
                                }
                              }
                            },
                            child: const Text(
                              "Watch video",
                              style: TextStyle(fontSize: 18),
                            )
                        ),
                        FlatButton(
                          onPressed: (){
                            Navigator.of(context).pop();
                          },
                          child: const Text(
                            "Close",
                            style: TextStyle(fontSize: 18),
                          )
                      ),

                    ]
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
