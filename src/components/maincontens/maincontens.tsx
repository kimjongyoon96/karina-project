import React from 'react';
import { useNavigate } from 'react-router-dom';
import './maincontens.css';

// MainContents 컴포넌트의 props 타입 정의
interface MainContentsProps {
  category: string;
}

const MainContents: React.FC<MainContentsProps> = ({ category }) => {
  const navigate = useNavigate();

  const goToSecondMain = (): void => {
    navigate('/contact');
  };

  // 카테고리에 따라 다른 내용을 표시하는 로직
  const renderContent = (): React.ReactNode => {
    switch (category) {
      case '청순카리나':
        return <div>청순카리나 관련 컨텐츠</div>;
      case '큐트카리나':
        return <div>큐트카리나 관련 컨텐츠</div>;
      case '섹시카리나':
        return <div>섹시카리나 관련 컨텐츠</div>;
      case '일상카리나':
        return <div>일상카리나 관련 컨텐츠</div>;
      default:
        return <div>기본 컨텐츠</div>;
    }
  };

  return (
    <main className="mainContents">
      <li className="contents1" onClick={goToSecondMain}>
        {renderContent()}
      </li>
      <li className="contents2" onClick={goToSecondMain}>
        {renderContent()}
      </li>
      <li className="contents3" onClick={goToSecondMain}>
        {renderContent()}
      </li>
      <li className="contents4" onClick={goToSecondMain}>
        {renderContent()}
      </li>
      <li className="contents5" onClick={goToSecondMain}>
        {renderContent()}
      </li>
      <li className="contents6" onClick={goToSecondMain}>
        {renderContent()}
      </li>
      <li className="contents7" onClick={goToSecondMain}>
        {renderContent()}
      </li>
      <li className="contents8" onClick={goToSecondMain}>
        {renderContent()}
      </li>
      <li className="contents9" onClick={goToSecondMain}>
        {renderContent()}
      </li>
    </main>
  );
};

export default MainContents;
