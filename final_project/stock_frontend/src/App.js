import './App.css';
import Dashboardview from './Components/Dashboardview';
import Sidebar from './Components/Sidebar';
import {Outlet} from 'react-router-dom';

function App() {
  return (
    <div className="flex">
      <div className='basis-[12%] h-[100vh] border'>
      <Sidebar />
      </div>
      <div className='basis-[88%] border h-[100vh] overflow-scroll'>
        <Dashboardview />
        <div>
        <Outlet></Outlet>
        </div>
      </div>
      
    </div>
  );
}

export default App;