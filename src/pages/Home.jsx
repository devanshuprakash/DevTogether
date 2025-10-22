import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import {}

function Home() {
  const [roomId,setRoomId]=
  const createNewRoom = (e) => {
    e.preventDefault();
    const id  = uuidV4();
    console.log(id);
  }
  return (
    <div className='homePageWrapper'>
        <div className='formWrapper'>
          <img src="src/devrogether.png" alt="devtogether-logo" />
          <h4 className='formTitle'>Paste invitation ROOM ID </h4>
          <div className='inputGroup'>
            <input type="text"  className='inputBox' placeholder='ROOM ID' />
            <input type="text" className='inputBox'  placeholder='USERNAME'/>
            <button className='btn joinBtn'>Join</button>
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