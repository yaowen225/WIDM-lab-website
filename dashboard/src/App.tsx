import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import ECommerce from './pages/Dashboard/ECommerce';
import Activity from './pages/Activity';
import News from './pages/News';
import Paper from './pages/Paper';
import Project from './pages/Project';
import Project_Task from './pages/Project_Task';
import Member from './pages/Member';
import NotFound from './pages/NotFound'
import Unauthorized from './pages/Unauthorized';

import { AuthApi } from '../domain/api-client/api';
import { Configuration} from '../domain/api-client/configuration';
const App: React.FC = () => {
  const { pathname } = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const user_info_get = async () => {
    const configuration = new Configuration({ basePath: '/api' });
    const apiClient = new AuthApi(configuration);
    const response = await apiClient.authUserInfoGet()

    console.log(response.data)
  }
  
  useEffect(() => {
    user_info_get()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return true ? (
    <Routes>
      <Route
        index
        element={
          <>
            <PageTitle title="Signin | WIDM " />
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
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/activity"
          element={
            <>
              <PageTitle title="Activity | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Activity />
            </>
          }
        />
        <Route
          path="/member"
          element={
            <>
              <PageTitle title="Member | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Member />
            </>
          }
        />
        <Route
          path="/news"
          element={
            <>
              <PageTitle title="News | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <News />
            </>
          }
        />
        <Route
          path="/paper"
          element={
            <>
              <PageTitle title="Paper | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Paper />
            </>
          }
        />
        <Route
          path="/project"
          element={
            <>
              <PageTitle title="Project | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Project />
            </>
          }
        />
        <Route
          path="/project_task"
          element={
            <>
              <PageTitle title="Project Task | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Project_Task />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | WIDM " />
              <SignIn />
            </>
          }
        />
        <Route
          path="*"
          element={<NotFound />} // 404 頁面
        />
      </Routes>
    </>
  );
}

export default App;
