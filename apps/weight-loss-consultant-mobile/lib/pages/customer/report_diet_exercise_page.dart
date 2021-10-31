import 'dart:ffi';
import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:firebase_core/firebase_core.dart' as firebase_core;
import 'package:firebase_storage/firebase_storage.dart' as firebase_storage;
import 'package:path/path.dart';

class ReportDietExercisePage extends StatefulWidget {
  const ReportDietExercisePage({Key? key}) : super(key: key);

  @override
  _ReportDietExercisePageState createState() => _ReportDietExercisePageState();
}

class _ReportDietExercisePageState extends State<ReportDietExercisePage> {
  final TextEditingController _todayDiet = TextEditingController();
  final TextEditingController _todayExercise = TextEditingController();
  File? _imageFile0;
  File? _imageFile1;
  final picker = ImagePicker();

  Future pickImage() async {
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);
    _imageFile0 = File(pickedFile!.path);
  }

  Future pickImage1() async {
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);
    _imageFile1 = File(pickedFile!.path);
  }

  Future uploadFile() async {
    String imageName = basename(_imageFile0!.path);
    try {
      await firebase_storage.FirebaseStorage.instance
          .ref('uploads/$imageName')
          .putFile(_imageFile0!);
      return await firebase_storage.FirebaseStorage.instance
          .ref('uploads/$imageName')
          .getDownloadURL();
    } on firebase_core.FirebaseException {
      // e.g, e.code == 'canceled'
    }
  }

  Widget _pickUpImageCard() {
    if (_imageFile0 != null) {
      return Align(
        alignment: Alignment.topLeft,
        child: Image.file(
          _imageFile0!,
          width: 100,
          height: 100,
        ),
      );
    }
    return Align(
      alignment: Alignment.topLeft,
      child: Card(
          child: IconButton(
        icon: const Icon(Icons.add),
        onPressed: () async {
          await pickImage();
          setState(() {});
        },
      )),
    );
  }

  Widget _pickUpImageCard1() {
    if (_imageFile1 != null) {
      return Align(
        alignment: Alignment.topLeft,
        child: Image.file(
          _imageFile1!,
          width: 100,
          height: 100,
        ),
      );
    }
    return Align(
      alignment: Alignment.topLeft,
      child: Card(
          child: IconButton(
        icon: const Icon(Icons.add),
        onPressed: () async {
          await pickImage1();
          setState(() {});
        },
      )),
    );
  }

  Widget _title(String title) {
    return Align(
      alignment: Alignment.topLeft,
      child: Text(
        title,
        style: const TextStyle(
            color: Color(0xFF0D3F67),
            fontWeight: FontWeight.w700,
            fontSize: 18),
      ),
    );
  }

  Widget _multiInput(
      String label, String hint, TextEditingController controller) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 20),
      margin: const EdgeInsets.symmetric(vertical: 10),
      decoration: BoxDecoration(
          color: AppColors.INPUT_COLOR,
          borderRadius: const BorderRadius.all(Radius.circular(20))),
      child: Column(
        children: [
          TextFormField(
            controller: controller,
            keyboardType: TextInputType.text,
            style: const TextStyle(fontSize: 15),
            maxLines: 3,
            decoration: InputDecoration(
                floatingLabelBehavior: FloatingLabelBehavior.always,
                border: InputBorder.none,
                labelText: label,
                labelStyle: TextStyle(
                    fontSize: 15,
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontWeight: FontWeight.bold),
                hintText: hint,
                hintStyle: const TextStyle(
                    fontSize: 15,
                    color: Color(0xFFB6C5D1),
                    fontWeight: FontWeight.w400)),
          ),
          const Align(
            alignment: Alignment.bottomRight,
            child: Text(
              'Max. 150 characters',
              style: TextStyle(
                  color: Color(0xFFB6C5D1),
                  fontWeight: FontWeight.w400,
                  fontSize: 11),
            ),
          )
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GenericAppBar.builder('Daily Report'),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 30),
        child: Column(
          children: [
            Form(
                child: Column(
              children: [
                _title('Diet Today'),
                _pickUpImageCard(),
                _multiInput(
                    "What did you eat today?", "Egg and Fish...", _todayDiet),
                const SizedBox(
                  height: 15,
                ),
                _title('Exercise Today'),
                _pickUpImageCard1(),
                _multiInput("What did you do today?", "Push up and pull up bar",
                    _todayExercise),
                const SizedBox(
                  height: 30,
                ),
                FlatButton(
                  height: 64,
                  color: AppColors.PRIMARY_COLOR,
                  onPressed: () async {},
                  minWidth: double.infinity,
                  child: const Text(
                    'Save Repost',
                    style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w700,
                        fontSize: 15),
                  ),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(18)),
                )
              ],
            ))
          ],
        ),
      ),
    );
  }
}
