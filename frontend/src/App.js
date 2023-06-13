import React from "react";
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import store from './store'
import Navbar from "./components/Navbar/Navbar";
import Home from './routes/Home';
import Login from './routes/Login';
import Threads from './routes/Threads';
import ThreadView from './routes/ThreadView';
import YourProfile from './routes/YourProfile';
import Settings from './routes/Settings';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/threads" element={<Threads />} />
            <Route path="/threads/:id" element={<ThreadView />} />
            <Route path="/profile" element={<YourProfile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
