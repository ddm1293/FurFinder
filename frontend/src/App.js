import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
// import Thread from './components/Thread';
// import CommentView from "./components/Comments/CommentView";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import ViewThread from "./components/ViewThread/ViewThread"

// edited for thread component test
function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      {/* <Routes> */}
      {/*   <Route path="/" element={<Home />} /> */}
      {/* </Routes> */}
      {/* <Thread /> */}
      {/* <CommentView /> */}
      <ViewThread/>
    </div>
  );
}

export default App;
