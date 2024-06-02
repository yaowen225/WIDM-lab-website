import React from 'react';

interface DeleteImagesProps {
  action: string;
  onClose: () => void;
  activityId: number;
  imagesId: string[];
}

const DeleteImages: React.FC<DeleteImagesProps> = ({ onClose, action, activityId, imagesId }) => {
  const handleDelete = (imageId: number) => {
    // 執行刪除操作
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-2/4 max-w-2xl rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
          <h3 className="text-lg font-medium text-black dark:text-white">Delete Images</h3>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <div>
            <label className="mb-2 block text-black dark:text-white">選擇圖片</label>
            <div className="flex flex-col gap-3">
              {imagesId.map(imageId => (
                <div key={imageId} className="flex items-center justify-between">
                  <img
                    src={`https://widm-back-end.nevercareu.space/${action}/${activityId}/${action}-image/${imageId}`}
                    alt={`Image ${imageId}`}
                    className="w-60 h-60 object-cover"
                  />
                  <button
                    onClick={() => handleDelete(Number(imageId))}
                    className="rounded-md border border-red-500 bg-red-500 py-2 px-4 text-white"
                  >
                    刪除
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-stroke bg-transparent py-2 px-4 text-black dark:text-white"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteImages;
