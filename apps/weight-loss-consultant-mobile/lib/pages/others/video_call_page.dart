import 'dart:async';
import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:permission_handler/permission_handler.dart';

import 'package:agora_rtc_engine/rtc_engine.dart';
import 'package:agora_rtc_engine/rtc_local_view.dart' as RtcLocalView;
import 'package:agora_rtc_engine/rtc_remote_view.dart' as RtcRemoteView;
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';

const String appId = "c99b02ecc0b940fe90959c6490af4d06";
const String token = "006c99b02ecc0b940fe90959c6490af4d06IAD+r8f9ZdS9mEuqy/RS3T91r/l8YG7kZOHo1o89z20OYsXLnzAAAAAAEAC3nyPhwYKEYQEAAQDBgoRh";

class VideoCallPage extends StatefulWidget {
  String? name;
  VideoCallPage({Key? key, this.name}) : super(key: key);

  @override
  _VideoCallPageState createState() => _VideoCallPageState();
}

class _VideoCallPageState extends State<VideoCallPage> {
  int? _remoteUid;
  late RtcEngine _engine;
  bool muted = false;
  bool volumeOff = false;
  bool cameraOff = false;
  bool _joined = false;

  @override
  void initState() {
    super.initState();
    initAgora();
  }


  @override
  void dispose() {
    // destroy sdk
    _engine.leaveChannel();
    _engine.destroy();
    super.dispose();
  }

  Future<void> initAgora() async {
    await [Permission.camera, Permission.microphone].request();

    // Create RTC client instance
    _engine = await RtcEngine.create(appId);
    // Define event handling logic
    _engine.setEventHandler(RtcEngineEventHandler(
      error: (code){
        print(code);
    },
    joinChannelSuccess: (String channel, int uid, int elapsed) {
      print('joinChannelSuccess ${channel} ${uid}');
      setState(() {
        _joined = true;
      });
    },
    userJoined: (int uid, int elapsed) {
      print('userJoined ${uid}');
      setState(() {
        _remoteUid = uid;
      });
    },
    userOffline: (int uid, UserOfflineReason reason) {
      print('userOffline ${uid}');
      setState(() {
        _remoteUid = 0;
      });
    }));
    // Enable video
    await _engine.joinChannel(token, 'tien', null, 0);
    await _engine.enableVideo();

  }

  Widget _renderLocalPreview(){
    if (_joined) {
      return RtcLocalView.SurfaceView();
    } else {
      return Text(
        'Please join channel first',
        textAlign: TextAlign.center,
      );
    }
  }

  void _onToggleMute() {
    setState(() {
      muted = !muted;
    });
    _engine.muteLocalAudioStream(muted);
  }

  void _onSwitchCamera() {
    _engine.switchCamera();
  }

  void _onCallEnd(BuildContext context) {
    _engine.leaveChannel();
    _engine.destroy();
    Navigator.pop(context);
  }

  void _onVolumeOff(){
    setState(() {
      volumeOff = !volumeOff;
    });
    _engine.disableAudio();
  }

  void _onCameraOff(){
    setState(() {
      cameraOff = !cameraOff;
    });
    _engine.disableVideo();
  }

  Widget _bottomToolBar(){
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        ButtonTheme(
          minWidth: 48.0,
          height: 48.0,
          child: RaisedButton(
            onPressed: _onToggleMute,
            child: Icon(
              muted ? Icons.mic_off : Icons.mic,
              color: muted ? Colors.white : Colors.black,
              size: 30.0,
            ),
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(20)),
            ),
            elevation: 2.0,
            color: muted ? Colors.black : Colors.white,
            padding: const EdgeInsets.all(12.0),
          ),
        ),
        const SizedBox(width: 50),
        RawMaterialButton(
          onPressed: () => _onCallEnd(context),
          child: const Icon(
            Icons.call_end,
            color: Colors.white,
            size: 35.0,
          ),
          shape: const CircleBorder(),
          elevation: 2.0,
          fillColor: Colors.redAccent,
          padding: const EdgeInsets.all(15.0),
        ),
        const SizedBox(width: 50),
        ButtonTheme(
          minWidth: 48.0,
          height: 48.0,
          child: RaisedButton(
            onPressed: _onCameraOff,
            child: Icon(
              cameraOff ? Icons.videocam_off_outlined : Icons.videocam_outlined,
              color: cameraOff ? Colors.white : Colors.black,
              size: 30.0,
            ),
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(20)),
            ),
            elevation: 2.0,
            color: cameraOff ? Colors.black : Colors.white,
            padding: const EdgeInsets.all(12.0),
          ),
        )
      ],
    );
  }

  Widget _topToolBar(){
    return Row(
      children: [
        ButtonTheme(
          minWidth: 48.0,
          height: 48.0,
          child: RaisedButton(
            onPressed: () => _onCallEnd(context),
            child: const Icon(
              Icons.arrow_back_ios_outlined,
              color: Colors.black,
              size: 30.0,
            ),
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(20)),
            ),
            elevation: 2.0,
            color: Colors.white,
            padding: const EdgeInsets.all(12.0),
          ),
        ),
        const Spacer(),
        ButtonTheme(
          minWidth: 48.0,
          height: 48.0,
          child: RaisedButton(
            onPressed: _onSwitchCamera,
            child: const Icon(
              Icons.switch_camera_outlined,
              color: Colors.black,
              size: 30.0,
            ),
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(20)),
            ),
            elevation: 2.0,
            color: Colors.white,
            padding: const EdgeInsets.all(12.0),
          ),
        ),
        const SizedBox(width: 20),
        ButtonTheme(
          minWidth: 48.0,
          height: 48.0,
          child: RaisedButton(
            onPressed: _onVolumeOff,
            child: Icon(
              volumeOff ? Icons.volume_off_outlined : Icons.volume_up_outlined,
              color: volumeOff ? Colors.white : Colors.black,
              size: 30.0,
            ),
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(20)),
            ),
            elevation: 2.0,
            color: volumeOff ? Colors.black : Colors.white,
            padding: const EdgeInsets.all(12.0),
          ),
        ),
      ],
    );
  }

  Widget _callInformation(){
    return Text(
      "",
      style: TextStyle(
        color: HexColor("#0D3F67"),
        fontSize: 24,
        fontWeight: FontWeight.w600
      )
    );
  }

  // Create UI with local view and remote view
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: Colors.black,
        body: Stack(
          children: [
            Center(
              child: _remoteVideo(),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                margin: const EdgeInsets.only(bottom: 20),
                child: _bottomToolBar(),
              ),
            ),
            Align(
              alignment: Alignment.topRight,
              child: Container(
                margin: const EdgeInsets.only(top: 20, right: 20, left: 20),
                child: _topToolBar(),
              ),
            ),
            Positioned(
              top: 100,
              child: Container(
                width: 160,
                height: 220,
                /*decoration: const BoxDecoration(
                  color: Colors.yellow,
                  borderRadius: BorderRadius.all(Radius.circular(20)),
                ),*/
                child: Center(
                  child: _renderLocalPreview(),
                ),
              ),
            ),
            Align(
                alignment: Alignment.bottomCenter,
                child: Container(
                  margin: const EdgeInsets.only(bottom: 100),
                  child: _callInformation()
                )
            ),
          ],
        ),
      ),
    );
  }

  // Display remote user's video
  Widget _remoteVideo() {
    if (_remoteUid != null) {

      return RtcRemoteView.SurfaceView(uid: _remoteUid!, channelId: "abc",);
    } else {
      return Stack(children: <Widget>[
        Container(
          decoration: BoxDecoration(
            color: Colors.transparent,
            image: DecorationImage(
              fit: BoxFit.fill,
              image: Image.asset(
                "assets/panel-image/call-background.png",
                height: MediaQuery.of(context).size.height,
                width: MediaQuery.of(context).size.width,
                fit: BoxFit.cover,
              ).image,
            ),
          ),
          height: MediaQuery.of(context).size.height,
          width: MediaQuery.of(context).size.width,
        ),
        Container(
          height: MediaQuery.of(context).size.height,
          width: MediaQuery.of(context).size.width,
          decoration: BoxDecoration(
            color: Colors.white,
            gradient: LinearGradient(
              begin: FractionalOffset.topCenter,
              end: FractionalOffset.bottomCenter,
              colors: [
                Colors.white.withOpacity(0.0),
                Colors.white,
              ],
              stops: const [
                0.5,
                1.0
              ]
            )
          ),
        )
      ]);
    }
  }
}
