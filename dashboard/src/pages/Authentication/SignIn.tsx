import React, { useEffect } from 'react';
import { UserManager, User } from 'oidc-client';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const userManager = new UserManager({
  authority: 'https://portal.ncu.edu.tw',
  client_id: import.meta.env.VITE_CLIENT_ID || '',
  redirect_uri: import.meta.env.VITE_REDIRECT_URI || 'https://myapp.example.com/auth/callback',
  response_type: 'code',
  scope: 'openid profile email',
  metadata: {
    authorization_endpoint: 'https://portal.ncu.edu.tw/oauth2/authorization',
    token_endpoint: 'https://portal.ncu.edu.tw/oauth2/token',
    userinfo_endpoint: 'https://portal.ncu.edu.tw/apis/oauth/v1/info'
  }
});

const SignIn: React.FC = () => {
  const handleLogin = () => {
    userManager.signinRedirect();
  };

  useEffect(() => {
    userManager.signinRedirectCallback().then((user: User | null) => {
      if (user) {
        localStorage.setItem('access_token', user.access_token);
        localStorage.setItem('id_token', user.id_token);
        window.location.href = '/';
      }
    }).catch((error) => {
      console.error('Sign in error', error);
    });
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sign In" />
      <div className="flex justify-center items-center h-100 bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark max-w-lg w-full max-h-[70vh] overflow-y-auto">
          <div className="p-4 sm:p-12.5 xl:p-17.5 text-center">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign In to WIDM Website
            </h2>
            <div className="flex flex-col items-center">
              <button
                onClick={handleLogin}
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              >
                Sign in with Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignIn;
