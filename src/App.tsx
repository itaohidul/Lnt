import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Store from './pages/Store';
import Dashboard from './pages/Dashboard';
import Referral from './pages/Referral';
import Token from './pages/Token';
import About from './pages/About';
import Community from './pages/Community';
import Staking from './pages/Staking';
import AIAssistant from './components/AIAssistant';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="store" element={<Store />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="referral" element={<Referral />} />
          <Route path="token" element={<Token />} />
          <Route path="staking" element={<Staking />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
      <AIAssistant />
      <Toaster />
    </AuthProvider>
  );
}
