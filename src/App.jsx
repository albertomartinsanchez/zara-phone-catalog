import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import PhoneList from './pages/PhoneList/PhoneList'
import PhoneDetail from './pages/PhoneDetail/PhoneDetail'
import Cart from './pages/Cart/Cart'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<PhoneList />} />
          <Route path="/phone/:id" element={<PhoneDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </>
  )
}
