import { Route, Routes } from 'react-router';
import './App.css'
import { Play } from './pages/Play';
import { Layout } from './pages/Layout';
import { AuthLayout } from './pages/AuthLayout';
import { Login } from './features/Auth/Login';
import { Register } from './features/Auth/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Для play добавить динамический путь? Если онлайн - то хэш комнаты, иначе - ?=ai */}
          <Route index path="play" element={<Play />} />
          <Route index path="room" element={<div />} />
          <Route path="about" element={<div />} />
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
