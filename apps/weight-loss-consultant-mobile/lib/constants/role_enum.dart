import 'package:json_annotation/json_annotation.dart';

enum Role{
  @JsonValue("undecided") undecided,
  @JsonValue("customer") customer,
  @JsonValue("trainer") trainer,

}
