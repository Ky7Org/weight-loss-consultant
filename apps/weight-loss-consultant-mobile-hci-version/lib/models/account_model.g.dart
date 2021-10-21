// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'account_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AccountModel _$AccountModelFromJson(Map<String, dynamic> json) => AccountModel(
      email: json['email'] as String,
      fullname: json['fullname'] as String,
      level: json['level'] as int? ?? -1,
      workoutNum: json['workoutNum'] as int? ?? 0,
      kcalNum: json['kcalNum'] as int? ?? 0,
      minute: json['minute'] as int? ?? 0,
      isFirstTime: json['isFirstTime'] as bool? ?? true,
      scheduleModel: json['scheduleModel'] == null
          ? null
          : CustomerScheduleModel.fromJson(
              json['scheduleModel'] as Map<String, dynamic>),
      weight: json['weight'] as int? ?? 0,
      height: json['height'] as int? ?? 0,
      startDate: json['startDate'] == null
          ? null
          : DateTime.parse(json['startDate'] as String),
      endDate: json['endDate'] == null
          ? null
          : DateTime.parse(json['endDate'] as String),
      weightGoal: json['weightGoal'] as int? ?? 0,
      weightHistory: (json['weightHistory'] as List<dynamic>?)
              ?.map((e) => (e as Map<String, dynamic>).map(
                    (k, e) => MapEntry(DateTime.parse(k), e as int),
                  ))
              .toList() ??
          const [],
      calHistory: (json['calHistory'] as List<dynamic>?)
              ?.map((e) => (e as Map<String, dynamic>).map(
                    (k, e) => MapEntry(DateTime.parse(k), e as int),
                  ))
              .toList() ??
          const [],
      userTodayDiet: (json['userTodayDiet'] as List<dynamic>?)
              ?.map((e) => DietModel.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const [],
      userTodayExercise: (json['userTodayExercise'] as List<dynamic>?)
              ?.map((e) => ExerciseModel.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const [],
      userHistory: (json['userHistory'] as List<dynamic>?)
              ?.map((e) =>
                  CustomerHistoryModel.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const [],
    )
      ..userCustomDietModelList =
          (json['userCustomDietModelList'] as List<dynamic>)
              .map((e) => DietModel.fromJson(e as Map<String, dynamic>))
              .toList()
      ..userCustomExerciseModelList =
          (json['userCustomExerciseModelList'] as List<dynamic>)
              .map((e) => ExerciseModel.fromJson(e as Map<String, dynamic>))
              .toList()
      ..dailyCalorieGoal = json['dailyCalorieGoal'] as int
      ..userTodayCustomExercise =
          (json['userTodayCustomExercise'] as List<dynamic>)
              .map((e) => ExerciseModel.fromJson(e as Map<String, dynamic>))
              .toList()
      ..userTodayCustomDiet = (json['userTodayCustomDiet'] as List<dynamic>)
          .map((e) => DietModel.fromJson(e as Map<String, dynamic>))
          .toList();

Map<String, dynamic> _$AccountModelToJson(AccountModel instance) =>
    <String, dynamic>{
      'email': instance.email,
      'fullname': instance.fullname,
      'level': instance.level,
      'workoutNum': instance.workoutNum,
      'kcalNum': instance.kcalNum,
      'minute': instance.minute,
      'isFirstTime': instance.isFirstTime,
      'scheduleModel': instance.scheduleModel,
      'height': instance.height,
      'weight': instance.weight,
      'startDate': instance.startDate?.toIso8601String(),
      'endDate': instance.endDate?.toIso8601String(),
      'weightGoal': instance.weightGoal,
      'weightHistory': instance.weightHistory
          .map((e) => e.map((k, e) => MapEntry(k.toIso8601String(), e)))
          .toList(),
      'calHistory': instance.calHistory
          .map((e) => e.map((k, e) => MapEntry(k.toIso8601String(), e)))
          .toList(),
      'userCustomDietModelList': instance.userCustomDietModelList,
      'userCustomExerciseModelList': instance.userCustomExerciseModelList,
      'userTodayDiet': instance.userTodayDiet,
      'userTodayExercise': instance.userTodayExercise,
      'dailyCalorieGoal': instance.dailyCalorieGoal,
      'userTodayCustomExercise': instance.userTodayCustomExercise,
      'userTodayCustomDiet': instance.userTodayCustomDiet,
      'userHistory': instance.userHistory,
    };
