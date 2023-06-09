import React from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Home from './routes/Home';
import Threads from './routes/Threads';
import ThreadView from './routes/ThreadView';
import YourProfile from './routes/YourProfile';
import Settings from './routes/Settings';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/threads" element={<Threads />} />
        <Route path="/threads/:id" element={<ThreadView />} />
        <Route path="/profile" element={<YourProfile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
