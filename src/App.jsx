import './App.css'
import Footer from './componets/footer/Footer'
import Nav from './componets/header/Nav'
import Card from './componets/home/Card'
import Home from './componets/home/Home'
import Middle from './componets/home/Middle'
import { Outlet } from 'react-router-dom'
import Lastline from './componets/footer/Lastline'
import Top from './componets/home/Top'
import Bookcard from './componets/home/Bookcard'
import About from './componets/about/About'
import CardStore from './componets/store/CardStore'
import Store from './componets/store/Store'
import BookDetail from './componets/Books/BookDetail'

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
