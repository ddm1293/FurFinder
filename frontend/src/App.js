import React from "react";
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import { store, persistor } from './store';
import Navbar from "./components/Navbar/Navbar";
import Home from './routes/Home';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Threads from './routes/Threads';
import CreateThread from './routes/CreateThread';
import ThreadView from './routes/ThreadView';
import YourProfile from './routes/YourProfile';
import About from './routes/About';

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
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <YourProfile />
                </ProtectedRoute>
              } />
              <Route path="/about" element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              } />
              <Route path="/threads" element={<Threads />} />
              <Route path="/threads/create" element={
                <ProtectedRoute>
                  <CreateThread />
                </ProtectedRoute>
              } />
              <Route path="/threads/:id" element={<ThreadView />} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
