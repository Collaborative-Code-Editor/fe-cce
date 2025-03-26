"use client"
import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import '../../css/Repl.css';

const Repl = () => {
  const [roomId, setRoomId] = useState('');
  const [showRoomId, setShowRoomId] = useState(false);

  const handleInviteFriends = () => {
    const storedRoomId = localStorage.getItem('roomid');
    if (storedRoomId) {
      setRoomId(storedRoomId);
      setShowRoomId(true);
    } else {
      alert('No room ID found. Please create a room first.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    alert('Room ID copied to clipboard!');
  };

  return (
    <div className="editor bg-black/30 text-white backdrop-blur-lg rounded-xl p-8 mx-3 my-9 shadow-lg shadow-blue-400/20 border border-blue-400/30">
      <div className="editor_header flex justify-between mb-4">
        <button onClick={handleInviteFriends} className="bg-blue-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-blue-400 transition-all duration-300">
          Invite Friends
        </button>
        <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-blue-400 transition-all duration-300">
          Run code
        </button>
      </div>

      {showRoomId && (
        <div className="room-info bg-white/10 p-4 rounded-xl mb-4 flex items-center justify-between">
          <p className="text-white">Room ID: <span className="font-bold text-blue-400">{roomId}</span></p>
          <button onClick={handleCopy} className="bg-gray-300 text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-400 transition-all duration-300">
            Copy Room ID
          </button>
        </div>
      )}

      <div className="editor_body flex">
        {/* <div className='editor_folder_structure bg-blue-400/30 border border-blue-400/50 rounded-lg p-4 shadow-md mr-4'>
          <p className="text-white">Folder</p>
        </div> */}

        <div className='editor_code_window flex-1'>
          <Editor
            theme='vs-dark'
            height='70vh'
            width='100%'
            defaultLanguage="javascript"
          />
        </div>
      </div>

      <div className="editor_footer mt-4 text-gray-400">Here names of the people joining the room will be showed</div>
    </div>
  );
}

export default Repl;
