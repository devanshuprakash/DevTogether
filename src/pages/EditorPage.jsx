import React,{useEffect, useRef, useState} from 'react'
import Client from '../components/Client'
import Editor from '../components/Editor'
// import { initSocket } from '../socket';
function EditorPage() {
//   const scoketRef = useRef(null);
//   useEffect(()=>{
//     const initSocket = async()=>{
//       scoketRef.current = await  initSocket();
//     };
//     init();
//   },[]);

  const [clients,setClients] = useState([
    {socketId:1,username:'Rake'},
    {socketId:2,username:'deva'},
    {socketId:3,username:'Rakesh kask'} 
  ])
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
          <div className="clientList">
              {
               clients.map(client => {
                    return (
                      <Client
                        key={client.socketId}
                        username={client.username}
                      />
                    );
                  })
              }
          </div>
        </div>
        <button className='btn copyBtn'>Copy Room Id</button>
        <button className='btn leaveBtn'>Leave</button>
      </div>
      <div className="editorWarp">
        <Editor/>
      </div>
    </div>
  )}


export default EditorPage;