import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import DynamicTable from '../components/Tables/DynamicTable';
import AddItemForm from '../components/Forms/AddItemForm';
import UploadImage from '../components/Forms/UploadImageForm';
import DeleteImages from '../components/Forms/DeleteImages';
import { ProjectApi, Configuration, ProjectIconApi } from '../../domain/api-client';
import type { ProjectInput } from 'domain/api-client';

const ProjectPage = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editData, setEditData] = useState<{ [key: string]: any } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeletingImages, setIsDeletingImages] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const headers = [
    { id: 'id', Name: 'Id', isShow: 'true', isEnable: "false", type: 'Number' },
    { id: 'project_name', Name: '專案名稱', isShow: 'true', type: 'String' },
    { id: 'project_description', Name: '專案描述', isShow: 'true', type: 'Textarea' },
    { id: 'project_github', Name: 'GitHub 連結', isShow: 'true', type: 'Url' },
    { id: 'project_link', Name: '專案連結', isShow: 'true', type: 'Url' },
    { id: 'project_tags', Name: '專案標籤', isShow: 'true', type: 'Tags' },
    { id: 'imageActions', Name: 'project_icon', isShow: 'false', type: 'Null' },
  ];

  const fetchProjects = async () => {
    const configuration = new Configuration();
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

  const handleUploadImageSubmit = async (formData: { [key: string]: any }) => {
    const configuration = new Configuration();
    const apiClient = new ProjectIconApi(configuration);
    try {
      if (editData) {
        await apiClient.projectProjectIdProjectIconPost(editData.id, formData.image);
      }
      setIsUploading(false);
      fetchProjects();
      setSuccessMessage('圖片上傳成功!');
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('圖片上傳失敗:', (error as Error).message);
      setErrorMessage('圖片上傳失敗!');
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
      if ((error as any).response) {
        console.error('API Response Error:', (error as any).response.body);
      }
    }
  };

  const handleDeleteImagesSubmit = async (id: number, imageId: string) => {
    const configuration = new Configuration();
    const apiClient = new ProjectIconApi(configuration);
    try {
      await apiClient.projectProjectIdProjectIconProjectIconUuidDelete(id, imageId);
      setIsDeletingImages(false);
      fetchProjects();
      setSuccessMessage('圖片刪除成功!');
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('圖片刪除失敗:', (error as Error).message);
      setErrorMessage('圖片刪除失敗!');
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
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

  const handleUploadImage = (row: { [key: string]: any }) => {
    setEditData(row);
    setIsUploading(true);
  };

  const handleDeleteImages = (row: { [key: string]: any }) => {
    setEditData(row);
    setIsDeletingImages(true);
  };

  const handleCloseUploadImage = () => {
    setIsUploading(false);
  };

  const handleCloseDeleteImages = () => {
    setIsDeletingImages(false);
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

    const configuration = new Configuration();
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
    const configuration = new Configuration();
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

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Project" />
      <div className="flex justify-end mb-1">
        <button
          onClick={handleAddNewItem}
          className="inline-flex items-center justify-center rounded-md border border-meta-3 py-1 px-3 text-center font-medium text-meta-3 hover:bg-opacity-90"
        >
          新增
        </button>
      </div>
      <div className="flex flex-col gap-6">
        <DynamicTable data={projects} headers={headers} onDelete={deleteProject} onEdit={handleEditItem} onUploadFile={handleUploadImage} onDeleteFiles={handleDeleteImages} />
      </div>
      {isAdding && <AddItemForm headers={headers} onClose={handleCloseForm} onSubmit={createProject} editData={editData} />}
      {isUploading && <UploadImage onClose={handleCloseUploadImage} onSubmit={handleUploadImageSubmit} />}
      {isDeletingImages && <DeleteImages onClose={handleCloseDeleteImages} action_1={'project'} action_2={'project-icon'} id={editData?.id!} imageId={editData?.project_icon} onDeleteImage={handleDeleteImagesSubmit} />}
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
