import React,{useState} from 'react'

function EditorPage() {
  const [clients,setClients] = useState([{}])
  return (
    <div className='mainWrap'>
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className='logoImage'
            src='/src/devrogether.png'
            alt ='logo' />
          </div>
          <h3>Connected</h3>
          <div className="clientList"></div>
        </div>
      </div>
    </div>
  )
}

export default EditorPage;