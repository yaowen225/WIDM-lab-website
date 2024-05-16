# WidmBackEnd.ActivityApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**activityActivityIdDelete**](ActivityApi.md#activityActivityIdDelete) | **DELETE** /activity/{activity_id} | delete activity
[**activityActivityIdGet**](ActivityApi.md#activityActivityIdGet) | **GET** /activity/{activity_id} | get activity
[**activityActivityIdPatch**](ActivityApi.md#activityActivityIdPatch) | **PATCH** /activity/{activity_id} | patch activity
[**activityActivityIdPut**](ActivityApi.md#activityActivityIdPut) | **PUT** /activity/{activity_id} | put activity
[**activityGet**](ActivityApi.md#activityGet) | **GET** /activity | put activity
[**activityPost**](ActivityApi.md#activityPost) | **POST** /activity | post activity



## activityActivityIdDelete

> Activity activityActivityIdDelete(activityId)

delete activity

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ActivityApi();
let activityId = 56; // Number | 
apiInstance.activityActivityIdDelete(activityId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activityId** | **Number**|  | 

### Return type

[**Activity**](Activity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## activityActivityIdGet

> Activity activityActivityIdGet(activityId)

get activity

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ActivityApi();
let activityId = 56; // Number | 
apiInstance.activityActivityIdGet(activityId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activityId** | **Number**|  | 

### Return type

[**Activity**](Activity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## activityActivityIdPatch

> Activity activityActivityIdPatch(activityId, opts)

patch activity

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ActivityApi();
let activityId = 56; // Number | 
let opts = {
  'activityTitle': "activityTitle_example", // String | 
  'activitySubTitle': "activitySubTitle_example" // String | 
};
apiInstance.activityActivityIdPatch(activityId, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activityId** | **Number**|  | 
 **activityTitle** | **String**|  | [optional] 
 **activitySubTitle** | **String**|  | [optional] 

### Return type

[**Activity**](Activity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*


## activityActivityIdPut

> Activity activityActivityIdPut(activityId, activityTitle, activitySubTitle)

put activity

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ActivityApi();
let activityId = 56; // Number | 
let activityTitle = "activityTitle_example"; // String | 
let activitySubTitle = "activitySubTitle_example"; // String | 
apiInstance.activityActivityIdPut(activityId, activityTitle, activitySubTitle, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activityId** | **Number**|  | 
 **activityTitle** | **String**|  | 
 **activitySubTitle** | **String**|  | 

### Return type

[**Activity**](Activity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*


## activityGet

> Activity activityGet()

put activity

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ActivityApi();
apiInstance.activityGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Activity**](Activity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## activityPost

> Activity activityPost(activityTitle, activitySubTitle)

post activity

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ActivityApi();
let activityTitle = "activityTitle_example"; // String | 
let activitySubTitle = "activitySubTitle_example"; // String | 
apiInstance.activityPost(activityTitle, activitySubTitle, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activityTitle** | **String**|  | 
 **activitySubTitle** | **String**|  | 

### Return type

[**Activity**](Activity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*

