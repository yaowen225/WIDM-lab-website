# WidmBackEnd.PaperTagApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**paperPaperIdPaperTagGet**](PaperTagApi.md#paperPaperIdPaperTagGet) | **GET** /paper/{paper_id}/paper-tag | get paper tag
[**paperPaperIdPaperTagPost**](PaperTagApi.md#paperPaperIdPaperTagPost) | **POST** /paper/{paper_id}/paper-tag | post paper tag
[**paperPaperIdPaperTagTagIdDelete**](PaperTagApi.md#paperPaperIdPaperTagTagIdDelete) | **DELETE** /paper/{paper_id}/paper-tag/{tag_id} | delete tag
[**paperPaperIdPaperTagTagIdGet**](PaperTagApi.md#paperPaperIdPaperTagTagIdGet) | **GET** /paper/{paper_id}/paper-tag/{tag_id} | get tag
[**paperPaperIdPaperTagTagIdPatch**](PaperTagApi.md#paperPaperIdPaperTagTagIdPatch) | **PATCH** /paper/{paper_id}/paper-tag/{tag_id} | update tag



## paperPaperIdPaperTagGet

> PaperTags paperPaperIdPaperTagGet(paperId)

get paper tag

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperTagApi();
let paperId = 56; // Number | 
apiInstance.paperPaperIdPaperTagGet(paperId, (error, data, response) => {
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

### Return type

[**PaperTags**](PaperTags.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## paperPaperIdPaperTagPost

> PaperTag paperPaperIdPaperTagPost(paperId, tagName)

post paper tag

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperTagApi();
let paperId = 56; // Number | 
let tagName = "tagName_example"; // String | 
apiInstance.paperPaperIdPaperTagPost(paperId, tagName, (error, data, response) => {
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
 **tagName** | **String**|  | 

### Return type

[**PaperTag**](PaperTag.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*


## paperPaperIdPaperTagTagIdDelete

> PaperTag paperPaperIdPaperTagTagIdDelete(paperId, tagId)

delete tag

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperTagApi();
let paperId = 56; // Number | 
let tagId = 56; // Number | 
apiInstance.paperPaperIdPaperTagTagIdDelete(paperId, tagId, (error, data, response) => {
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
 **tagId** | **Number**|  | 

### Return type

[**PaperTag**](PaperTag.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## paperPaperIdPaperTagTagIdGet

> PaperTag paperPaperIdPaperTagTagIdGet(paperId, tagId)

get tag

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperTagApi();
let paperId = 56; // Number | 
let tagId = 56; // Number | 
apiInstance.paperPaperIdPaperTagTagIdGet(paperId, tagId, (error, data, response) => {
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
 **tagId** | **Number**|  | 

### Return type

[**PaperTag**](PaperTag.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## paperPaperIdPaperTagTagIdPatch

> PaperTag paperPaperIdPaperTagTagIdPatch(paperId, tagId, tagName)

update tag

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperTagApi();
let paperId = 56; // Number | 
let tagId = 56; // Number | 
let tagName = "tagName_example"; // String | 
apiInstance.paperPaperIdPaperTagTagIdPatch(paperId, tagId, tagName, (error, data, response) => {
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
 **tagId** | **Number**|  | 
 **tagName** | **String**|  | 

### Return type

[**PaperTag**](PaperTag.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*

