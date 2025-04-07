import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-screen h-auto min-h-full bg-blue-300 absolute top-0 left-0"></div>
    </>
  );
}

export default App;
