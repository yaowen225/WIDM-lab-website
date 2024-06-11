import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { Select, Tree, TreeProps } from 'antd';
import AddItemForm from '../components/Forms/AddItemForm';
import { ProjectApi, Configuration, ProjectTaskApi } from '../../domain/api-client';
import type { ProjectInput } from 'domain/api-client';
import { DownOutlined } from '@ant-design/icons';

const { Option } = Select;

interface ProjectTask {
  id: number;
  parent_id: number;
  project_id: number;
  project_task_content: string;
  project_task_sub_title: string;
  project_task_title: string;
  create_time: string;
  update_time: string;
  children: ProjectTask[];
}

const ProjectPage = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [projectId, setProjectId] = useState(0);
  const [projectTasks, setProjectTasks] = useState<ProjectTask[]>([]);
  const [projectTask, setProjectTask] = useState<ProjectTask | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editData, setEditData] = useState<{ [key: string]: any } | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const headers = [
    { id: 'id', Name: 'Id', isShow: 'true', type: 'Number' },
    { id: 'project_description', Name: '專案描述', isShow: 'true', type: 'String' },
    { id: 'project_github', Name: 'GitHub 連結', isShow: 'true', type: 'String' },
    { id: 'project_link', Name: '專案連結', isShow: 'true', type: 'String' },
    { id: 'project_name', Name: '專案名稱', isShow: 'true', type: 'String' },
    { id: 'project_tags', Name: '專案標籤', isShow: 'true', type: 'Tags' },
    { id: 'actions', Name: 'Actions', isShow: 'false', type: 'Null' },
  ];

  const fetchProjects = async () => {
    const configuration = new Configuration({ basePath: '/api' });
    const apiClient = new ProjectApi(configuration);
    try {
      const response = await apiClient.projectGet();
      const data: any = response.data.response;
      setProjects(data);
      console.log(data);
    } catch (error) {
      console.error('API 調用失敗:', (error as Error).message);
      if ((error as any).response) {
        console.error('API Response Error:', (error as any).response.body);
      }
    }
  };

  const fetchProjectsTasks = async (id: number) => {
    const configuration = new Configuration({ basePath: '/api' });
    const apiClient = new ProjectTaskApi(configuration);
    try {
      const response = await apiClient.projectProjectIdTaskGet(id);
      const data: any = response.data.response;
      setProjectTasks(data);
      console.log(data);
    } catch (error) {
      console.error('API 調用失敗:', (error as Error).message);
      if ((error as any).response) {
        console.error('API Response Error:', (error as any).response.body);
      }
    }
  };

  const fetchProjectsTask = async (projectTaskId: number) => {
    const configuration = new Configuration({ basePath: '/api' });
    const apiClient = new ProjectTaskApi(configuration);
    try {
      const response = await apiClient.projectProjectIdTaskProjectTaskIdGet(projectId, projectTaskId);
      const data: any = response.data.response;
      setProjectTask(data);
      console.log(data);
    } catch (error) {
      console.error('API 調用失敗:', (error as Error).message);
      if ((error as any).response) {
        console.error('API Response Error:', (error as any).response.body);
      }
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddNewItem = () => {
    setEditData(null); // 新增時清空 editData
    setIsAdding(true);
  };

  const handleEditItem = (row: { [key: string]: any }) => {
    setEditData(row); // 將當前資料設為 editData
    setIsAdding(true);
  };

  const handleCloseForm = () => {
    setIsAdding(false);
  };

  const createProject = async (formData: { [key: string]: any }) => {
    console.log(formData)
    const newProject: ProjectInput = {
      project_description: formData.project_description,
      project_github: formData.project_github,
      project_link: formData.project_link,
      project_name: formData.project_name,
      project_tags: formData.project_tags.map((tag: { id: string; text: string; className: string }) => tag.text),
    };
    console.log(newProject)

    const configuration = new Configuration({ basePath: '/api' });
    const apiClient = new ProjectApi(configuration);
    try {
      if (editData) {
        await apiClient.projectProjectIdPatch(editData.id, newProject); // 使用 PATCH 方法更新資料
      } else {
        await apiClient.projectPost(newProject); // 使用 POST 方法新增資料
      }
      setIsAdding(false);
      fetchProjects();  // 新增或更新後重新獲取專案數據
      setSuccessMessage('更新成功!');
      setShowSuccessMessage(true); // 顯示成功消息
      setTimeout(() => setShowSuccessMessage(false), 3000); // 3秒後隱藏消息
    } catch (error) {
      console.error('API 創建失敗:', (error as Error).message);
      setErrorMessage('更新失敗!');
      setShowErrorMessage(true); // 顯示錯誤消息
      setTimeout(() => setShowErrorMessage(false), 3000); // 3秒後隱藏消息
      if ((error as any).response) {
        console.error('API Response Error:', (error as any).response.body);
      }
    }
  };

  const deleteProject = async (id: number) => {
    const configuration = new Configuration({ basePath: '/api' });
    const apiClient = new ProjectApi(configuration);
    try {
      await apiClient.projectProjectIdDelete(id);
      fetchProjects(); // 刪除後重新獲取專案數據
      setSuccessMessage('刪除成功!');
      setShowSuccessMessage(true); // 顯示成功消息
      setTimeout(() => setShowSuccessMessage(false), 3000); // 3秒後隱藏消息
    } catch (error) {
      console.error('API 刪除失敗:', (error as Error).message);
      setErrorMessage('刪除失敗!');
      setShowErrorMessage(true); // 顯示錯誤消息
      setTimeout(() => setShowErrorMessage(false), 3000); // 3秒後隱藏消息
      if ((error as any).response) {
        console.error('API Response Error:', (error as any).response.body);
      }
    }
  };

  const onTreeSelect: TreeProps['onSelect'] = async (selectedKeys, info) => {
    console.log(info.node.key);
    await fetchProjectsTask(info.node.key as number);
  };

  const handleSelectChange = (id: number) => {
    fetchProjectsTasks(id);
    setProjectId(id);
    setProjectTask(null); // Clear the right panel when a new project is selected
  };

  const convertToTreeData = (tasks: ProjectTask[]): { title: string; key: number; children: any[] }[] => {
    return tasks.map(task => ({
      title: task.project_task_title,
      key: task.id,
      children: convertToTreeData(task.children || [])
    }));
  };

  const handleSubmitTaskUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (projectTask) {
      const updatedTask: ProjectTask = {
        ...projectTask,
        project_task_title: (event.target as any).project_task_title.value,
        project_task_sub_title: (event.target as any).project_task_sub_title.value,
        project_task_content: (event.target as any).project_task_content.value,
      };

      const configuration = new Configuration({ basePath: '/api' });
      const apiClient = new ProjectTaskApi(configuration);
      try {
        await apiClient.projectProjectIdTaskProjectTaskIdPatch(projectId, projectTask.id, updatedTask);
        setSuccessMessage('更新成功!');
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
        fetchProjectsTasks(projectId);
      } catch (error) {
        console.error('API 更新失敗:', (error as Error).message);
        setErrorMessage('更新失敗!');
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 3000);
        if ((error as any).response) {
          console.error('API Response Error:', (error as any).response.body);
        }
      }
    }
  };

  const handleDeleteProjectTask = async () => {
    if (projectTask) {
      const configuration = new Configuration({ basePath: '/api' });
      const apiClient = new ProjectTaskApi(configuration);
      try {
        await apiClient.projectProjectIdTaskProjectTaskIdDelete(projectId, projectTask.id);
        setSuccessMessage('刪除成功!');
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
        fetchProjectsTasks(projectId);
        setProjectTask(null); // Clear the form after deletion
      } catch (error) {
        console.error('API 刪除失敗:', (error as Error).message);
        setErrorMessage('刪除失敗!');
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 3000);
        if ((error as any).response) {
          console.error('API Response Error:', (error as any).response.body);
        }
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectTask(prevTask => prevTask ? { ...prevTask, [name]: value } : null);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Project_Task" />
        <div className="flex flex-col gap-6">
          <div className="relative rounded-sm border border-stroke bg-white px-5 pt-6 pb-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-6">
            <div className="max-w-full overflow-x-auto">
              <Select
                style={{ width: 200 }}
                placeholder="Select a project"
                onChange={handleSelectChange}
              >
                {projects.map((project) => (
                  <Option key={project.id} value={project.id}>
                    {project.project_name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mt-4 flex">
              <Tree
                showLine
                switcherIcon={<DownOutlined />}
                treeData={convertToTreeData(projectTasks)}
                onSelect={onTreeSelect}
                className="flex-grow"
              />
              {projectTask && (
                <div className="w-3/4 max-w-4xl rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6 ml-4">
                  {/* <h3 className="text-lg font-medium text-black dark:text-white">編輯</h3> */}
                  <form onSubmit={handleSubmitTaskUpdate} className="flex flex-col gap-6">
                    <div>
                      <label className="mb-3 block text-black dark:text-white">標題</label>
                      <input
                        type="text"
                        name="project_task_title"
                        value={projectTask?.project_task_title || ''}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">副標題</label>
                      <input
                        type="text"
                        name="project_task_sub_title"
                        value={projectTask?.project_task_sub_title || ''}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">內容</label>
                      <textarea
                        name="project_task_content"
                        value={projectTask?.project_task_content || ''}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                      />
                    </div>
                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={() => setProjectTask(null)}
                        className="rounded-md border border-stroke bg-transparent py-3 px-6 text-black dark:text-white"
                      >
                        取消
                      </button>
                      <button
                        type="submit"
                        className="rounded-md border border-primary bg-primary py-3 px-6 text-white"
                      >
                        更新
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteProjectTask}
                        className="rounded-md border border-red-600 bg-red-600 py-3 px-6 text-white"
                      >
                        刪除此任務
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      {isAdding && <AddItemForm headers={headers} onClose={handleCloseForm} onSubmit={createProject} editData={editData} />}
      {showSuccessMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {successMessage}
        </div>
      )}
      {showErrorMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
          {errorMessage}
        </div>
      )}
    </DefaultLayout>
  );
};

export default ProjectPage;
