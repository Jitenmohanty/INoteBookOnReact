import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './Context/notes/NoteState';
import {Toaster} from 'react-hot-toast'
import Login from './components/Login';
import SignUp from './components/SignUp';
function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <div className="container">

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </div>
        <Toaster/>
      </Router>
    </NoteState>

  );
}

export default App;
