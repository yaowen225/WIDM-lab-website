import React, { useState, useEffect, useRef } from 'react';

interface ImageManagementProps {
  action_1: string;
  action_2: string;
  id: number;
  imagesId?: string[];
  imageId?: string;
  onUploadImage: (formData: { [key: string]: any }) => void;
  onDeleteImage: (id: number, imageId: string) => void;
  onClose: () => void;
}

const ImageManagement: React.FC<ImageManagementProps> = ({ onClose, action_1, action_2, id, imagesId: initialImagesId, onUploadImage, onDeleteImage }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagesId, setImagesId] = useState<string[]>(initialImagesId || []);
  const [confirmingDelete, setConfirmingDelete] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImagesId(initialImagesId || []);
  }, [initialImagesId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageFile) {
      const uploadData = {
        ...formData,
        image: imageFile,
      };
      onUploadImage(uploadData);
      setImageFile(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    } else {
      onUploadImage(formData);
    }
  };

  const handleDeleteClick = (imageId: string) => {
    setConfirmingDelete(imageId);
  };

  const handleConfirmDelete = () => {
    if (confirmingDelete) {
      onDeleteImage(id, confirmingDelete);
      setImagesId(imagesId.filter(imgId => imgId !== confirmingDelete));
      setConfirmingDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmingDelete(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-3/4 max-w-4xl rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-6 px-8 dark:border-strokedark">
          <h3 className="text-lg font-medium text-black dark:text-white">Images Management</h3>
        </div>
        <form onSubmit={handleUploadSubmit} className="flex flex-col gap-6 p-8">
          <div>
            <label className="mb-3 block text-black dark:text-white">上傳圖片</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={inputRef}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
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
              上傳
            </button>
          </div>
        </form>
        <div className="border-t border-stroke py-6 px-8 dark:border-strokedark">
          <h3 className="text-lg font-medium text-black dark:text-white">刪除圖片</h3>
          <div className="max-h-80 overflow-y-auto flex flex-col gap-4">
            {imagesId.map(imageId => (
                <div key={imageId} className="flex items-center justify-between">
                  <img
                    src={`https://widm-back-end.nevercareu.space/${action_1}/${id}/${action_2}/${imageId}`}
                    alt={`Image ${imageId}`}
                    className="w-60 h-60 object-cover"
                  />
                  <button
                    onClick={() => handleDeleteClick(imageId)}
                    className="rounded-md border border-red-500 bg-red-500 py-2 px-4 text-white"
                  >
                    刪除
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      {confirmingDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h3 className="text-lg font-medium text-black dark:text-white mb-4">確認刪除</h3>
            <p className="mb-4 text-black dark:text-white">是否確定刪除此圖片?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancelDelete}
                className="rounded-md border border-stroke bg-transparent py-2 px-4 text-black dark:text-white"
              >
                取消
              </button>
              <button
                onClick={handleConfirmDelete}
                className="rounded-md border border-red-500 bg-red-500 py-2 px-4 text-white"
              >
                確定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageManagement;
