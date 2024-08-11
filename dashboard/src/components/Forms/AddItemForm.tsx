import React, { useState, useEffect } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

interface Header {
  id: string;
  Name: string;
  isShow: string | boolean;
  type: string;
  data?: any;
  dateType?: [PickerMode, string];
}

interface AddItemFormProps
 {
  headers: Header[];
  onClose: () => void;
  onSubmit: (formData: { [key: string]: any }) => void;
  editData?: { [key: string]: any } | null;
}

type PickerMode = 'date' | 'week' | 'month' | 'quarter' | 'year'; // 定義PickerMode類型

// dateType固定寫 'date' | 'week' | 'month' | 'quarter' | 'year'
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
  }, [editData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteTag = (i: number, id: string) => {
    const updatedTags = formData[id]?.filter((_: any, index: number) => index !== i) || [];
    setFormData({
      ...formData,
      [id]: updatedTags.length > 0 ? updatedTags : [],
    });
  };

  const handleAdditionTag = (tag: any, id: string) => {
    const updatedTags = [...(formData[id] || []), tag];
    setFormData({
      ...formData,
      [id]: updatedTags.length > 0 ? updatedTags : [],
    });
  };

  const handleDragTag = (tag: any, currPos: number, newPos: number, id: string) => {
    const newTags = formData[id]?.slice() || [];

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setFormData({
      ...formData,
      [id]: newTags,
    });
  };

  const onTagUpdate = (index: number, newTag: any, id: string) => {
    const updatedTags = formData[id]?.slice() || [];
    updatedTags.splice(index, 1, newTag);
    setFormData({
      ...formData,
      [id]: updatedTags,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const renderInputField = (header: Header) => {
    if (header.type === 'Number') {
      return (
        <input
          key={header.id}
          type="number"
          name={header.id}
          placeholder={header.Name}
          value={formData[header.id] || ''}
          onChange={handleChange}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      );
    } else if (header.type === 'Tags') {
      return (
        <div key={header.id}>
          <ReactTags
            tags={formData[header.id] || []}
            handleDelete={(i: number) => handleDeleteTag(i, header.id)}
            handleAddition={(tag) => handleAdditionTag(tag, header.id)}
            handleDrag={(tag, currPos, newPos) => handleDragTag(tag, currPos, newPos, header.id)}
            onTagUpdate={(index, newTag) => onTagUpdate(index, newTag, header.id)}
            inputFieldPosition="top"
            editable // TODO: 編輯tag的css要調整
          />
        </div>
      );
    } else if (header.type === 'Textarea') {
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
    } else if (header.type === 'Date') { // 要先設定 formatDate 和 picker
      return (
        <DatePicker
          format={header.dateType?.[1]}
          key={header.id}
          value={formData[header.id] ? dayjs(formData[header.id], header.dateType?.[1]) : null}
          onChange={(date, dateString) => {
            setFormData({
              ...formData,
              [header.id]: date ? date.format(header.dateType?.[1]) : undefined,
            });
          }}
          picker={header.dateType?.[0]}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      );
    } else if (header.type === 'Select') { // 要先設定header.data
      return (
        <select
          key={header.id}
          name={header.id}
          value={formData[header.id] || ''}
          onChange={handleChange}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          <option value="" disabled>{`選擇${header.Name}`}</option>
          {header.data?.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-3/4 max-w-4xl rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-y-auto max-h-[90%]">
        <div className="border-b border-stroke py-6 px-8 dark:border-strokedark">
          <h3 className="text-lg font-medium text-black dark:text-white">Add New Item</h3>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8">
          {headers
            .filter(
              (header) => // 關閉id為這些的欄位
                header.id !== 'id' &&
                header.id !== 'actions' &&
                header.id !== 'imageActions' &&
                header.id !== 'imagesActions' &&
                header.id !== 'attachmentActions'
            )
            .map((header) => (
              <div key={header.id}>
                <label className="mb-3 block text-black dark:text-white">
                  {header.Name}
                </label>
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

export default AddItemForm;
