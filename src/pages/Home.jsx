import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [roomId,setRoomId]=useState('');
  const [username,setUsername]=useState('');
  const createNewRoom = (e) => {
    e.preventDefault();
    const id  = uuidV4();
    setRoomId(id);
    toast.success('Created a new room');
  };

  const joinRoom =()=>{
    if(!roomId || !username) {
      toast.error("Room ID & username is Required");
      return;
    }
    navigate(`/editor/${roomId}`,{
      state:{
        username,
      },
    });
  }
  const handleInputEnter = (e) =>{
    console.log('event',e.code);
    if (e.code=='Enter'){
      joinRoom();
    }
  }
  return (
    <div className='homePageWrapper'>
        <div className='formWrapper'>
          <img src="/src/devrogether.png" alt="devtogether-logo" />
          <h4 className='formTitle'>Paste invitation ROOM ID </h4>
          <div className='inputGroup'>
            <input type="text"  className='inputBox' placeholder='ROOM ID' value={roomId} 
            onKeyUp={handleInputEnter}
            onChange={(e)=>{setRoomId(e.target.value)}}/>
            <input type="text" className='inputBox'  placeholder='USERNAME'
            onChange={((e)=>{setUsername(e.target.value)})} 
             onKeyUp={handleInputEnter}
            value={username}/>
            <button className='btn joinBtn' onClick={joinRoom}>Join</button>
            <span className='createInfo'>if you don't have a ROOM ID, please create &nbsp; 
              <a onClick={createNewRoom} href="" className='newRoom'>new room </a></span>
        </div>


    </div>
            <footer>
      <h4>Built with 💖 by &nbsp;<a href="https://github.com/devanshuprakash">Devanshu Prakash</a> </h4>
            </footer>
    </div>
  )
}

export default Home;