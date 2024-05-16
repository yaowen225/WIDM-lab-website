// pages/test-post-api.js
import React, { useState } from 'react';
import PaperApi from '../api-client/src/api/PaperApi';

const TestPostApi = () => {
  const [formData, setFormData] = useState({
    paper_publish_year: 2023,
    paper_title: '',
    paper_origin: '',
    paper_link: ''
  });
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiClient = new PaperApi();
    try {
      const result = await apiClient.paperPost(
        formData.paper_publish_year,
        formData.paper_title,
        formData.paper_origin,
        formData.paper_link
      );
      console.log('API 返回数据:', result); // 调试信息
      setData(result);
    } catch (error) {
      console.error('API 调用失败:', error);
      setError(error.message);
    }
  };

  if (error) {
    return <div>API 调用失败: {error}</div>;
  }

  return (
    <div>
      <h1>测试 POST 请求</h1>
      <form onSubmit={handleSubmit}>
        <label>
          论文发布年份:
          <input type="number" name="paper_publish_year" value={formData.paper_publish_year} onChange={handleChange} />
        </label>
        <br />
        <label>
          论文标题:
          <input type="text" name="paper_title" value={formData.paper_title} onChange={handleChange} />
        </label>
        <br />
        <label>
          论文来源:
          <input type="text" name="paper_origin" value={formData.paper_origin} onChange={handleChange} />
        </label>
        <br />
        <label>
          论文链接:
          <input type="text" name="paper_link" value={formData.paper_link} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">提交</button>
      </form>
      {data && (
        <div>
          <h2>API 响应数据</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TestPostApi;
