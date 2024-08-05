# WidmBackEnd.AuthApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authLogOutGet**](AuthApi.md#authLogOutGet) | **GET** /auth/log_out | log_out
[**authReturnToGet**](AuthApi.md#authReturnToGet) | **GET** /auth/return-to | Return To
[**authUserInfoGet**](AuthApi.md#authUserInfoGet) | **GET** /auth/user_info | User Info



## authLogOutGet

> authLogOutGet()

log_out

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.AuthApi();
apiInstance.authLogOutGet().then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## authReturnToGet

> authReturnToGet(code, state)

Return To

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.AuthApi();
let code = "code_example"; // String | code
let state = 56; // Number | state
apiInstance.authReturnToGet(code, state).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **code** | **String**| code | 
 **state** | **Number**| state | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## authUserInfoGet

> authUserInfoGet()

User Info

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.AuthApi();
apiInstance.authUserInfoGet().then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

