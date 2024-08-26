"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001/");

function Chat() {
  const [inputJoinRoomNumber, setInputJoinRoomNumber] = useState("");
  const [joinRoomNumber, setJoinRoomNumber] = useState("");
  const [inputLeaveRoomNumber, setInputLeaveRoomNumber] = useState("");
  const [leaveRoomNumber, setLeaveRoomNumber] = useState("");
  const [value, setValue] = useState("");

  const sendMessage = async () => {
    socket.emit("send_message", { value, joinRoomNumber });
  };

  const joinRoom = async () => {
    console.log("pressed join room");

    setJoinRoomNumber(inputJoinRoomNumber);
    socket.emit("join_room", { roomNumber: inputJoinRoomNumber });
  };

  const leaveRoom = async () => {
    console.log("pressed leave room");

    setLeaveRoomNumber(inputLeaveRoomNumber);
    socket.emit("leave_room", { roomNumber: inputLeaveRoomNumber });
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
            setInputJoinRoomNumber(e.target.value);
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
          onChange={(e) => {
            setInputLeaveRoomNumber(e.target.value);
          }}
          type="text"
          placeholder="Leave Room Number..."
        />
        <button
          onClick={() => {
            leaveRoom();
          }}
        >
          Leave Room
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
