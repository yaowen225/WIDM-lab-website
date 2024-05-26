import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import DynamicTable from '../components/Tables/DynamicTable';
import AddItemForm from '../components/Forms/AddItemForm';
import { ActivityApi, Configuration } from '../../domain/api-client';
import type { ActivityResponse, ActivityPostRequest } from 'domain/api-client';

const ActivityPage = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const headers = [
    { id: 'id', Name: 'Id', isShow: 'true', type: 'Number' },
    { id: 'activity_title', Name: 'Activity_title', isShow: 'true', type: 'String' },
    { id: 'activity_sub_title', Name: 'Activity_sub_title', isShow: 'true', type: 'String' },
    { id: 'actions', Name: 'Actions', isShow: 'false', type: 'Null' },
  ];

  const fetchActivities = async () => {
    const configuration = new Configuration({ basePath: '/api' });
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
    setIsAdding(true);
  };

  const handleCloseForm = () => {
    setIsAdding(false);
  };

  const createActivitie = async (formData: { [key: string]: any }) => {
    const newActivity: ActivityPostRequest = {
      activity_title: formData.activity_title,
      activity_sub_title: formData.activity_sub_title,
      // 根據你的需求，添加其他需要的字段
    };

    const configuration = new Configuration({ basePath: '/api' });
    const apiClient = new ActivityApi(configuration);
    try {
      await apiClient.activityPost(newActivity);
      setIsAdding(false);
      fetchActivities();  // 新增後重新獲取活動數據
    } catch (error) {
      console.error('API 創建失敗:', (error as Error).message);
      if ((error as any).response) {
        console.error('API Response Error:', (error as any).response.body);
      }
    }
  };

  const deleteActivitie = async (id: number) => {
    const configuration = new Configuration({ basePath: '/api' });
    const apiClient = new ActivityApi(configuration);
    try {
      await apiClient.activityActivityIdDelete(id);
      fetchActivities(); // 刪除後重新獲取活動數據
    } catch (error) {
      console.error('API 刪除失敗:', (error as Error).message);
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
        <DynamicTable data={activities} headers={headers} onDelete={deleteActivitie} />
      </div>
      {isAdding && <AddItemForm headers={headers} onClose={handleCloseForm} onSubmit={createActivitie} />}
    </DefaultLayout>
  );
};

export default ActivityPage;
