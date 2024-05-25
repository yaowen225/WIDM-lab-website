# WidmBackEnd.ActivityApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**activityActivityIdDelete**](ActivityApi.md#activityActivityIdDelete) | **DELETE** /activity/{activity_id} | delete activity
[**activityActivityIdPatch**](ActivityApi.md#activityActivityIdPatch) | **PATCH** /activity/{activity_id} | patch activity
[**activityGet**](ActivityApi.md#activityGet) | **GET** /activity | get activity
[**activityPost**](ActivityApi.md#activityPost) | **POST** /activity | post activity



## activityActivityIdDelete

> Activity activityActivityIdDelete(activityId)

delete activity

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ActivityApi();
let activityId = 56; // Number | 
apiInstance.activityActivityIdDelete(activityId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
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
  'activity': new WidmBackEnd.ActivityPostRequest() // ActivityPostRequest | 
};
apiInstance.activityActivityIdPatch(activityId, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activityId** | **Number**|  | 
 **activity** | [**ActivityPostRequest**](ActivityPostRequest.md)|  | [optional] 

### Return type

[**Activity**](Activity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## activityGet

> Activity activityGet()

get activity

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ActivityApi();
apiInstance.activityGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
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

> Activity activityPost(opts)

post activity

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ActivityApi();
let opts = {
  'activity': new WidmBackEnd.ActivityPostRequest() // ActivityPostRequest | 
};
apiInstance.activityPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activity** | [**ActivityPostRequest**](ActivityPostRequest.md)|  | [optional] 

### Return type

[**Activity**](Activity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

