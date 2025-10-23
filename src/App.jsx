import { useState } from 'react'
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <Toaster 
      position="top-right"
      toastOptions={{
        success:{
          theme:{
            primary:'#3ecae9ff',
          },
        },
      }}></Toaster>
    </div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path ='/editor/:roomId' element={<EditorPage />} />
      </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App
