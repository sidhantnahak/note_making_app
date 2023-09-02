import Navbar from './Components/Navbar';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Home from './Components/Home';
import './App.css'
import {  useSelector} from 'react-redux';
import { getAllnotes, getUser } from './UserAction/UserAction';
import { useEffect } from 'react';
import store from './Store';
import Note from './Components/Notes';
import Protected from './Components/Protected';
import Contact from './Components/Contact';
import Profile from './Components/Profile';
import Notfound from './Components/Notfound';


function App() {
  // const dispatch = useDispatch()
  const { user} = useSelector(state => state.user)


  useEffect(() => {

    store.dispatch(getUser());
    store.dispatch(getAllnotes())

  }, [])


  return (
    <div className="app">



      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route exact path="/" element={<Home />} />

          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />


          <Route element={<Protected />}>
          <Route exact path='/about' element={<Profile user={user} />} />

            <Route exact path='/notes' element={<Note />} />
            <Route exact path='/notes/update/:id' element={<Note />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/feedback" element={<Notfound/>} />


          </Route>
          <Route exact path="*" element={<Notfound/>} />

         
        </Routes>
      </BrowserRouter>
    </div>



  );
}

export default App;
