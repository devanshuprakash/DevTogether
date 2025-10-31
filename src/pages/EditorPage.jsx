import React,{useEffect, useRef, useState} from 'react'
import Client from '../components/Client'
import Editor from '../components/Editor'
import { initSocket } from '../socket';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
function EditorPage() {
  const socketRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const username = location.state?.username;

  const [clients,setClients] = useState([]);
  const [code,setCode] = useState('');

  useEffect(() => {
    if (!username) {
      navigate('/');
      return;
    }

    const socket = initSocket();
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('join', { roomId, username });
    });

    socket.on('joined', ({ socketId, username: joinedUser }) => {
      setClients((prev) => {
        const exists = prev.some((c) => c.socketId === socketId);
        if (exists) return prev;
        return [...prev, { socketId, username: joinedUser }];
      });
    });

    socket.on('disconnected', ({ socketId }) => {
      setClients((prev) => prev.filter((c) => c.socketId !== socketId));
    });

    socket.on('sync_code', (serverCode) => {
      setCode(serverCode || '');
    });

    socket.on('code_change', ({ code: incoming }) => {
      setCode((current) => (current === incoming ? current : incoming));
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [roomId, username, navigate]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    const socket = socketRef.current;
    if (socket) {
      socket.emit('code_change', { roomId, code: newCode });
    }
  };
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
        <button className='btn copyBtn' onClick={() => navigator.clipboard.writeText(roomId)}>Copy Room Id</button>
        <button className='btn leaveBtn' onClick={() => navigate('/')}>Leave</button>
      </div>
      <div className="editorWarp">
        <Editor value={code} onChange={handleCodeChange}/>
      </div>
    </div>
  )}


export default EditorPage;