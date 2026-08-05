import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Add from './pages/Add/Add';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
            <Route path='/Add' element={<Add/>}></Route>
            <Route path='/list' element={<List/>}></Route>
            <Route path='/Orders' element={<Orders/>}></Route>
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
