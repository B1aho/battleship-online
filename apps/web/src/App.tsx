import { Route, Routes } from 'react-router';
import './App.css'
import { Home } from './pages/Home';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
