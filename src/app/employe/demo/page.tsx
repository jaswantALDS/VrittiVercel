import { store } from "@/store";
import React from "react";

export default function page() {
  let userR = store.getState().userReducer.user;
  //   console.log(userR);
  return <div>{userR?.email}</div>;
}
