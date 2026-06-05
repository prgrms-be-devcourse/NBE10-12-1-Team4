import { Theme, Box, Flex } from '@radix-ui/themes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import StorePage from './pages/customer/StorePage';
import TrackOrderPage from './pages/customer/TrackOrderPage';


function App() {
  return (
    <Theme
      accentColor="brown"
      grayColor="sand"
      radius="medium"
      appearance="light"
    >
      <BrowserRouter>
        {/* 전체 화면을 Flex로 감싸서 푸터를 하단에 고정 */}
        <Flex direction="column" style={{ minHeight: '100vh', backgroundColor: 'var(--gray-2)' }}>
          {/* 상단 네비게이션 */}
          <Navbar />
          
          {/* 메인 콘텐츠 영역 (유동적으로 늘어나서 푸터를 밀어냄) */}
          <Box style={{ flexGrow: 1 }}>
            <Routes>
              {/* 고객용 페이지 */}
              <Route path="/" element={<StorePage />} />
              <Route path="/track" element={<TrackOrderPage />} />
              
              {/* 관리자용 페이지 (담당 스코프 아님 - 목업 유지) */}
            </Routes>
          </Box>
          
          {/* 하단 푸터 (관리자 로그인 링크 포함) */}
          <Footer />
        </Flex>
      </BrowserRouter>
    </Theme>
  );
}

export default App;
