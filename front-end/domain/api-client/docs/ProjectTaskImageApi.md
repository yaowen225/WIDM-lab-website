# WidmBackEnd.ProjectTaskImageApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**projectTaskImageGet**](ProjectTaskImageApi.md#projectTaskImageGet) | **GET** /project/task/image | get project task images
[**projectTaskImagePost**](ProjectTaskImageApi.md#projectTaskImagePost) | **POST** /project/task/image | post project task image
[**projectTaskImageProjectTaskImageUuidDelete**](ProjectTaskImageApi.md#projectTaskImageProjectTaskImageUuidDelete) | **DELETE** /project/task/image/{project_task_image_uuid} | delete project task image
[**projectTaskImageProjectTaskImageUuidGet**](ProjectTaskImageApi.md#projectTaskImageProjectTaskImageUuidGet) | **GET** /project/task/image/{project_task_image_uuid} | get project task image



## projectTaskImageGet

> ProjectTaskImages projectTaskImageGet()

get project task images

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ProjectTaskImageApi();
apiInstance.projectTaskImageGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**ProjectTaskImages**](ProjectTaskImages.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## projectTaskImagePost

> ProjectTaskImage projectTaskImagePost(image)

post project task image

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ProjectTaskImageApi();
let image = "/path/to/file"; // File | 
apiInstance.projectTaskImagePost(image).then((data) => {
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

[**ProjectTaskImage**](ProjectTaskImage.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*


## projectTaskImageProjectTaskImageUuidDelete

> ProjectTaskImage projectTaskImageProjectTaskImageUuidDelete(projectTaskImageUuid)

delete project task image

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ProjectTaskImageApi();
let projectTaskImageUuid = "projectTaskImageUuid_example"; // String | 
apiInstance.projectTaskImageProjectTaskImageUuidDelete(projectTaskImageUuid).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **projectTaskImageUuid** | **String**|  | 

### Return type

[**ProjectTaskImage**](ProjectTaskImage.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## projectTaskImageProjectTaskImageUuidGet

> projectTaskImageProjectTaskImageUuidGet(projectTaskImageUuid)

get project task image

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ProjectTaskImageApi();
let projectTaskImageUuid = "projectTaskImageUuid_example"; // String | 
apiInstance.projectTaskImageProjectTaskImageUuidGet(projectTaskImageUuid).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **projectTaskImageUuid** | **String**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

