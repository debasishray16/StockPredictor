import './App.css';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <div className="flex">
      <div className='basis-[12%] h-[100vh] border'>
      <Sidebar />
      </div>
      <div className='basis-[88%] border'></div>
      
    </div>
  );
}

export default App;