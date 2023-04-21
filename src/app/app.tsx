import Home from './components/Home/Home';
import NotFoundPage from './components/Common/NotFoundPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './style.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
