import './App.css';
import {Outlet} from 'react-router-dom';

function App() {
  return (
    <div className="flex">
      <div className='basis-[100%] h-[100%] overflow-scroll'>
        <div>
        <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default App;