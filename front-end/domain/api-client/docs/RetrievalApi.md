# WidmBackEnd.RetrievalApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**retrievalQueryGet**](RetrievalApi.md#retrievalQueryGet) | **GET** /retrieval/query | chat retrieval augmented generation
[**retrievalScrapyingStatusGet**](RetrievalApi.md#retrievalScrapyingStatusGet) | **GET** /retrieval/scrapying-status | check the status of scrapying
[**retrievalStartScrapyingGet**](RetrievalApi.md#retrievalStartScrapyingGet) | **GET** /retrieval/start-scrapying | start scrapying



## retrievalQueryGet

> retrievalQueryGet(queryString)

chat retrieval augmented generation

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.RetrievalApi();
let queryString = "queryString_example"; // String | query string
apiInstance.retrievalQueryGet(queryString).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **queryString** | **String**| query string | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## retrievalScrapyingStatusGet

> ScrapyingStatus retrievalScrapyingStatusGet()

check the status of scrapying

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.RetrievalApi();
apiInstance.retrievalScrapyingStatusGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**ScrapyingStatus**](ScrapyingStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## retrievalStartScrapyingGet

> ScrapyingStatus retrievalStartScrapyingGet()

start scrapying

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.RetrievalApi();
apiInstance.retrievalStartScrapyingGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**ScrapyingStatus**](ScrapyingStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

