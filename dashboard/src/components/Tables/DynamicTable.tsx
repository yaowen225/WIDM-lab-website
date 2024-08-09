import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaLink } from 'react-icons/fa';
import { LuImage, LuImagePlus, LuImageMinus } from "react-icons/lu";
import { FiFilePlus, FiFileMinus } from "react-icons/fi";
import { Tag } from 'antd';

type HeaderType = {
  id: string;
  Name: string;
  isShow: string;
  type: string;
  isEnable?: string;
};

interface TableProps {
  headers: Array<HeaderType>;
  data: Array<{ [key: string]: any }>;
  onDelete: (id: number) => void;
  onEdit: (row: { [key: string]: any }) => void;
  onUploadFile?: (row: { [key: string]: any }) => void;
  onDeleteFiles?: (row: { [key: string]: any }) => void;
  onEditImage?: (row: { [key: string]: any }) => void;
}

const DynamicTable: React.FC<TableProps> = ({ headers, data, onDelete, onEdit, onUploadFile, onDeleteFiles, onEditImage }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId !== null) {
      onDelete(selectedId);
      setShowModal(false);
      setSelectedId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  return (
    <div className="relative rounded-sm border border-stroke mt-5 bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {headers.map((header) => (
                (!header.isEnable || header.isEnable === 'true') ? (
                <th
                  key={header.id}
                  scope="col"
                  className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11"
                >
                  {header.isShow === 'true' ? header.Name : ''}
                </th>
              ) : <></>))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-meta-4">
              {headers.map((header) => (
                (!header.isEnable || header.isEnable === 'true') ? (
                  <td key={header.id} className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                    {/* header.id === 'actions' 新增 修改 刪除 */}
                    {header.id === 'actions' && (
                      <div className="flex items-center space-x-3.5">
                        <button className="hover:text-primary" onClick={() => onEdit(row)}>
                          <FaEdit />
                        </button>
                        <button className="hover:text-primary" onClick={() => handleDeleteClick(row.id)}>
                          <FaTrashAlt />
                        </button>
                      </div>
                    )}
                    {header.id === 'imageActions' && (onUploadFile || onDeleteFiles) && (
                      <div className="flex items-center space-x-3.5">
                        {onEdit && (
                          <button className="hover:text-primary" onClick={() => onEdit(row)}>
                            <FaEdit />
                          </button>
                        )}
                        <button className="hover:text-primary" onClick={() => handleDeleteClick(row.id)}>
                          <FaTrashAlt />
                        </button>
                        {onUploadFile && !row[header.Name] && (
                          <button className="hover:text-primary" onClick={() => onUploadFile(row)}>
                            <LuImagePlus className="text-green-500"/>
                          </button>
                        )}
                        {onDeleteFiles && row[header.Name] && (
                          <button className="hover:text-primary" onClick={() => onDeleteFiles(row)}>
                            <LuImageMinus className="text-red-500"/>
                          </button>
                        )}
                      </div>
                    )}
                    {header.id === 'imagesActions' && (onUploadFile || onDeleteFiles || onEditImage) && (
                      <div className="flex items-center space-x-3.5">
                        {onEdit && (
                          <button className="hover:text-primary" onClick={() => onEdit(row)}>
                            <FaEdit />
                          </button>
                        )}
                        <button className="hover:text-primary" onClick={() => handleDeleteClick(row.id)}>
                          <FaTrashAlt />
                        </button>
                        {onUploadFile && (
                          <button className="hover:text-primary" onClick={() => onUploadFile(row)}>
                            <LuImagePlus className="text-green-500"/>
                          </button>
                        )}
                        {onDeleteFiles && row[header.Name] != null && (
                          <button className="hover:text-primary" onClick={() => onDeleteFiles(row)}>
                            <LuImageMinus className="text-red-500"/>
                          </button>
                        )}
                        {onEditImage && row[header.Name] != null && (
                          <button className="hover:text-primary" onClick={() => onEditImage(row)}>
                            <LuImage />
                          </button>
                        )}
                      </div>
                    )}
                    {header.id === 'attachmentActions' && (
                      <div className="flex items-center space-x-3.5">
                        {onEdit && (
                          <button className="hover:text-primary" onClick={() => onEdit(row)}>
                            <FaEdit />
                          </button>
                        )}
                        <button className="hover:text-primary" onClick={() => handleDeleteClick(row.id)}>
                          <FaTrashAlt />
                        </button>
                        {onUploadFile && !row[header.Name] && (
                          <button className="hover:text-primary" onClick={() => onUploadFile(row)}>
                            <FiFilePlus />
                          </button>
                        )}
                        {onDeleteFiles && row[header.Name] && (
                          <button className="hover:text-primary" onClick={() => onDeleteFiles(row)}>
                            <FiFileMinus />
                          </button>
                        )}
                      </div>
                    )}
                    {header.type === 'Tags' ? (
                      <div className="flex flex-wrap">
                        {row[header.id] ? row[header.id].map((tag: string, index: number) => (
                          <Tag key={index} className="mb-1 mr-1">
                            {tag}
                          </Tag>
                        )) : <></>}
                      </div>
                    ) : header.type === 'Url' ? (
                      <a href={row[header.id]} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex justify-center items-center">
                        <FaLink />
                      </a>
                    ) : (
                      <span className="text-black dark:text-white">
                        {row[header.id]}
                      </span>
                    )}
                  </td>
                ) : <></>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {/* 刪除用 */}
      {showModal && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg dark:bg-boxdark">
            <h3 className="mb-4 text-black dark:text-white">確定刪除此筆資料?</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 rounded border border-gray-300 text-black dark:text-white"
              >
                取消
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded bg-red-500 text-white"
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

export default DynamicTable;
