// import React, { useState, useEffect } from 'react';
// import { Modal, Button } from 'antd';
// import { ProjectTaskImageApi, Configuration } from '../../domain/api-client';

// interface TaskImage {
//   id: number;
//   image_name: string;
//   image_path: string;
//   image_uuid: string;
// }

// interface ImportImageModalProps {
//   open: boolean;
//   onClose: () => void;
//   onSelectImage: (image: TaskImage) => void;
// }

// const ImportImageModal: React.FC<ImportImageModalProps> = ({ open, onClose, onSelectImage }) => {
//   const [images, setImages] = useState<TaskImage[]>([]);

//   const fetchImages = async () => {
//     const configuration = new Configuration();
//     const apiClient = new ProjectTaskImageApi(configuration);
//     try {
//       const response = await apiClient.projectTaskImageGet();
//       const data: any = response.data.response;
//       console.log(data);
//       setImages(data);
//     } catch (error) {
//       console.error('API 調用失敗:', (error as Error).message);
//       if ((error as any).response) {
//         console.error('API Response Error:', (error as any).response.body);
//       }
//     }
//   };

//   useEffect(() => {
//     if (open) {
//       fetchImages();
//     }
//   }, [open]);

//   return (
//     <Modal
//       title="匯入圖片"
//       open={open}
//       onCancel={onClose}
//       footer={null}
//     >
//       <div className="flex flex-col gap-4 p-6">
//         <div>
//           <label className="mb-2 block text-black">選擇圖片</label>
//           <div className="flex flex-col gap-3">
//             {images.map(image => (
//               <div key={image.id} className="flex items-center justify-between">
//                 <img
//                   src={`https://widm-back-end.nevercareu.space/project/task/image/${image.image_uuid}`}
//                   alt={`Image ${image.image_name}`}
//                   className="w-60 h-60 object-cover"
//                 />
//                 <button
//                   onClick={() => onSelectImage(image)}
//                   className="rounded-md border border-blue-500 bg-blue-500 py-2 px-4 text-white"
//                 >
//                   匯入
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="flex justify-end gap-2">
//           <Button onClick={onClose} className="rounded-md border border-stroke bg-transparent py-2 px-4 text-black">
//             取消
//           </Button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ImportImageModal;
