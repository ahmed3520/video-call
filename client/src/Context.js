import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import {authMethods} from './firebase/authmethods'
const SocketContext = createContext();
//const socket = io('http://localhost:5000');
 const socket = io('https://video-friends.herokuapp.com/');


const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const initState = {email:'', password:''}
  const [inputs, setInputs] = useState(initState);
  const [error, setErrors] = useState([])
  const [token, setToken] = useState(null);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
      
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);
  const handleSignup = () =>{
    authMethods.signup(inputs.email, inputs.password, setErrors, setToken);
     //log
    console.log(error, token)
  }
  const handleSignin = ()=>{
    authMethods.signin(inputs.email, inputs.password, setErrors, setToken);
    console.log(error, token);
  }
  const handleSignout = () =>{
    authMethods.signout(setErrors, setToken);
  }
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };
  const muteVideo=()=>{
    stream.getVideoTracks()[0].enabled = !(stream.getVideoTracks()[0].enabled);
  }
  const muteAudio=()=>{
    stream.getAudioTracks()[0].enabled = !(stream.getAudioTracks()[0].enabled);
  }

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      muteVideo,
      muteAudio,
      handleSignin,
      handleSignout,
      handleSignup,
      error,
      token,
      inputs,
      setInputs,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };