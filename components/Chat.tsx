"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001/");

function Chat() {
  const [inputRoomNumber, setInputRoomNumber] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [value, setValue] = useState("");

  const sendMessage = async () => {
    socket.emit("send_message", { value, roomNumber });
  };
  const joinRoom = async () => {
    console.log("pressed join room");

    setRoomNumber(inputRoomNumber);
    socket.emit("join_room", { roomNumber: inputRoomNumber });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(`received: ${data.value}`);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);
  return (
    <div>
      <h1>Chat</h1>
      <div>
        <input
          onChange={(e) => {
            setInputRoomNumber(e.target.value);
          }}
          type="text"
          placeholder="Enter Room Number..."
        />
        <button
          onClick={() => {
            joinRoom();
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
    </div>
  );
}

export default Chat;
