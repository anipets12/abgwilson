import React, { Suspense } from 'react';
import Routes from './routes';
import Loading from './components/Loading';

const App = () => {
    return (
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
    );
};

export default App;
