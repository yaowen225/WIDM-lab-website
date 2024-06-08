# WidmBackEnd.NewsImageApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**newsImageGet**](NewsImageApi.md#newsImageGet) | **GET** /news/image | get news images
[**newsImageNewsImageUuidDelete**](NewsImageApi.md#newsImageNewsImageUuidDelete) | **DELETE** /news/image/{news_image_uuid} | delete news image
[**newsImageNewsImageUuidGet**](NewsImageApi.md#newsImageNewsImageUuidGet) | **GET** /news/image/{news_image_uuid} | get news image
[**newsImagePost**](NewsImageApi.md#newsImagePost) | **POST** /news/image | post news image



## newsImageGet

> NewsImages newsImageGet()

get news images

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.NewsImageApi();
apiInstance.newsImageGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**NewsImages**](NewsImages.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## newsImageNewsImageUuidDelete

> NewsImage newsImageNewsImageUuidDelete(newsImageUuid)

delete news image

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.NewsImageApi();
let newsImageUuid = "newsImageUuid_example"; // String | 
apiInstance.newsImageNewsImageUuidDelete(newsImageUuid).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **newsImageUuid** | **String**|  | 

### Return type

[**NewsImage**](NewsImage.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## newsImageNewsImageUuidGet

> newsImageNewsImageUuidGet(newsImageUuid)

get news image

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.NewsImageApi();
let newsImageUuid = "newsImageUuid_example"; // String | 
apiInstance.newsImageNewsImageUuidGet(newsImageUuid).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **newsImageUuid** | **String**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## newsImagePost

> NewsImage newsImagePost(image)

post news image

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.NewsImageApi();
let image = "/path/to/file"; // File | 
apiInstance.newsImagePost(image).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **image** | **File**|  | 

### Return type

[**NewsImage**](NewsImage.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*

