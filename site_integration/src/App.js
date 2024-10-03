import './App.css';
import Sidebar from './Components/Sidebar';
import {Outlet} from 'react-router-dom';

function App() {
  return (
    <div className="flex">
      <div className='basis-[12%] h-[100vh]'>
      <Sidebar />
      </div>
      <div className='basis-[88%] h-[100vh] overflow-scroll'>
        <div>
        <Outlet></Outlet>
        </div>
      </div>
      
    </div>
  );
}

export default App;