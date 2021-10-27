class ApiConstant{
  static const String routePath = "http://10.0.2.2:5000";
  static const String loginApi = routePath + "/api/v1/auth/login";
  static const String loginWithFirebaseApi = routePath + "/api/v1/auth/login/firebase";
  static const String updateTrainerApi = routePath + "/api/v1/trainers";
  static const String updateCustomerApi = routePath + "/api/v1/customers";
  static const String getCustomerCampaignApi = routePath + "/api/tienAPI";
  static const String createCampaignApi = routePath + "/api/v1/campaigns";
  static const String deleteCampaignApi = routePath + "/api/v1/campaigns";
  static const String getCampaignApi = routePath + "/api/v1/campaigns";
  static const String updateCampaignApi = routePath + "/api/v1/campaigns";
  static const String getAllCampaignApi = routePath + "/api/v1/campaigns";
  static const String getAvailableCampaignApi = routePath + "/api/v1/campaigns/available";
  static const String getAllPackageApi = routePath + "/api/v1/packages";
  static const String applyPackageToCampaignApi = routePath + "/api/v1/applies";
  static const String getTrainerPackageApi = routePath + "/api/v1/trainers/viewDetailSpecial";
  static const String createPackageApi = routePath + "/api/v1/packages";
}
