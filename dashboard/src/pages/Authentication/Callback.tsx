import React, { useEffect } from 'react';
import { UserManager } from 'oidc-client';

// 確認這裡使用 import.meta.env
const userManager = new UserManager({
  authority: 'https://portal.ncu.edu.tw',
  client_id: import.meta.env.VITE_CLIENT_ID || '',
  redirect_uri: import.meta.env.VITE_REDIRECT_URI || '',
  response_type: 'code',
  scope: 'openid profile email',
});

const Callback: React.FC = () => {
  useEffect(() => {
    userManager.signinRedirectCallback().then(user => {
      console.log(user);
      // 這裡可以將用戶信息保存到狀態或上下文中
    }).catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-white">Signing in...</div>
    </div>
  );
};

export default Callback;
