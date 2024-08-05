import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import HomePage from './pages/HomePage';
import Activity from './pages/Activity';
import News from './pages/News';
import Paper from './pages/Paper';
import Project from './pages/Project';
import Project_Task from './pages/Project_Task';
import Project_Task_Image from './pages/Project_Task_Image';
import Member from './pages/Member';
import NotFound from './pages/NotFound'
import Unauthorized from './pages/Unauthorized';

import { AuthApi } from '../domain/api-client/api';
import { Configuration} from '../domain/api-client/configuration';

const App: React.FC = () => {
  const { pathname } = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  const user_info_get = async () => {
    try {
        const configuration = new Configuration({
          baseOptions: {
              withCredentials: true,
          }
        });
        const apiClient = new AuthApi(configuration);
        const response = await apiClient.authUserInfoGet();
        
        setIsAuthenticated(response.status === 200);
    } catch (error) {
        console.error('Error fetching user info:', error);
    } finally {
        setIsLoading(false); 
    }
  }
  
  useEffect(() => {
    user_info_get();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isLoading) {
    return <div>Loading...</div>; // 顯示加載指示器直到API調用完成
  }

  return true ? (
    <Routes>
      <Route
        index
        element={
          <>
            <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <HomePage />
          </>
        }
      />
      <Route path="/activity" element={<Activity />} />
      <Route path="/member" element={<Member />} />
      <Route path="/news" element={<News />} />
      <Route path="/paper" element={<Paper />} />
      <Route path="/project" element={<Project />} />
      <Route path="/project_task" element={<Project_Task />} />
      <Route path="/project_task_image" element={<Project_Task_Image />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  ) : (
    <Routes>
      <Route
        index
        element={
          <>
            <PageTitle title="Sign In | WIDM" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/auth/signin"
        element={
          <>
            <PageTitle title="Sign In | WIDM" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/loginFailed"
        element={<Unauthorized />} // 401 頁面
      />
      <Route
        path="*"
        element={<NotFound />} // 404 頁面
      />
    </Routes>
  );
}

export default App;
