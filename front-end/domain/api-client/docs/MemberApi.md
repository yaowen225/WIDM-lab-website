# WidmBackEnd.MemberApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**memberGet**](MemberApi.md#memberGet) | **GET** /member | get members
[**memberMemberIdDelete**](MemberApi.md#memberMemberIdDelete) | **DELETE** /member/{member_id} | delete member
[**memberMemberIdPatch**](MemberApi.md#memberMemberIdPatch) | **PATCH** /member/{member_id} | patch member
[**memberPost**](MemberApi.md#memberPost) | **POST** /member | post member



## memberGet

> Members memberGet()

get members

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.MemberApi();
apiInstance.memberGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
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
apiInstance.memberMemberIdDelete(memberId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
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
  'member': new WidmBackEnd.MemberInput() // MemberInput | 
};
apiInstance.memberMemberIdPatch(memberId, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **memberId** | **Number**|  | 
 **member** | [**MemberInput**](MemberInput.md)|  | [optional] 

### Return type

[**Member**](Member.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## memberPost

> Member memberPost(opts)

post member

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.MemberApi();
let opts = {
  'member': new WidmBackEnd.MemberInput() // MemberInput | 
};
apiInstance.memberPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **member** | [**MemberInput**](MemberInput.md)|  | [optional] 

### Return type

[**Member**](Member.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

