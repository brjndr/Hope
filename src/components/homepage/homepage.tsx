import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from '@components/header/header';
import Sidebar from '@components/sidebar/sidebar';
import DashboardPage from '@components/dashboard/DashboardPage';
import Planning from '@components/planning/planning';
import CreativeStudio from '@components/creativeStudio/creativeStudio';
import WorkflowCenter from '@components/workflowCenter/workflowCenter';
import Scheduler from '@components/scheduler/scheduler';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  background-color: #f5f5f5;
`;

const HomePage = () => {
  return (
    <LayoutContainer>
      <Header />
      <ContentWrapper>
        <Sidebar />
        <MainContent>
          <Routes>
            {/* Feature routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/creativeStudio" element={<CreativeStudio />} />
            <Route path="/workflowCenter" element={<WorkflowCenter />} />
            <Route path="/scheduler" element={<Scheduler />} />
          </Routes>
        </MainContent>
      </ContentWrapper>
    </LayoutContainer>
  );
};

export default HomePage;