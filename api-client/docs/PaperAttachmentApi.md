# WidmBackEnd.PaperAttachmentApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**paperPaperIdPaperAttachmentPaperAttachmentUuidDelete**](PaperAttachmentApi.md#paperPaperIdPaperAttachmentPaperAttachmentUuidDelete) | **DELETE** /paper/{paper_id}/paper-attachment/{paper_attachment_uuid} | delete paper attachment
[**paperPaperIdPaperAttachmentPaperAttachmentUuidGet**](PaperAttachmentApi.md#paperPaperIdPaperAttachmentPaperAttachmentUuidGet) | **GET** /paper/{paper_id}/paper-attachment/{paper_attachment_uuid} | get paper attachment
[**paperPaperIdPaperAttachmentPost**](PaperAttachmentApi.md#paperPaperIdPaperAttachmentPost) | **POST** /paper/{paper_id}/paper-attachment | post paper attachment



## paperPaperIdPaperAttachmentPaperAttachmentUuidDelete

> PaperAttachment paperPaperIdPaperAttachmentPaperAttachmentUuidDelete(paperId, paperAttachmentUuid)

delete paper attachment

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperAttachmentApi();
let paperId = 56; // Number | 
let paperAttachmentUuid = "paperAttachmentUuid_example"; // String | 
apiInstance.paperPaperIdPaperAttachmentPaperAttachmentUuidDelete(paperId, paperAttachmentUuid, (error, data, response) => {
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
 **paperId** | **Number**|  | 
 **paperAttachmentUuid** | **String**|  | 

### Return type

[**PaperAttachment**](PaperAttachment.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## paperPaperIdPaperAttachmentPaperAttachmentUuidGet

> paperPaperIdPaperAttachmentPaperAttachmentUuidGet(paperId, paperAttachmentUuid)

get paper attachment

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperAttachmentApi();
let paperId = 56; // Number | 
let paperAttachmentUuid = "paperAttachmentUuid_example"; // String | 
apiInstance.paperPaperIdPaperAttachmentPaperAttachmentUuidGet(paperId, paperAttachmentUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **paperId** | **Number**|  | 
 **paperAttachmentUuid** | **String**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## paperPaperIdPaperAttachmentPost

> PaperAttachment paperPaperIdPaperAttachmentPost(paperId, attachment)

post paper attachment

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperAttachmentApi();
let paperId = 56; // Number | 
let attachment = "/path/to/file"; // File | 
apiInstance.paperPaperIdPaperAttachmentPost(paperId, attachment, (error, data, response) => {
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
 **paperId** | **Number**|  | 
 **attachment** | **File**|  | 

### Return type

[**PaperAttachment**](PaperAttachment.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*

