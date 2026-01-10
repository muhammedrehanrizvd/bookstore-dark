import './App.css'
import { Outlet } from 'react-router-dom'
import  Nav from './components/header/Nav'
import Footer from './components/footer/Footer'
import Lastline from './components/footer/Lastline'
function App() {
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
