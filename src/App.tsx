import React from "react";
import { Toaster } from "@/components/toaster";
import { Header } from "./components/header";
import "./App.css";
export interface AppProps {
  children: React.ReactNode;
}
const App = ({ children }: AppProps) => {
  return (
    <div>
      <Header />
      {children}
      <Toaster position="bottom-right" />
    </div>
  );
};

export default App;
