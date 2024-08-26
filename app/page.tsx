"use client";

import Chat from "@/components/Chat";
import FormModal from "@/components/FormModal";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { getDataFromServer } from "@/services/apiService";
import { useTheme } from "next-themes";
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
      <ThemeSwitcher />
      <FormModal />
      <Chat />
    </div>
  );
}
