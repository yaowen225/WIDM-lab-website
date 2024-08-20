import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import DynamicTable from '../components/Tables/DynamicTable';
import AddItemForm from '../components/Forms/AddItemForm';
import { Spin } from 'antd';
import { defaultHttp } from '../utils/http';
import { processDataRoutes } from '../routes/api';
import { storedHeaders } from '../utils/storedHeaders';
import { handleErrorResponse } from '../utils';

const NewsPage = () => {
  const [news, setNews] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editData, setEditData] = useState<{ [key: string]: any } | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // - Loading
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});    // 儲存各個API的loading狀態
  useEffect(() => {   // 當任何一個API的loading狀態改變時，更新isLoading
    const anyLoading = Object.values(loadingStates).some(state => state);
    setIsLoading(anyLoading);
  }, [loadingStates]);

  const config = React.useMemo(
    () => ({
      readonly: false,
      height: '500px',
      uploader: {
        url: 'https://widm-back-end.nevercareu.space/image',
        filesVariableName: () => 'file',
        withCredentials: false,
        pathVariableName: 'path',
        format: 'json',
        method: 'POST',
      },
      filebrowser: {
        ajax: {
          url: 'https://widm-back-end.nevercareu.space/image',
          method: 'GET',
        },
        permissions: {
          create: true,
          remove: true,
          rename: true,
          download: true,
        },
        fileRemove: {
          url: 'https://widm-back-end.nevercareu.space/image',
          method: 'DELETE',
          contentType: 'application/json',
        },
      },
      removeButtons: ['file', 'video'],
      style: {
        font: [
          'Arial', 
          'Georgia', 
          'Impact', 
          'Verdana', 
          'Roboto', 
          'Open Sans', 
          'Lato', 
          'Montserrat', 
          'Oswald', 
          'Raleway', 
          'Poppins', 
          'Merriweather', 
          'Ubuntu', 
          'Nunito', 
          'Rubik', 
          'Playfair Display', 
          'Quicksand', 
          'Source Sans Pro', 
          'PT Sans', 
          'Josefin Sans', 
          'Fira Sans', 
          'Libre Baskerville', 
          'Inconsolata', 
          'Arvo', 
          'Cabin', 
          'Exo', 
          'Dosis', 
          'Anton', 
          'Signika', 
          'Work Sans', 
          'Zilla Slab', 
          'Alegreya', 
          'Amatic SC', 
          'Bad Script', 
          'Baloo', 
          'Bitter', 
          'Caveat', 
          'Comfortaa', 
          'Cormorant Garamond', 
          'Crimson Text', 
          'Damion', 
          'Domine', 
          'EB Garamond', 
          'Fjalla One', 
          'Fredericka the Great', 
          'Gudea', 
          'Inknut Antiqua', 
          'Julius Sans One', 
          'Karla', 
          'Libre Franklin', 
          'Literata'
        ]
      },
      controls: {
        font: {
          list: {
            'Arial': 'Arial',
            'Georgia': 'Georgia',
            'Impact': 'Impact',
            'Verdana': 'Verdana',
            'Roboto': 'Roboto',
            'Open Sans': 'Open Sans',
            'Lato': 'Lato',
            'Montserrat': 'Montserrat',
            'Oswald': 'Oswald',
            'Raleway': 'Raleway',
            'Poppins': 'Poppins',
            'Merriweather': 'Merriweather',
            'Ubuntu': 'Ubuntu',
            'Nunito': 'Nunito',
            'Rubik': 'Rubik',
            'Playfair Display': 'Playfair Display',
            'Quicksand': 'Quicksand',
            'Source Sans Pro': 'Source Sans Pro',
            'PT Sans': 'PT Sans',
            'Josefin Sans': 'Josefin Sans',
            'Fira Sans': 'Fira Sans',
            'Libre Baskerville': 'Libre Baskerville',
            'Inconsolata': 'Inconsolata',
            'Arvo': 'Arvo',
            'Cabin': 'Cabin',
            'Exo': 'Exo',
            'Dosis': 'Dosis',
            'Anton': 'Anton',
            'Signika': 'Signika',
            'Work Sans': 'Work Sans',
            'Zilla Slab': 'Zilla Slab',
            'Alegreya': 'Alegreya',
            'Amatic SC': 'Amatic SC',
            'Bad Script': 'Bad Script',
            'Baloo': 'Baloo',
            'Bitter': 'Bitter',
            'Caveat': 'Caveat',
            'Comfortaa': 'Comfortaa',
            'Cormorant Garamond': 'Cormorant Garamond',
            'Crimson Text': 'Crimson Text',
            'Damion': 'Damion',
            'Domine': 'Domine',
            'EB Garamond': 'EB Garamond',
            'Fjalla One': 'Fjalla One',
            'Fredericka the Great': 'Fredericka the Great',
            'Gudea': 'Gudea',
            'Inknut Antiqua': 'Inknut Antiqua',
            'Julius Sans One': 'Julius Sans One',
            'Karla': 'Karla',
            'Libre Franklin': 'Libre Franklin',
            'Literata': 'Literata'
          }
        }
      }
    }),
    []
  );

  const headers = [
    { id: 'id', Name: 'Id', isShow: 'true', type: 'Number' },
    { id: 'title', Name: '標題', isShow: 'true', type: 'String', required: 'true' },
    { id: 'sub_title', Name: '副標題', isShow: 'true', type: 'String' },
    { id: 'content', Name: '內容', isShow: 'false', isEnable: 'false', type: 'jodit' },
    { id: 'actions', Name: 'Actions', isShow: 'false', type: 'Null' },
  ];

  const fetchNews = async () => {
    try {
      setLoadingStates(prev => ({ ...prev, fetchNews: true }));
      const response = await defaultHttp.get(processDataRoutes.news, {
          headers: storedHeaders()
      });
      const data = response.data.response;
      setNews(data);
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoadingStates(prev => ({ ...prev, fetchNews: false }));
    }
  };

  const createNews = async (formData: { [key: string]: any }) => {
    try {
      setLoadingStates(prev => ({ ...prev, createNews: true }));
      const newNews = {
        title: formData.title,
        sub_title: formData.sub_title || '',
        content: formData.content || '',
      };
      let response;
      if (editData) {
        response = await defaultHttp.patch(`${processDataRoutes.news}/${editData.id}`, newNews, { headers: storedHeaders() });
      } else {
        response = await defaultHttp.post(processDataRoutes.news, newNews, { headers: storedHeaders() });
      }
      setIsAdding(false);
      fetchNews();  // 新增或更新後重新獲取成員數據
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
    } finally {
      setLoadingStates(prev => ({ ...prev, createNews: false }));
    }
  };

  const deleteNews = async (id: number) => {
    try {
      setLoadingStates(prev => ({ ...prev, deleteNews: true }));
      await defaultHttp.delete(`${processDataRoutes.news}/${id}`, { headers: storedHeaders() });
      fetchNews(); // 刪除後重新獲取成員數據
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
    } finally {
      setLoadingStates(prev => ({ ...prev, deleteNews: false }));
    }
  };

  useEffect(() => {
    fetchNews();
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
  

  return (
    <Spin spinning={isLoading} tip="Loading...">
      <DefaultLayout>
        <Breadcrumb pageName="News" />
        <div className="flex justify-end mb-1">
          <button
            onClick={handleAddNewItem}
            className="inline-flex items-center justify-center rounded-md border border-meta-3 py-1 px-3 text-center font-medium text-meta-3 hover:bg-opacity-90"
          >
            新增
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <DynamicTable data={news} headers={headers} onDelete={deleteNews} onEdit={handleEditItem} />
        </div>
        {isAdding && <AddItemForm headers={headers} onClose={handleCloseForm} onSubmit={createNews} editData={editData} joditConfig={config} />}
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
    </Spin>
  );
};

export default NewsPage;
