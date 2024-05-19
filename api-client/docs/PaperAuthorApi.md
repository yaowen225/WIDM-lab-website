# WidmBackEnd.PaperAuthorApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**paperPaperIdPaperAuthorAuthorIdDelete**](PaperAuthorApi.md#paperPaperIdPaperAuthorAuthorIdDelete) | **DELETE** /paper/{paper_id}/paper-author/{author_id} | delete author
[**paperPaperIdPaperAuthorAuthorIdGet**](PaperAuthorApi.md#paperPaperIdPaperAuthorAuthorIdGet) | **GET** /paper/{paper_id}/paper-author/{author_id} | get author
[**paperPaperIdPaperAuthorAuthorIdPatch**](PaperAuthorApi.md#paperPaperIdPaperAuthorAuthorIdPatch) | **PATCH** /paper/{paper_id}/paper-author/{author_id} | update author
[**paperPaperIdPaperAuthorGet**](PaperAuthorApi.md#paperPaperIdPaperAuthorGet) | **GET** /paper/{paper_id}/paper-author | get paper author
[**paperPaperIdPaperAuthorPost**](PaperAuthorApi.md#paperPaperIdPaperAuthorPost) | **POST** /paper/{paper_id}/paper-author | post paper author



## paperPaperIdPaperAuthorAuthorIdDelete

> PaperAuthor paperPaperIdPaperAuthorAuthorIdDelete(paperId, authorId)

delete author

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperAuthorApi();
let paperId = 56; // Number | 
let authorId = 56; // Number | 
apiInstance.paperPaperIdPaperAuthorAuthorIdDelete(paperId, authorId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **paperId** | **Number**|  | 
 **authorId** | **Number**|  | 

### Return type

[**PaperAuthor**](PaperAuthor.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## paperPaperIdPaperAuthorAuthorIdGet

> PaperAuthor paperPaperIdPaperAuthorAuthorIdGet(paperId, authorId)

get author

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperAuthorApi();
let paperId = 56; // Number | 
let authorId = 56; // Number | 
apiInstance.paperPaperIdPaperAuthorAuthorIdGet(paperId, authorId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **paperId** | **Number**|  | 
 **authorId** | **Number**|  | 

### Return type

[**PaperAuthor**](PaperAuthor.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## paperPaperIdPaperAuthorAuthorIdPatch

> PaperAuthor paperPaperIdPaperAuthorAuthorIdPatch(paperId, authorId, authorName)

update author

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperAuthorApi();
let paperId = 56; // Number | 
let authorId = 56; // Number | 
let authorName = "authorName_example"; // String | 
apiInstance.paperPaperIdPaperAuthorAuthorIdPatch(paperId, authorId, authorName).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **paperId** | **Number**|  | 
 **authorId** | **Number**|  | 
 **authorName** | **String**|  | 

### Return type

[**PaperAuthor**](PaperAuthor.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*


## paperPaperIdPaperAuthorGet

> PaperAuthors paperPaperIdPaperAuthorGet(paperId)

get paper author

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperAuthorApi();
let paperId = 56; // Number | 
apiInstance.paperPaperIdPaperAuthorGet(paperId).then((data) => {
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

[**PaperAuthors**](PaperAuthors.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## paperPaperIdPaperAuthorPost

> PaperAuthor paperPaperIdPaperAuthorPost(paperId, authorName)

post paper author

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.PaperAuthorApi();
let paperId = 56; // Number | 
let authorName = "authorName_example"; // String | 
apiInstance.paperPaperIdPaperAuthorPost(paperId, authorName).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **paperId** | **Number**|  | 
 **authorName** | **String**|  | 

### Return type

[**PaperAuthor**](PaperAuthor.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*

