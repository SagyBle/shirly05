"use client";

import Chat from "@/components/Chat";
import { getDataFromServer } from "@/services/apiService";
import { useEffect, useState } from "react";

export default function Home() {
  const [header, setHeader] = useState("");
  const getHeader = async () => {
    const returnValue = await getDataFromServer("");
    setHeader(returnValue.message);
  };

  useEffect(() => {
    getHeader();
  }, []);

  return (
    <div>
      <h1>{header}</h1>
      <Chat />
    </div>
  );
}
