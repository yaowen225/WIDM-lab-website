import React from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

interface TableProps {
  headers: Array<{ id: string; Name: string; isShow: string | boolean; type: string }>;
  data: Array<{ [key: string]: any }>;
}

const DynamicTable: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
                    {header.id === 'actions' ? (
                      <div className="flex items-center space-x-3.5">
                        {/* <button className="hover:text-primary">
                          <FaEye />
                        </button> */}
                        <button className="hover:text-primary">
                          <FaEdit />
                        </button>
                        <button className="hover:text-primary">
                          <FaTrashAlt />
                        </button>
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
    </div>
  );
};

export default DynamicTable;
