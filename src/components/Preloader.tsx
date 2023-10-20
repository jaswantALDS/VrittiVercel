"use client";
import { store } from "@/store";
import { setUser } from "@/store/userSlice";
import { useRef } from "react";

export default function Preloader({ user }: { user: any }) {
  const loaded = useRef(false);

  if (!loaded.current) {
    store.dispatch(setUser(user));
    loaded.current = true;
  }

  return null;
}
