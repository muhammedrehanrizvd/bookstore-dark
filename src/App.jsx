import './App.css'
import { Outlet } from 'react-router-dom'
import  Nav from './components/header/Nav'
import Footer from './components/footer/Footer'
import Lastline from './components/footer/Lastline'
import { useEffect } from 'react'
import { checkAuth } from './App/slices/authSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // ✅ Check auth but DON'T block app if it fails
    dispatch(checkAuth()).catch(() => {
      // Silent fail - user just not logged in
      console.log('No active session - user not logged in');
    });
  }, [dispatch]);



  return (
    <>
      <Nav />

      <main className="pt-16 min-h-screen">
        <Outlet />
      </main>

      <Footer />
      <Lastline />
      {/* <BookDetail/> */}
    </>
  )
}

export default App
