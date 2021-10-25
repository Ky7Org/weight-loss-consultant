import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:path_provider/path_provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/account_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/models/exercise_model.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/app_color.dart';
import 'package:weight_loss_consultant_mobile_hci_version/utilities/constants.dart';
import 'package:path/path.dart';

class CustomerAddCustomActivityScreen extends StatefulWidget {
  const CustomerAddCustomActivityScreen({Key? key}) : super(key: key);

  @override
  _CustomerAddCustomActivityScreenState createState() => _CustomerAddCustomActivityScreenState();
}

class _CustomerAddCustomActivityScreenState extends State<CustomerAddCustomActivityScreen> {

  final _formKey = GlobalKey<FormState>();
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _kcalController = TextEditingController();
  String dropdownValue = 'Abs';
  ImagePicker picker = ImagePicker();
  var _image;



  AccountModel user = AccountModel(email: "", fullname: "");


  Future<void> initAccount() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? userJSON = prefs.getString('ACCOUNT');
    if (userJSON is String){
      Map<String, dynamic> userMap = jsonDecode(userJSON);
      user = AccountModel.fromJson(userMap);
    }
  }

  Future<void> saveAccount() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString("ACCOUNT", jsonEncode(user.toJson()));
  }

  Future getImage(String method) async {
    var source = method == "camera"
        ? ImageSource.camera
        : ImageSource.gallery;
    XFile? image  = await picker.pickImage(source: source);
    setState(() {
      _image = File(image!.path);
    });
  }


  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_){
      initAccount().then((value) {
        setState(() {});
      });
    });
  }

  PreferredSize _buildAppBar(){
    return PreferredSize(
        preferredSize: const Size.fromHeight(70),
        child: AppBar(
          title: const Text('Add custom activity'),
          flexibleSpace: Container(
            decoration: BoxDecoration(
                image: DecorationImage(
                  fit: BoxFit.cover,
                  colorFilter: ColorFilter.mode(Colors.black.withOpacity(0.4), BlendMode.darken),
                  image: const AssetImage("assets/images/push-up.jpeg"),
                )
            ),
          ),
          centerTitle: false,
          titleSpacing: 0,
          titleTextStyle: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w600,
          ),
          backgroundColor: Colors.transparent,
        )
    );
  }

  Widget _buildTitleWidget() {
    return const Text("ADD NEW ACTIVITY",
        textAlign: TextAlign.center,
        style: TextStyle(
            fontSize: 25,
            fontWeight: FontWeight.w800,
            color: Color(0xFF527DAA),
        ));
  }

  Widget _buildImagePlaceHolder(){
    print(_image != null );
    return Column(
      children: [
        Container(
          width: 150,
          height: 150,
          decoration: const BoxDecoration(
            color: Colors.grey
          ),
          child: _image != null ?
            Image.file(_image,
              width: 150.0,
              height: 150.0,
              fit: BoxFit.fitHeight,
            )
            : Container(
                decoration: const BoxDecoration(
                color: Colors.grey),
                width: 150,
                height: 150,
                child: Icon(
                  Icons.camera_alt,
                  color: Colors.grey[800],
                ),
              ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            IconButton(
                onPressed: (){ getImage("camera");},
                icon: const Icon(Icons.camera_alt_outlined),),
            IconButton(
              onPressed: (){ getImage("gallery"); },
              icon: const Icon(Icons.folder_open_outlined),),
          ],
        )
      ],
    );
  }

  Widget _buildNameTF() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        const Text(
          'Activity name',
          style: TextStyle(
            color: Color(0xFF527DAA),
            fontSize: 16.0,
            fontWeight: FontWeight.bold,
            fontFamily: 'OpenSans',
          ),
        ),
        const SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(15.0),
            boxShadow: const [
              BoxShadow(
                color: Colors.black12,
                blurRadius: 6.0,
                offset: Offset(0, 2),
              ),
            ],
          ),
          height: 60.0,
          child: TextFormField(
            controller: _nameController,
            style: TextStyle(
              color: AppColor.appPrimaryColor,
              fontFamily: 'OpenSans',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 11),
              hintText: 'Enter activity',
              hintStyle: TextStyle(
                color: AppColor.appPrimaryColor,
                fontFamily: 'OpenSans',
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildKcalTF() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        const Text(
          'Activity kcal',
          style: TextStyle(
            color: Color(0xFF527DAA),
            fontSize: 16.0,
            fontWeight: FontWeight.bold,
            fontFamily: 'OpenSans',
          ),
        ),
        const SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(15.0),
            boxShadow: const [
              BoxShadow(
                color: Colors.black12,
                blurRadius: 6.0,
                offset: Offset(0, 2),
              ),
            ],
          ),
          height: 60.0,
          child: TextFormField(
            controller: _kcalController,
            keyboardType: TextInputType.number,
            style: TextStyle(
              color: AppColor.appPrimaryColor,
              fontFamily: 'OpenSans',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 11),
              hintText: 'Enter your activity kcal',
              hintStyle: TextStyle(
                color: AppColor.appPrimaryColor,
                fontFamily: 'OpenSans',
              ),
            ),
            validator: (weight) {
              return null;
            },
          ),
        ),
      ],
    );
  }

  Widget _buildCategory(){
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Category',
          style: TextStyle(
            color: Color(0xFF527DAA),
            fontSize: 16.0,
            fontWeight: FontWeight.bold,
            fontFamily: 'OpenSans',
          ),
        ),
        DropdownButton<String>(
          value: dropdownValue,
          icon: const Icon(Icons.arrow_drop_down_sharp),
          iconSize: 24,
          elevation: 16,
          isExpanded: true,
          style: const TextStyle(color: Color(0xFF527DAA),),
          underline: Container(
            height: 2,
            color: Color(0xFF527DAA),
          ),
          onChanged: (String? newValue) {
            setState(() {
              dropdownValue = newValue!;
            });
          },
          items: <String>['Abs', 'Chest', 'Arm', 'Leg', "Shoulder & Back", "Other"]
              .map<DropdownMenuItem<String>>((String value) {
            return DropdownMenuItem<String>(
              value: value,
              child: Text(value),
            );
          }).toList(),
        ),
      ],
    );
  }

  Future<String> saveImage() async {
    if (_image == null) return "assets/exercise/pushUps.jpg";
    final String path = (await getApplicationDocumentsDirectory()).path;
    var fileName = basename(_image.path);
    final File localImage = await _image.copy('$path/$fileName');
    return '$path/$fileName';
  }

  Widget _buildAddBtn() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 25.0),
      width: double.infinity,
      child: RaisedButton(
        elevation: 5.0,
        onPressed: () async {
          if (_formKey.currentState!.validate()) {
            _formKey.currentState?.save();
            String path = await saveImage();
            ExerciseModel model = ExerciseModel(
              _nameController.text.toUpperCase(),
              _kcalController.text + " kcal",
              "",
              path,
              "Your custom activity",
              int.parse(_kcalController.text),
            );
            user.userCustomExerciseModelList.insert(0, model);
            saveAccount();
            Navigator.pop(this.context);
          }
        },
        padding: const EdgeInsets.all(15.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(30.0),
        ),
        color: Colors.white,
        child: const Text(
          'ADD',
          style: TextStyle(
            color: Color(0xFF527DAA),
            letterSpacing: 1.5,
            fontSize: 18.0,
            fontWeight: FontWeight.bold,
            fontFamily: 'OpenSans',
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.blueGrey.shade50,
      child: Scaffold(
        appBar: _buildAppBar(),
        backgroundColor: Colors.transparent,
        body: SingleChildScrollView(
          child: Container(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                const SizedBox(
                  height: 20,
                ),
                _buildTitleWidget(),
                Form(
                  key: _formKey,
                  child: Column(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const SizedBox(
                        height: 10.0,
                      ),
                      _buildImagePlaceHolder(),
                      _buildNameTF(),
                      const SizedBox(
                        height: 30.0,
                      ),
                      _buildKcalTF(),
                      const SizedBox(
                        height: 30.0,
                      ),
                      _buildCategory(),
                      _buildAddBtn(),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
