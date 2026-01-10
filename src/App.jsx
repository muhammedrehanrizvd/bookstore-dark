import './App.css'
import { Outlet } from 'react-router-dom'
import  Nav from './componets/header/Nav'
import Footer from './componets/footer/Footer'
import Lastline from './componets/footer/Lastline'
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
