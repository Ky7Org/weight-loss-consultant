import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile/constants/enums.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:weight_loss_consultant_mobile/pages/components/toast.dart';
import 'package:weight_loss_consultant_mobile/routings/route_paths.dart';
import 'package:path/path.dart';
import 'package:firebase_core/firebase_core.dart' as firebase_core;
import 'package:firebase_storage/firebase_storage.dart' as firebase_storage;
import 'package:weight_loss_consultant_mobile/services/customer_service.dart';
import 'package:weight_loss_consultant_mobile/services/trainer_service.dart';

import '../../constants/app_colors.dart';

class CustomerDetailPage extends StatefulWidget {
  const CustomerDetailPage({Key? key}) : super(key: key);

  @override
  _CustomerDetailPageState createState() => _CustomerDetailPageState();
}

class _CustomerDetailPageState extends State<CustomerDetailPage> {
  firebase_storage.FirebaseStorage storage =
      firebase_storage.FirebaseStorage.instance;
  AccountModel user = AccountModel(email: "", fullname: "");
  File? _imageFile;
  final picker = ImagePicker();

  Future<void> initAccount() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? userJSON = prefs.getString('ACCOUNT');
    if (userJSON is String) {
      Map<String, dynamic> userMap = jsonDecode(userJSON);
      user = AccountModel.fromJson(userMap);
    }
  }

  Future<void> saveAccount() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString("ACCOUNT", jsonEncode(user.toJson()));
  }

  Future pickImage() async {
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);
    _imageFile = File(pickedFile!.path);
  }

  Future uploadFile() async {
    String imageName = basename(_imageFile!.path);

    try {
      await firebase_storage.FirebaseStorage.instance
          .ref('uploads/$imageName')
          .putFile(_imageFile!);
      return await firebase_storage.FirebaseStorage.instance
          .ref('uploads/$imageName')
          .getDownloadURL();
    } on firebase_core.FirebaseException {
      // e.g, e.code == 'canceled'
    }
  }

  Widget avatarOfUser() {
    if (user.profileImage != null) {
      return CircleAvatar(
          backgroundImage: NetworkImage(user.profileImage as String));
    }
    return const CircleAvatar(
        backgroundImage: AssetImage("assets/fake-image/miku-avatar.png"));
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_) {
      initAccount();
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder("My profile"),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                  margin: const EdgeInsets.only(bottom: 10),
                  child: SizedBox(
                    height: 115,
                    width: 115,
                    child: Stack(
                      clipBehavior: Clip.none,
                      fit: StackFit.expand,
                      children: [
                        avatarOfUser(),
                        Positioned(
                            bottom: 0,
                            right: -25,
                            child: RawMaterialButton(
                              onPressed: () async {
                                await pickImage();
                                if (_imageFile != null) {
                                  user.profileImage = await uploadFile();
                                  saveAccount();
                                  if (user.role == Role.trainer.value) {
                                    TrainerService trainerService =
                                        TrainerService();
                                    bool result = await trainerService
                                        .updateTrainerProfile(user);
                                    if (result) {
                                      CustomToast.makeToast(
                                          "Save successfully");
                                    } else {
                                      CustomToast.makeToast(
                                          "Some thing went wrong! Try again");
                                    }
                                  } else if (user.role == Role.customer.value) {
                                    CustomerService customerService =
                                        CustomerService();
                                    bool result = await customerService
                                        .updateCustomerProfile(user);
                                    if (result) {
                                      CustomToast.makeToast(
                                          "Save successfully");
                                    } else {
                                      CustomToast.makeToast(
                                          "Some thing went wrong! Try again");
                                    }
                                  }
                                }
                                setState(() {});
                              },
                              elevation: 2.0,
                              fillColor: const Color(0xFFF5F6F9),
                              child: const Icon(
                                Icons.camera_alt_outlined,
                                color: Colors.blue,
                              ),
                              padding: const EdgeInsets.all(10.0),
                              shape: const CircleBorder(),
                            )),
                      ],
                    ),
                  )),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const SizedBox(
                    width: 40,
                  ),
                  Text(
                    user.fullname ?? "",
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.w700,
                      color: AppColors.PRIMARY_WORD_COLOR,
                    ),
                  ),
                  IconButton(
                    onPressed: () {
                      Navigator.pushNamed(context, RoutePath.editProfilePage)
                          .then((value) {
                        setState(() {});
                      });
                    },
                    icon: const Icon(
                      Icons.create_outlined,
                      color: Color(0xffFF3939),
                    ),
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
                      text: user.address,
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
                                    shape: MaterialStateProperty.all<
                                            RoundedRectangleBorder>(
                                        RoundedRectangleBorder(
                                            borderRadius:
                                                BorderRadius.circular(20.0),
                                            side: const BorderSide(color: Colors.red)))),
                                onPressed: () {
                                  Navigator.pushNamed(
                                          context, RoutePath.editProfilePage)
                                      .then((value) {
                                    setState(() {});
                                  });
                                }),
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
                        user.phone ?? "",
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
                        user.email ?? "",
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
                        user.gender == "1" ? "male" : "female",
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
                        DateFormat("MMMM-dd-yyyy")
                            .format(DateTime.fromMillisecondsSinceEpoch(
                                int.parse(user.dob ??
                                    DateTime.now().millisecond.toString())))
                            .toString(),
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
