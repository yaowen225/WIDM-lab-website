# WidmBackEnd.ProjectApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**projectGet**](ProjectApi.md#projectGet) | **GET** /project | get projects
[**projectPost**](ProjectApi.md#projectPost) | **POST** /project | post project
[**projectProjectIdDelete**](ProjectApi.md#projectProjectIdDelete) | **DELETE** /project/{project_id} | delete project
[**projectProjectIdPatch**](ProjectApi.md#projectProjectIdPatch) | **PATCH** /project/{project_id} | patch project



## projectGet

> Projects projectGet()

get projects

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ProjectApi();
apiInstance.projectGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Projects**](Projects.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## projectPost

> Project projectPost(opts)

post project

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ProjectApi();
let opts = {
  'project': new WidmBackEnd.ProjectInput() // ProjectInput | project information
};
apiInstance.projectPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **project** | [**ProjectInput**](ProjectInput.md)| project information | [optional] 

### Return type

[**Project**](Project.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## projectProjectIdDelete

> Project projectProjectIdDelete(projectId)

delete project

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ProjectApi();
let projectId = 56; // Number | 
apiInstance.projectProjectIdDelete(projectId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **projectId** | **Number**|  | 

### Return type

[**Project**](Project.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## projectProjectIdPatch

> Project projectProjectIdPatch(projectId, opts)

patch project

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ProjectApi();
let projectId = 56; // Number | 
let opts = {
  'project': new WidmBackEnd.ProjectInput() // ProjectInput | project information
};
apiInstance.projectProjectIdPatch(projectId, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **projectId** | **Number**|  | 
 **project** | [**ProjectInput**](ProjectInput.md)| project information | [optional] 

### Return type

[**Project**](Project.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

