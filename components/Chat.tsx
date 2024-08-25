"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001/");

function Chat() {
  const [roomNumber, setRoomNumber] = useState("");
  const [value, setValue] = useState("");
  const sendMessage = async () => {
    socket.emit("send_message", { value });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(`received: ${data.value}`);
    });
  }, [socket]);
  return (
    <div>
      <h1>Chat</h1>
      <div>
        <input
          onChange={(e) => {
            setRoomNumber(e.target.value);
          }}
          type="text"
          placeholder="Enter Room Number..."
        />
        <button
          onClick={() => {
            console.log("join this room:", roomNumber);
          }}
        >
          Join Room
        </button>
      </div>
      <div>
        <input
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Message..."
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <p>{value}</p>
    </div>
  );
}

export default Chat;
