import React, { useState, useEffect } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

interface Header {
  id: string;
  Name: string;
  isShow: string | boolean;
  type: string;
}

interface AddItemFormProps {
  headers: Header[];
  onClose: () => void;
  onSubmit: (formData: { [key: string]: any }) => void;
  editData?: { [key: string]: any } | null;
}

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
  }, [editData, headers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    console.log(updatedTags)
  };

  const handleAdditionTag = (tag: any, id: string) => {
    const updatedTags = [...(formData[id] || []), tag];
    setFormData({
      ...formData,
      [id]: updatedTags.length > 0 ? updatedTags : [],
    });
    console.log(updatedTags)
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
        <div
          key={header.id}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus-within:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus-within:border-primary"
        >
          <ReactTags
            tags={formData[header.id] || []}
            handleDelete={(i: number) => handleDeleteTag(i, header.id)}
            handleAddition={(tag) => handleAdditionTag(tag, header.id)}
            inputFieldPosition="inline"
            autocomplete
            classNames={{
              root: 'react-tags__root',
              rootFocused: 'react-tags__root--focused',
              selected: 'react-tags__selected',
              selectedTag: 'react-tags__selected-tag',
              selectedTagName: 'react-tags__selected-tag-name',
              search: 'react-tags__search',
              searchInput: 'react-tags__search-input',
              suggestions: 'react-tags__suggestions',
              suggestionActive: 'react-tags__suggestion--active',
              suggestionDisabled: 'react-tags__suggestion--disabled',
            }}
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-3/4 max-w-4xl rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-6 px-8 dark:border-strokedark">
          <h3 className="text-lg font-medium text-black dark:text-white">Add New Item</h3>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8">
          {headers
            .filter((header) => header.id !== 'id' && header.id !== 'actions' && header.id !== 'imageActions' && header.id !== 'imagesActions'  && header.id !== 'attachmentActions')
            .map((header) => (
              <div key={header.id}>
                <label className="mb-3 block text-black dark:text-white">{header.Name}</label>
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
