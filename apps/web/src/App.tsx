import { Route, Routes } from 'react-router';
import './App.css'
import { Home } from './pages/Home';
import { Layout } from './pages/Layout';
import { AuthLayout } from './pages/AuthLayout';
import { Login } from './features/Auth/Login';
import { Register } from './features/Auth/Register';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="home" element={<Home />} />
          <Route index path="room" element={<Home />} />
          <Route path="about" element={<Home />} />
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
