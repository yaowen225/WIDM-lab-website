import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import DynamicTable from '../components/Tables/DynamicTable';
import AddItemForm from '../components/Forms/AddItemForm';
import UploadAttachmentForm from '../components/Forms/UploadAttachmentForm';
import DeleteFiles from '../components/Forms/DeleteFiles';
import { PaperApi, PaperAttachmentApi, Configuration } from '../../domain/api-client';
import type { PaperPostRequest } from 'domain/api-client';

const PaperPage = () => {
  const [papers, setPapers] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeletingFiles, setIsDeletingFiles] = useState(false);
  const [editData, setEditData] = useState<{ [key: string]: any } | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const headers = [
    { id: 'id', Name: 'Id', isShow: 'true', type: 'Number' },
    { id: 'paper_title', Name: '論文標題', isShow: 'true', type: 'String' },
    { id: 'paper_link', Name: '論文連結', isShow: 'true', type: 'String', isEnable: 'false' },
    { id: 'paper_origin', Name: '論文來源', isShow: 'true', type: 'String' },
    { id: 'paper_publish_year', Name: '論文發布年分', isShow: 'true', type: 'Number' },
    { id: 'paper_authors', Name: '論文作者', isShow: 'true', type: 'Tags' },
    { id: 'paper_tags', Name: '論文標籤', isShow: 'true', type: 'Tags' },
    { id: 'attachmentActions', Name: 'paper_attachment', isShow: 'false', type: 'Null' },
  ];

  const fetchPapers = async () => {
    const configuration = new Configuration({ basePath: '/api' });
    const apiClient = new PaperApi(configuration);
    try {
      const response = await apiClient.paperGet();
      const data: any = response.data.response;
      setPapers(data);
      console.log(data);
    } catch (error) {
      console.error('API 調用失敗:', (error as Error).message);
      if ((error as any).response) {
        console.error('API Response Error:', (error as any).response.body);
      }
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleAddNewItem = () => {
    setEditData(null); // 新增時清空 editData
    setIsAdding(true);
  };

  const handleEditItem = (row: { [key: string]: any }) => {
    setEditData(row); // 將當前資料設為 editData
    setIsAdding(true);
  };

  const handleUploadAttachment = (row: { [key: string]: any }) => {
    setEditData(row);
    setIsUploading(true);
  };

  const handleDeleteFiles = (row: { [key: string]: any }) => {
    setEditData(row);
    setIsDeletingFiles(true);
  };

  const handleCloseForm = () => {
    setIsAdding(false);
  };

  const handleCloseUploadAttachment = () => {
    setIsUploading(false);
  };

  const handleCloseDeleteFiles = () => {
    setIsDeletingFiles(false);
  };

  const createPaper = async (formData: { [key: string]: any }) => {
    const newPaper: PaperPostRequest = {
      paper_title: formData.paper_title,
      paper_link: formData.paper_link,
      paper_origin: formData.paper_origin,
      paper_publish_year: formData.paper_publish_year,
      paper_authors: formData.paper_authors ? formData.paper_authors.map((author: { id: string; text: string; className: string }) => author.text) : null,
      paper_tags: formData.paper_tags ? formData.paper_tags.map((tag: { id: string; text: string; className: string }) => tag.text) : null,
    };

    const configuration = new Configuration({ basePath: '/api' });
    const apiClient = new PaperApi(configuration);
    try {
      if (editData) {
        await apiClient.paperPaperIdPatch(editData.id, newPaper); // 使用 PATCH 方法更新資料
      } else {
        await apiClient.paperPost(newPaper); // 使用 POST 方法新增資料
      }
      setIsAdding(false);
      fetchPapers();  // 新增或更新後重新獲取論文數據
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

  const handleUploadAttachmentSubmit = async (formData: { [key: string]: any }) => {
    const configuration = new Configuration({ basePath: '/api' });
    const apiClient = new PaperAttachmentApi(configuration);
    try {
      if (editData) {
        await apiClient.paperPaperIdPaperAttachmentPost(editData.id, formData.attachment);
      }
      setIsUploading(false);
      fetchPapers();
      setSuccessMessage('附件上傳成功!');
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('附件上傳失敗:', (error as Error).message);
      setErrorMessage('附件上傳失敗!');
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
      if ((error as any).response) {
        console.error('API Response Error:', (error as any).response.body);
      }
    }
  };

  const handleDeleteFileSubmit = async (id: number, fileId: string) => {
    const configuration = new Configuration({ basePath: '/api' });
    const apiClient = new PaperAttachmentApi(configuration);
    try {
      await apiClient.paperPaperIdPaperAttachmentPaperAttachmentUuidDelete(id, fileId);
      setIsDeletingFiles(false);
      fetchPapers(); // 刪除後重新獲取論文數據
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

  const deletePaper = async (id: number) => {
    const configuration = new Configuration({ basePath: '/api' });
    const apiClient = new PaperApi(configuration);
    try {
      await apiClient.paperPaperIdDelete(id);
      fetchPapers(); // 刪除後重新獲取論文數據
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
      <Breadcrumb pageName="Paper" />
      <div className="flex justify-end mb-1">
        <button
          onClick={handleAddNewItem}
          className="inline-flex items-center justify-center rounded-md border border-meta-3 py-1 px-3 text-center font-medium text-meta-3 hover:bg-opacity-90"
        >
          新增
        </button>
      </div>
      <div className="flex flex-col gap-6">
        <DynamicTable data={papers} headers={headers} onDelete={deletePaper} onEdit={handleEditItem} onUploadFile={handleUploadAttachment} onDeleteFiles={handleDeleteFiles} />
      </div>
      {isAdding && <AddItemForm headers={headers} onClose={handleCloseForm} onSubmit={createPaper} editData={editData} />}
      {isUploading && <UploadAttachmentForm onClose={handleCloseUploadAttachment} onSubmit={handleUploadAttachmentSubmit} />}
      {isDeletingFiles && <DeleteFiles action="paper" id={editData!.id} fileId={editData!.paper_attachment} onClose={handleCloseDeleteFiles} onDeleteFile={handleDeleteFileSubmit} />}
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

export default PaperPage;
