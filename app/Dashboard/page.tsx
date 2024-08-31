"use client";
import CreateJamRoom from "@/app/Dashboard/components/CreateJamRoom";
import { socket } from "@/utils/socketio.util";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const [inputJoinRoomNumber, setInputJoinRoomNumber] = useState("");
  const [joinRoomNumber, setJoinRoomNumber] = useState("");
  const [inputLeaveRoomNumber, setInputLeaveRoomNumber] = useState("");
  const [leaveRoomNumber, setLeaveRoomNumber] = useState("");
  const [value, setValue] = useState("");
  const [jamRooms, setJamRooms] = useState([
    {
      name: "room1",
      id: "1",
      maxRoomUsers: 10,
      password: "123",
    },
    {
      name: "room1",
      id: "2",
      maxRoomUsers: 10,
    },
    {
      name: "room3",
      id: "3",
      maxRoomUsers: 10,
      password: "123",
    },
  ]);

  const router = useRouter();

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

  const navigateToJamRoom = (jamRoomId: string) => {
    router.push(`/JamRoom/${jamRoomId}`);
  };

  const handleCreateRoom = (formData: {
    roomName: string;
    maxUsers: number | "";
    description: string;
    password: string;
    lockRoom: boolean;
  }) => {
    console.log("Creating room with data:", formData);
    // Handle the room creation logic here, e.g., send data to the server or update state
  };

  return (
    <div>
      <h1>Chat</h1>
      <Link href="/JamRoom/1234">
        <button>Go to Jam Room 1234</button>
      </Link>
      {<CreateJamRoom onSubmit={handleCreateRoom} />}
      {jamRooms.map((jamRoom) => (
        <div
          onClick={() => navigateToJamRoom(jamRoom.id)}
          key={jamRoom.id}
          className="p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition-colors duration-300"
        >
          <span className="block text-lg font-semibold text-gray-800">
            {jamRoom.name}
          </span>
          <span className="block text-sm text-gray-600">ID: {jamRoom.id}</span>
          <span className="block text-sm text-gray-500">
            Max Users: {jamRoom.maxRoomUsers}
          </span>
          {jamRoom.password && <span>Locked</span>}
        </div>
      ))}
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

export default Page;
