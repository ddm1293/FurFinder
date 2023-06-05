import React from "react";
import Home from './components/Home';
// import Thread from './components/Thread';
// import CommentView from "./components/Comments/CommentView";
import './App.css';
import Navbar from "./components/Navbar/Navbar";

// edited for thread component test
function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <Thread /> */}
      {/* <CommentView /> */}
      <Home />
    </div>
  );
}

export default App;
