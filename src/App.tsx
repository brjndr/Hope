import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from '@components/header/header';
import './App.scss'
import Dashboard from '@components/dashboard/dashboard';
import Planning from '@components/planning/planning';
import CreativeStudio from '@components/creativeStudio/creativeStudio';
import WorkflowCenter from '@components/workflowCenter/workflowCenter';
import Scheduler from '@components/scheduler/scheduler';
import Login from '@components/login/login';


const Pages = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && <Header />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/creativeStudio" element={<CreativeStudio />} />
        <Route path="/workflowCenter" element={<WorkflowCenter />} />
        <Route path="/scheduler" element={<Scheduler />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Pages />
      </div>
    </BrowserRouter>
  )
}

export default App
