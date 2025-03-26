"use client"
import Link from "next/link";
import { use, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";


const Collaboration = () => {
  const [showRoomInput, setShowRoomInput] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Java');
  const [roomId , setRoomId] = useState("");
  const [stompClient, setStompClient] = useState(null);

  const enterRoomId = () => {
    setShowRoomInput(true);
  };


  const joinRoom = () => {
    if (!roomId) {
      alert("Please enter a room ID");
      return;
    }


    const socket = new SockJS("http://localhost:8080/collab");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log("Connected to STOMP");
      setStompClient(client);

      client.subscribe(`/topic/room/${roomId}`, (message) => {
        const data = JSON.parse(message.body);
        if (data.event === "codeUpdate") {
          setCode(data.code);
        } else if (data.event === "userJoined" || data.event === "userLeft") {
          setMessages((prev) => [...prev, data.message]);
        }
      });

      client.send(`/app/joinRoom/${roomId}`, {}, JSON.stringify({ username }));
    }, (error) => {
      console.error("STOMP error:", error);
      setMessages((prev) => [...prev, "Connection failed. Please try again."]);
    });

    if(client.connected){
      navigate("/Repl");
    }
  };


  const createUUid = () => {
    const roomid = uuidv4();
    localStorage.setItem('roomid', roomid);
    localStorage.setItem('language', selectedLanguage);
  }

  return (
    <section className="text-white bg-black/30 backdrop-blur-lg mx-3 my-9 p-12 rounded-xl shadow-lg shadow-blue-400/20 border border-blue-400/30 flex flex-col items-center justify-center space-y-6 h-[90vh]">
      <h1 className="text-4xl md:text-6xl font-bold text-center">Create or Join a Project</h1>
      <p className="text-lg text-gray-300 max-w-xl text-center">
        Start a collaborative coding session with your team using Java, JavaScript, or Python.
      </p>

      <div className="flex flex-col items-center space-y-6">
        <select 
          value={selectedLanguage} 
          onChange={(e) => setSelectedLanguage(e.target.value)} 
          className="bg-white text-black px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
        >
          <option value="Java">Java</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
        </select>

        <div className="flex gap-5">
          <Link href="/Repl">
            <button onClick={createUUid} className="bg-blue-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-blue-400 transition-all duration-300">
              Create Project
            </button>
          </Link>

          <button onClick={enterRoomId} className="bg-amber-600 px-6 py-3 rounded-full font-semibold hover:bg-amber-500 transition-all duration-300">
            Join Room
          </button>
        </div>

        {showRoomInput && (
          <div className="mt-6 flex flex-col items-center space-y-4">
            <input
              type="text"
              placeholder="Enter Room ID"
              onChange={(e) => setRoomId(e.target.value)}
              className="bg-white text-black px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
            />
            <button onClick={joinRoom} className="bg-blue-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-blue-400 transition-all duration-300">
              Join
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Collaboration;