import React from "react";
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import store from './store';
import Navbar from "./components/Navbar/Navbar";
import Home from './routes/Home';
import Login from './routes/Login';
import Threads from './routes/Threads';
import ThreadView from './routes/ThreadView';
import YourProfile from './routes/YourProfile';
import Settings from './routes/Settings';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  if (!user.username) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <YourProfile />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/threads" element={<Threads />} />
            <Route path="/threads/:id" element={<ThreadView />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
