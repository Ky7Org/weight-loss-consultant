import 'dart:ffi';
import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:image_picker/image_picker.dart';
import 'package:syncfusion_flutter_core/theme.dart';
import 'package:syncfusion_flutter_sliders/sliders.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:firebase_core/firebase_core.dart' as firebase_core;
import 'package:firebase_storage/firebase_storage.dart' as firebase_storage;
import 'package:path/path.dart';

class CustomerMakeReportPage extends StatefulWidget {
  const CustomerMakeReportPage({Key? key}) : super(key: key);

  @override
  _CustomerMakeReportPageState createState() => _CustomerMakeReportPageState();
}

class _CustomerMakeReportPageState extends State<CustomerMakeReportPage> {
  final TextEditingController _todayDiet = TextEditingController();
  final TextEditingController _todayExercise = TextEditingController();
  File? _imageFile0;
  File? _imageFile1;
  List<File> exerciseImages = [];
  List<File> dietImages = [];
  final picker = ImagePicker();
  double userWeight = 30;


  Future pickImage(List<File> imageList) async {
    final pickedFile = await picker.pickImage(source: ImageSource.camera);
    imageList.add(File(pickedFile!.path));
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
    return Row(
      children: [
        ..._buildListSelectedImage(dietImages),
        Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16.0),
            color: HexColor("#FF3939").withOpacity(0.5),
          ),
          height: 75,
          width: 75,
          child: IconButton(
            icon: const Icon(
              Icons.add,
              size: 50,
              color: Colors.white,
            ),
            onPressed: () async {
              await pickImage(dietImages);
              setState(() {});
            },
          )),
      ],
    );
  }

  List<Widget> _buildListSelectedImage(List<File> imageList){
    List<Widget> listWidget = [];
    for (File file in imageList){
      Widget image = Image.file(
        file,
        width: 100,
        height: 100,
      );
      listWidget.add(image);
    }
    return listWidget;
  }

  Widget _pickUpImageCard1() {
    return Row(
      children: [
        ..._buildListSelectedImage(exerciseImages),
        Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16.0),
            color: HexColor("#FF3939").withOpacity(0.5),
          ),
          height: 75,
          width: 75,
          child: IconButton(
            icon: const Icon(
              Icons.add,
              size: 50,
              color: Colors.white,
            ),
            onPressed: () async {
              await pickImage(exerciseImages);
              setState(() {});
          },
        )),
      ],
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
      margin: const EdgeInsets.symmetric(vertical: 10),
      child: Column(
        children: [
          TextFormField(
            controller: controller,
            keyboardType: TextInputType.text,
            style: const TextStyle(fontSize: 17),
            maxLines: 3,
            decoration: InputDecoration(
                floatingLabelBehavior: FloatingLabelBehavior.always,
                border: InputBorder.none,
                labelText: label,
                labelStyle: TextStyle(
                    fontSize: 17,
                    color: AppColors.PRIMARY_WORD_COLOR,
                    fontWeight: FontWeight.bold),
                hintText: hint,
                hintStyle: const TextStyle(
                    fontSize: 17,
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
                  fontSize: 13),
            ),
          )
        ],
      ),
    );
  }

  Widget _buildDietCard(){
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
      child: Container(
        padding: const EdgeInsets.only(left: 20, right: 20, top: 20, bottom: 10),
        child: Column(
          children: [
            _title('Diet Today'),
            const SizedBox(height: 10,),
            _pickUpImageCard(),
            _multiInput(
                "What did you eat today?", "Egg and Fish...", _todayDiet),
          ],
        ),
      ),
    );
  }

  Widget _buildExerciseCard(){
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: Container(
        padding: const EdgeInsets.only(left: 20, right: 20, top: 20, bottom: 10),
        child: Column(
          children: [
            _title('Exercise Today'),
            const SizedBox(height: 10,),
            _pickUpImageCard1(),
            _multiInput("What did you do today?", "Push up and pull up bar",
                _todayExercise),
          ],
        ),
      ),
    );
  }

  Widget _buildChangeTodayWeight(){
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      child: Column(
        children: [
          Align(
            alignment: Alignment.topLeft,
            child: Text(
              "Your weight: $userWeight kg",
              style: const TextStyle(
                  color: Color(0xFF0D3F67),
                  fontWeight: FontWeight.w700,
                  fontSize: 18),
            ),
          ),
          SfSliderTheme(
            data: SfSliderThemeData(
              tooltipBackgroundColor: Colors.red[300],
              activeTrackColor: HexColor("#FF3939"),
              inactiveTrackColor: HexColor("#FF3939").withOpacity(0.18),
              thumbColor: Colors.red,
              activeLabelStyle: TextStyle(color: HexColor("#0D3F67"), fontSize: 15),
              inactiveLabelStyle: TextStyle(color: HexColor("#0D3F67"), fontSize: 15),
            ),
            child: SfSlider(
              min: 30,
              max: 150,
              stepSize: 1,
              showLabels: true,
              enableTooltip: true,
              value: userWeight,
              onChanged: (dynamic newValue){
                setState(() {
                  userWeight = newValue;
                });
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildReportButton(){
    return FlatButton(
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
                _buildDietCard(),
                const SizedBox(height: 15,),
                _buildExerciseCard(),
                const SizedBox(height: 30,),
                _buildChangeTodayWeight(),
                const SizedBox(height: 30,),
                _buildReportButton(),
              ],
            ))
          ],
        ),
      ),
    );
  }
}
