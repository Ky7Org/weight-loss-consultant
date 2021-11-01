import 'dart:convert';
import 'dart:ffi';
import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:image_picker/image_picker.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:syncfusion_flutter_core/theme.dart';
import 'package:syncfusion_flutter_sliders/sliders.dart';
import 'package:weight_loss_consultant_mobile/constants/app_colors.dart';
import 'package:weight_loss_consultant_mobile/models/account_model.dart';
import 'package:weight_loss_consultant_mobile/models/contract_model.dart';
import 'package:weight_loss_consultant_mobile/models/report_model.dart';
import 'package:weight_loss_consultant_mobile/pages/components/generic_app_bar.dart';
import 'package:firebase_core/firebase_core.dart' as firebase_core;
import 'package:firebase_storage/firebase_storage.dart' as firebase_storage;
import 'package:path/path.dart';
import 'package:weight_loss_consultant_mobile/pages/components/toast.dart';
import 'package:weight_loss_consultant_mobile/services/customer_service.dart';

class CustomerMakeReportPage extends StatefulWidget {
  int? packageId;
  CustomerMakeReportPage({Key? key, this.packageId}) : super(key: key);

  @override
  _CustomerMakeReportPageState createState() => _CustomerMakeReportPageState();
}

class _CustomerMakeReportPageState extends State<CustomerMakeReportPage> {
  final TextEditingController _todayDiet = TextEditingController();
  final TextEditingController _todayExercise = TextEditingController();
  List<File> exerciseImages = [];
  List<File> dietImages = [];
  final picker = ImagePicker();
  int userWeight = 30;

  AccountModel user = AccountModel(email: "", fullname: "");

  Future<void> initAccount() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? userJSON = prefs.getString('ACCOUNT');
    if (userJSON is String){
      Map<String, dynamic> userMap = jsonDecode(userJSON);
      user = AccountModel.fromJson(userMap);
    }
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value){
        setState(() {});
      });
    });
  }

  Future<void> saveAccount() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString("ACCOUNT", jsonEncode(user.toJson()));
  }



  Future pickImage(List<File> imageList) async {
    final pickedFile = await picker.pickImage(source: ImageSource.camera);
    imageList.add(File(pickedFile!.path));
  }


  Future<String?> uploadFile(File image) async {
    String imageName = basename(image.path);
    try {
      await firebase_storage.FirebaseStorage.instance
          .ref('uploads/$imageName')
          .putFile(image);
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
              onChanged: (newValue){
                setState(() {
                  userWeight = (newValue as double).toInt();
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
      onPressed: () async {
        CustomerService customerService = CustomerService();
        ContractModel contract = await customerService.getContractByPackageId(widget.packageId as int, user);
        ReportModel? report = await customerService.customerCreateReport(
          contract.id.toString(), _todayExercise.text, _todayDiet.text, userWeight, user
        );
        if (report == null){
          CustomToast.makeToast("Some thing went wrong! Try again");
          return;
        }
        for (File exerciseImage in exerciseImages){
          String? url = await uploadFile(exerciseImage);
          customerService.createMediaReport(
            report.id as int, url as String, 0, user
          );
        }
        for (File exerciseImage in dietImages){
          String? url = await uploadFile(exerciseImage);
          customerService.createMediaReport(
              report.id as int, url as String, 1, user
          );
        }
        CustomToast.makeToast("Update successfully");

      },
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
              )
            )
          ],
        ),
      ),
    );
  }
}
