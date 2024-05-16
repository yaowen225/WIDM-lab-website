// pages/test-api.js
import React, { useEffect, useState } from 'react';
import { PaperApi } from '../api-client/src';

const TestApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPapers = async () => {
      const apiClient = new PaperApi();
      try {
        const data = await apiClient.paperGet();
        console.log(data.response)
        setData(data);
      } catch (error) {
        console.error('API 调用失败:', error);
        setError(error.message);
      }
    };

    fetchPapers();
  }, []);

  if (error) {
    return <div>API 调用失败: {error}</div>;
  }

  if (!data) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <h1>API 响应数据</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TestApi;
