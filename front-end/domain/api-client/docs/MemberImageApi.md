# WidmBackEnd.MemberImageApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**memberMemberIdMemberImageMemberImageUuidDelete**](MemberImageApi.md#memberMemberIdMemberImageMemberImageUuidDelete) | **DELETE** /member/{member_id}/member-image/{member_image_uuid} | delete member image
[**memberMemberIdMemberImageMemberImageUuidGet**](MemberImageApi.md#memberMemberIdMemberImageMemberImageUuidGet) | **GET** /member/{member_id}/member-image/{member_image_uuid} | get member images
[**memberMemberIdMemberImagePost**](MemberImageApi.md#memberMemberIdMemberImagePost) | **POST** /member/{member_id}/member-image | post member image



## memberMemberIdMemberImageMemberImageUuidDelete

> PaperAttachment memberMemberIdMemberImageMemberImageUuidDelete(memberId, memberImageUuid)

delete member image

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.MemberImageApi();
let memberId = 56; // Number | 
let memberImageUuid = "memberImageUuid_example"; // String | 
apiInstance.memberMemberIdMemberImageMemberImageUuidDelete(memberId, memberImageUuid).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **memberId** | **Number**|  | 
 **memberImageUuid** | **String**|  | 

### Return type

[**PaperAttachment**](PaperAttachment.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## memberMemberIdMemberImageMemberImageUuidGet

> memberMemberIdMemberImageMemberImageUuidGet(memberId, memberImageUuid)

get member images

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.MemberImageApi();
let memberId = 56; // Number | 
let memberImageUuid = "memberImageUuid_example"; // String | 
apiInstance.memberMemberIdMemberImageMemberImageUuidGet(memberId, memberImageUuid).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **memberId** | **Number**|  | 
 **memberImageUuid** | **String**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## memberMemberIdMemberImagePost

> MemberImage memberMemberIdMemberImagePost(memberId, image)

post member image

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.MemberImageApi();
let memberId = 56; // Number | 
let image = "/path/to/file"; // File | 
apiInstance.memberMemberIdMemberImagePost(memberId, image).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **memberId** | **Number**|  | 
 **image** | **File**|  | 

### Return type

[**MemberImage**](MemberImage.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*

