import React from "react";
import { Toaster } from "@/components/toaster";
import { Header } from "./components/header";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
export interface AppProps {
  children: React.ReactNode;
}
const App = ({ children }: AppProps) => {
  return (
    <div>
      <AuthProvider>
        <Header />
        {children}
        <Toaster position="bottom-right" />
      </AuthProvider>
    </div>
  );
};

export default App;
