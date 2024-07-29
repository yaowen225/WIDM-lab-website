import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { ProjectTaskImageApi, Configuration } from '../../domain/api-client';

const ProjectPage = () => {
  const [projectTaskImages, setProjectTaskImages] = useState<any[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<{ id: number, uuid: string } | null>(null);

  const fetchProjectTaskImages = async () => {
    const configuration = new Configuration();
    const apiClient = new ProjectTaskImageApi(configuration);
    try {
      const response = await apiClient.projectTaskImageGet();
      const data: any = response.data.response;
      setProjectTaskImages(data);
      console.log(data);
    } catch (error) {
      console.error('API 調用失敗:', (error as Error).message);
      if ((error as any).response) {
        console.error('API Response Error:', (error as any).response.body);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fileInput = event.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      formData.append('image', fileInput.files[0]);
    } else {
      setErrorMessage('請選擇圖片上傳!');
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
      return;
    }
    handleUploadImageSubmit(Object.fromEntries(formData.entries()));
  };

  const handleUploadImageSubmit = async (formData: { [key: string]: any }) => {
    const configuration = new Configuration();
    const apiClient = new ProjectTaskImageApi(configuration);
    try {
      await apiClient.projectTaskImagePost(formData.image);
      fetchProjectTaskImages();
      setSuccessMessage('圖片上傳成功!');
      setShowSuccessMessage(true);
      resetForm(document.querySelector('form')!)
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

  const handleDeleteImagesSubmit = async (uuid: string) => {
    const configuration = new Configuration();
    const apiClient = new ProjectTaskImageApi(configuration);
    try {
      await apiClient.projectTaskImageProjectTaskImageUuidDelete(uuid);
      fetchProjectTaskImages();
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

  const resetForm = (form: HTMLFormElement) => {
    form.reset();
  };

  const handleDeleteClick = (id: number, uuid: string) => {
    setImageToDelete({ id, uuid });
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    if (imageToDelete) {
      handleDeleteImagesSubmit(imageToDelete.uuid);
    }
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setImageToDelete(null);
    setShowDeleteConfirmation(false);
  };

  useEffect(() => {
    fetchProjectTaskImages();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Project Task Image" />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8">
          <div>
            <label className="mb-3 block text-black dark:text-white">上傳圖片</label>
            <input
              type="file"
              accept="image/*"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              className="rounded-md border border-stroke bg-transparent py-3 px-6 text-black dark:text-white"
              onClick={() => resetForm(document.querySelector('form')!)}
            >
              取消
            </button>
            <button
              type="submit"
              className="rounded-md border border-primary bg-primary py-3 px-6 text-white"
            >
              上傳
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-6">
        <div className="relative rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th scope="col" className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    圖片
                  </th>
                  <th scope="col" className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    動作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projectTaskImages.map((projectTaskImage) => (
                  <tr key={projectTaskImage.id} className="hover:bg-gray-50 dark:hover:bg-meta-4">
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                      <img
                        src={`https://widm-back-end.nevercareu.space/project/task/image/${projectTaskImage.image_uuid}`}
                        alt={projectTaskImage.project_name}
                        className="w-20 h-20 object-cover"
                      />
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                      <button
                        className="ml-4 rounded-md border border-red-500 bg-red-500 py-2 px-4 text-white"
                        onClick={() => handleDeleteClick(projectTaskImage.id, projectTaskImage.image_uuid)}
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-black">確定要刪除此圖片嗎？</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-gray-300 text-black py-2 px-4 rounded"
                onClick={cancelDelete}
              >
                取消
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={confirmDelete}
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default ProjectPage;
