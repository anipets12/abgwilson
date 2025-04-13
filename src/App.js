import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import Loading from './components/Loading';
const App = () => {
    return (_jsx(BrowserRouter, { children: _jsx(Suspense, { fallback: _jsx(Loading, {}), children: _jsx(Routes, {}) }) }));
};
export default App;
