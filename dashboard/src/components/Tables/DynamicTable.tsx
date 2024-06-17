import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { LuImagePlus, LuImageMinus } from "react-icons/lu";
import { FiFilePlus, FiFileMinus } from "react-icons/fi";
import { Tag } from 'antd';

interface TableProps {
  headers: Array<{ id: string; Name: string; isShow: string | boolean; type: string }>;
  data: Array<{ [key: string]: any }>;
  onDelete: (id: number) => void;
  onEdit: (row: { [key: string]: any }) => void;
  onUploadFile?: (row: { [key: string]: any }) => void;
  onDeleteFiles?: (row: { [key: string]: any }) => void;
}

const DynamicTable: React.FC<TableProps> = ({ headers, data, onDelete, onEdit, onUploadFile, onDeleteFiles }) => {
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
    <div className="relative rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11"
                >
                  {header.isShow === 'true' || header.isShow === true ? header.Name : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-meta-4">
                {headers.map((header) => (
                  <td key={header.id} className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                    {/* header.id === 'actions' 新增 修改 刪除 */}
                    {header.id === 'actions' ? (
                      <div className="flex items-center space-x-3.5">
                        <button className="hover:text-primary" onClick={() => onEdit(row)}>
                          <FaEdit />
                        </button>
                        <button
                          className="hover:text-primary"
                          onClick={() => handleDeleteClick(row.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    ) : header.id === 'imageActions' && (onUploadFile || onDeleteFiles) ? ( 
                      <div className="flex items-center space-x-3.5">
                        {onEdit && (
                          <button className="hover:text-primary" onClick={() => onEdit(row)}>
                            <FaEdit />
                          </button>
                        )}
                        <button
                          className="hover:text-primary"
                          onClick={() => handleDeleteClick(row.id)}
                        >
                          <FaTrashAlt />
                        </button>
                        {onUploadFile && !row[header.Name] && (
                          <button
                            className="hover:text-primary"
                            onClick={() => onUploadFile(row)}
                          >
                            <LuImagePlus />
                          </button>
                        )}
                        {onDeleteFiles && row[header.Name] && (
                          <button
                            className="hover:text-primary"
                            onClick={() => onDeleteFiles(row)}
                          >
                            <LuImageMinus />
                          </button>
                        )}
                      </div>
                    ) : header.id === 'imagesActions' && (onUploadFile || onDeleteFiles) ? (
                      <div className="flex items-center space-x-3.5">
                        {onEdit && (
                          <button className="hover:text-primary" onClick={() => onEdit(row)}>
                            <FaEdit />
                          </button>
                        )}
                        <button
                          className="hover:text-primary"
                          onClick={() => handleDeleteClick(row.id)}
                        >
                          <FaTrashAlt />
                        </button>
                        {onUploadFile && (
                          <button
                            className="hover:text-primary"
                            onClick={() => onUploadFile(row)}
                          >
                            <LuImagePlus />
                          </button>
                        )}
                        {onDeleteFiles && row[header.Name] != null && (
                          <button
                            className="hover:text-primary"
                            onClick={() => onDeleteFiles(row)}
                          >
                            <LuImageMinus />
                          </button>
                        )}
                      </div>
                    ) : header.id === 'attachmentActions' ? (
                      <div className="flex items-center space-x-3.5">
                        {onEdit && (
                          <button className="hover:text-primary" onClick={() => onEdit(row)}>
                            <FaEdit />
                          </button>
                        )}
                        <button
                          className="hover:text-primary"
                          onClick={() => handleDeleteClick(row.id)}
                        >
                          <FaTrashAlt />
                        </button>
                        {onUploadFile && !row[header.Name] && (
                          <button
                            className="hover:text-primary"
                            onClick={() => onUploadFile(row)}
                          >
                            <FiFilePlus />
                          </button>
                        )}
                        {onDeleteFiles && row[header.Name] && (
                          <button
                            className="hover:text-primary"
                            onClick={() => onDeleteFiles(row)}
                          >
                            <FiFileMinus />
                          </button>
                        )}
                      </div>
                    ) : header.type === 'Tags' ? (
                      <div className="flex flex-wrap">
                        {row[header.id] ? row[header.id].map((tag: string, index: number) => (
                          <Tag key={index} className="mb-1 mr-1">
                            {tag}
                          </Tag>
                        )) : <></>}
                      </div>
                    ) : (
                      <span className="text-black dark:text-white">
                        {header.isShow === 'true' || header.isShow === true ? row[header.id] : ''}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 刪除用 */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
