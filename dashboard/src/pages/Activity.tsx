import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import DynamicTable from '../components/Tables/DynamicTable';
import AddItemForm from '../components/Forms/AddItemForm';
import UploadImage from '../components/Forms/UploadImageForm';
import DeleteImages from '../components/Forms/DeleteImages';
import { ActivityApi, ActivityImageApi, Configuration } from '../../domain/api-client';
import type { ActivityPostRequest } from 'domain/api-client';

const ActivityPage = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeletingImages, setIsDeletingImages] = useState(false);
  const [editData, setEditData] = useState<{ [key: string]: any } | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const headers = [
    { id: 'id', Name: 'Id', isShow: 'true', type: 'Number' },
    { id: 'activity_title', Name: '標題', isShow: 'true', type: 'String' },
    { id: 'activity_sub_title', Name: '副標題', isShow: 'true', type: 'String' },
    { id: 'imagesActions', Name: 'activity_image', isShow: 'false', type: 'Null' },
  ];

  const fetchActivities = async () => {
    const configuration = new Configuration({ basePath: '/api2' });
    const apiClient = new ActivityApi(configuration);
    try {
      const response = await apiClient.activityGet();
      const data: any = response.data.response;
      setActivities(data);
      console.log(data);
    } catch (error) {
      console.error('API 調用失敗:', (error as Error).message);
      if ((error as any).response) {
        console.error('API Response Error:', (error as any).response.body);
      }
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleAddNewItem = () => {
    setEditData(null); // 新增時清空 editData
    setIsAdding(true);
  };

  const handleEditItem = (row: { [key: string]: any }) => {
    setEditData(row); // 將當前資料設為 editData
    setIsAdding(true);
  };

  const handleUploadImage = (row: { [key: string]: any }) => {
    setEditData(row);
    setIsUploading(true);
  };

  const handleDeleteImages = (row: { [key: string]: any }) => {
    setEditData(row);
    setIsDeletingImages(true);
  };

  const handleCloseForm = () => {
    setIsAdding(false);
  };

  const handleCloseUploadImage = () => {
    setIsUploading(false);
  };

  const handleCloseDeleteImages = () => {
    setIsDeletingImages(false);
  };

  const createActivitie = async (formData: { [key: string]: any }) => {
    const newActivity: ActivityPostRequest = {
      activity_title: formData.activity_title,
      activity_sub_title: formData.activity_sub_title,
    };

    const configuration = new Configuration({ basePath: '/api2' });
    const apiClient = new ActivityApi(configuration);
    try {
      if (editData) {
        await apiClient.activityActivityIdPatch(editData.id, newActivity); // 使用 PATCH 方法更新資料
      } else {
        await apiClient.activityPost(newActivity); // 使用 POST 方法新增資料
      }
      setIsAdding(false);
      fetchActivities();  // 新增或更新後重新獲取活動數據
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

  const handleUploadImageSubmit = async (formData: { [key: string]: any }) => {
    const configuration = new Configuration({ basePath: '/api2' });
    const apiClient = new ActivityImageApi(configuration);
    try {
      if (editData) {
        await apiClient.activityActivityIdActivityImagePost(editData.id, formData.image);
      }
      setIsUploading(false);
      fetchActivities();
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
    const configuration = new Configuration({ basePath: '/api2' });
    const apiClient = new ActivityImageApi(configuration);
    try {
      await apiClient.activityActivityIdActivityImageActivityImageUuidDelete(id, imageId);
      setIsDeletingImages(false);
      fetchActivities();
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

  const deleteActivitie = async (id: number) => {
    const configuration = new Configuration({ basePath: '/api2' });
    const apiClient = new ActivityApi(configuration);
    try {
      await apiClient.activityActivityIdDelete(id);
      fetchActivities(); // 刪除後重新獲取活動數據
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
      <Breadcrumb pageName="Activity" />
      <div className="flex justify-end mb-1">
        <button
          onClick={handleAddNewItem}
          className="inline-flex items-center justify-center rounded-md border border-meta-3 py-1 px-3 text-center font-medium text-meta-3 hover:bg-opacity-90"
        >
          新增
        </button>
      </div>
      <div className="flex flex-col gap-6">
        <DynamicTable data={activities} headers={headers} onDelete={deleteActivitie} onEdit={handleEditItem} onUploadFile={handleUploadImage} onDeleteFiles={handleDeleteImages} />
      </div>
      {isAdding && <AddItemForm headers={headers} onClose={handleCloseForm} onSubmit={createActivitie} editData={editData} />}
      {isUploading && <UploadImage onClose={handleCloseUploadImage} onSubmit={handleUploadImageSubmit} />}
      {isDeletingImages && <DeleteImages onClose={handleCloseDeleteImages} action_1={'activity'} action_2={'activity-image'} id={editData?.id!} imagesId={editData?.activity_image} onDeleteImage={handleDeleteImagesSubmit} />}
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

export default ActivityPage;
