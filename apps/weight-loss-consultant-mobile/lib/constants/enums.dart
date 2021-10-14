import 'package:json_annotation/json_annotation.dart';

enum Role{
  customer,
  trainer,
  admin,
}

extension RoleExtenstion on Role {
  String get value {
    switch (this) {
      case Role.admin:
        return 'admin';
      case Role.customer:
        return 'customer';
      case Role.trainer:
        return 'trainer';
    }
  }

}

enum Gender{
  male,
  female,
}

extension GenderExtension on Gender {
  int get value {
    switch (this) {
      case Gender.female:
        return 2;
      case Gender.male:
        return 1;
    }
  }

}

enum AccountStatus{
  active,
  inactive,
  pending
}

extension AccountStatusExtension on AccountStatus {
  int get value {
    switch (this) {
      case AccountStatus.active:
        return 1;
      case AccountStatus.inactive:
        return 0;
      case AccountStatus.pending:
        return 2;
    }
  }

}
