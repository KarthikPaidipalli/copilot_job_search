import React from "react";
import { Toaster } from "@/components/toaster";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/header";

export interface AppProps {
  children: React.ReactNode;
}

const App = ({ children }: AppProps) => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {/* Toast Portal */}
        <Toaster position="bottom-right" />
      </div>
    </AuthProvider>
  );
};

export default App;
