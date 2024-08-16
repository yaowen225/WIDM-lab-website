import React, { useEffect, useState } from 'react';
import JoditEditor from 'jodit-react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import DynamicTable from '../components/Tables/DynamicTable';
import { Spin } from 'antd';
import { defaultHttp } from '../utils/http';
import { processDataRoutes } from '../routes/api';
import { storedHeaders } from '../utils/storedHeaders';
import { handleErrorResponse } from '../utils';

interface Header {
  id: string;
  Name: string;
  isShow: string;
  type: string;
  isEnable?: string;
}

interface AddItemFormProps {
  headers: Header[];
  onClose: () => void;
  onSubmit: (formData: { [key: string]: any }) => void;
  editData?: { [key: string]: any } | null;
}

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
    }),
    []
  );

  const headers: Header[] = [
    { id: 'id', Name: 'Id', isShow: 'true', type: 'Number' },
    { id: 'title', Name: '標題', isShow: 'true', type: 'String' },
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
        sub_title: formData.sub_title,
        content: formData.content,
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

  const AddItemForm: React.FC<AddItemFormProps> = ({ headers, onClose, onSubmit, editData }) => {
    const [formData, setFormData] = useState<{ [key: string]: any }>({});
  
    useEffect(() => {
      if (editData) {
        const cleanEditData = { ...editData };
        headers.forEach((header) => {
          if (header.type === 'Tags' && editData[header.id]) {
            cleanEditData[header.id] = editData[header.id].map((item: any) =>
              typeof item === 'string' ? { id: item, text: item } : item
            );
          }
        });
        setFormData(cleanEditData);
      }
    }, [editData, headers]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleEditorChange = (value: string, name: string) => {
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
      onClose();
    };
  
    const renderInputField = (header: Header) => {
      if (header.type === 'Textarea') {
        return (
          <textarea
            key={header.id}
            name={header.id}
            placeholder={header.Name}
            value={formData[header.id] || ''}
            onChange={handleChange}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            rows={4}
          />
        );
      } else if (header.type === 'jodit') {
        return (
          <JoditEditor
            key={header.id}
            value={formData[header.id]}
            onBlur={(value) => handleEditorChange(value, header.id)}
            config={config}
          />
        );
      }
      return (
        <input
          key={header.id}
          type="text"
          name={header.id}
          placeholder={header.Name}
          value={formData[header.id] || ''}
          onChange={handleChange}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      );
    };
  
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
        <div className="w-3/4 max-w-4xl rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-6 px-8 dark:border-strokedark">
            <h3 className="text-lg font-medium text-black dark:text-white">Add New Item</h3>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 max-h-[80vh] overflow-y-auto">
            {headers
              .filter((header) => header.id !== 'id' && header.id !== 'actions' && header.id !== 'imageActions' && header.id !== 'imagesActions' && header.id !== 'attachmentActions')
              .map((header) => (
                <div key={header.id}>
                  <label className="mb-3 block text-black dark:text-white">{header.Name}</label>
                  {renderInputField(header)}
                </div>
              ))}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-stroke bg-transparent py-3 px-6 text-black dark:text-white"
              >
                取消
              </button>
              <button
                type="submit"
                className="rounded-md border border-primary bg-primary py-3 px-6 text-white"
              >
                {editData ? '更新' : '新增'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
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
        {isAdding && <AddItemForm headers={headers} onClose={handleCloseForm} onSubmit={createNews} editData={editData} />}
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
