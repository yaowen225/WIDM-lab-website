# WidmBackEnd.PaperApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**paperGet**](PaperApi.md#paperGet) | **GET** /paper | get_papers
[**paperPaperIdDelete**](PaperApi.md#paperPaperIdDelete) | **DELETE** /paper/{paper_id} | delete paper
[**paperPaperIdPatch**](PaperApi.md#paperPaperIdPatch) | **PATCH** /paper/{paper_id} | patch paper
[**paperPaperIdPut**](PaperApi.md#paperPaperIdPut) | **PUT** /paper/{paper_id} | put paper
[**paperPost**](PaperApi.md#paperPost) | **POST** /paper | post paper



## paperGet

> Papers paperGet(opts)

get_papers

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperApi();
let opts = {
  'paperTag': "paperTag_example", // String | 
  'paperAuthor': "paperAuthor_example" // String | 
};
apiInstance.paperGet(opts, (error, data, response) => {
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
 **paperTag** | **String**|  | [optional] 
 **paperAuthor** | **String**|  | [optional] 

### Return type

[**Papers**](Papers.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## paperPaperIdDelete

> Paper paperPaperIdDelete(paperId)

delete paper

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperApi();
let paperId = 56; // Number | 
apiInstance.paperPaperIdDelete(paperId, (error, data, response) => {
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

[**Paper**](Paper.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## paperPaperIdPatch

> Paper paperPaperIdPatch(paperId, opts)

patch paper

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperApi();
let paperId = 56; // Number | 
let opts = {
  'paperPublishYear': 56, // Number | 
  'paperTitle': "paperTitle_example", // String | 
  'paperOrigin': "paperOrigin_example", // String | 
  'paperLink': "paperLink_example" // String | 
};
apiInstance.paperPaperIdPatch(paperId, opts, (error, data, response) => {
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
 **paperPublishYear** | **Number**|  | [optional] 
 **paperTitle** | **String**|  | [optional] 
 **paperOrigin** | **String**|  | [optional] 
 **paperLink** | **String**|  | [optional] 

### Return type

[**Paper**](Paper.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*


## paperPaperIdPut

> Paper paperPaperIdPut(paperId, paperPublishYear, paperTitle, paperOrigin, paperLink)

put paper

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperApi();
let paperId = 56; // Number | 
let paperPublishYear = 56; // Number | 
let paperTitle = "paperTitle_example"; // String | 
let paperOrigin = "paperOrigin_example"; // String | 
let paperLink = "paperLink_example"; // String | 
apiInstance.paperPaperIdPut(paperId, paperPublishYear, paperTitle, paperOrigin, paperLink, (error, data, response) => {
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
 **paperPublishYear** | **Number**|  | 
 **paperTitle** | **String**|  | 
 **paperOrigin** | **String**|  | 
 **paperLink** | **String**|  | 

### Return type

[**Paper**](Paper.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*


## paperPost

> Paper paperPost(paperPublishYear, paperTitle, paperOrigin, paperLink)

post paper

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperApi();
let paperPublishYear = 56; // Number | 
let paperTitle = "paperTitle_example"; // String | 
let paperOrigin = "paperOrigin_example"; // String | 
let paperLink = "paperLink_example"; // String | 
apiInstance.paperPost(paperPublishYear, paperTitle, paperOrigin, paperLink, (error, data, response) => {
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
 **paperPublishYear** | **Number**|  | 
 **paperTitle** | **String**|  | 
 **paperOrigin** | **String**|  | 
 **paperLink** | **String**|  | 

### Return type

[**Paper**](Paper.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*

