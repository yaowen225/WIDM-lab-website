# WidmBackEnd.ProjectTaskApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**projectProjectIdTaskGet**](ProjectTaskApi.md#projectProjectIdTaskGet) | **GET** /project/{project_id}/task | get project tasks
[**projectProjectIdTaskPost**](ProjectTaskApi.md#projectProjectIdTaskPost) | **POST** /project/{project_id}/task | post project task
[**projectProjectIdTaskProjectTaskIdDelete**](ProjectTaskApi.md#projectProjectIdTaskProjectTaskIdDelete) | **DELETE** /project/{project_id}/task/{project_task_id} | delete project task
[**projectProjectIdTaskProjectTaskIdGet**](ProjectTaskApi.md#projectProjectIdTaskProjectTaskIdGet) | **GET** /project/{project_id}/task/{project_task_id} | get project task
[**projectProjectIdTaskProjectTaskIdPatch**](ProjectTaskApi.md#projectProjectIdTaskProjectTaskIdPatch) | **PATCH** /project/{project_id}/task/{project_task_id} | patch project task



## projectProjectIdTaskGet

> ProjectTasks projectProjectIdTaskGet(projectId)

get project tasks

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ProjectTaskApi();
let projectId = 56; // Number | 
apiInstance.projectProjectIdTaskGet(projectId).then((data) => {
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

[**ProjectTasks**](ProjectTasks.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## projectProjectIdTaskPost

> ProjectTask projectProjectIdTaskPost(projectId, opts)

post project task

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ProjectTaskApi();
let projectId = 56; // Number | 
let opts = {
  'projectTask': new WidmBackEnd.ProjectTaskInput() // ProjectTaskInput | project task information
};
apiInstance.projectProjectIdTaskPost(projectId, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **projectId** | **Number**|  | 
 **projectTask** | [**ProjectTaskInput**](ProjectTaskInput.md)| project task information | [optional] 

### Return type

[**ProjectTask**](ProjectTask.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## projectProjectIdTaskProjectTaskIdDelete

> ProjectTask projectProjectIdTaskProjectTaskIdDelete(projectId, projectTaskId)

delete project task

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ProjectTaskApi();
let projectId = 56; // Number | 
let projectTaskId = 56; // Number | 
apiInstance.projectProjectIdTaskProjectTaskIdDelete(projectId, projectTaskId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **projectId** | **Number**|  | 
 **projectTaskId** | **Number**|  | 

### Return type

[**ProjectTask**](ProjectTask.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## projectProjectIdTaskProjectTaskIdGet

> ProjectTask projectProjectIdTaskProjectTaskIdGet(projectId, projectTaskId)

get project task

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ProjectTaskApi();
let projectId = 56; // Number | 
let projectTaskId = 56; // Number | 
apiInstance.projectProjectIdTaskProjectTaskIdGet(projectId, projectTaskId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **projectId** | **Number**|  | 
 **projectTaskId** | **Number**|  | 

### Return type

[**ProjectTask**](ProjectTask.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## projectProjectIdTaskProjectTaskIdPatch

> ProjectTask projectProjectIdTaskProjectTaskIdPatch(projectId, projectTaskId, opts)

patch project task

### Example

```javascript
import WidmBackEnd from 'widm_back_end';

let apiInstance = new WidmBackEnd.ProjectTaskApi();
let projectId = 56; // Number | 
let projectTaskId = 56; // Number | 
let opts = {
  'projectTask': new WidmBackEnd.ProjectTaskInput() // ProjectTaskInput | project task information
};
apiInstance.projectProjectIdTaskProjectTaskIdPatch(projectId, projectTaskId, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **projectId** | **Number**|  | 
 **projectTaskId** | **Number**|  | 
 **projectTask** | [**ProjectTaskInput**](ProjectTaskInput.md)| project task information | [optional] 

### Return type

[**ProjectTask**](ProjectTask.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

