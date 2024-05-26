import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import DynamicTable from '../components/Tables/DynamicTable';
import AddItemForm from '../components/Forms/AddItemForm';
import { ActivityApi, Configuration } from '../../domain/api-client';
import type { ActivityResponse, Activity } from 'domain/api-client';

const ActivityPage = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const headers = [
    { id: 'id', Name: 'Id', isShow: 'true', type: 'Number' },
    { id: 'activity_title', Name: 'Activity_title', isShow: 'true', type: 'String' },
    { id: 'activity_sub_title', Name: 'Activity_sub_title', isShow: 'true', type: 'String' },
    { id: 'actions', Name: 'Actions', isShow: 'false', type: 'Null' },
  ];

  useEffect(() => {
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

    fetchActivities();
  }, []);

  const handleAddNewItem = () => {
    setIsAdding(true);
  };

  const handleCloseForm = () => {
    setIsAdding(false);
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
        <DynamicTable data={activities} headers={headers} />
      </div>
      {isAdding && <AddItemForm headers={headers} onClose={handleCloseForm} />}
    </DefaultLayout>
  );
};

export default ActivityPage;
