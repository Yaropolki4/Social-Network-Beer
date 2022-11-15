import React from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';


const socket = io('http://localhost:4567', {
    autoConnect: false
  });

export default socket;
