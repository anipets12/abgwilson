import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import Loading from './components/Loading';
const App = () => {
    return (<BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
    </BrowserRouter>);
};
export default App;
