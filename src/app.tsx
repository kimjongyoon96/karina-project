// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header'; // Header 컴포넌트 임포트
import Menubar from './components/menubar/menubar';
import MainContens from './components/maincontens/maincontens';
import SeachBar from './components/seachbar/seachbar';
import Number from './components/movepage/movepage';
import DetailPage from './components/detailPage/detailPage';
const App: React.FC = () => {
  const [category, setCategory] = useState('청순카리나');

  return (
    <Router>
      <div>
        <Header />
        <Menubar setCategory={setCategory} />
        <Routes>
          <Route path="/" element={<MainContens category={category} />} />
          <Route path="/contact" element={<DetailPage />} />
        </Routes>
        <SeachBar />
        <Number />
      </div>
    </Router>
  );
};

export default App;
