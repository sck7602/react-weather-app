import NotFoundPage from '@/app/components/Common/NotFoundPage';
import Home from '@/app/pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/app/style.css';

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
