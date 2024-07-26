import React from "react";
import "./App.css";
import Main from "./pages/Main";
import Header from "./components/Header";
import Snackbar from "./components/Snackbar";

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Snackbar />
    </div>
  );
}

export default App;
