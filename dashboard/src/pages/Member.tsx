import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import DynamicTable from '../components/Tables/DynamicTable';
import AddItemForm from '../components/Forms/AddItemForm';
import UploadImage from '../components/Forms/UploadImageForm';
import DeleteImages from '../components/Forms/DeleteImages';
import { MemberApi, Configuration, MemberImageApi } from '../../domain/api-client';
import type { MemberInput, MembersResponseInner } from 'domain/api-client';

const MemberPage = () => {
  const [members, setMembers] = useState<MembersResponseInner[]>([]);
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
    { id: 'member_name', Name: '名稱', isShow: 'true', type: 'String' },
    { id: 'member_name_en', Name: '英文名稱', isShow: 'true', type: 'String' },
    { id: 'member_intro', Name: '介紹', isShow: 'true', type: 'Textarea' },
    { id: 'member_character', Name: '職位', isShow: 'true', type: 'String' },
    { id: 'imageActions', Name: 'member_image', isShow: 'false', type: 'Null' },
  ];

  const fetchMembers = async () => {
    const configuration = new Configuration();
    const apiClient = new MemberApi(configuration);
    try {
      const response = await apiClient.memberGet();
      const data = response.data.response as MembersResponseInner[];
      setMembers(data);
      console.log(data);
    } catch (error) {
      console.error('API 調用失敗:', (error as Error).message);
      if ((error as any).response) {
        console.error('API Response Error:', (error as any).response.body);
      }
    }
  };

  useEffect(() => {
    fetchMembers();
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

  const createMember = async (formData: { [key: string]: any }) => {
    const newMember: MemberInput = {
      member_name: formData.member_name,
      member_name_en: formData.member_name_en,
      member_intro: formData.member_intro,
      member_character: formData.member_character,
    };

    const configuration = new Configuration();
    const apiClient = new MemberApi(configuration);
    try {
      if (editData) {
        await apiClient.memberMemberIdPatch(editData.id, newMember);
      } else {
        await apiClient.memberPost(newMember);
      }
      setIsAdding(false);
      fetchMembers();  // 新增或更新後重新獲取成員數據
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
    const configuration = new Configuration();
    const apiClient = new MemberImageApi(configuration);
    try {
      if (editData) {
        await apiClient.memberMemberIdMemberImagePost(editData.id, formData.image);
      }
      setIsUploading(false);
      fetchMembers();
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
    const apiClient = new MemberImageApi(configuration);
    try {
      await apiClient.memberMemberIdMemberImageMemberImageUuidDelete(id, imageId);
      setIsDeletingImages(false);
      fetchMembers();
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

  const deleteMember = async (id: number) => {
    const configuration = new Configuration();
    const apiClient = new MemberApi(configuration);
    try {
      await apiClient.memberMemberIdDelete(id);
      fetchMembers(); // 刪除後重新獲取成員數據
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
      <Breadcrumb pageName="Member" />
      <div className="flex justify-end mb-1">
        <button
          onClick={handleAddNewItem}
          className="inline-flex items-center justify-center rounded-md border border-meta-3 py-1 px-3 text-center font-medium text-meta-3 hover:bg-opacity-90"
        >
          新增
        </button>
      </div>
      <div className="flex flex-col gap-6">
        <DynamicTable data={members} headers={headers} onDelete={deleteMember} onEdit={handleEditItem} onUploadFile={handleUploadImage} onDeleteFiles={handleDeleteImages} />
      </div>
      {isAdding && <AddItemForm headers={headers} onClose={handleCloseForm} onSubmit={createMember} editData={editData} />}
      {isUploading && <UploadImage onClose={handleCloseUploadImage} onSubmit={handleUploadImageSubmit} />}
      {isDeletingImages && <DeleteImages onClose={handleCloseDeleteImages} action_1={'member'} action_2={'member-image'} id={editData?.id!} imageId={editData?.member_image} onDeleteImage={handleDeleteImagesSubmit} />}
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

export default MemberPage;
