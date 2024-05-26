# WidmBackEnd.ProjectIconApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**projectProjectIdProjectIconPost**](ProjectIconApi.md#projectProjectIdProjectIconPost) | **POST** /project/{project_id}/project-icon | post project icon
[**projectProjectIdProjectIconProjectIconUuidDelete**](ProjectIconApi.md#projectProjectIdProjectIconProjectIconUuidDelete) | **DELETE** /project/{project_id}/project-icon/{project_icon_uuid} | delete project icon
[**projectProjectIdProjectIconProjectIconUuidGet**](ProjectIconApi.md#projectProjectIdProjectIconProjectIconUuidGet) | **GET** /project/{project_id}/project-icon/{project_icon_uuid} | get project icon



## projectProjectIdProjectIconPost

> ProjectIcon projectProjectIdProjectIconPost(projectId, projectIcon)

post project icon

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ProjectIconApi();
let projectId = 56; // Number | 
let projectIcon = "/path/to/file"; // File | 
apiInstance.projectProjectIdProjectIconPost(projectId, projectIcon).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **projectId** | **Number**|  | 
 **projectIcon** | **File**|  | 

### Return type

[**ProjectIcon**](ProjectIcon.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*


## projectProjectIdProjectIconProjectIconUuidDelete

> ProjectIcon projectProjectIdProjectIconProjectIconUuidDelete(projectId, projectIconUuid)

delete project icon

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ProjectIconApi();
let projectId = 56; // Number | 
let projectIconUuid = "projectIconUuid_example"; // String | 
apiInstance.projectProjectIdProjectIconProjectIconUuidDelete(projectId, projectIconUuid).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **projectId** | **Number**|  | 
 **projectIconUuid** | **String**|  | 

### Return type

[**ProjectIcon**](ProjectIcon.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## projectProjectIdProjectIconProjectIconUuidGet

> projectProjectIdProjectIconProjectIconUuidGet(projectId, projectIconUuid)

get project icon

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ProjectIconApi();
let projectId = 56; // Number | 
let projectIconUuid = "projectIconUuid_example"; // String | 
apiInstance.projectProjectIdProjectIconProjectIconUuidGet(projectId, projectIconUuid).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **projectId** | **Number**|  | 
 **projectIconUuid** | **String**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

