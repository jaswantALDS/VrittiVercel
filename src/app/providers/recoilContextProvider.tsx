"use client"
import React from 'react';
import { RecoilRoot, atom } from 'recoil'

export const emailState = atom({
  key: 'emailState',
  default: '',
});

export default function RecoilContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      {children}
    </RecoilRoot>
  );
}
