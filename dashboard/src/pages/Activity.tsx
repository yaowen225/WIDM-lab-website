import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableThree from '../components/Tables/TableThree';
import DefaultLayout from '../layout/DefaultLayout';
import { ActivityApi, Configuration } from '../../domain/api-client'; // 正常導入
import type { ActivityResponse, Activity } from '../../domain/api-client'; // 僅類型導入

const ActivityComponent = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const configuration = new Configuration({ basePath: '/api' });
      const apiClient = new ActivityApi(configuration);
      try {
        const response = await apiClient.activityGet(); // 確保返回值是正確的
        const data: any = response.data.response; // 假設 response.data 是 ActivityResponse 類型的數組
        setActivities(data); // 確保 data 是 Activity 的數組
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

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Activity" />
      <div className="flex flex-col gap-10">
        <TableThree /> {/* 確保 TableThree 組件接收 activities 作為 prop */}
      </div>
    </DefaultLayout>
  );
};

export default ActivityComponent;
