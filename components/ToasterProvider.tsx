// components/ToastProvider.tsx
"use client";

import { ToastContainer } from "react-toastify";

export default function ToastProvider() {
  return (
    <ToastContainer position="bottom-right" autoClose={2000} theme="light" />
  );
}
