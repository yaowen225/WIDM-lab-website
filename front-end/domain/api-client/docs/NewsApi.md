# WidmBackEnd.NewsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**newsGet**](NewsApi.md#newsGet) | **GET** /news | get newses
[**newsNewsIdDelete**](NewsApi.md#newsNewsIdDelete) | **DELETE** /news/{news_id} | delete news
[**newsNewsIdGet**](NewsApi.md#newsNewsIdGet) | **GET** /news/{news_id} | get news
[**newsNewsIdPatch**](NewsApi.md#newsNewsIdPatch) | **PATCH** /news/{news_id} | patch news
[**newsPost**](NewsApi.md#newsPost) | **POST** /news | post news



## newsGet

> Newses newsGet()

get newses

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.NewsApi();
apiInstance.newsGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Newses**](Newses.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## newsNewsIdDelete

> News newsNewsIdDelete(newsId)

delete news

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.NewsApi();
let newsId = 56; // Number | 
apiInstance.newsNewsIdDelete(newsId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **newsId** | **Number**|  | 

### Return type

[**News**](News.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## newsNewsIdGet

> News newsNewsIdGet(newsId)

get news

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.NewsApi();
let newsId = 56; // Number | 
apiInstance.newsNewsIdGet(newsId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **newsId** | **Number**|  | 

### Return type

[**News**](News.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## newsNewsIdPatch

> News newsNewsIdPatch(newsId, news)

patch news

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.NewsApi();
let newsId = 56; // Number | 
let news = new WidmBackEnd.NewsInput(); // NewsInput | 
apiInstance.newsNewsIdPatch(newsId, news).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **newsId** | **Number**|  | 
 **news** | [**NewsInput**](NewsInput.md)|  | 

### Return type

[**News**](News.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## newsPost

> News newsPost(news)

post news

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.NewsApi();
let news = new WidmBackEnd.NewsInput(); // NewsInput | 
apiInstance.newsPost(news).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **news** | [**NewsInput**](NewsInput.md)|  | 

### Return type

[**News**](News.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

