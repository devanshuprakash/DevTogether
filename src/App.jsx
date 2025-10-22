import { useState } from 'react'
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path ='/Editor/:roomId' element={<EditorPage />} />
      </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App
