import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex basis-[100%] h-[100%] overflow-scroll">
      <Outlet />
    </div>
  );
}

export default App;
