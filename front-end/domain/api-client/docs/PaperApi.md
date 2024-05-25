# WidmBackEnd.PaperApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**paperGet**](PaperApi.md#paperGet) | **GET** /paper | get_papers
[**paperPaperIdDelete**](PaperApi.md#paperPaperIdDelete) | **DELETE** /paper/{paper_id} | delete paper
[**paperPaperIdPatch**](PaperApi.md#paperPaperIdPatch) | **PATCH** /paper/{paper_id} | patch paper
[**paperPost**](PaperApi.md#paperPost) | **POST** /paper | post paper



## paperGet

> Paper paperGet()

get_papers

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperApi();
apiInstance.paperGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Paper**](Paper.md)

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
apiInstance.paperPaperIdDelete(paperId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
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
  'paper': new WidmBackEnd.PaperPostRequest() // PaperPostRequest | 
};
apiInstance.paperPaperIdPatch(paperId, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **paperId** | **Number**|  | 
 **paper** | [**PaperPostRequest**](PaperPostRequest.md)|  | [optional] 

### Return type

[**Paper**](Paper.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## paperPost

> Paper paperPost(opts)

post paper

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperApi();
let opts = {
  'paper': new WidmBackEnd.PaperPostRequest() // PaperPostRequest | 
};
apiInstance.paperPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **paper** | [**PaperPostRequest**](PaperPostRequest.md)|  | [optional] 

### Return type

[**Paper**](Paper.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

