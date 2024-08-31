"use client";
import { useParams } from "next/navigation"; // Import from next/navigation

const JamRoomPage = () => {
  const params = useParams(); // Use useParams to get route parameters

  const id = params.jamRoomId as string; // Get the dynamic ID from the URL

  return (
    <div>
      <h1>Jam Room Details</h1>
      <p>Jam Room ID: {id}</p>
    </div>
  );
};

export default JamRoomPage;
