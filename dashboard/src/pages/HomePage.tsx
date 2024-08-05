import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';

const HomePage: React.FC = () => {
  return (
    <DefaultLayout>
      <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', textAlign: 'center', color: 'black', fontSize: '20px' }}>
        <div>
          <div>
            正式機 Web: <a href="https://widm-front-end.nevercareu.space/" style={{ color: 'black' }}>https://widm-front-end.nevercareu.space/</a>
          </div>
          <br />
          <div>
            正式機 Dashboard: <a href="https://widm-dash.nevercareu.space/" style={{ color: 'black' }}>https://widm-dash.nevercareu.space/</a>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
