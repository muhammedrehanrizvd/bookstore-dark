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
    dispatch(checkAuth()); // ✅ bas itna
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
