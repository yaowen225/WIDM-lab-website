# WidmBackEnd.ActivityImageApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**activityActivityIdActivityImageActivityImageUuidDelete**](ActivityImageApi.md#activityActivityIdActivityImageActivityImageUuidDelete) | **DELETE** /activity/{activity_id}/activity-image/{activity_image_uuid} | delete activity image
[**activityActivityIdActivityImageActivityImageUuidGet**](ActivityImageApi.md#activityActivityIdActivityImageActivityImageUuidGet) | **GET** /activity/{activity_id}/activity-image/{activity_image_uuid} | get activity image
[**activityActivityIdActivityImagePost**](ActivityImageApi.md#activityActivityIdActivityImagePost) | **POST** /activity/{activity_id}/activity-image | post activity image



## activityActivityIdActivityImageActivityImageUuidDelete

> ActivityImage activityActivityIdActivityImageActivityImageUuidDelete(activityId, activityImageUuid)

delete activity image

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ActivityImageApi();
let activityId = 56; // Number | 
let activityImageUuid = "activityImageUuid_example"; // String | 
apiInstance.activityActivityIdActivityImageActivityImageUuidDelete(activityId, activityImageUuid).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activityId** | **Number**|  | 
 **activityImageUuid** | **String**|  | 

### Return type

[**ActivityImage**](ActivityImage.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## activityActivityIdActivityImageActivityImageUuidGet

> activityActivityIdActivityImageActivityImageUuidGet(activityId, activityImageUuid)

get activity image

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ActivityImageApi();
let activityId = 56; // Number | 
let activityImageUuid = "activityImageUuid_example"; // String | 
apiInstance.activityActivityIdActivityImageActivityImageUuidGet(activityId, activityImageUuid).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activityId** | **Number**|  | 
 **activityImageUuid** | **String**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## activityActivityIdActivityImagePost

> ActivityImage activityActivityIdActivityImagePost(activityId, image)

post activity image

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ActivityImageApi();
let activityId = 56; // Number | 
let image = "/path/to/file"; // File | 
apiInstance.activityActivityIdActivityImagePost(activityId, image).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activityId** | **Number**|  | 
 **image** | **File**|  | 

### Return type

[**ActivityImage**](ActivityImage.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*

