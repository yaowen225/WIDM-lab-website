# WidmBackEnd.MemberApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**memberGet**](MemberApi.md#memberGet) | **GET** /member | get members
[**memberMemberIdDelete**](MemberApi.md#memberMemberIdDelete) | **DELETE** /member/{member_id} | delete member
[**memberMemberIdPatch**](MemberApi.md#memberMemberIdPatch) | **PATCH** /member/{member_id} | patch member
[**memberMemberIdPut**](MemberApi.md#memberMemberIdPut) | **PUT** /member/{member_id} | put member
[**memberPost**](MemberApi.md#memberPost) | **POST** /member | post member



## memberGet

> Members memberGet()

get members

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.MemberApi();
apiInstance.memberGet((error, data, response) => {
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

[**Members**](Members.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## memberMemberIdDelete

> Member memberMemberIdDelete(memberId)

delete member

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.MemberApi();
let memberId = 56; // Number | 
apiInstance.memberMemberIdDelete(memberId, (error, data, response) => {
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
 **memberId** | **Number**|  | 

### Return type

[**Member**](Member.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## memberMemberIdPatch

> Member memberMemberIdPatch(memberId, opts)

patch member

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.MemberApi();
let memberId = 56; // Number | 
let opts = {
  'memberName': "memberName_example", // String | 
  'memberIntro': "memberIntro_example" // String | 
};
apiInstance.memberMemberIdPatch(memberId, opts, (error, data, response) => {
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
 **memberId** | **Number**|  | 
 **memberName** | **String**|  | [optional] 
 **memberIntro** | **String**|  | [optional] 

### Return type

[**Member**](Member.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*


## memberMemberIdPut

> Member memberMemberIdPut(memberId, memberName, memberIntro)

put member

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.MemberApi();
let memberId = 56; // Number | 
let memberName = "memberName_example"; // String | 
let memberIntro = "memberIntro_example"; // String | 
apiInstance.memberMemberIdPut(memberId, memberName, memberIntro, (error, data, response) => {
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
 **memberId** | **Number**|  | 
 **memberName** | **String**|  | 
 **memberIntro** | **String**|  | 

### Return type

[**Member**](Member.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*


## memberPost

> Member memberPost(memberName, memberIntro)

post member

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.MemberApi();
let memberName = "memberName_example"; // String | 
let memberIntro = "memberIntro_example"; // String | 
apiInstance.memberPost(memberName, memberIntro, (error, data, response) => {
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
 **memberName** | **String**|  | 
 **memberIntro** | **String**|  | 

### Return type

[**Member**](Member.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*

