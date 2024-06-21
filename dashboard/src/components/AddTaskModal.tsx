import React, { useState, useEffect } from 'react';
import { Modal, TreeSelect, Input, Form, Button } from 'antd';
import type { TreeNodeNormal } from 'antd/lib/tree/Tree';
import { ProjectApi, Configuration, ProjectTaskApi, ProjectTaskImageApi } from '../../domain/api-client';
import ReactMarkdown from 'react-markdown';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import ImportImageModal from './ImportImageModal';

interface Task {
  id: number;
  project_id: number;
  project_task_title: string;
  children?: Task[];
}

interface AddTaskModalProps {
  open: boolean;
  onOk: (selectedValue: string, taskDetails: any) => void;
  onCancel: () => void;
}

interface TaskImage {
  id: number;
  image_name: string,
  image_path: string,
  image_uuid: string,
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ open, onOk, onCancel }) => {
  const [treeData, setTreeData] = useState<TreeNodeNormal[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskSubtitle, setTaskSubtitle] = useState<string>('');
  const [taskContent, setTaskContent] = useState<string>('');
  const [treeKey, setTreeKey] = useState<number>(0);
  const [importImageOpen, setImportImageOpen] = useState(false);
  const [imagesId, setImagesId] = useState<TaskImage[]>([]);

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

  const fetchProjects = async () => {
    const configuration = new Configuration({ basePath: '/api' });
    const apiClient = new ProjectApi(configuration);
    try {
      const response = await apiClient.projectGet();
      const data: any = response.data.response;
      return data;
    } catch (error) {
      console.error('API 調用失敗:', (error as Error).message);
      if ((error as any).response) {
        console.error('API Response Error:', (error as any).response.body);
      }
    }
  };

  const fetchProjectsTasks = async (id: number): Promise<Task[]> => {
    const configuration = new Configuration({ basePath: '/api' });
    const apiClient = new ProjectTaskApi(configuration);
    try {
      const response = await apiClient.projectProjectIdTaskGet(id);
      const data: any = response.data.response;
      return data;
    } catch (error) {
      console.error('API 調用失敗:', (error as Error).message);
      if ((error as any).response) {
        console.error('API Response Error:', (error as any).response.body);
      }
      return [];
    }
  };

  const fetchProjectsTaskImages = async () => {
    const configuration = new Configuration({ basePath: '/api' });
    const apiClient = new ProjectTaskImageApi(configuration);
    try {
      const response = await apiClient.projectTaskImageGet();
      const data: any = response.data.response;
      console.log(data);
      setImagesId(data)
    } catch (error) {
      console.error('API 調用失敗:', (error as Error).message);
      if ((error as any).response) {
        console.error('API Response Error:', (error as any).response.body);
      }
      return [];
    }
  };

  const formatTasks = (tasks: Task[]): TreeNodeNormal[] => {
    return tasks.map(task => ({
      title: task.project_task_title,
      value: `task-${task.project_id}-${task.id}`,
      key: `task-${task.project_id}-${task.id}`,
      isLeaf: !task.children || task.children.length === 0,
      children: task.children ? formatTasks(task.children) : [],
    }));
  };

  const onLoadData = async (treeNode: any) => {
    const { value } = treeNode.props;
    const [prefix, id] = value.split('-');
    if (prefix === 'project') {
      const projectId = parseInt(id, 10);
      const tasks = await fetchProjectsTasks(projectId);
      const formattedTasks = formatTasks(tasks);

      const updateTreeData = (list: TreeNodeNormal[], key: React.Key, children: TreeNodeNormal[]): TreeNodeNormal[] =>
        list.map(node => {
          if (node.key === key) {
            return { ...node, children };
          }
          if (node.children) {
            return { ...node, children: updateTreeData(node.children, key, children) };
          }
          return node;
        });

      setTreeData(prevData => updateTreeData(prevData, value, formattedTasks));
    }
  };

  const onModalOpen = async () => {
    const projects = await fetchProjects();
    const formattedProjects = projects.map((project: { project_name: any; id: any; }) => ({
      title: project.project_name,
      value: `project-${project.id}`,
      key: `project-${project.id}`,
      isLeaf: false,
    }));
    setTreeData(formattedProjects);
  };

  const handleSelectImage = (image: TaskImage) => {
    // 處理選中的圖片
    console.log('選中的圖片:', image.image_uuid);
    const imageMarkdown = `![${image.image_name}](https://widm-back-end.nevercareu.space/project/task/image/${image.image_uuid})`;
    setTaskContent(taskContent + '\n' + imageMarkdown);
    setImportImageOpen(false);
  }

  useEffect(() => {
    setTreeData([]);
    onModalOpen();
    setSelectedValue(undefined);
    setTaskTitle('');
    setTaskSubtitle('');
    setTaskContent('');
    setTreeKey(prevKey => prevKey + 1); // 更新 treeKey 強制重新渲染 TreeSelect
  }, [open]);

  const handleOk = () => {
    if (selectedValue && taskTitle && taskSubtitle && taskContent) {
      const taskDetails = {
        project_task_title: taskTitle,
        project_task_sub_title: taskSubtitle,
        project_task_content: taskContent,
      };
      onOk(selectedValue, taskDetails);
      setSelectedValue(undefined);
      setTaskTitle('');
      setTaskSubtitle('');
      setTaskContent('');
      setTreeData([]);
    } else {
      alert("請填入必填欄位");
    }
  };

  const handleImportImageClick = () => {
    setImportImageOpen(true);
  }

  return (
    <Modal
      title="新增 Task"
      open={open}
      onOk={handleOk}
      onCancel={() => {
        onCancel();
        setSelectedValue(undefined);
        setTaskTitle('');
        setTaskSubtitle('');
        setTaskContent('');
        setTreeData([]);
      }}
      okText="儲存"
      cancelText="取消"
      okButtonProps={{ style: { backgroundColor: '#3c50e0', color: 'white' } }}
      width={1000}
    >
      <TreeSelect
        key={treeKey}
        showSearch
        style={{ width: '100%' }}
        value={selectedValue}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="請選擇一個 Project 或 Task"
        allowClear
        treeDefaultExpandAll={false}
        treeData={treeData}
        loadData={onLoadData}
        onChange={value => setSelectedValue(value)}
      />
      {selectedValue && (
        <Form layout="vertical" style={{ marginTop: '20px' }}>
          <Form.Item label="標題" required>
            <Input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
          </Form.Item>
          <Form.Item label="副標題" required>
            <Input value={taskSubtitle} onChange={(e) => setTaskSubtitle(e.target.value)} />
          </Form.Item>
          <Form.Item label="內容" required>
            <Input.TextArea value={taskContent} onChange={(e) => setTaskContent(e.target.value)} />
          </Form.Item>
          <div className="mt-4">
            <ReactMarkdown components={markdownComponents}>{taskContent || ''}</ReactMarkdown>
          </div>
          <Button
            type="primary"
            style={{ 
              position: 'absolute', 
              bottom: '5%', 
              left: '25px', 
              backgroundColor: '#3c50e0', 
              color: 'white', 
              borderColor: '#3c50e0' 
            }}
            onClick={handleImportImageClick}
          >
            匯入圖片
          </Button>
        </Form>
      )}
      <ImportImageModal 
        open={importImageOpen} 
        onClose={() => setImportImageOpen(false)} 
        onSelectImage={handleSelectImage} 
      />
    </Modal>
  );
};

export default AddTaskModal;
