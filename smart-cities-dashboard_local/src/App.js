import React, { useState } from "react";
import TitleScreen from "./components/TitleScreen";
import Dashboard from "./components/Dashboard";
import ComplaintForm from "./components/ComplaintForm";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("title");

  return (
    <>
      {screen === "title" && <TitleScreen setScreen={setScreen} />}
      {screen === "dashboard" && <Dashboard setScreen={setScreen} />}
      {screen === "complaint" && <ComplaintForm setScreen={setScreen} />}
    </>
  );
}

export default App;
