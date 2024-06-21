import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { Select, Tree, TreeProps } from 'antd';
import { ProjectApi, Configuration, ProjectTaskApi } from '../../domain/api-client';
import AddTaskModal from '../components/AddTaskModal';
import { DownOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import ImportImageModal from '../components/ImportImageModal';

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

interface creatTaskData {
  project_task_title: string,
  project_task_sub_title: string,
  project_task_content: string,
}

interface TaskImage {
  id: number;
  image_name: string,
  image_path: string,
  image_uuid: string,
}

const ProjectPage = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [projectId, setProjectId] = useState(0);
  const [projectTasks, setProjectTasks] = useState<ProjectTask[]>([]);
  const [projectTask, setProjectTask] = useState<ProjectTask | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [importImageOpen, setImportImageOpen] = useState(false);

  const markdownComponents = {
    h1: ({node, ...props}: {node?: any, [key: string]: any}) => <h1 className="my-4 text-4xl font-extrabold border-t border-b border-gray-300 py-2" {...props} />,
    h2: ({node, ...props}: {node?: any, [key: string]: any}) => <h2 className="my-4 text-3xl font-bold border-t border-b border-gray-300 py-2" {...props} />,
    h3: ({node, ...props}: {node?: any, [key: string]: any}) => <h3 className="my-4 text-2xl font-semibold border-t border-b border-gray-300 py-2" {...props} />,
    h4: ({node, ...props}: {node?: any, [key: string]: any}) => <h4 className="my-4 text-xl font-medium border-t border-b border-gray-300 py-2" {...props} />,
    h5: ({node, ...props}: {node?: any, [key: string]: any}) => <h5 className="my-4 text-lg font-medium border-t border-b border-gray-300 py-2" {...props} />,
    h6: ({node, ...props}: {node?: any, [key: string]: any}) => <h6 className="my-4 text-sm font-medium border-t border-b border-gray-300 py-2" {...props} />,
    p:  ({ node, ...props }: {node?: any, [key: string]: any}) => <p className="my-2 mt-4 text-base leading-7 text-gray-700" {...props} />,
    a:  ({ node, ...props }: {node?: any, [key: string]: any}) => <a className="my-1 mt-4 text-base leading-7 text-teal-600" {...props} />,
    ul: ({ node, ...props }: {node?: any, [key: string]: any}) => <ul className="ml-5 list-disc" {...props} />,
    ol: ({ node, ...props }: {node?: any, [key: string]: any}) => <ol className="ml-5 list-decimal" {...props} />,
    li: ({ node, ...props }: {node?: any, [key: string]: any}) => <li className="mt-1" {...props} />,
    code: ({ node, inline, className, children, ...props }: {node?: any, inline?: boolean, className?: string, children?: React.ReactNode, [key: string]: any}) => {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter style={materialDark} language={match[1]} PreTag="div" {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
    img: ({ node, ...props }: {node?: any, [key: string]: any}) => (
      <img {...props} style={{ minWidth: '60%', minHeight: '50%', maxWidth: '100%', maxHeight: '100%', margin: '0 auto' }} alt={props.alt} />
    ),
  };

  const handleImportImageClick = () => {
    setImportImageOpen(true);
  }

  const handleSelectImage = (image: TaskImage) => {
    // 處理選中的圖片
    console.log('選中的圖片:', image.image_uuid);
    const imageMarkdown = `![${image.image_name}](https://widm-back-end.nevercareu.space/project/task/image/${image.image_uuid})`;
    let newProjectTask = projectTask;
    if(newProjectTask) {
      newProjectTask.project_task_content += '\n' + imageMarkdown;
    }
    setProjectTask(newProjectTask);
    setImportImageOpen(false);
  }
  
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

  const onTreeSelect: TreeProps['onSelect'] = async (selectedKeys, info) => {
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
      if (!window.confirm('確定要刪除此資料嗎?')) {
        return;
      }

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

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddTask = async (selectedValue: string, taskDetails: creatTaskData) => {
    // 根據 selectedValue 設置 project_id 和 parent_id
    let project_id = 0;
    let parent_id = 0;
    if (selectedValue.startsWith('project-')) {
      project_id = parseInt(selectedValue.split('-')[1], 10);
    } else if (selectedValue.startsWith('task-')) {
      project_id = parseInt(selectedValue.split('-')[1], 10);
      parent_id = parseInt(selectedValue.split('-')[2], 10);
    }

    const newTask = {
      parent_id: parent_id,
      project_task_title: taskDetails.project_task_title,
      project_task_sub_title: taskDetails.project_task_sub_title,
      project_task_content: taskDetails.project_task_content,
      create_time: new Date().toISOString(),
      update_time: new Date().toISOString(),
      children: [],
    };

    const configuration = new Configuration({ basePath: '/api' });
    const apiClient = new ProjectTaskApi(configuration);
    try {
      await apiClient.projectProjectIdTaskPost(project_id, newTask);
      setSuccessMessage('新增成功!');
      setShowSuccessMessage(true);
      fetchProjectsTasks(project_id);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('API 新增失敗:', (error as Error).message);
      setErrorMessage('新增失敗!');
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
      if ((error as any).response) {
        console.error('API Response Error:', (error as any).response.body);
      }
    }
    handleCloseModal();
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Project_Task" />
      <div className="flex justify-end mb-1">
        <button
          onClick={handleOpenModal}
          className="inline-flex items-center justify-center rounded-md border border-meta-3 py-1 px-3 text-center font-medium text-meta-3 hover:bg-opacity-90"
        >
          新增 Task
        </button>
      </div>
      <AddTaskModal
        open={isModalVisible}
        onOk={handleAddTask}
        onCancel={handleCloseModal}
      />
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
            {projectTasks.length !== 0 || projectId === 0 ?
              <Tree
                showLine
                switcherIcon={<DownOutlined />}
                treeData={convertToTreeData(projectTasks)}
                onSelect={onTreeSelect}
                className="flex-grow"
              /> : <div>No Data</div>}
            {projectTask && (
              <div className="w-3/4 max-w-4xl rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6 ml-4">
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
                  <div className="flex justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleImportImageClick}
                      className="rounded-md border border-stroke bg-primary py-3 px-6 text-black text-white"
                    >
                      匯入圖片
                    </button>
                    <div className="flex gap-4">
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
                  </div>
                  <div className="mt-4">
                    <ReactMarkdown components={markdownComponents}>{projectTask?.project_task_content || ''}</ReactMarkdown>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
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
      <ImportImageModal 
        open={importImageOpen} 
        onClose={() => setImportImageOpen(false)} 
        onSelectImage={handleSelectImage} 
      />
    </DefaultLayout>
  );
};

export default ProjectPage;
