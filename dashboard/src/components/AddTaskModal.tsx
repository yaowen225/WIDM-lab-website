import React, { useState, useEffect } from 'react';
import { Modal, TreeSelect, Input, Form } from 'antd';
import type { TreeNodeNormal } from 'antd/lib/tree/Tree';
import { ProjectApi, Configuration, ProjectTaskApi } from '../../domain/api-client';

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

const AddTaskModal: React.FC<AddTaskModalProps> = ({ open, onOk, onCancel }) => {
  const [treeData, setTreeData] = useState<TreeNodeNormal[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskSubtitle, setTaskSubtitle] = useState<string>('');
  const [taskContent, setTaskContent] = useState<string>('');
  const [treeKey, setTreeKey] = useState<number>(0);

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
      okButtonProps={{ style: { backgroundColor: '#3c50e0', color: 'white' } }}
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
        </Form>
      )}
    </Modal>
  );
};

export default AddTaskModal;
