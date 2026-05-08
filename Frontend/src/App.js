import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <Outlet />
    </div>
  );
}

export default App;
